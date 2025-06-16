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
    <div className="d-flex justify-content-center align-items-center vh-100" style={{ background: "linear-gradient(135deg, #ece9f7 0%, #d1e3ff 100%)" }}>
      <form
        onSubmit={handleLogin}
        className="card p-4 shadow"
        style={{ minWidth: 340, borderRadius: 16 }}
      >
        <h2 className="text-center mb-3">Login</h2>
        <input
          type="email"
          className="form-control mb-2"
          placeholder="Email"
          value={email}
          onChange={e => setEmail(e.target.value)}
        />
        <input
          type="password"
          className="form-control mb-2"
          placeholder="Password"
          value={password}
          onChange={e => setPassword(e.target.value)}
        />
        {error && (
          <div className="alert alert-danger py-1 text-center" style={{ fontSize: 14 }}>
            {error}
          </div>
        )}
        <button type="submit" className="btn btn-primary w-100 mb-2">
          Login
        </button>
        <div className="text-center text-secondary mb-2" style={{ fontSize: 14 }}>
          Or login with
        </div>
        <div className="d-flex justify-content-center gap-2 mb-2">
          <button
            type="button"
            className="btn btn-light border rounded-circle d-flex align-items-center justify-content-center"
            style={{ width: 40, height: 40 }}
            title="Login with Google"
            onClick={() => alert("Google login (demo)")}
          >
            <FaGoogle color="#DB4437" size={22} />
          </button>
          <button
            type="button"
            className="btn btn-light border rounded-circle d-flex align-items-center justify-content-center"
            style={{ width: 40, height: 40 }}
            title="Login with Facebook"
            onClick={() => alert("Facebook login (demo)")}
          >
            <FaFacebookF color="#1877f3" size={22} />
          </button>
        </div>
        <div className="text-center">
          <a href="#" className="text-primary" style={{ fontSize: 14 }}>
            Register
          </a>
        </div>
      </form>
    </div>
  );
}