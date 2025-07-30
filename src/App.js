// Refactored App.js with bottom tab navigation using React Router
import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate, Link, useLocation } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import Login from "./pages/Login";
import NewsList from "./pages/NewsList";
import NewsDetail from "./pages/NewsDetail";
import NewsList2 from "./pages/NewsList2";
import NewsDetail2 from "./pages/NewsDetail2";
import ErrorBoundary from "./Components/ErrorBoundary";
import BackToTop from "./Components/BackToTop";
import SettingsModal from "./Components/SettingsModal";

function TabBar() {
  const location = useLocation();
  const isGNews = location.pathname.startsWith("/news") || location.pathname.startsWith("/detail");
  const isNewsData = location.pathname.startsWith("/altnews") || location.pathname.startsWith("/altdetail");

  if (!isGNews && !isNewsData) return null;

  return (
    <nav className="navbar fixed-bottom bg-light border-top justify-content-around">
      <Link
        to="/news"
        className={`btn ${isGNews ? "btn-primary" : "btn-outline-primary"}`}
      >
        GNews
      </Link>
      <Link
        to="/altnews"
        className={`btn ${isNewsData ? "btn-secondary" : "btn-outline-secondary"}`}
      >
        NewsData
      </Link>
    </nav>
  );
}

function App() {
  const [showSettings, setShowSettings] = React.useState(false);
  const [settings, setSettings] = React.useState(() => {
    const saved = localStorage.getItem("newsAppSettings");
    return saved ? JSON.parse(saved) : { language: "en", theme: "light", fontSize: "medium" };
  });

  React.useEffect(() => {
    document.body.setAttribute("data-theme", settings.theme);
    document.body.style.fontSize = settings.fontSize === "small" ? "15px" : settings.fontSize === "large" ? "19px" : "17px";
    localStorage.setItem("newsAppSettings", JSON.stringify(settings));
  }, [settings]);

  return (
    <Router>
      <div>
        {/* Settings button in top right */}
        <button
          onClick={() => setShowSettings(true)}
          style={{
            position: "fixed",
            top: 18,
            right: 18,
            zIndex: 2001,
            background: "#fff",
            border: "1.5px solid #ddd",
            borderRadius: 24,
            padding: "8px 13px",
            boxShadow: "0 2px 8px rgba(0,0,0,0.10)",
            cursor: "pointer",
            fontSize: 22,
            color: "#555"
          }}
          aria-label="Settings"
        >
          <span role="img" aria-label="settings">⚙️</span>
        </button>

        <SettingsModal
          show={showSettings}
          onClose={() => setShowSettings(false)}
          settings={settings}
          onChange={setSettings}
        />

        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/news" element={
            <ErrorBoundary>
              <NewsList />
            </ErrorBoundary>
          } />
          <Route path="/detail" element={
            <ErrorBoundary>
              <NewsDetail />
            </ErrorBoundary>
          } />
          <Route path="/altnews" element={
            <ErrorBoundary>
              <NewsList2 />
            </ErrorBoundary>
          } />
          <Route path="/altdetail" element={
            <ErrorBoundary>
              <NewsDetail2 />
            </ErrorBoundary>
          } />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>

        <TabBar />
        <BackToTop />
      </div>
    </Router>
  );
}

export default App;
