import React from 'react';

export default function ErrorMessage({ error, onRetry }) {
  const getErrorType = (errorMessage) => {
    if (errorMessage.includes('API key')) return 'configuration';
    if (errorMessage.includes('Network')) return 'network';
    if (errorMessage.includes('rate limit')) return 'rate-limit';
    if (errorMessage.includes('unauthorized') || errorMessage.includes('forbidden')) return 'auth';
    return 'general';
  };

  const getErrorIcon = (type) => {
    switch (type) {
      case 'configuration': return '⚙️';
      case 'network': return '🌐';
      case 'rate-limit': return '⏰';
      case 'auth': return '🔐';
      default: return '⚠️';
    }
  };

  const errorType = getErrorType(error);
  const icon = getErrorIcon(errorType);

  return (
    <div className="alert alert-danger text-center" role="alert">
      <div className="mb-2">
        <span className="fs-3" role="img" aria-label="Error icon">{icon}</span>
      </div>
      <h5 className="alert-heading mb-2">Something went wrong</h5>
      <p className="mb-3">{error}</p>
      {onRetry && (
        <button 
          className="btn btn-outline-danger" 
          onClick={onRetry}
          aria-label="Retry loading content"
        >
          🔄 Try Again
        </button>
      )}
    </div>
  );
}