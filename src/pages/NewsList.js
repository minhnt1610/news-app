import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import ArticleCard from "../Components/ArticleCard";
import LoadingSpinner from "../Components/LoadingSpinner";
import ErrorMessage from "../Components/ErrorMessage";
import Pagination from "../Components/Pagination";
import { fetchTopHeadlines } from "../models/newsAPI";
import { mockArticles } from "../utils/mockData";
import { APP_CONFIG } from "../utils/constants";

export default function NewsList() {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const navigate = useNavigate();
  const ARTICLES_PER_PAGE = APP_CONFIG.PAGINATION.DEFAULT_PAGE_SIZE;

  const retryFetch = () => {
    // Reset error and retry fetching
    setError("");
    setCurrentPage(1);
    fetchArticles();
  };

  const fetchArticles = async () => {
    try {
      setLoading(true);
      setError("");

      const fetched = await fetchTopHeadlines();

      if (!Array.isArray(fetched)) {
        throw new Error("Invalid response format: articles should be an array");
      }

      // fallback if fetched is empty
      if (fetched.length === 0) {
        setArticles(mockArticles);
      } else {
        setArticles(fetched);
      }
    } catch (error) {
      console.error("Error loading articles:", {
        error: error.message,
        timestamp: new Date().toISOString(),
      });

      if (error.message.includes("API key")) {
        setError("Configuration error: Please check API key settings");
      } else if (error.message.includes("Network")) {
        setError("Network error: Please check your internet connection and try again");
      } else if (error.message.includes("rate limit")) {
        setError("Too many requests: Please wait a moment and try again");
      } else if (error.message.includes("unauthorized") || error.message.includes("forbidden")) {
        setError("Authentication error: Please check your API credentials");
      } else {
        setError("Failed to load articles. Using fallback mock data.");
      }

      // fallback to mock data
      setArticles(mockArticles);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchArticles().catch((error) => {
      console.error("Uncaught error in fetchArticles:", error);
      setError("An unexpected error occurred. Please refresh the page.");
      setArticles(mockArticles);
      setLoading(false);
    });
  }, []);

  function openDetail(article) {
    navigate("/detail", { state: { article } });
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
          <h2 className="fw-bold mb-0" style={{ color: "#0d6efd", letterSpacing: 1 }}>
            Top Headlines
          </h2>
          <span className="ms-2 badge bg-primary-subtle text-primary">{articles.length}</span>
          {!loading && !error && (
            <button 
              className="btn btn-outline-primary btn-sm ms-3" 
              onClick={retryFetch}
              aria-label="Refresh articles"
            >
              🔄 Refresh
            </button>
          )}
        </div>
        <button className="btn btn-outline-danger" onClick={() => navigate("/")}>
          Sign out
        </button>
      </div>
      
      {loading ? (
        <LoadingSpinner message="Loading articles…" />
      ) : error ? (
        <ErrorMessage error={error} onRetry={retryFetch} />
      ) : articles.length === 0 ? (
        <div className="alert alert-info text-center">No articles found.</div>
      ) : (
        <>
          <div className="row">
            {currentArticles.map((article, idx) => (
              <div className="col-md-6 col-lg-4 mb-4" key={`article-${idx}-${article.title?.substring(0, 20)}`}>
                <div className="h-100">
                  <ArticleCard article={article} onClick={openDetail} />
                </div>
              </div>
            ))}
          </div>

          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPrevious={handlePrevious}
            onNext={handleNext}
            className="btn btn-outline-primary"
          />
        </>
      )}
    </div>
  );
}
