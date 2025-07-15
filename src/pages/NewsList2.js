import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { fetchNewsData } from "../models/newsAPI";
import { APP_CONFIG } from "../utils/constants";

export default function NewsList2() {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const navigate = useNavigate();
  const ARTICLES_PER_PAGE = APP_CONFIG.PAGINATION.DEFAULT_PAGE_SIZE;

  useEffect(() => {
    // Use async function with comprehensive error handling
    const fetchArticles = async () => {
      try {
        setLoading(true);
        setError("");

        const results = await fetchNewsData();
        
        if (Array.isArray(results)) {
          setArticles(results);
        } else {
          setArticles([]);
        }
        
      } catch (error) {
        // Enhanced error logging with context
        console.error('Error loading articles:', {
          error: error.message,
          timestamp: new Date().toISOString()
        });
        
        // Provide user-friendly error messages based on error type
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

    // Call the async function and handle any uncaught errors
    fetchArticles().catch((error) => {
      console.error('Uncaught error in fetchArticles:', error);
      setError('An unexpected error occurred. Please refresh the page.');
      setLoading(false);
    });
  }, []);

  function openDetail(article) {
    navigate("/altdetail", { state: { article } });
  }

  const totalPages = Math.ceil(articles.length / ARTICLES_PER_PAGE);
  const startIndex = (currentPage - 1) * ARTICLES_PER_PAGE;
  const endIndex = startIndex + ARTICLES_PER_PAGE;
  const currentArticles = articles.slice(startIndex, endIndex);

  const handlePrevious = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleNext = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  return (
    <div className="container py-4">
      <div className="d-flex align-items-center justify-content-between mb-4">
        <div className="d-flex align-items-center">
          <h2 className="fw-bold mb-0" style={{ color: "#6610f2", letterSpacing: 1 }}>NewsData Headlines</h2>
          <span className="ms-2 badge bg-secondary-subtle text-secondary">{articles.length}</span>
        </div>
        <button className="btn btn-outline-danger" onClick={() => navigate("/")}>
          Sign out
        </button>
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
        <>
          <div className="row">
            {currentArticles.map((article, idx) => (
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

          {totalPages > 1 && (
            <div className="d-flex justify-content-center align-items-center mt-4 pb-5">
              <button
                className="btn btn-outline-secondary me-2"
                onClick={handlePrevious}
                disabled={currentPage === 1}
              >
                Previous
              </button>

              <span className="mx-3 text-muted">
                Page {currentPage} of {totalPages}
              </span>

              <button
                className="btn btn-outline-secondary ms-2"
                onClick={handleNext}
                disabled={currentPage === totalPages}
              >
                Next
              </button>
            </div>
          )}
        </>
      )}
    </div>
  );
}