import { GuideStep } from "../types/guide";

const BrickGuidePanel = ({ steps }: { steps: GuideStep[] }) => {
  return (
    <div className="card">
      <div className="step-label">Step 02 · Build guide</div>
      <h3 className="section-title">조립 가이드</h3>
      {steps.map((step, index) => (
        <div key={`${step.title}-${index}`} style={{ marginBottom: "16px" }}>
          <div className="badge">{step.title}</div>
          <p>{step.description}</p>
          <div className="subtle">{step.bricks.length} bricks placed in this step.</div>
        </div>
      ))}
    </div>
  );
};

export default BrickGuidePanel;
