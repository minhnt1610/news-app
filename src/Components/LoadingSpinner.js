import React from 'react';

export default function LoadingSpinner({ message = "Loading...", size = "medium" }) {
  const sizeClasses = {
    small: "spinner-border-sm",
    medium: "",
    large: "spinner-border-lg"
  };

  return (
    <div className="d-flex justify-content-center align-items-center" style={{ minHeight: "60vh" }}>
      <div className={`spinner-border text-primary me-2 ${sizeClasses[size]}`} role="status">
        <span className="visually-hidden">Loading...</span>
      </div>
      <span>{message}</span>
    </div>
  );
}