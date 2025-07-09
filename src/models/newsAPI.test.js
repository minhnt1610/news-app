import { fetchTopHeadlines } from './newsAPI';

// Mock fetch to test error handling
global.fetch = jest.fn();

describe('Error Handling Tests', () => {
  beforeEach(() => {
    fetch.mockClear();
    console.error = jest.fn(); // Mock console.error to avoid noise in tests
  });

  test('fetchTopHeadlines validates API key', async () => {
    await expect(fetchTopHeadlines('')).rejects.toThrow('Invalid API key provided');
    await expect(fetchTopHeadlines()).rejects.toThrow('Invalid API key provided');
    await expect(fetchTopHeadlines(123)).rejects.toThrow('Invalid API key provided');
  });

  test('fetchTopHeadlines handles network errors', async () => {
    fetch.mockRejectedValueOnce(new Error('Network error'));
    
    await expect(fetchTopHeadlines('valid-key')).rejects.toThrow('Network error');
    expect(console.error).toHaveBeenCalledWith('Error fetching top headlines:', expect.objectContaining({
      error: 'Network error',
      apiKey: 'PROVIDED',
      timestamp: expect.any(String)
    }));
  });

  test('fetchTopHeadlines handles HTTP status errors', async () => {
    fetch.mockResolvedValueOnce({
      ok: false,
      status: 401,
      text: () => Promise.resolve('Unauthorized')
    });
    
    await expect(fetchTopHeadlines('invalid-key')).rejects.toThrow('Invalid API key or unauthorized access');
  });

  test('fetchTopHeadlines handles invalid JSON response', async () => {
    fetch.mockResolvedValueOnce({
      ok: true,
      json: () => Promise.reject(new Error('Invalid JSON'))
    });
    
    await expect(fetchTopHeadlines('valid-key')).rejects.toThrow('Invalid JSON');
  });

  test('fetchTopHeadlines handles successful response', async () => {
    const mockArticles = [{ title: 'Test Article' }];
    fetch.mockResolvedValueOnce({
      ok: true,
      json: () => Promise.resolve({ articles: mockArticles })
    });
    
    const result = await fetchTopHeadlines('valid-key');
    expect(result).toEqual(mockArticles);
  });
});