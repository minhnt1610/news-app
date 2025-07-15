import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import LoadingSpinner from "../Components/LoadingSpinner";
import ErrorMessage from "../Components/ErrorMessage";
import Pagination from "../Components/Pagination";
import { fetchNewsData } from "../models/newsAPI";
import { APP_CONFIG, isValidImageUrl } from "../utils/constants";

export default function NewsList2() {
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

  useEffect(() => {
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
          <h2 className="fw-bold mb-0" style={{ color: "#6610f2", letterSpacing: 1 }}>
            NewsData Headlines
          </h2>
          <span className="ms-2 badge bg-secondary-subtle text-secondary">{articles.length}</span>
          {!loading && !error && (
            <button 
              className="btn btn-outline-secondary btn-sm ms-3" 
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
              <div className="col-md-6 col-lg-4 mb-4" key={`newsdata-${idx}-${article.title?.substring(0, 20)}`}>
                <NewsDataCard article={article} onClick={openDetail} />
              </div>
            ))}
          </div>

          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPrevious={handlePrevious}
            onNext={handleNext}
            className="btn btn-outline-secondary"
          />
        </>
      )}
    </div>
  );
}

// Custom card component for NewsData articles
function NewsDataCard({ article, onClick }) {
  const [imageLoaded, setImageLoaded] = useState(false);
  const [imageError, setImageError] = useState(false);

  const handleImageLoad = () => setImageLoaded(true);
  const handleImageError = () => setImageError(true);

  const handleClick = () => onClick(article);
  const handleKeyPress = (e) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      onClick(article);
    }
  };

  const title = article.title || 'Untitled Article';
  const description = article.description || article.content || 'No description available';

  return (
    <article
      className="card h-100 shadow-sm"
      style={{ cursor: "pointer" }}
      onClick={handleClick}
      onKeyPress={handleKeyPress}
      tabIndex={0}
      role="button"
      aria-label={`Read article: ${title}`}
    >
      {article.image_url && isValidImageUrl(article.image_url) && !imageError && (
        <div className="position-relative">
          {!imageLoaded && (
            <div 
              className="card-img-top d-flex align-items-center justify-content-center bg-light"
              style={{ height: 180 }}
            >
              <div className="spinner-border text-secondary" role="status">
                <span className="visually-hidden">Loading image...</span>
              </div>
            </div>
          )}
          <img
            src={article.image_url}
            alt={title}
            className={`card-img-top ${!imageLoaded ? 'd-none' : ''}`}
            style={{ height: 180, objectFit: "cover" }}
            onLoad={handleImageLoad}
            onError={handleImageError}
            loading="lazy"
          />
        </div>
      )}
      <div className="card-body">
        <h5 className="card-title" title={title}>{title}</h5>
        <p className="card-text text-muted">
          {description.length > 150 ? `${description.substring(0, 150)}...` : description}
        </p>
        <small className="text-muted">
          {article.source_id || 'NewsData Source'}
        </small>
      </div>
    </article>
  );
}