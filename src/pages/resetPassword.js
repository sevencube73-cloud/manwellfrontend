import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import '../components/Layout/.css';
import "./pages.css";


const ResetPassword = () => {
  const [email, setEmail] = useState("");
  const [token, setToken] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [message, setMessage] = useState("");
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const location = useLocation();

  // If token is present in URL, go directly to password change step
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const urlToken = params.get("token");
    if (urlToken) {
      setToken(urlToken);
      setStep(2);
    }
  }, [location.search]);

  // Step 1: Request reset
  const handleRequestReset = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");
    try {
      const res = await fetch("https://manwellback.onrender.com/api/account/request-reset", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      const data = await res.json();
      if (res.ok) {
        setMessage("Reset email sent! Check your inbox.");
        setStep(2);
      } else {
        setMessage(data.message || "Failed to send reset email.");
      }
    } catch (error) {
      setMessage("Error. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  // Step 2: Reset password
  const handleResetPassword = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");
    try {
      const res = await fetch("https://manwellback.onrender.com/api/account/reset-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ token, newPassword }),
      });
      const data = await res.json();
      if (res.ok) {
        setMessage("✅ Password reset successful!");
        setStep(1);
        setEmail("");
        setToken("");
        setNewPassword("");
      } else {
        setMessage(data.message || "Failed to reset password.");
      }
    } catch (error) {
      setMessage("Error. Please try again.");
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
          {/* If token is present in URL, hide token input */}
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
