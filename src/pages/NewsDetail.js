import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { formatNewsDate } from "../utils/dateFormatter";

export default function NewsDetail() {
  const location = useLocation();
  const navigate = useNavigate();
  const article = location.state?.article;

  if (!article) {
    return (
      <div className="container py-4">
        <div className="d-flex justify-content-between mb-3">
          <button className="btn btn-outline-primary" onClick={() => navigate("/news")}>
            &larr; Back
          </button>
          <button className="btn btn-outline-danger" onClick={() => navigate("/")}>
            Sign out
          </button>
        </div>
        <div className="alert alert-warning text-center">Article not found.</div>
      </div>
    );
  }

  return (
    <div className="container py-4">
      <div className="d-flex justify-content-between mb-3">
        <button className="btn btn-outline-primary" onClick={() => navigate("/news")}>
          &larr; Back
        </button>
        <button className="btn btn-outline-danger" onClick={() => navigate("/")}>
          Sign out
        </button>
      </div>
      <div className="card shadow">
        {article.urlToImage && (
          <img
            src={article.urlToImage}
            alt={article.title}
            className="card-img-top"
            style={{ maxHeight: 350, objectFit: "cover" }}
          />
        )}
        <div className="card-body">
          <h3 className="card-title fw-bold" style={{ color: "#0d6efd" }}>{article.title}</h3>
          {article.publishedAt && (
            <p className="text-muted mb-3">
              <small>Published {formatNewsDate(article.publishedAt)}</small>
            </p>
          )}
          <p className="card-text">{article.content || article.description}</p>
          {article.url && (
            <a href={article.url} target="_blank" rel="noopener noreferrer" className="btn btn-primary mt-2">
              Read Full Article
            </a>
          )}
        </div>
      </div>
    </div>
  );
}