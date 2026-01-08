export type BrickType = "plate" | "tile" | "round" | "slope";

export type GuideMeta = {
  gridWidth: number;
  gridHeight: number;
  gridSizeLabel: string;
  colorLimit: number;
  brickTypes: BrickType[];
  brickCount: number;
  colorCount: number;
};

export type PaletteColor = {
  id: string;
  name: string;
  hex: string;
};

export type BrickCell = {
  x: number;
  y: number;
  color: string;
};

export type GuideResponse = {
  meta: GuideMeta;
  palette: PaletteColor[];
  bricks: BrickCell[];
  steps?: GuideStep[];
};

export type GuideStep = {
  title: string;
  description: string;
  bricks: BrickCell[];
};

export type GuideRequestOptions = {
  gridSize: "16x16" | "32x32" | "48x48";
  colorLimit: 0 | 8 | 16 | 24;
  brickTypes: BrickType[];
};

export type GuideError = {
  message: string;
  status?: number;
  isTimeout?: boolean;
  isColdStart?: boolean;
};
