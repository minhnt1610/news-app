import React from "react";

export default function ArticleCard({ article, onClick }) {
  return (
    <div
      className="card h-100 shadow-sm"
      style={{ cursor: "pointer" }}
      onClick={() => onClick(article)}
    >
      {article.urlToImage && (
        <img
          src={article.urlToImage}
          alt={article.title}
          className="card-img-top"
          style={{ maxHeight: 180, objectFit: "cover" }}
        />
      )}
      <div className="card-body">
        <h5 className="card-title">{article.title}</h5>
        <p className="card-text" style={{ color: "#555" }}>
          {article.description}
        </p>
      </div>
    </div>
  );
}