import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "./pages.css";

const ResetPassword = () => {
  const [email, setEmail] = useState("");
  const [token, setToken] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [message, setMessage] = useState("");
  const [step, setStep] = useState(1); // Step 1 = Enter Email, 2 = Confirm Email Sent, 3 = Enter New Password
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();
  const location = useLocation();

  // ✅ Detect token from URL (clicked from email link)
  useEffect(() => {
    const pathParts = location.pathname.split("/");
    const maybeToken = pathParts[pathParts.length - 1];
    if (maybeToken && maybeToken.length > 10) {
      setToken(maybeToken);
      setStep(3); // Directly show Enter New Password
    }
  }, [location.pathname]);

  // Step 1: Request password reset email
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
        setMessage("✅ Reset link sent to your email! Check your inbox.");
        setStep(2); // Show "confirm email received" step
      } else {
        setMessage(data.message || "⚠️ Failed to send reset email.");
      }
    } catch (error) {
      setMessage("❌ Network error. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  // Step 3: Reset password using token
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
        setTimeout(() => navigate("/login"), 2500);
      } else {
        setMessage(data.message || "⚠️ Failed to reset password.");
      }
    } catch (error) {
      setMessage("❌ Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="page-container">
      <h2 className="page-title">Reset Password</h2>
      {message && <p className="form-message">{message}</p>}

      {step === 1 && (
        <form className="return-form" onSubmit={handleRequestReset}>
          <input
            type="email"
            placeholder="Enter your email address"
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
      )}

      {step === 2 && (
        <div className="return-form">
          <p>
            ✅ We sent a reset link to <strong>{email}</strong>. Have you received it?
          </p>
          <button
            className="form-button"
            onClick={() => setStep(3)}
          >
            Yes, reset my password
          </button>
        </div>
      )}

      {step === 3 && (
        <form className="return-form" onSubmit={handleResetPassword}>
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
