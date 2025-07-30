
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
const API_URL = "https://newsdata.io/api/1/news?country=us&language=en&apikey=pub_8333aa654db24ccb8881a25fdfff1376";

export default function NewsList2() {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchArticles = async () => {
      try {
        setLoading(true);
        setError("");

        if (!API_URL) {
          throw new Error('API URL is not configured');
        }

        const res = await fetch(API_URL);

        if (!res.ok) {
          const errorBody = await res.text().catch(() => 'Unknown error');
          switch (res.status) {
            case 401:
              throw new Error('Invalid API key or unauthorized access');
            case 403:
              throw new Error('API access forbidden. Check your API key permissions');
            case 404:
              throw new Error('API endpoint not found');
            case 429:
              throw new Error('API rate limit exceeded. Please try again later');
            case 500:
              throw new Error('Internal server error. Please try again later');
            default:
              throw new Error(`Network error: ${res.status} - ${errorBody}`);
          }
        }

        const data = await res.json();
        if (!data || typeof data !== 'object') {
          throw new Error('Invalid response format from API');
        }
        if (Array.isArray(data.results)) {
          setArticles(data.results);
        } else if (data.results === null || data.results === undefined) {
          setArticles([]);
        } else {
          throw new Error('Invalid response format: results should be an array or null');
        }
      } catch (error) {
        console.error('Error loading articles:', {
          error: error.message,
          url: API_URL,
          timestamp: new Date().toISOString()
        });
        if (error.message.includes('API key')) {
          setError('Configuration error: Please check API key settings');
        } else if (error.message.includes('Network')) {
          setError('Network error: Please check your internet connection and try again');
        } else if (error.message.includes('rate limit')) {
          setError('Too many requests: Please wait a moment and try again');
        } else if (error.message.includes('unauthorized') || error.message.includes('forbidden')) {
          setError('Authentication error: Please check your API credentials');
        } else if (error.message.includes('not found')) {
          setError('Service unavailable: News API endpoint not found');
        } else {
          setError('Failed to load articles. Please try again later.');
        }
      } finally {
        setLoading(false);
      }
    };
    fetchArticles().catch((error) => {
      console.error('Uncaught error in fetchArticles:', error);
      setError('An unexpected error occurred. Please refresh the page.');
      setLoading(false);
    });
  }, []);

  function openDetail(article) {
    navigate("/altdetail", { state: { article } });
  }

  return (
    <div className="container py-4">
      <div className="d-flex align-items-center justify-content-between mb-4">
        <div className="d-flex align-items-center">
          <h2 className="fw-bold mb-0" style={{ color: "#6610f2", letterSpacing: 1 }}>NewsData Headlines</h2>
          <span className="ms-2 badge bg-secondary-subtle text-secondary">{articles.length}</span>
        </div>
        <button className="btn btn-outline-danger" onClick={() => navigate("/")}>Sign out</button>
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