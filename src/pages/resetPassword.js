import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import "./pages.css";

const ResetPassword = () => {
  const [email, setEmail] = useState("");
  const [token, setToken] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [message, setMessage] = useState("");
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const location = useLocation();

  // ✅ Automatically detect token from URL
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const urlToken = params.get("token");
    if (urlToken) {
      setToken(urlToken);
      setStep(2);
    }
  }, [location.search]);

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
        setMessage("✅ Password reset email sent! Check your inbox.");
        setStep(2);
      } else {
        setMessage(data.message || "Failed to send reset email.");
      }
    } catch (error) {
      setMessage("❌ Network error. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  // ✅ Step 2: Set new password
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
        setMessage("✅ Password reset successful! You can now log in.");
        setStep(1);
        setEmail("");
        setToken("");
        setNewPassword("");
      } else {
        setMessage(data.message || "Failed to reset password.");
      }
    } catch (error) {
      setMessage("❌ Error. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="page-container">
      <h2>Reset Password</h2>
      {message && <p className="form-message">{message}</p>}

      {step === 1 ? (
        <form className="return-form" onSubmit={handleRequestReset}>
          <input
            type="email"
            placeholder="Your Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <button type="submit" disabled={loading}>
            {loading ? "Sending..." : "Send Reset Email"}
          </button>
        </form>
      ) : (
        <form className="return-form" onSubmit={handleResetPassword}>
          {!token && (
            <input
              type="text"
              placeholder="Reset Token"
              value={token}
              onChange={(e) => setToken(e.target.value)}
              required
            />
          )}
          <input
            type="password"
            placeholder="New Password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            required
          />
          <button type="submit" disabled={loading}>
            {loading ? "Resetting..." : "Reset Password"}
          </button>
        </form>
      )}
    </div>
  );
};

export default ResetPassword;
