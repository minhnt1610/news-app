import React from 'react';

export default function Pagination({ 
  currentPage, 
  totalPages, 
  onPrevious, 
  onNext, 
  className = "btn btn-outline-primary" 
}) {
  if (totalPages <= 1) return null;

  return (
    <div className="d-flex justify-content-center align-items-center mt-4 pb-5">
      <button
        className={`${className} me-2`}
        onClick={onPrevious}
        disabled={currentPage === 1}
        aria-label="Go to previous page"
      >
        ← Previous
      </button>

      <span className="mx-3 text-muted" aria-live="polite">
        Page {currentPage} of {totalPages}
      </span>

      <button
        className={`${className} ms-2`}
        onClick={onNext}
        disabled={currentPage === totalPages}
        aria-label="Go to next page"
      >
        Next →
      </button>
    </div>
  );
}