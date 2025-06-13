import React from "react";

export default function ArticleCard({ article, onClick }) {
  return (
    <div
      onClick={() => onClick(article)}
      style={{
        border: "1px solid #ccc",
        borderRadius: 5,
        padding: 10,
        marginBottom: 10,
        cursor: "pointer",
      }}
    >
      <h3>{article.title}</h3>
      {article.urlToImage && (
        <img
          src={article.urlToImage}
          alt={article.title}
          style={{ width: "100%", height: "auto" }}
        />
      )}
      <p>{article.description}</p>
    </div>
  );
}