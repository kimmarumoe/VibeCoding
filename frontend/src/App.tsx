import { NavLink, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Analyze from "./pages/Analyze";
import Gallery from "./pages/Gallery";
import GalleryDetail from "./pages/GalleryDetail";
import About from "./pages/About";
import ComingSoon from "./pages/ComingSoon";

const App = () => {
  return (
    <div className="app-shell">
      <header className="site-header">
        <div className="brand">
          <span className="brand-mark">LDA</span>
          <div>
            <div className="brand-title">Lego Design Aid</div>
            <div className="brand-sub">Practical mosaic planning, not just pretty pixels.</div>
          </div>
        </div>
        <nav className="site-nav">
          <NavLink to="/" end>
            Home
          </NavLink>
          <NavLink to="/analyze">Analyze</NavLink>
          <NavLink to="/gallery">Gallery</NavLink>
          <NavLink to="/about">About</NavLink>
        </nav>
      </header>
      <main className="site-main">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/analyze" element={<Analyze />} />
          <Route path="/gallery" element={<Gallery />} />
          <Route path="/gallery/:id" element={<GalleryDetail />} />
          <Route path="/about" element={<About />} />
          <Route path="/post" element={<ComingSoon title="Post" />} />
          <Route path="/mypage" element={<ComingSoon title="My Page" />} />
          <Route path="*" element={<ComingSoon title="Not Found" />} />
        </Routes>
      </main>
      <footer className="site-footer">
        <div>LDA · Personal R&D project · 2024</div>
        <div>Rendered for builders first. Powered by React + FastAPI.</div>
      </footer>
    </div>
  );
};

export default App;
