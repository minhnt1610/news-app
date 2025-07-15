import React, { useState } from "react";
import { isValidImageUrl } from "../utils/constants";

export default function ArticleCard({ article, onClick }) {
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

  const imageUrl = article.urlToImage || article.image_url;
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
      {imageUrl && isValidImageUrl(imageUrl) && !imageError && (
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
            src={imageUrl}
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
        <p className="card-text text-muted" style={{ color: "#555" }}>
          {description.length > 150 ? `${description.substring(0, 150)}...` : description}
        </p>
        <small className="text-muted">
          {article.source?.name || article.source_id || 'Unknown Source'}
        </small>
      </div>
    </article>
  );
}