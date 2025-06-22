import React from "react";
import { useLocation, useNavigate } from "react-router-dom";

export default function NewsDetail2() {
  const location = useLocation();
  const navigate = useNavigate();
  const article = location.state?.article;

  if (!article) {
    return (
      <div className="container py-4">
        <div className="d-flex justify-content-between mb-3">
          <button className="btn btn-outline-secondary" onClick={() => navigate("/altnews")}>
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
        <button className="btn btn-outline-secondary" onClick={() => navigate("/altnews")}>
          &larr; Back
        </button>
        <button className="btn btn-outline-danger" onClick={() => navigate("/")}>
          Sign out
        </button>
      </div>
      <div className="card shadow">
        {article.image_url && (
          <img
            src={article.image_url}
            alt={article.title}
            className="card-img-top"
            style={{ maxHeight: 350, objectFit: "cover" }}
          />
        )}
        <div className="card-body">
          <h3 className="card-title fw-bold" style={{ color: "#6610f2" }}>{article.title}</h3>
          <p className="card-text">{article.content || article.description}</p>
          {article.link && (
            <a href={article.link} target="_blank" rel="noopener noreferrer" className="btn btn-secondary mt-2">
              Read Full Article
            </a>
          )}
        </div>
      </div>
    </div>
  );
}