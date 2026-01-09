import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { gallerySamples } from "../data/gallerySamples";

const gridOptions = ["all", "16x16", "32x32", "48x48"] as const;
const colorOptions = ["all", 0, 8, 16, 24] as const;

const Gallery = () => {
  const [gridFilter, setGridFilter] = useState<(typeof gridOptions)[number]>("all");
  const [colorFilter, setColorFilter] = useState<(typeof colorOptions)[number]>("all");

  const filtered = useMemo(() => {
    return gallerySamples.filter((sample) => {
      const gridOk = gridFilter === "all" || sample.gridSize === gridFilter;
      const colorOk = colorFilter === "all" || sample.colorLimit === colorFilter;
      return gridOk && colorOk;
    });
  }, [gridFilter, colorFilter]);

  return (
    <div className="container">
      <section className="section">
        <div className="hero-panel">
          <div className="pill">Gallery · Preview</div>
          <div className="section-title">Gallery</div>
          <p className="subtle">실제 결과 형태를 먼저 확인하고 분석 페이지로 이동하세요.</p>
        </div>
      </section>

      <section className="section">
        <div className="card" style={{ marginBottom: "18px" }}>
          <div className="option-row">
            {gridOptions.map((option) => (
              <button
                key={option}
                className={`chip ${gridFilter === option ? "active" : ""}`}
                type="button"
                onClick={() => setGridFilter(option)}
              >
                {option === "all" ? "All grids" : option}
              </button>
            ))}
          </div>
          <div className="option-row" style={{ marginTop: "10px" }}>
            {colorOptions.map((option) => (
              <button
                key={option}
                className={`chip ${colorFilter === option ? "active" : ""}`}
                type="button"
                onClick={() => setColorFilter(option)}
              >
                {option === "all" ? "All colors" : `${option} colors`}
              </button>
            ))}
          </div>
        </div>

        <div className="gallery-grid">
          {filtered.map((sample) => (
            <Link className="gallery-card" key={sample.id} to={`/gallery/${sample.id}`}>
              <div style={{ display: "grid", gap: "8px" }}>
                <img src={sample.original} alt={`${sample.title} original`} style={{ width: "100%", borderRadius: "16px" }} />
                <img src={sample.mosaic} alt={`${sample.title} mosaic`} style={{ width: "100%", borderRadius: "16px" }} />
              </div>
              <div>
                <strong>{sample.title}</strong>
                <div className="subtle">{sample.gridSize} · {sample.colorLimit} colors</div>
                <div className="subtle">{sample.brickCount} bricks</div>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
};

export default Gallery;
