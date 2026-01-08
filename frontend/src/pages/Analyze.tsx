import { useCallback, useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import AnalysisOptionsPanel from "../components/AnalysisOptionsPanel";
import BrickGuidePanel from "../components/BrickGuidePanel";
import BrickMosaicPreview from "../components/BrickMosaicPreview";
import PaletteSwatches from "../components/PaletteSwatches";
import UploadPanel from "../components/UploadPanel";
import { analyzeGuide } from "../services/guideClient";
import { GuideError, GuideRequestOptions, GuideResponse } from "../types/guide";

const defaultOptions: GuideRequestOptions = {
  gridSize: "32x32",
  colorLimit: 16,
  brickTypes: ["plate", "tile"]
};

const Analyze = () => {
  const [options, setOptions] = useState<GuideRequestOptions>(defaultOptions);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [result, setResult] = useState<GuideResponse | null>(null);
  const [steps, setSteps] = useState<GuideResponse["steps"] | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isStepsLoading, setIsStepsLoading] = useState(false);
  const [error, setError] = useState<GuideError | null>(null);
  const [coldStartHint, setColdStartHint] = useState(false);

  useEffect(() => {
    return () => {
      if (previewUrl) {
        URL.revokeObjectURL(previewUrl);
      }
    };
  }, [previewUrl]);

  const handleSelectImage = (file: File) => {
    setImageFile(file);
    setResult(null);
    setSteps(null);
    setError(null);
    if (previewUrl) {
      URL.revokeObjectURL(previewUrl);
    }
    setPreviewUrl(URL.createObjectURL(file));
  };

  const summaryItems = useMemo(() => {
    if (!result) {
      return [];
    }
    return [
      { label: "판 크기", value: `${result.meta.gridWidth} x ${result.meta.gridHeight}` },
      { label: "컬러 수", value: `${result.meta.colorCount}` },
      { label: "브릭 수", value: `${result.meta.brickCount}` },
      { label: "브릭 타입", value: result.meta.brickTypes.join(", ") }
    ];
  }, [result]);

  const runAnalyze = useCallback(async () => {
    if (!imageFile) {
      setError({ message: "이미지를 먼저 업로드해주세요." });
      return;
    }
    setIsLoading(true);
    setError(null);
    setColdStartHint(false);
    setSteps(null);

    const timer = window.setTimeout(() => setColdStartHint(true), 1500);
    try {
      const response = await analyzeGuide(imageFile, options, false);
      setResult(response);
    } catch (err) {
      setError(err as GuideError);
    } finally {
      window.clearTimeout(timer);
      setIsLoading(false);
    }
  }, [imageFile, options]);

  const runSteps = useCallback(async () => {
    if (!imageFile) {
      setError({ message: "이미지를 먼저 업로드해주세요." });
      return;
    }
    setIsStepsLoading(true);
    setError(null);
    const timer = window.setTimeout(() => setColdStartHint(true), 1500);
    try {
      const response = await analyzeGuide(imageFile, options, true);
      setResult(response);
      setSteps(response.steps ?? []);
    } catch (err) {
      setError(err as GuideError);
    } finally {
      window.clearTimeout(timer);
      setIsStepsLoading(false);
    }
  }, [imageFile, options]);

  const stepOneReady = Boolean(result);

  return (
    <div>
      <div className="section-title">이미지를 레고 설계도로 변환하는 페이지</div>
      <div className="subtle">업로드 → 분석 → 결과 → (선택) 조립 가이드 순으로 진행합니다.</div>

      <div className="grid-2" style={{ marginTop: "20px" }}>
        <UploadPanel imageFile={imageFile} previewUrl={previewUrl} onSelectImage={handleSelectImage} />
        <AnalysisOptionsPanel options={options} onChange={setOptions} />
      </div>

      <div style={{ marginTop: "20px", display: "flex", gap: "12px", flexWrap: "wrap" }}>
        <button className="btn" type="button" onClick={runAnalyze} disabled={isLoading}>
          {isLoading ? "분석 중..." : "분석 실행"}
        </button>
        <Link className="btn secondary" to="/gallery">
          샘플 결과 보기
        </Link>
      </div>

      {error && (
        <div className="callout">
          <div>
            <strong>{error.message}</strong>
            <div className="subtle">
              {error.isColdStart
                ? "서버가 잠든 상태일 수 있습니다. 재시도 버튼을 눌러주세요."
                : "요청이 실패했습니다. 네트워크 상태를 확인해주세요."}
            </div>
          </div>
          <button className="btn secondary" type="button" onClick={runAnalyze}>
            재시도
          </button>
        </div>
      )}

      {result && (
        <div style={{ marginTop: "24px" }}>
          <div className="card" style={{ marginBottom: "16px" }}>
            <div className="step-label">Step 01 · Result</div>
            <h3 className="section-title">분석 요약</h3>
            <div className="summary-grid">
              {summaryItems.map((item) => (
                <div className="summary-item" key={item.label}>
                  <div className="subtle">{item.label}</div>
                  <strong>{item.value}</strong>
                </div>
              ))}
            </div>
          </div>

          <div className="grid-2">
            <div className="card">
              <div className="section-title">Palette</div>
              <PaletteSwatches palette={result.palette} />
            </div>
            <div className="card">
              <BrickMosaicPreview meta={result.meta} bricks={result.bricks} />
            </div>
          </div>
        </div>
      )}

      <div style={{ marginTop: "28px" }}>
        <div className="step-label">Step 02 · Optional</div>
        <button
          className="btn"
          type="button"
          disabled={!stepOneReady || isStepsLoading}
          onClick={runSteps}
        >
          {isStepsLoading ? "가이드 생성 중..." : "조립 가이드 생성"}
        </button>
        {!stepOneReady && <div className="subtle">STEP 01 완료 후에만 활성화됩니다.</div>}
      </div>

      {steps && steps.length > 0 && (
        <div style={{ marginTop: "20px" }}>
          <BrickGuidePanel steps={steps} />
        </div>
      )}

      {coldStartHint && (
        <div className="toast">
          서버를 깨우는 중입니다. 초기 요청은 10~20초 걸릴 수 있어요.
        </div>
      )}
    </div>
  );
};

export default Analyze;
