export async function fetchTopHeadlines(apiKey) {
  try {
    // Validate input parameters
    if (!apiKey || typeof apiKey !== 'string') {
      throw new Error('Invalid API key provided');
    }

    const url = `https://gnews.io/api/v4/top-headlines?lang=en&country=us&token=${apiKey}`;
    
    // Wrap fetch in try/catch to handle network errors
    const res = await fetch(url);
    
    // Enhanced error handling with specific status codes
    if (!res.ok) {
      const errorBody = await res.text().catch(() => 'Unknown error');
      switch (res.status) {
        case 401:
          throw new Error('Invalid API key or unauthorized access');
        case 403:
          throw new Error('API access forbidden. Check your API key permissions');
        case 404:
          throw new Error('API endpoint not found');
        case 429:
          throw new Error('API rate limit exceeded. Please try again later');
        case 500:
          throw new Error('Internal server error. Please try again later');
        default:
          throw new Error(`Network error: ${res.status} - ${errorBody}`);
      }
    }

    // Parse JSON response with error handling
    const data = await res.json();
    
    // Validate response structure
    if (!data || typeof data !== 'object') {
      throw new Error('Invalid response format from API');
    }

    // GNews returns articles in data.articles
    return data.articles || [];
    
  } catch (error) {
    // Enhanced error logging with context
    console.error('Error fetching top headlines:', {
      error: error.message,
      apiKey: apiKey ? 'PROVIDED' : 'MISSING',
      timestamp: new Date().toISOString()
    });
    
    // Re-throw with consistent error structure
    throw error;
  }
}