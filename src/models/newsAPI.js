import { API_CONFIG, ERROR_MESSAGES, validateApiKey } from '../utils/constants';

export async function fetchTopHeadlines(apiKey = API_CONFIG.GNEWS.API_KEY) {
  try {
    // Validate input parameters
    if (!validateApiKey(apiKey)) {
      throw new Error(ERROR_MESSAGES.API_KEY_MISSING);
    }

    const params = new URLSearchParams({
      ...API_CONFIG.GNEWS.DEFAULT_PARAMS,
      token: apiKey
    });

    const url = `${API_CONFIG.GNEWS.BASE_URL}/top-headlines?${params}`;
    
    // Wrap fetch in try/catch to handle network errors
    const res = await fetch(url);
    
    // Enhanced error handling with specific status codes
    if (!res.ok) {
      const errorBody = await res.text().catch(() => 'Unknown error');
      switch (res.status) {
        case 401:
          throw new Error(ERROR_MESSAGES.API_KEY_INVALID);
        case 403:
          throw new Error('API access forbidden. Check your API key permissions');
        case 404:
          throw new Error('API endpoint not found');
        case 429:
          throw new Error(ERROR_MESSAGES.RATE_LIMIT);
        case 500:
          throw new Error(ERROR_MESSAGES.SERVER_ERROR);
        default:
          throw new Error(`${ERROR_MESSAGES.NETWORK_ERROR}: ${res.status} - ${errorBody}`);
      }
    }

    // Parse JSON response with error handling
    const data = await res.json();
    
    // Validate response structure
    if (!data || typeof data !== 'object') {
      throw new Error(ERROR_MESSAGES.INVALID_RESPONSE);
    }

    // GNews returns articles in data.articles
    return data.articles || [];
    
  } catch (error) {
    // Enhanced error logging with context
    console.error('Error fetching top headlines:', {
      error: error.message,
      apiKey: apiKey ? 'PROVIDED' : 'MISSING',
      timestamp: new Date().toISOString(),
      url: API_CONFIG.GNEWS.BASE_URL
    });
    
    // Re-throw with consistent error structure
    throw error;
  }
}

export async function fetchNewsData(apiKey = API_CONFIG.NEWSDATA.API_KEY) {
  try {
    // Validate input parameters
    if (!validateApiKey(apiKey)) {
      throw new Error(ERROR_MESSAGES.API_KEY_MISSING);
    }

    const params = new URLSearchParams({
      ...API_CONFIG.NEWSDATA.DEFAULT_PARAMS,
      apikey: apiKey
    });

    const url = `${API_CONFIG.NEWSDATA.BASE_URL}/news?${params}`;
    
    // Wrap fetch in try/catch to handle network errors
    const res = await fetch(url);
    
    // Enhanced error handling with specific status codes
    if (!res.ok) {
      const errorBody = await res.text().catch(() => 'Unknown error');
      switch (res.status) {
        case 401:
          throw new Error(ERROR_MESSAGES.API_KEY_INVALID);
        case 403:
          throw new Error('API access forbidden. Check your API key permissions');
        case 404:
          throw new Error('API endpoint not found');
        case 429:
          throw new Error(ERROR_MESSAGES.RATE_LIMIT);
        case 500:
          throw new Error(ERROR_MESSAGES.SERVER_ERROR);
        default:
          throw new Error(`${ERROR_MESSAGES.NETWORK_ERROR}: ${res.status} - ${errorBody}`);
      }
    }

    // Parse JSON response with error handling
    const data = await res.json();
    
    // Validate response structure
    if (!data || typeof data !== 'object') {
      throw new Error(ERROR_MESSAGES.INVALID_RESPONSE);
    }

    // NewsData.io returns articles in data.results
    return data.results || [];
    
  } catch (error) {
    // Enhanced error logging with context
    console.error('Error fetching NewsData articles:', {
      error: error.message,
      apiKey: apiKey ? 'PROVIDED' : 'MISSING',
      timestamp: new Date().toISOString(),
      url: API_CONFIG.NEWSDATA.BASE_URL
    });
    
    // Re-throw with consistent error structure
    throw error;
  }
}