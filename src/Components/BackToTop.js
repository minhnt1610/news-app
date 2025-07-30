import React, { useState, useEffect } from "react";

export default function BackToTop() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setVisible(window.scrollY > 200);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return visible ? (
    <button
      onClick={scrollToTop}
      style={{
        position: "fixed",
        bottom: 32,
        right: 24,
        zIndex: 1000,
        background: "#0d6efd",
        color: "#fff",
        border: "none",
        borderRadius: 24,
        padding: "12px 18px",
        boxShadow: "0 2px 8px rgba(0,0,0,0.15)",
        cursor: "pointer",
        fontSize: 20,
        transition: "background 0.2s",
      }}
      aria-label="Back to top"
    >
      ↑ Top
    </button>
  ) : null;
}
