import { BrickType, GuideRequestOptions } from "../types/guide";

const GRID_OPTIONS: GuideRequestOptions["gridSize"][] = ["16x16", "32x32", "48x48"];
const COLOR_OPTIONS: GuideRequestOptions["colorLimit"][] = [0, 8, 16, 24];
const BRICK_OPTIONS: BrickType[] = ["plate", "tile", "round", "slope"];

type AnalysisOptionsPanelProps = {
  options: GuideRequestOptions;
  onChange: (options: GuideRequestOptions) => void;
};

const AnalysisOptionsPanel = ({ options, onChange }: AnalysisOptionsPanelProps) => {
  const toggleBrickType = (type: BrickType) => {
    const next = options.brickTypes.includes(type)
      ? options.brickTypes.filter((item) => item !== type)
      : [...options.brickTypes, type];

    onChange({ ...options, brickTypes: next.length > 0 ? next : options.brickTypes });
  };

  return (
    <div className="card">
      <div className="step-label">Step 01 · Options</div>
      <h3 className="section-title">분석 옵션</h3>
      <div className="option-group">
        <div>
          <div className="subtle">Grid size</div>
          <div className="option-row">
            {GRID_OPTIONS.map((size) => (
              <button
                className={`chip ${options.gridSize === size ? "active" : ""}`}
                key={size}
                type="button"
                onClick={() => onChange({ ...options, gridSize: size })}
              >
                {size}
              </button>
            ))}
          </div>
        </div>
        <div>
          <div className="subtle">Color limit</div>
          <div className="option-row">
            {COLOR_OPTIONS.map((limit) => (
              <button
                className={`chip ${options.colorLimit === limit ? "active" : ""}`}
                key={limit}
                type="button"
                onClick={() => onChange({ ...options, colorLimit: limit })}
              >
                {limit === 0 ? "No limit" : `${limit} colors`}
              </button>
            ))}
          </div>
        </div>
        <div>
          <div className="subtle">Brick types</div>
          <div className="option-row">
            {BRICK_OPTIONS.map((type) => (
              <button
                className={`chip ${options.brickTypes.includes(type) ? "active" : ""}`}
                key={type}
                type="button"
                onClick={() => toggleBrickType(type)}
              >
                {type}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AnalysisOptionsPanel;
