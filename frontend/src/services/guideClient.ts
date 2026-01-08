import { GuideError, GuideRequestOptions, GuideResponse } from "../types/guide";
import { normalizeGuideResponse } from "../utils/normalizeGuide";

const API_BASE = import.meta.env.VITE_API_BASE_URL || "http://localhost:8000";

const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

const isColdStartStatus = (status?: number) => status === 502 || status === 503 || status === 504;

const requestWithTimeout = async (input: RequestInfo, init: RequestInit, timeoutMs: number) => {
  const controller = new AbortController();
  const timeoutId = window.setTimeout(() => controller.abort(), timeoutMs);
  try {
    const response = await fetch(input, { ...init, signal: controller.signal });
    return response;
  } finally {
    window.clearTimeout(timeoutId);
  }
};

export const analyzeGuide = async (
  image: File,
  options: GuideRequestOptions,
  generateSteps: boolean
): Promise<GuideResponse> => {
  const formData = new FormData();
  formData.append("image", image);
  formData.append("grid_size", options.gridSize);
  formData.append("color_limit", String(options.colorLimit));
  options.brickTypes.forEach((type) => formData.append("brick_types", type));
  formData.append("generate_steps", String(generateSteps));

  const maxAttempts = 3;
  let lastError: GuideError | null = null;

  for (let attempt = 1; attempt <= maxAttempts; attempt += 1) {
    try {
      const response = await requestWithTimeout(`${API_BASE}/api/guide/analyze`, {
        method: "POST",
        body: formData
      }, 12000);

      if (!response.ok) {
        const error: GuideError = {
          message: "Failed to analyze image.",
          status: response.status,
          isColdStart: isColdStartStatus(response.status)
        };
        throw error;
      }

      const data = (await response.json()) as unknown;
      return normalizeGuideResponse(data);
    } catch (error) {
      const normalized: GuideError = {
        message: error instanceof Error ? error.message : "Unexpected error."
      };

      if (error instanceof DOMException && error.name === "AbortError") {
        normalized.message = "Request timeout.";
        normalized.isTimeout = true;
        normalized.isColdStart = true;
      } else if (typeof error === "object" && error !== null && "status" in error) {
        normalized.status = (error as GuideError).status;
        normalized.isColdStart = (error as GuideError).isColdStart;
      }

      lastError = normalized;

      if (attempt < maxAttempts) {
        await delay(800 * attempt);
        continue;
      }
    }
  }

  throw lastError ?? { message: "Unexpected error." };
};
