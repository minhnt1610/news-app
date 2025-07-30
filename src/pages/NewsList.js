import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import ArticleCard from "../Components/ArticleCard";
import { fetchTopHeadlines } from "../models/newsAPI";
import { mockArticles } from "../utils/mockData";

export default function NewsList() {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const navigate = useNavigate();
  const API_KEY = "b590b8fdb4eab9cbb391b5feb040141f";
  const ARTICLES_PER_PAGE = 5;

  useEffect(() => {
    const fetchArticles = async () => {
      try {
  return (
    <div className="container py-4">
      <h2 className="mb-4">Top Headlines (GNews)</h2>
      {loading && <div className="text-center my-4">Loading...</div>}
      {error && <div className="alert alert-danger text-center">{error}</div>}
      {!loading && !error && articles.length === 0 && (
        <div className="alert alert-warning text-center">No articles found.</div>
      )}
      <div className="row">
        {!loading && !error && articles.length > 0 && articles
          .slice(
            (currentPage - 1) * ARTICLES_PER_PAGE,
            currentPage * ARTICLES_PER_PAGE
          )
          .map((article, idx) => (
            <div className="col-md-6 mb-4" key={idx}>
              <ArticleCard article={article} onClick={() => handleArticleClick(article)} />
            </div>
          ))}
      </div>
      {/* Pagination */}
      {!loading && !error && articles.length > ARTICLES_PER_PAGE && (
        <nav className="d-flex justify-content-center">
          <ul className="pagination">
            {Array.from({ length: Math.ceil(articles.length / ARTICLES_PER_PAGE) }, (_, i) => (
              <li
                key={i}
                className={`page-item${currentPage === i + 1 ? " active" : ""}`}
                onClick={() => setCurrentPage(i + 1)}
                style={{ cursor: "pointer" }}
              >
                <span className="page-link">{i + 1}</span>
              </li>
            ))}
          </ul>
        </nav>
      )}
    </div>
  );
      } finally {
        setLoading(false);
      }
    };

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
