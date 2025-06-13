import React from "react";
import { useLocation, useNavigate } from "react-router-dom";

export default function NewsDetail() {
  const location = useLocation();
  const navigate = useNavigate();
  const { article } = location.state || {}; // Use optional chaining to avoid errors


  if (!article) {
    return (
      <div style={{ padding: 20 }}>
        <h2>Article not found</h2>
        <button onClick={() => navigate("/news")} style={{ padding: 10 }}>
          Back to News List
        </button>
      </div>
    );
  
  }

  return (
    <div style={{ padding: 20 }}>
      {/* Back button */}
      <button onClick={() => navigate("/news")} style={{ marginBottom: 20 }}>
        ← Back
      </button>

      {/* Article content */}
      <h2>{article.title}</h2>
      {article.urlToImage && (
        <img
          src={article.urlToImage}
          alt={article.title}
          style={{ width: "100%", height: "auto", margin: "20px 0" }}
        />
      )}
      <p>{article.content || article.description}</p>
    </div>
  );
}