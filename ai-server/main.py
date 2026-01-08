from __future__ import annotations

from typing import List, Optional
from fastapi import FastAPI, File, Form, UploadFile
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel

app = FastAPI(title="LDA API", version="0.1.0")

app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:5173",
        "http://localhost:3000",
    ],
    allow_origin_regex=r"https://.*\.vercel\.app",
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


class PaletteColor(BaseModel):
    id: str
    name: str
    hex: str


class BrickCell(BaseModel):
    x: int
    y: int
    color: str


class GuideMeta(BaseModel):
    gridWidth: int
    gridHeight: int
    gridSizeLabel: str
    colorLimit: int
    brickTypes: List[str]
    brickCount: int
    colorCount: int


class GuideStep(BaseModel):
    title: str
    description: str
    bricks: List[BrickCell]


class GuideResponse(BaseModel):
    meta: GuideMeta
    palette: List[PaletteColor]
    bricks: List[BrickCell]
    steps: Optional[List[GuideStep]] = None


@app.get("/health")
async def health_check() -> dict:
    return {"status": "ok"}


def _parse_grid(grid_size: str) -> tuple[int, int]:
    try:
        width, height = grid_size.lower().split("x")
        return int(width), int(height)
    except ValueError:
        return 32, 32


def _build_palette(color_limit: int) -> List[PaletteColor]:
    base = [
        ("graphite", "Graphite", "#2F2F2F"),
        ("sunflower", "Sunflower", "#F2C94C"),
        ("coral", "Coral", "#FF6F61"),
        ("sky", "Sky", "#78C0E0"),
        ("sage", "Sage", "#8FB996"),
        ("plum", "Plum", "#7C6C77"),
        ("stone", "Stone", "#B8B5AF"),
        ("ocean", "Ocean", "#35627A"),
    ]
    if color_limit and color_limit > 0:
        base = base[: min(color_limit, len(base))]
    return [PaletteColor(id=item[0], name=item[1], hex=item[2]) for item in base]


def _build_bricks(width: int, height: int, palette: List[PaletteColor]) -> List[BrickCell]:
    bricks: List[BrickCell] = []
    for y in range(height):
        for x in range(width):
            color = palette[(x + y) % len(palette)].hex
            bricks.append(BrickCell(x=x, y=y, color=color))
    return bricks


def _build_steps(bricks: List[BrickCell], height: int) -> List[GuideStep]:
    step_count = 4
    rows_per_step = max(1, height // step_count)
    steps: List[GuideStep] = []
    for index in range(step_count):
        row_start = index * rows_per_step
        row_end = height if index == step_count - 1 else (index + 1) * rows_per_step
        step_bricks = [brick for brick in bricks if row_start <= brick.y < row_end]
        steps.append(
            GuideStep(
                title=f"Step {index + 1}",
                description="Place the next batch of bricks following the mosaic pattern.",
                bricks=step_bricks,
            )
        )
    return steps


@app.post("/api/guide/analyze", response_model=GuideResponse)
async def analyze_guide(
    image: UploadFile = File(...),
    grid_size: str = Form("32x32"),
    color_limit: int = Form(0),
    brick_types: List[str] = Form(["plate"]),
    generate_steps: bool = Form(False),
) -> GuideResponse:
    _ = image
    width, height = _parse_grid(grid_size)
    palette = _build_palette(color_limit)
    bricks = _build_bricks(width, height, palette)
    meta = GuideMeta(
        gridWidth=width,
        gridHeight=height,
        gridSizeLabel=grid_size,
        colorLimit=color_limit,
        brickTypes=brick_types or ["plate"],
        brickCount=len(bricks),
        colorCount=len(palette),
    )
    steps = _build_steps(bricks, height) if generate_steps else None
    return GuideResponse(meta=meta, palette=palette, bricks=bricks, steps=steps)
