import React from "react";
import { useLocation, useNavigate } from "react-router-dom";

export default function NewsDetail2() {
  const location = useLocation();
  const navigate = useNavigate();
  const article = location.state?.article;

  if (!article) {
    return (
      <div className="container py-4">
        <div className="alert alert-warning text-center">Article not found.</div>
        <div className="text-center">
          <button className="btn btn-outline-secondary" onClick={() => navigate("/altnews")}>
            Back to NewsData
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="container py-4">
      <button className="btn btn-outline-secondary mb-3" onClick={() => navigate("/altnews")}>
        &larr; Back
      </button>
      <div className="card">
        {article.image_url && (
          <img
            src={article.image_url}
            alt={article.title}
            className="card-img-top"
            style={{ maxHeight: 350, objectFit: "cover" }}
          />
        )}
        <div className="card-body">
          <h3 className="card-title">{article.title}</h3>
          <p className="card-text">{article.content || article.description}</p>
          {article.link && (
            <a href={article.link} target="_blank" rel="noopener noreferrer" className="btn btn-primary">
              Read Full Article
            </a>
          )}
        </div>
      </div>
    </div>
  );
}