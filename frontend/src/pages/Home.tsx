import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div>
      <section className="hero">
        <div>
          <h1 className="hero-title">이미지를 실제 레고 모자이크 설계도로 변환합니다.</h1>
          <p className="hero-copy">
            LDA는 “보기 좋은 결과”보다 <strong>실제로 조립 가능한 설계</strong>를 우선합니다. 팔레트,
            격자, 브릭 수량을 먼저 제공하고 필요할 때만 조립 단계까지 확장합니다.
          </p>
          <div className="hero-cta">
            <Link className="btn" to="/analyze">
              이미지 분석 시작하기
            </Link>
            <Link className="btn secondary" to="/gallery">
              샘플 결과 구경하기
            </Link>
          </div>
          <p className="subtle" style={{ marginTop: "16px" }}>
            개인 연구/포트폴리오 목적의 프로젝트입니다. 첫 분석은 서버 준비로 지연될 수 있으며 자동
            안내 및 재시도를 제공합니다.
          </p>
        </div>
        <div className="card">
          <div className="section-title">3-step flow</div>
          <div className="summary-grid">
            <div className="summary-item">
              <strong>1. 업로드 + 옵션</strong>
              <div className="subtle">그리드 크기, 색상 제한, 브릭 타입 선택</div>
            </div>
            <div className="summary-item">
              <strong>2. 분석 결과 확인</strong>
              <div className="subtle">요약, 팔레트, 모자이크 프리뷰</div>
            </div>
            <div className="summary-item">
              <strong>3. 조립 가이드 생성</strong>
              <div className="subtle">원할 때만 단계별 조립 안내</div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
