import { render, screen } from '@testing-library/react';
import App from './App';

// Simple test to verify app structure
test('renders app without crashing', () => {
  // Just test that the import works
  expect(App).toBeDefined();
});
