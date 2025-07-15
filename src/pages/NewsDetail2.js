import React from "react";
import { useLocation, useNavigate } from "react-router-dom";

export default function NewsDetail2() {
  const location = useLocation();
  const navigate = useNavigate();
  const article = location.state?.article;

  const handleShare = async () => {
    if (navigator.share && article) {
      try {
        await navigator.share({
          title: article.title,
          text: article.description,
          url: article.link || window.location.href,
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
    const url = article?.link || window.location.href;
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
          <button className="btn btn-outline-secondary" onClick={() => navigate("/altnews")}>
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
        <button className="btn btn-outline-secondary" onClick={() => navigate("/altnews")}>
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
        {article.image_url && (
          <img
            src={article.image_url}
            alt={article.title}
            className="card-img-top"
            style={{ maxHeight: 350, objectFit: "cover" }}
          />
        )}
        <div className="card-body">
          <h3 className="card-title fw-bold" style={{ color: "#6610f2" }}>
            {article.title}
          </h3>
          {article.source_id && (
            <small className="text-muted mb-2 d-block">
              Source: {article.source_id}
            </small>
          )}
          <p className="card-text fs-5 mb-3">{article.content || article.description}</p>
          {article.link && (
            <div className="d-flex gap-2">
              <a 
                href={article.link} 
                target="_blank" 
                rel="noopener noreferrer" 
                className="btn btn-secondary"
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