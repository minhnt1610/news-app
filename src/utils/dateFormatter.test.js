import { formatNewsDate, getRelativeTime } from './dateFormatter';

describe('Date Formatter Utils', () => {
  describe('formatNewsDate', () => {
    test('handles null or undefined input', () => {
      expect(formatNewsDate(null)).toBe('Unknown date');
      expect(formatNewsDate(undefined)).toBe('Unknown date');
      expect(formatNewsDate('')).toBe('Unknown date');
    });

    test('handles invalid date strings', () => {
      expect(formatNewsDate('invalid-date')).toBe('Invalid date');
      expect(formatNewsDate('not-a-date')).toBe('Invalid date');
    });

    test('formats today correctly', () => {
      const today = new Date().toISOString();
      expect(formatNewsDate(today)).toBe('Today');
    });

    test('formats yesterday correctly', () => {
      const yesterday = new Date();
      yesterday.setDate(yesterday.getDate() - 1);
      expect(formatNewsDate(yesterday.toISOString())).toBe('Yesterday');
    });

    test('formats recent days correctly', () => {
      const twoDaysAgo = new Date();
      twoDaysAgo.setDate(twoDaysAgo.getDate() - 2);
      expect(formatNewsDate(twoDaysAgo.toISOString())).toBe('2 days ago');
    });
  });

  describe('getRelativeTime', () => {
    test('handles null or undefined input', () => {
      expect(getRelativeTime(null)).toBe('');
      expect(getRelativeTime(undefined)).toBe('');
      expect(getRelativeTime('')).toBe('');
    });

    test('handles invalid date strings', () => {
      expect(getRelativeTime('invalid-date')).toBe('');
    });

    test('formats recent minutes correctly', () => {
      const fiveMinutesAgo = new Date();
      fiveMinutesAgo.setMinutes(fiveMinutesAgo.getMinutes() - 5);
      expect(getRelativeTime(fiveMinutesAgo.toISOString())).toBe('5m ago');
    });

    test('formats recent hours correctly', () => {
      const twoHoursAgo = new Date();
      twoHoursAgo.setHours(twoHoursAgo.getHours() - 2);
      expect(getRelativeTime(twoHoursAgo.toISOString())).toBe('2h ago');
    });
  });
});