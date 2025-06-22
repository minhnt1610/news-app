import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import ArticleCard from "../Components/ArticleCard";
import { fetchTopHeadlines } from "../models/newsAPI";

export default function NewsList() {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const API_KEY = "b590b8fdb4eab9cbb391b5feb040141f";

  useEffect(() => {
    setLoading(true);
    setError("");
    fetchTopHeadlines(API_KEY)
      .then(setArticles)
      .catch(() => setError("Failed to load articles. Please try again."))
      .finally(() => setLoading(false));
  }, []);

  function openDetail(article) {
    navigate("/detail", { state: { article } });
  }

  return (
    <div className="container py-4">
      <div className="d-flex align-items-center justify-content-between mb-4">
        <div className="d-flex align-items-center">
          <h2 className="fw-bold mb-0" style={{ color: "#0d6efd", letterSpacing: 1 }}>Top Headlines</h2>
          <span className="ms-2 badge bg-primary-subtle text-primary">{articles.length}</span>
        </div>
        <button className="btn btn-outline-danger" onClick={() => navigate("/")}>
          Sign out
        </button>
      </div>
      {loading ? (
        <div className="d-flex justify-content-center align-items-center" style={{ minHeight: "60vh" }}>
          <div className="spinner-border text-primary me-2" role="status" />
          <span>Loading articles…</span>
        </div>
      ) : error ? (
        <div className="alert alert-danger text-center">{error}</div>
      ) : articles.length === 0 ? (
        <div className="alert alert-info text-center">No articles found.</div>
      ) : (
        <div className="row">
          {articles.map((article, idx) => (
            <div className="col-md-6 col-lg-4 mb-4" key={idx}>
              <div className="h-100">
                <ArticleCard article={article} onClick={openDetail} />
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}