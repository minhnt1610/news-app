import { formatNewsDate } from './utils/dateFormatter';

test('dateFormatter utility works correctly', () => {
  // Test basic functionality of our new utility
  expect(formatNewsDate(null)).toBe('Unknown date');
  expect(formatNewsDate('invalid')).toBe('Invalid date');
  
  // Test with a valid date (today)
  const today = new Date();
  expect(formatNewsDate(today.toISOString())).toBe('Today');
});
