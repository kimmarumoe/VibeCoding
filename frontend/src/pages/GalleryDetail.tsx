import { Link, useParams } from "react-router-dom";
import { gallerySamples } from "../data/gallerySamples";

const GalleryDetail = () => {
  const { id } = useParams();
  const sample = gallerySamples.find((item) => item.id === id);

  if (!sample) {
    return (
      <div className="card">
        <div className="section-title">샘플을 찾을 수 없습니다.</div>
        <Link className="btn secondary" to="/gallery">
          돌아가기
        </Link>
      </div>
    );
  }

  return (
    <div>
      <div className="section-title">{sample.title}</div>
      <p className="subtle">원본과 모자이크를 비교하고 팔레트 정보를 확인하세요.</p>
      <div className="compare">
        <div className="card">
          <div className="subtle">Original</div>
          <img src={sample.original} alt={`${sample.title} original`} style={{ width: "100%", borderRadius: "16px" }} />
        </div>
        <div className="card">
          <div className="subtle">Mosaic</div>
          <img src={sample.mosaic} alt={`${sample.title} mosaic`} style={{ width: "100%", borderRadius: "16px" }} />
        </div>
      </div>

      <div className="grid-2" style={{ marginTop: "20px" }}>
        <div className="card">
          <div className="section-title">Palette</div>
          <div className="palette">
            {sample.palette.map((color) => (
              <div className="palette-swatch" key={color.hex}>
                <div className="palette-color" style={{ background: color.hex }} />
                <div>{color.name}</div>
                <div className="subtle">{color.hex}</div>
              </div>
            ))}
          </div>
        </div>
        <div className="card">
          <div className="section-title">Spec</div>
          <div className="summary-grid">
            <div className="summary-item">
              <div className="subtle">Grid size</div>
              <strong>{sample.gridSize}</strong>
            </div>
            <div className="summary-item">
              <div className="subtle">Color limit</div>
              <strong>{sample.colorLimit}</strong>
            </div>
            <div className="summary-item">
              <div className="subtle">Brick count</div>
              <strong>{sample.brickCount}</strong>
            </div>
            <div className="summary-item">
              <div className="subtle">Brick types</div>
              <strong>{sample.brickTypes.join(", ")}</strong>
            </div>
          </div>
          {sample.stepsSummary && (
            <div style={{ marginTop: "16px" }}>
              <div className="section-title">Steps summary</div>
              {sample.stepsSummary.map((step) => (
                <div className="badge" key={step}>
                  {step}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      <div style={{ marginTop: "20px" }}>
        <Link className="btn secondary" to="/gallery">
          갤러리로 돌아가기
        </Link>
      </div>
    </div>
  );
};

export default GalleryDetail;
