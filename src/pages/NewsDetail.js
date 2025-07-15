import React from "react";
import { useLocation, useNavigate } from "react-router-dom";

export default function NewsDetail() {
  const location = useLocation();
  const navigate = useNavigate();
  const article = location.state?.article;

  const handleShare = async () => {
    if (navigator.share && article) {
      try {
        await navigator.share({
          title: article.title,
          text: article.description,
          url: article.url || window.location.href,
        });
      } catch (error) {
        console.log('Sharing failed:', error);
        // Fallback to clipboard
        handleCopyLink();
      }
    } else {
      handleCopyLink();
    }
  };

  const handleCopyLink = () => {
    const url = article?.url || window.location.href;
    navigator.clipboard.writeText(url).then(() => {
      alert('Link copied to clipboard!');
    }).catch(() => {
      alert('Unable to copy link');
    });
  };

  if (!article) {
    return (
      <div className="container py-4">
        <div className="d-flex justify-content-between mb-3">
          <button className="btn btn-outline-primary" onClick={() => navigate("/news")}>
            ← Back
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
          ← Back
        </button>
        <div className="d-flex gap-2">
          <button className="btn btn-outline-info btn-sm" onClick={handleShare}>
            📤 Share
          </button>
          <button className="btn btn-outline-danger" onClick={() => navigate("/")}>
            Sign out
          </button>
        </div>
      </div>
      <article className="card shadow">
        {article.urlToImage && (
          <img
            src={article.urlToImage}
            alt={article.title}
            className="card-img-top"
            style={{ maxHeight: 350, objectFit: "cover" }}
          />
        )}
        <div className="card-body">
          <h3 className="card-title fw-bold" style={{ color: "#0d6efd" }}>
            {article.title}
          </h3>
          {article.source?.name && (
            <small className="text-muted mb-2 d-block">
              Source: {article.source.name}
            </small>
          )}
          <p className="card-text fs-5 mb-3">{article.content || article.description}</p>
          {article.url && (
            <div className="d-flex gap-2">
              <a 
                href={article.url} 
                target="_blank" 
                rel="noopener noreferrer" 
                className="btn btn-primary"
              >
                📖 Read Full Article
              </a>
              <button className="btn btn-outline-secondary" onClick={handleShare}>
                📤 Share Article
              </button>
            </div>
          )}
        </div>
      </article>
    </div>
  );
}