import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  function handleLogin(e) {
    e.preventDefault();
    if (!email || !password) {
      setError("Please enter both email and password.");
      return;
    }
    // Fake login logic
    navigate("/news");
  }

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "linear-gradient(135deg, #ece9f7 0%, #d1e3ff 100%)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <form
        onSubmit={handleLogin}
        style={{
          background: "#fff",
          padding: 32,
          borderRadius: 16,
          boxShadow: "0 4px 24px rgba(0,0,0,0.08)",
          minWidth: 320,
          display: "flex",
          flexDirection: "column",
          gap: 18,
        }}
      >
        <h2 style={{ textAlign: "center", margin: 0 }}>Login</h2>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={e => setEmail(e.target.value)}
          style={{
            padding: 12,
            borderRadius: 8,
            border: "1px solid #ccc",
            fontSize: 16,
          }}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={e => setPassword(e.target.value)}
          style={{
            padding: 12,
            borderRadius: 8,
            border: "1px solid #ccc",
            fontSize: 16,
          }}
        />
        {error && (
          <div style={{ color: "red", fontSize: 14, textAlign: "center" }}>
            {error}
          </div>
        )}
        <button
          type="submit"
          style={{
            padding: 12,
            borderRadius: 8,
            border: "none",
            background: "#1976d2",
            color: "#fff",
            fontWeight: "bold",
            fontSize: 16,
            cursor: "pointer",
            marginTop: 8,
          }}
        >
          Login
        </button>
        <div style={{ textAlign: "center", color: "#888", fontSize: 14 }}>
          Or login with
        </div>
        <div style={{ display: "flex", justifyContent: "center", gap: 16 }}>
          <button
            type="button"
            style={{
              background: "#fff",
              border: "1px solid #eee",
              borderRadius: "50%",
              width: 40,
              height: 40,
              fontSize: 22,
              cursor: "pointer",
            }}
            title="Login with Google"
            onClick={() => alert("Google login (demo)")}
          >
            <span role="img" aria-label="Google">
              🔵
            </span>
          </button>
          <button
            type="button"
            style={{
              background: "#fff",
              border: "1px solid #eee",
              borderRadius: "50%",
              width: 40,
              height: 40,
              fontSize: 22,
              cursor: "pointer",
            }}
            title="Login with Facebook"
            onClick={() => alert("Facebook login (demo)")}
          >
            <span role="img" aria-label="Facebook">
              🔷
            </span>
          </button>
        </div>
        <div style={{ textAlign: "center", marginTop: 8 }}>
          <a href="#" style={{ color: "#1976d2", textDecoration: "none", fontSize: 14 }}>
            Register
          </a>
        </div>
      </form>
    </div>
  );
}