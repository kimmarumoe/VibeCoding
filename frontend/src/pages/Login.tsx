import { Link } from "react-router-dom";

const Login = () => {
  return (
    <div className="container">
      <section className="section">
        <div className="hero-card">
          <div className="pill">Welcome back</div>
          <h1 className="hero-title">LDA 계정으로 로그인</h1>
          <p className="hero-copy">설계도를 저장하고 커뮤니티 기능을 미리 경험하세요.</p>
          <div className="hero-shape orange" />
          <div className="hero-shape cream" />
        </div>
      </section>

      <section className="section">
        <div className="auth-shell">
          <div className="auth-card">
            <h3 className="section-title">이메일 로그인</h3>
            <form>
              <input type="email" placeholder="Email" />
              <input type="password" placeholder="Password" />
              <button className="btn" type="button">
                로그인
              </button>
            </form>
            <div className="subtle" style={{ marginTop: "12px" }}>
              아직 계정이 없나요? <Link to="/signup">회원가입</Link>
            </div>
          </div>

          <div className="auth-card">
            <h3 className="section-title">소셜 로그인</h3>
            <div className="social-grid">
              <button className="social-btn" type="button">
                Kakao
                <span className="subtle">준비 중</span>
              </button>
              <button className="social-btn" type="button">
                Google
                <span className="subtle">준비 중</span>
              </button>
              <button className="social-btn" type="button">
                GitHub
                <span className="subtle">준비 중</span>
              </button>
            </div>
            <div className="auth-divider" style={{ margin: "18px 0" }}>
              or
            </div>
            <p className="subtle">
              현재는 프론트 전용 UI입니다. 실제 OAuth 연동은 다음 단계에서 진행합니다.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Login;
