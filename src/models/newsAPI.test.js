import { fetchTopHeadlines, fetchNewsData } from './newsAPI';

// Mock the constants module
jest.mock('../utils/constants', () => ({
  API_CONFIG: {
    GNEWS: {
      BASE_URL: 'https://gnews.io/api/v4',
      API_KEY: 'test-gnews-key',
      DEFAULT_PARAMS: { lang: 'en', country: 'us' }
    },
    NEWSDATA: {
      BASE_URL: 'https://newsdata.io/api/1',
      API_KEY: 'test-newsdata-key',
      DEFAULT_PARAMS: { country: 'us', language: 'en' }
    }
  },
  ERROR_MESSAGES: {
    API_KEY_MISSING: 'API key is not configured. Please check your environment variables.',
    API_KEY_INVALID: 'Invalid API key or unauthorized access',
    NETWORK_ERROR: 'Network error: Please check your internet connection and try again',
    RATE_LIMIT: 'Too many requests: Please wait a moment and try again',
    SERVER_ERROR: 'Server error: Please try again later',
    INVALID_RESPONSE: 'Invalid response format from API'
  },
  validateApiKey: (apiKey) => apiKey && typeof apiKey === 'string' && apiKey.trim().length > 0
}));

// Mock fetch to test error handling
global.fetch = jest.fn();

describe('API Error Handling Tests', () => {
  beforeEach(() => {
    fetch.mockClear();
    console.error = jest.fn(); // Mock console.error to avoid noise in tests
  });

  describe('fetchTopHeadlines', () => {
    test('validates API key', async () => {
      await expect(fetchTopHeadlines('')).rejects.toThrow('API key is not configured');
      await expect(fetchTopHeadlines(null)).rejects.toThrow('API key is not configured');
      await expect(fetchTopHeadlines(123)).rejects.toThrow('API key is not configured');
    });

    test('handles network errors', async () => {
      fetch.mockRejectedValueOnce(new Error('Network error'));
      
      await expect(fetchTopHeadlines('valid-key')).rejects.toThrow('Network error');
      expect(console.error).toHaveBeenCalled();
    });

    test('handles HTTP status errors', async () => {
      fetch.mockResolvedValueOnce({
        ok: false,
        status: 401,
        text: () => Promise.resolve('Unauthorized')
      });
      
      await expect(fetchTopHeadlines('invalid-key')).rejects.toThrow('Invalid API key or unauthorized access');
    });

    test('handles successful response', async () => {
      const mockArticles = [{ title: 'Test Article' }];
      fetch.mockResolvedValueOnce({
        ok: true,
        json: () => Promise.resolve({ articles: mockArticles })
      });
      
      const result = await fetchTopHeadlines('valid-key');
      expect(result).toEqual(mockArticles);
    });
  });

  describe('fetchNewsData', () => {
    test('validates API key', async () => {
      await expect(fetchNewsData('')).rejects.toThrow('API key is not configured');
    });

    test('handles successful response', async () => {
      const mockResults = [{ title: 'Test NewsData Article' }];
      fetch.mockResolvedValueOnce({
        ok: true,
        json: () => Promise.resolve({ results: mockResults })
      });
      
      const result = await fetchNewsData('valid-key');
      expect(result).toEqual(mockResults);
    });
  });
});