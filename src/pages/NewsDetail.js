import React from "react";
import { useLocation, useNavigate } from "react-router-dom";

export default function NewsDetail() {
  const location = useLocation();
  const navigate = useNavigate();
  const { article } = location.state || {};

  if (!article) {
    return (
      <div className="container py-4">
        <div className="alert alert-warning text-center">
          <h2>Article not found</h2>
          <button className="btn btn-primary mt-3" onClick={() => navigate("/news")}>
            Back to News List
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="container py-4">
      <button className="btn btn-link mb-3" onClick={() => navigate("/news")}>
        &larr; Back
      </button>
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
          <h2 className="card-title">{article.title}</h2>
          <p className="card-text">{article.content || article.description}</p>
        </div>
      </div>
    </div>
  );
}