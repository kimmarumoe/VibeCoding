import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div className="container">
      <section className="hero section">
        <div>
          <div className="pill">Design + Build · LDA</div>
          <h1 className="hero-title">이미지를 실제 레고 모자이크 설계도로 전환합니다.</h1>
          <p className="hero-copy">
            LDA는 “보기 좋은 결과”보다 <strong>실제로 조립 가능한 설계</strong>를 우선합니다. 팔레트,
            격자, 브릭 수량을 먼저 제공하고 필요할 때만 조립 단계까지 확장합니다.
          </p>
          <div className="hero-cta">
            <Link className="btn accent" to="/analyze">
              이미지 분석 시작하기
            </Link>
            <Link className="btn secondary" to="/gallery">
              샘플 결과 구경하기
            </Link>
          </div>
          <div className="kakao-strip" style={{ marginTop: "18px" }}>
            <strong>콜드스타트 안내</strong>
            <span className="subtle">첫 분석은 서버 준비로 지연될 수 있으며 자동 안내 및 재시도를 제공합니다.</span>
          </div>
        </div>
        <div className="hero-panel">
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
          <div className="hero-visual" style={{ marginTop: "18px" }}>
            <div className="visual-tile">
              <div className="stat">32 x 32</div>
              <div>최적 격자 크기 추천</div>
            </div>
            <div className="visual-tile light">
              <div className="stat">16</div>
              <div>안정적인 팔레트 컬러 수</div>
            </div>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="grid-3">
          <div className="story-card">
            <div className="step-label">Principle 01</div>
            <h3 className="section-title">Buildable First</h3>
            <p className="subtle">설계도가 실제 조립 가능해야 한다는 기준을 우선합니다.</p>
          </div>
          <div className="story-card">
            <div className="step-label">Principle 02</div>
            <h3 className="section-title">Progressive Disclosure</h3>
            <p className="subtle">STEP 01에서 핵심 설계를 확인하고, STEP 02는 필요할 때만 확장합니다.</p>
          </div>
          <div className="story-card">
            <div className="step-label">Principle 03</div>
            <h3 className="section-title">Palette Discipline</h3>
            <p className="subtle">제한된 색상과 브릭 타입으로 현실적인 조립 경험을 설계합니다.</p>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="grid-2">
          <div className="card">
            <div className="section-title">커뮤니티로 확장되는 LDA</div>
            <p className="subtle">
              V2에서는 설계도를 공유하고 피드백을 나누는 레고 커뮤니티로 확장합니다. 팀 빌드, 컬러 제한
              챌린지, 인기 설계도 투표까지 한 곳에서 진행합니다.
            </p>
            <div style={{ marginTop: "12px" }}>
              <span className="badge">Community V2</span>
              <span className="badge" style={{ marginLeft: "8px" }}>Creator Hub</span>
              <span className="badge" style={{ marginLeft: "8px" }}>Build Challenges</span>
            </div>
          </div>
          <div className="card">
            <div className="section-title">V2 로드맵 스냅샷</div>
            <div className="timeline">
              <div className="timeline-item">
                <strong>V1</strong>
                <div>
                  <div>정밀 팔레트 매칭 + 브릭 리스트 정확도 개선</div>
                  <div className="subtle">분석 결과 신뢰도 강화</div>
                </div>
              </div>
              <div className="timeline-item">
                <strong>V1.5</strong>
                <div>
                  <div>설계도 프린트 + 프로젝트 보관함</div>
                  <div className="subtle">개인 제작 히스토리 관리</div>
                </div>
              </div>
              <div className="timeline-item">
                <strong>V2</strong>
                <div>
                  <div>커뮤니티 피드 + 협업 빌드</div>
                  <div className="subtle">공유, 피드백, 협업 기능</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
