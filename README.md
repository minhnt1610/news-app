# MINHNEWS - React News App

A modern, responsive news application built with React that aggregates news from multiple sources.

## Features

### 🔐 Security & Configuration
- Environment-based API key management
- Secure configuration with `.env` files
- No hardcoded credentials in source code

### 📱 User Experience
- **Dual News Sources**: GNews and NewsData.io integration
- **Pagination**: Navigate through articles with ease
- **Responsive Design**: Works on all device sizes
- **Loading States**: Smooth loading indicators with spinners
- **Error Handling**: User-friendly error messages with retry functionality
- **Image Optimization**: Lazy loading and fallback handling
- **Article Sharing**: Native sharing API with clipboard fallback
- **Accessibility**: ARIA labels, keyboard navigation, screen reader support

### 🎨 UI/UX Improvements
- Modern Bootstrap-based design
- Tab-based navigation between news sources
- Article cards with hover effects
- Source attribution for articles
- Refresh functionality for real-time updates
- Skeleton loading for better perceived performance

### 🛠 Technical Improvements
- Modular component architecture
- Reusable components (LoadingSpinner, ErrorMessage, Pagination)
- Centralized constants and configuration
- Comprehensive error handling
- PropTypes validation (where applicable)
- Jest test coverage

## Getting Started

### Prerequisites
- Node.js (v14 or higher)
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone https://github.com/minhnt1610/news-app.git
cd news-app
```

2. Install dependencies:
```bash
npm install
```

3. Set up environment variables:
```bash
cp .env.example .env
```

4. Edit `.env` and add your API keys:
```env
# GNews API Key - Get from https://gnews.io/
REACT_APP_GNEWS_API_KEY=your_gnews_api_key_here

# NewsData API Key - Get from https://newsdata.io/
REACT_APP_NEWSDATA_API_KEY=your_newsdata_api_key_here
```

5. Start the development server:
```bash
npm start
```

## API Keys Setup

### GNews API
1. Visit [https://gnews.io/](https://gnews.io/)
2. Sign up for a free account
3. Get your API key from the dashboard
4. Add it to your `.env` file

### NewsData API
1. Visit [https://newsdata.io/](https://newsdata.io/)
2. Sign up for a free account
3. Get your API key from the dashboard
4. Add it to your `.env` file

## Available Scripts

### `npm start`
Runs the app in development mode at [http://localhost:3000](http://localhost:3000)

### `npm test`
Launches the test runner in interactive watch mode

### `npm run build`
Builds the app for production to the `build` folder

### `npm run eject`
**Note: this is a one-way operation. Once you `eject`, you can't go back!**

## Project Structure

```
src/
├── Components/           # Reusable UI components
│   ├── ArticleCard.js   # Article display component
│   ├── ErrorMessage.js  # Error handling component
│   ├── LoadingSpinner.js # Loading state component
│   └── Pagination.js    # Pagination component
├── models/              # API and data models
│   ├── newsAPI.js      # API functions
│   └── newsAPI.test.js # API tests
├── pages/               # Page components
│   ├── Login.js        # Login page
│   ├── NewsList.js     # GNews article list
│   ├── NewsList2.js    # NewsData article list
│   ├── NewsDetail.js   # GNews article details
│   └── NewsDetail2.js  # NewsData article details
├── utils/               # Utility functions
│   ├── constants.js    # App constants and config
│   └── mockData.js     # Fallback mock data
├── App.js              # Main app component
└── index.js            # App entry point
```

## Recent Improvements

### Security Fixes ✅
- Removed hardcoded API keys from source code
- Implemented environment-based configuration
- Added `.env.example` for setup guidance

### Code Quality ✅
- Created reusable components for better maintainability
- Added comprehensive error handling with user-friendly messages
- Implemented proper loading states with accessibility
- Added image lazy loading and error handling
- Unified API functions for both news sources

### User Experience ✅
- Added pagination to both news sources
- Implemented refresh functionality
- Added article sharing capabilities
- Improved accessibility with ARIA labels and keyboard navigation
- Enhanced visual feedback for loading and error states

### Performance ✅
- Implemented image lazy loading
- Added proper error boundaries
- Optimized component rendering
- Reduced code duplication

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgments

- [Create React App](https://github.com/facebook/create-react-app) for the initial project setup
- [Bootstrap](https://getbootstrap.com/) for the UI framework
- [React Router](https://reactrouter.com/) for navigation
- [GNews API](https://gnews.io/) for news data
- [NewsData.io](https://newsdata.io/) for additional news sources
