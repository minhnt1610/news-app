import React from 'react';

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    // You can log error info here if needed
    console.error('ErrorBoundary caught an error:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return <div style={{ padding: '2rem', color: 'red', textAlign: 'center' }}>
        <h2>Something went wrong.</h2>
        <p>Please try refreshing the page.</p>
      </div>;
    }
    return this.props.children;
  }
}

export default ErrorBoundary;
