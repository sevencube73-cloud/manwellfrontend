import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "./pages.css";

const ResetPassword = () => {
  const [email, setEmail] = useState("");
  const [token, setToken] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [message, setMessage] = useState("");
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  // ✅ Detect token automatically from URL (query ?token=abc or path /reset-password/abc)
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const urlToken = params.get("token");

    if (urlToken) {
      setToken(urlToken);
      setStep(2);
    } else {
      const pathParts = location.pathname.split("/");
      const possibleToken = pathParts[pathParts.length - 1];
      if (possibleToken && possibleToken.length > 10) {
        setToken(possibleToken);
        setStep(2);
      }
    }
  }, [location]);

  // ✅ Step 1: Request password reset email
  const handleRequestReset = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    try {
      const res = await fetch(
        "https://manwellback.onrender.com/api/auth/forgot-password",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email }),
        }
      );

      const data = await res.json();

      if (res.ok) {
        setMessage("✅ Reset link sent! You can reset your password below.");
        setStep(2);

        // ✅ If backend returns a token, use it automatically
        if (data.token) {
          setToken(data.token);
        } else {
          setMessage(
            "✅ Email sent! Please also check your inbox for the reset link."
          );
        }
      } else {
        setMessage(data.message || "⚠️ Unable to send reset email.");
      }
    } catch (error) {
      setMessage("❌ Network error. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  // ✅ Step 2: Reset password
  const handleResetPassword = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    try {
      const res = await fetch(
        `https://manwellback.onrender.com/api/auth/reset-password/${token}`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ password: newPassword }),
        }
      );

      const data = await res.json();

      if (res.ok) {
        setMessage("✅ Password reset successful! Redirecting to login...");
        setEmail("");
        setToken("");
        setNewPassword("");
        setStep(1);

        setTimeout(() => navigate("/login"), 2500);
      } else {
        setMessage(data.message || "⚠️ Failed to reset password.");
      }
    } catch (error) {
      setMessage("❌ Something went wrong. Try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="page-container">
      <h2 className="page-title">Reset Password</h2>

      {message && <p className="form-message">{message}</p>}

      {step === 1 ? (
        <form className="return-form" onSubmit={handleRequestReset}>
          <input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="form-input"
          />
          <button
            type="submit"
            className="form-button"
            disabled={loading || !email}
          >
            {loading ? "Sending..." : "Send Reset Email"}
          </button>
        </form>
      ) : (
        <form className="return-form" onSubmit={handleResetPassword}>
          {!token && (
            <input
              type="text"
              placeholder="Enter your reset token"
              value={token}
              onChange={(e) => setToken(e.target.value)}
              required
              className="form-input"
            />
          )}
          <input
            type="password"
            placeholder="Enter new password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            required
            minLength="6"
            className="form-input"
          />
          <button
            type="submit"
            className="form-button"
            disabled={loading || !newPassword}
          >
            {loading ? "Resetting..." : "Reset Password"}
          </button>
        </form>
      )}
    </div>
  );
};

export default ResetPassword;
