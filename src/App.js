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
  return (
    <Router>
      <div>
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
