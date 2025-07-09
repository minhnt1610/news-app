import React from 'react';
import { render, screen } from '@testing-library/react';
import ArticleCard from '../Components/ArticleCard';
import { formatNewsDate } from '../utils/dateFormatter';

// Mock article data for testing
const mockArticle = {
  title: "Test News Article",
  description: "This is a test article description",
  urlToImage: "https://example.com/image.jpg",
  publishedAt: new Date().toISOString() // Use current date for testing
};

// Mock click handler
const mockOnClick = jest.fn();

describe('ArticleCard with Date Formatting', () => {
  test('renders article card with formatted date', () => {
    render(<ArticleCard article={mockArticle} onClick={mockOnClick} />);
    
    // Check if the article title is rendered
    expect(screen.getByText('Test News Article')).toBeInTheDocument();
    
    // Check if the description is rendered
    expect(screen.getByText('This is a test article description')).toBeInTheDocument();
    
    // Check if date formatting is applied (should show relative time or readable date)
    const dateElement = screen.getByText((content, element) => {
      return element && element.tagName.toLowerCase() === 'small' && content.length > 0;
    });
    expect(dateElement).toBeInTheDocument();
  });

  test('handles article without published date', () => {
    const articleWithoutDate = { ...mockArticle, publishedAt: null };
    render(<ArticleCard article={articleWithoutDate} onClick={mockOnClick} />);
    
    // Should still render without errors
    expect(screen.getByText('Test News Article')).toBeInTheDocument();
  });
});

describe('Integration Test: Date Formatting in News App', () => {
  test('date formatter works with various inputs', () => {
    // Test with today's date
    const today = new Date().toISOString();
    expect(formatNewsDate(today)).toBe('Today');
    
    // Test with yesterday
    const yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);
    expect(formatNewsDate(yesterday.toISOString())).toBe('Yesterday');
    
    // Test with a few days ago
    const threeDaysAgo = new Date();
    threeDaysAgo.setDate(threeDaysAgo.getDate() - 3);
    expect(formatNewsDate(threeDaysAgo.toISOString())).toBe('3 days ago');
  });
});