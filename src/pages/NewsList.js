import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import ArticleCard from "../Components/ArticleCard";
import { fetchTopHeadlines } from "../models/newsAPI";

export default function NewsList() {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const API_KEY = "b590b8fdb4eab9cbb391b5feb040141f";

  useEffect(() => {
    // Use async function with comprehensive error handling
    const fetchArticles = async () => {
      try {
        setLoading(true);
        setError("");
        
        // Validate API key before making request
        if (!API_KEY) {
          throw new Error('API key is not configured');
        }

        const articles = await fetchTopHeadlines(API_KEY);
        
        // Validate response data
        if (!Array.isArray(articles)) {
          throw new Error('Invalid response format: articles should be an array');
        }
        
        setArticles(articles);
      } catch (error) {
        // Enhanced error handling with specific error messages
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
    navigate("/detail", { state: { article } });
  }

  return (
    <div className="container py-4">
      <div className="d-flex align-items-center justify-content-between mb-4">
        <div className="d-flex align-items-center">
          <h2 className="fw-bold mb-0" style={{ color: "#0d6efd", letterSpacing: 1 }}>Top Headlines</h2>
          <span className="ms-2 badge bg-primary-subtle text-primary">{articles.length}</span>
        </div>
        <button className="btn btn-outline-danger" onClick={() => navigate("/")}>
          Sign out
        </button>
      </div>
      {loading ? (
        <div className="d-flex justify-content-center align-items-center" style={{ minHeight: "60vh" }}>
          <div className="spinner-border text-primary me-2" role="status" />
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
              <div className="h-100">
                <ArticleCard article={article} onClick={openDetail} />
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}