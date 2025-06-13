import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Login from "./pages/Login";
import NewsList from "./pages/NewsList";
import NewsDetail from "./pages/NewsDetail";

function App() {
  return (
    <Router>
      <Routes>
        {/* Login screen at root */}
        <Route path="/" element={<Login />} />

        {/* After login, go to news list */}
        <Route path="/news" element={<NewsList />} />

        {/* When clicking an article */}
        <Route path="/detail" element={<NewsDetail />} />
      </Routes>
    </Router>
  );
}

export default App;

