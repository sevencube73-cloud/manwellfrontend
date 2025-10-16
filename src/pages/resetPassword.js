import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "./ResetPassword.css";
import "./pages.css";

const ResetPassword = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const [step, setStep] = useState(1);
  const [email, setEmail] = useState("");
  const [token, setToken] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  // ✅ Detect token (handles both /reset-password/:token and ?token=)
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const queryToken = params.get("token");

    const pathParts = location.pathname.split("/");
    const pathToken =
      pathParts.length > 2 && pathParts[2].length > 10 ? pathParts[2] : null;

    const finalToken = queryToken || pathToken;

    if (finalToken) {
      setToken(finalToken);
      setStep(2);
    } else {
      setStep(1);
    }
  }, [location]);

  // ✅ Use backend URL safely
  const API_URL =
    import.meta.env.VITE_API_BASE_URL ||
    "https://manwellback.onrender.com"; // fallback for Netlify

  // ✅ Step 1: Request reset email
  const handleEmailSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    try {
      const res = await fetch(`${API_URL}/api/auth/forgot-password`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      const data = await res.json();

      if (res.ok) {
        setMessage("✅ Reset link sent! Check your inbox.");
      } else {
        setMessage(data.message || "❌ Could not send reset link.");
      }
    } catch (err) {
      console.error(err);
      setMessage("❌ Network error. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  // ✅ Step 2: Reset password
  const handlePasswordSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    if (password !== confirmPassword) {
      setMessage("❌ Passwords do not match.");
      setLoading(false);
      return;
    }

    try {
      const res = await fetch(`${API_URL}/api/auth/reset-password/${token}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password }),
      });

      const data = await res.json();

      if (res.ok) {
        setMessage("✅ Password reset successful! Redirecting...");
        setTimeout(() => navigate("/login"), 2000);
      } else {
        setMessage(data.message || "❌ Reset failed. Try again.");
      }
    } catch (err) {
      console.error(err);
      setMessage("❌ Error. Try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="reset-container">
      <div className="reset-box">
        <h2 className="reset-title">
          {step === 1 ? "Forgot Password" : "Reset Password"}
        </h2>

        {step === 1 ? (
          <form onSubmit={handleEmailSubmit} className="reset-form">
            <label>Email Address</label>
            <input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <button type="submit" disabled={loading}>
              {loading ? "Sending..." : "Send Reset Link"}
            </button>
          </form>
        ) : (
          <form onSubmit={handlePasswordSubmit} className="reset-form">
            <label>New Password</label>
            <input
              type="password"
              placeholder="Enter new password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              minLength="6"
            />

            <label>Confirm Password</label>
            <input
              type="password"
              placeholder="Confirm new password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
              minLength="6"
            />

            <button type="submit" disabled={loading}>
              {loading ? "Resetting..." : "Reset Password"}
            </button>
          </form>
        )}

        {message && <p className="reset-message">{message}</p>}

        <div className="reset-footer">
          <p>© {new Date().getFullYear()} Manwell Store</p>
          <div className="social-links">
            <a href="https://facebook.com" target="_blank" rel="noreferrer">
              <i className="fab fa-facebook"></i>
            </a>
            <a href="https://instagram.com" target="_blank" rel="noreferrer">
              <i className="fab fa-instagram"></i>
            </a>
            <a href="https://x.com" target="_blank" rel="noreferrer">
              <i className="fab fa-twitter"></i>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResetPassword;
