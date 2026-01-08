import { GuideResponse, GuideMeta, PaletteColor, BrickCell, GuideStep } from "../types/guide";

const toNumber = (value: unknown, fallback: number) =>
  typeof value === "number" && !Number.isNaN(value) ? value : fallback;

const asArray = <T,>(value: unknown, fallback: T[] = []): T[] =>
  Array.isArray(value) ? (value as T[]) : fallback;

const getHex = (color: Record<string, unknown>, fallback: string) => {
  const candidate =
    color.hex || color.colorHex || color.fill || color.color || color.value || fallback;
  return typeof candidate === "string" ? candidate : fallback;
};

const normalizePalette = (palette: unknown): PaletteColor[] => {
  const raw = asArray<Record<string, unknown>>(palette);
  if (raw.length === 0) {
    return [
      { id: "fallback-1", name: "Graphite", hex: "#2f2f2f" },
      { id: "fallback-2", name: "Sunflower", hex: "#f2c94c" }
    ];
  }
  return raw.map((color, index) => ({
    id: String(color.id ?? color.code ?? `color-${index}`),
    name: String(color.name ?? color.label ?? `Color ${index + 1}`),
    hex: getHex(color, "#2f2f2f")
  }));
};

const normalizeBricks = (bricks: unknown): BrickCell[] => {
  const raw = asArray<Record<string, unknown>>(bricks);
  if (raw.length === 0) {
    return [];
  }
  return raw
    .map((brick) => {
      const x = toNumber(brick.x ?? brick.col ?? brick.column, -1);
      const y = toNumber(brick.y ?? brick.row ?? brick.r, -1);
      const color =
        typeof brick.color === "string"
          ? brick.color
          : getHex(brick as Record<string, unknown>, "#2f2f2f");
      if (x < 0 || y < 0) {
        return null;
      }
      return { x, y, color };
    })
    .filter((item): item is BrickCell => Boolean(item));
};

const normalizeMeta = (payload: Record<string, unknown>, bricks: BrickCell[], palette: PaletteColor[]): GuideMeta => {
  const meta = (payload.meta ?? payload.metadata ?? {}) as Record<string, unknown>;
  const gridWidth = toNumber(meta.gridWidth ?? meta.grid_width ?? payload.gridWidth ?? payload.grid_width, 32);
  const gridHeight = toNumber(meta.gridHeight ?? meta.grid_height ?? payload.gridHeight ?? payload.grid_height, 32);
  const gridSizeLabel = String(meta.gridSize ?? meta.grid_size ?? payload.gridSize ?? payload.grid_size ?? "32x32");
  const colorLimit = toNumber(meta.colorLimit ?? meta.color_limit ?? payload.colorLimit ?? payload.color_limit, 0);
  const brickTypes = asArray<string>(meta.brickTypes ?? meta.brick_types ?? payload.brickTypes ?? payload.brick_types, ["plate"]);
  const brickCount = toNumber(meta.brickCount ?? meta.brick_count ?? payload.brickCount ?? payload.brick_count, bricks.length);
  const colorCount = toNumber(meta.colorCount ?? meta.color_count ?? payload.colorCount ?? payload.color_count, palette.length);

  return {
    gridWidth,
    gridHeight,
    gridSizeLabel,
    colorLimit,
    brickTypes: brickTypes.length > 0 ? (brickTypes as GuideMeta["brickTypes"]) : ["plate"],
    brickCount,
    colorCount
  };
};

const normalizeSteps = (steps: unknown): GuideStep[] => {
  const raw = asArray<Record<string, unknown>>(steps);
  return raw.map((step, index) => ({
    title: String(step.title ?? `Step ${index + 1}`),
    description: String(step.description ?? step.detail ?? "Place the next batch of bricks."),
    bricks: normalizeBricks(step.bricks)
  }));
};

export const normalizeGuideResponse = (payload: unknown): GuideResponse => {
  const safePayload = (payload ?? {}) as Record<string, unknown>;
  const palette = normalizePalette(safePayload.palette ?? safePayload.colors);
  const bricks = normalizeBricks(safePayload.bricks ?? safePayload.grid ?? safePayload.mosaic);
  const meta = normalizeMeta(safePayload, bricks, palette);
  const steps = normalizeSteps(safePayload.steps ?? safePayload.guideSteps);

  return {
    meta,
    palette,
    bricks: bricks.length > 0 ? bricks : buildFallbackBricks(meta.gridWidth, meta.gridHeight, palette),
    steps: steps.length > 0 ? steps : undefined
  };
};

const buildFallbackBricks = (width: number, height: number, palette: PaletteColor[]): BrickCell[] => {
  const bricks: BrickCell[] = [];
  const safePalette = palette.length > 0 ? palette : [{ id: "fallback", name: "Graphite", hex: "#2f2f2f" }];
  for (let y = 0; y < height; y += 1) {
    for (let x = 0; x < width; x += 1) {
      const color = safePalette[(x + y) % safePalette.length]?.hex ?? "#2f2f2f";
      bricks.push({ x, y, color });
    }
  }
  return bricks;
};
