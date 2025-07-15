// API Configuration and Constants
export const API_CONFIG = {
  GNEWS: {
    BASE_URL: 'https://gnews.io/api/v4',
    API_KEY: process.env.REACT_APP_GNEWS_API_KEY,
    DEFAULT_PARAMS: {
      lang: 'en',
      country: 'us'
    }
  },
  NEWSDATA: {
    BASE_URL: 'https://newsdata.io/api/1',
    API_KEY: process.env.REACT_APP_NEWSDATA_API_KEY,
    DEFAULT_PARAMS: {
      country: 'us',
      language: 'en'
    }
  }
};

// Application Constants
export const APP_CONFIG = {
  PAGINATION: {
    DEFAULT_PAGE_SIZE: 5,
    MAX_PAGE_SIZE: 20
  },
  TIMEOUTS: {
    API_TIMEOUT: 10000, // 10 seconds
    IMAGE_TIMEOUT: 5000 // 5 seconds
  }
};

// Error Messages
export const ERROR_MESSAGES = {
  API_KEY_MISSING: 'API key is not configured. Please check your environment variables.',
  API_KEY_INVALID: 'Invalid API key or unauthorized access',
  NETWORK_ERROR: 'Network error: Please check your internet connection and try again',
  RATE_LIMIT: 'Too many requests: Please wait a moment and try again',
  SERVER_ERROR: 'Server error: Please try again later',
  INVALID_RESPONSE: 'Invalid response format from API',
  GENERIC_ERROR: 'An unexpected error occurred. Please try again.'
};

// Validation Functions
export const validateApiKey = (apiKey) => {
  return apiKey && typeof apiKey === 'string' && apiKey.trim().length > 0;
};

export const isValidImageUrl = (url) => {
  if (!url || typeof url !== 'string') return false;
  try {
    new URL(url);
    return true;
  } catch {
    return false;
  }
};