import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import Login from "./pages/Login";
import NewsList from "./pages/NewsList";
import NewsDetail from "./pages/NewsDetail";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/news" element={<NewsList />} />
        <Route path="/detail" element={<NewsDetail />} />
      </Routes>
    </Router>
  );
}

export default App;