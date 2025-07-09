import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import ArticleCard from "../Components/ArticleCard";
import { fetchTopHeadlines } from "../models/newsAPI";

export default function NewsList() {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const navigate = useNavigate();
  const API_KEY = "b590b8fdb4eab9cbb391b5feb040141f";
  const ARTICLES_PER_PAGE = 5;

  useEffect(() => {
    setLoading(true);
    setError("");
    
    // Try to fetch real data, but fall back to mock data if it fails
    fetchTopHeadlines(API_KEY)
      .then((data) => {
        if (data && data.length > 0) {
          setArticles(data);
        } else {
          // Use mock data for testing pagination
          setArticles(mockData);
        }
      })
      .catch(() => {
        // Use mock data for testing pagination
        setArticles(mockData);
      })
      .finally(() => setLoading(false));
  }, []);

  // Mock data for testing pagination
  const mockData = [
    {
      title: "Breaking News: Technology Advances",
      description: "Latest developments in AI and machine learning are reshaping industries worldwide.",
      urlToImage: "https://via.placeholder.com/300x200",
      url: "https://example.com/article1"
    },
    {
      title: "Economic Updates: Market Trends",
      description: "Stock markets show positive growth as global economy recovers from recent challenges.",
      urlToImage: "https://via.placeholder.com/300x200",
      url: "https://example.com/article2"
    },
    {
      title: "Health News: Medical Breakthrough",
      description: "Researchers discover new treatment methods for common diseases.",
      urlToImage: "https://via.placeholder.com/300x200",
      url: "https://example.com/article3"
    },
    {
      title: "Sports: Championship Results",
      description: "Local team wins championship after intense competition throughout the season.",
      urlToImage: "https://via.placeholder.com/300x200",
      url: "https://example.com/article4"
    },
    {
      title: "Weather Alert: Seasonal Changes",
      description: "Meteorologists predict significant weather patterns for the coming week.",
      urlToImage: "https://via.placeholder.com/300x200",
      url: "https://example.com/article5"
    },
    {
      title: "Education: School System Updates",
      description: "New educational programs launched to improve student learning outcomes.",
      urlToImage: "https://via.placeholder.com/300x200",
      url: "https://example.com/article6"
    },
    {
      title: "Environment: Climate Action",
      description: "Government announces new initiatives to combat climate change and protect ecosystems.",
      urlToImage: "https://via.placeholder.com/300x200",
      url: "https://example.com/article7"
    },
    {
      title: "Entertainment: Movie Reviews",
      description: "Critics review the latest blockbuster films hitting theaters this weekend.",
      urlToImage: "https://via.placeholder.com/300x200",
      url: "https://example.com/article8"
    },
    {
      title: "Travel: Destination Guides",
      description: "Explore amazing destinations around the world with our comprehensive travel guides.",
      urlToImage: "https://via.placeholder.com/300x200",
      url: "https://example.com/article9"
    },
    {
      title: "Food: Culinary Trends",
      description: "Discover the latest food trends and recipes from renowned chefs worldwide.",
      urlToImage: "https://via.placeholder.com/300x200",
      url: "https://example.com/article10"
    },
    {
      title: "Science: Research Findings",
      description: "Scientists publish groundbreaking research in multiple fields of study.",
      urlToImage: "https://via.placeholder.com/300x200",
      url: "https://example.com/article11"
    },
    {
      title: "Politics: Policy Changes",
      description: "New policies announced to address current social and economic challenges.",
      urlToImage: "https://via.placeholder.com/300x200",
      url: "https://example.com/article12"
    }
  ];

  function openDetail(article) {
    navigate("/detail", { state: { article } });
  }

  // Calculate pagination values
  const totalPages = Math.ceil(articles.length / ARTICLES_PER_PAGE);
  const startIndex = (currentPage - 1) * ARTICLES_PER_PAGE;
  const endIndex = startIndex + ARTICLES_PER_PAGE;
  const currentArticles = articles.slice(startIndex, endIndex);

  // Pagination handlers
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
        <>
          <div className="row">
            {currentArticles.map((article, idx) => (
              <div className="col-md-6 col-lg-4 mb-4" key={idx}>
                <div className="h-100">
                  <ArticleCard article={article} onClick={openDetail} />
                </div>
              </div>
            ))}
          </div>
          
          {totalPages > 1 && (
            <div className="d-flex justify-content-center align-items-center mt-4 pb-5">
              <button
                className="btn btn-outline-primary me-2"
                onClick={handlePrevious}
                disabled={currentPage === 1}
              >
                Previous
              </button>
              
              <span className="mx-3 text-muted">
                Page {currentPage} of {totalPages}
              </span>
              
              <button
                className="btn btn-outline-primary ms-2"
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