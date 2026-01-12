import { NavLink, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Analyze from "./pages/Analyze";
import Gallery from "./pages/Gallery";
import GalleryDetail from "./pages/GalleryDetail";
import About from "./pages/About";
import ComingSoon from "./pages/ComingSoon";
import Login from "./pages/Login";
import Signup from "./pages/Signup";

const App = () => {
  return (
    <div className="app-shell">
      <header className="site-header">
        <nav className="site-nav left">
          <NavLink to="/" end>
            Home
          </NavLink>
          <NavLink to="/analyze">Analyze</NavLink>
          <NavLink to="/gallery">Gallery</NavLink>
        </nav>
        <NavLink className="brand" to="/">
          <span className="brand-mark">LDA</span>
          <div>
            <div className="brand-title">Lego Design Aid</div>
            <div className="brand-sub">Design-first mosaics for real builders.</div>
          </div>
        </NavLink>
        <nav className="site-nav right">
          <NavLink to="/about">About</NavLink>
          <NavLink to="/login">Login</NavLink>
        </nav>
      </header>
      <main className="site-main">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/analyze" element={<Analyze />} />
          <Route path="/gallery" element={<Gallery />} />
          <Route path="/gallery/:id" element={<GalleryDetail />} />
          <Route path="/about" element={<About />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/post" element={<ComingSoon title="Post" />} />
          <Route path="/mypage" element={<ComingSoon title="My Page" />} />
          <Route path="*" element={<ComingSoon title="Not Found" />} />
        </Routes>
      </main>
      <footer className="site-footer">
        <div>LDA · Personal R&D project · 2024</div>
        <div>Built for LEGO builders. React + FastAPI.</div>
      </footer>
    </div>
  );
};

export default App;
