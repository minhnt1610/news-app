import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaGoogle, FaFacebookF } from "react-icons/fa";

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
    navigate("/news");
  }

  return (
    <div
      className="d-flex justify-content-center align-items-center vh-100"
      style={{
        background: "linear-gradient(135deg, #ece9f7 0%, #d1e3ff 100%)",
      }}
    >
      <form
        onSubmit={handleLogin}
        className="card p-4 shadow"
        style={{ minWidth: 350, borderRadius: 18, maxWidth: 400 }}
      >
        <div className="text-center mb-4">
          <h1
            className="fw-bold mb-1"
            style={{
              letterSpacing: 2,
              color: "#0d6efd",
              fontSize: 36,
              fontFamily: "Segoe UI, Arial, sans-serif",
            }}
          >
            MINHNEWS
          </h1>
          <div className="text-muted" style={{ fontSize: 16 }}>
            Welcome back! Please sign in.
          </div>
        </div>
        <input
          type="email"
          className="form-control mb-3"
          placeholder="Email"
          value={email}
          onChange={e => setEmail(e.target.value)}
          autoFocus
        />
        <input
          type="password"
          className="form-control mb-3"
          placeholder="Password"
          value={password}
          onChange={e => setPassword(e.target.value)}
        />
        {error && (
          <div className="alert alert-danger py-1 text-center" style={{ fontSize: 14 }}>
            {error}
          </div>
        )}
        <button type="submit" className="btn btn-primary w-100 fw-bold mb-3">
          Login
        </button>
        <div className="text-center text-secondary mb-2" style={{ fontSize: 14 }}>
          Or login with
        </div>
        <div className="d-flex justify-content-center gap-3 mb-3">
          <button
            type="button"
            className="btn btn-light border rounded-circle d-flex align-items-center justify-content-center"
            style={{ width: 44, height: 44 }}
            title="Login with Google"
            onClick={() => alert("Google login (demo)")}
          >
            <FaGoogle color="#DB4437" size={22} />
          </button>
          <button
            type="button"
            className="btn btn-light border rounded-circle d-flex align-items-center justify-content-center"
            style={{ width: 44, height: 44 }}
            title="Login with Facebook"
            onClick={() => alert("Facebook login (demo)")}
          >
            <FaFacebookF color="#1877f3" size={22} />
          </button>
        </div>
        <div className="text-center">
          <button type="button" className="btn btn-link text-primary p-0" style={{ fontSize: 14 }}>
            Register
          </button>
        </div>
        <div className="text-center mt-3">
          <small className="text-muted">© {new Date().getFullYear()} MINHNEWS</small>
        </div>
      </form>
    </div>
  );
}