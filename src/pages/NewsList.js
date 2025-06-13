import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import ArticleCard from "../Components/ArticleCard";

export default function NewsList() {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const API_KEY = "652fc01bbc1340f1aad381b1f81ef87b"; // ← replace with your key

  useEffect(() => {
    setLoading(true);
    setError("");
    fetch(`https://newsapi.org/v2/top-headlines?country=us&apiKey=${API_KEY}`)
      .then((res) => {
        if (!res.ok) throw new Error(`Network response was ${res.status}`);
        return res.json();
      })
      .then((data) => setArticles(data.articles || []))
      .catch((err) => {
        console.error(err);
        setError("Failed to load articles. Please try again.");
      })
      .finally(() => setLoading(false));
  }, []);

  // Pass the article object directly to the detail page
  function openDetail(article) {
    navigate("/detail", { state: { article } });
  }

  if (loading) {
    return (
      <div style={{ padding: 20 }}>
        <span
          style={{
            display: "inline-block",
            width: 24,
            height: 24,
            border: "3px solid #ccc",
            borderTop: "3px solid #333",
            borderRadius: "50%",
            animation: "spin 1s linear infinite",
            marginRight: 8,
            verticalAlign: "middle",
          }}
        />
        Loading articles…
        <style>
          {`
            @keyframes spin {
              0% { transform: rotate(0deg);}
              100% { transform: rotate(360deg);}
            }
          `}
        </style>
      </div>
    );
  }

  if (error) {
    return (
      <div style={{ padding: 20, color: "red" }}>
        <p>{error}</p>
        <button onClick={() => window.location.reload()}>Try Again</button>
      </div>
    );
  }

  return (
    <div style={{ padding: 20 }}>
      <h2>Top Headlines</h2>
      {articles.length === 0 ? (
        <p>No articles found.</p>
      ) : (
        articles.map((article, idx) => (
          <ArticleCard
            key={idx}
            article={article}
            onClick={openDetail}
          />
        ))
      )}
    </div>
  );
}