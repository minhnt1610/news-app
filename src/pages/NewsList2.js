import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const API_URL = "https://newsdata.io/api/1/news?country=us&language=en&apikey=pub_8333aa654db24ccb8881a25fdfff1376";

export default function NewsList2() {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    setLoading(true);
    setError("");
    fetch(API_URL)
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data.results)) {
          setArticles(data.results);
        } else {
          setArticles([]);
        }
        setLoading(false);
      })
      .catch(() => {
        setError("Failed to load articles. Please try again.");
        setLoading(false);
      });
  }, []);

  function openDetail(article) {
    navigate("/altdetail", { state: { article } });
  }

  return (
    <div className="container py-4">
      <div className="d-flex align-items-center mb-4">
        <h2 className="fw-bold mb-0" style={{ color: "#6610f2", letterSpacing: 1 }}>NewsData Headlines</h2>
        <span className="ms-2 badge bg-secondary-subtle text-secondary">{articles.length}</span>
      </div>
      {loading ? (
        <div className="d-flex justify-content-center align-items-center" style={{ minHeight: "60vh" }}>
          <div className="spinner-border text-secondary me-2" role="status" />
          <span>Loading articles…</span>
        </div>
      ) : error ? (
        <div className="alert alert-danger text-center">{error}</div>
      ) : articles.length === 0 ? (
        <div className="alert alert-info text-center">No articles found.</div>
      ) : (
        <div className="row">
          {articles.map((article, idx) => (
            <div className="col-md-6 col-lg-4 mb-4" key={idx}>
              <div
                className="card h-100 shadow-sm"
                style={{ cursor: "pointer" }}
                onClick={() => openDetail(article)}
                tabIndex={0}
                title={article.title}
                onKeyPress={e => {
                  if (e.key === "Enter" || e.key === " ") openDetail(article);
                }}
              >
                {article.image_url && (
                  <img
                    src={article.image_url}
                    alt={article.title || "News image"}
                    className="card-img-top"
                    style={{ height: 180, objectFit: "cover" }}
                  />
                )}
                <div className="card-body">
                  <h5 className="card-title">{article.title}</h5>
                  <p className="card-text">{article.description || article.content}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}