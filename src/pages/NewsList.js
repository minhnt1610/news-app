import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import ArticleCard from "../Components/ArticleCard";
import { fetchTopHeadlines } from "../models/newsAPI";

export default function NewsList() {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const API_KEY = "b590b8fdb4eab9cbb391b5feb040141f"; // <--- Replace with your real API key

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

  if (loading) {
    return (
      <div className="d-flex justify-content-center align-items-center" style={{ minHeight: "60vh" }}>
        <div className="spinner-border text-primary me-2" role="status" />
        <span>Loading articles…</span>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container py-4">
        <div className="alert alert-danger text-center">{error}</div>
        <div className="text-center">
          <button className="btn btn-outline-primary" onClick={() => window.location.reload()}>
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="container py-4">
      <h2 className="mb-4">Top Headlines</h2>
      {articles.length === 0 ? (
        <div className="alert alert-info text-center">No articles found.</div>
      ) : (
        <div className="row">
          {articles.map((article, idx) => (
            <div className="col-md-6 col-lg-4 mb-4" key={idx}>
              <ArticleCard article={article} onClick={openDetail} />
            </div>
          ))}
        </div>
      )}
    </div>
  );
}