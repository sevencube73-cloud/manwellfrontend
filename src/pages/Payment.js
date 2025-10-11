import React, { useState } from "react";
import "./Payment.css";

const Payment = ({ shippingAddress }) => {
  const [showOptions, setShowOptions] = useState(false);
  const [selectedOption, setSelectedOption] = useState("");
  const [message, setMessage] = useState("");

  const handlePayNow = () => {
    setShowOptions(true);
  };

  const handleSelect = (option) => {
    setSelectedOption(option);
  };

  const handleConfirm = async () => {
    if (!selectedOption) {
      setMessage("Please select a payment method.");
      return;
    }

    if (selectedOption === "M-PESA") {
      // 🔹 Here you can integrate M-PESA STK Push API call
      setMessage("Processing M-PESA payment...");
      setTimeout(() => {
        setMessage("✅ M-PESA payment successful!");
        setShowOptions(false);
      }, 3000);
    } else {
      setMessage("Payment will be made on delivery.");
      setShowOptions(false);
    }
  };

  return (
    <div className="payment-container">
      <h2>Payment</h2>
      <p className="summary-text">
        Deliver to: <strong>{shippingAddress.fullName}</strong> <br />
        {shippingAddress.address}, {shippingAddress.city},{" "}
        {shippingAddress.country}
      </p>

      <button className="pay-btn" onClick={handlePayNow}>
        Pay Now
      </button>

      {showOptions && (
        <div className="payment-modal">
          <div className="payment-modal-content">
            <h3>Select Payment Method</h3>
            <div className="payment-options">
              <div
                className={`payment-option ${
                  selectedOption === "M-PESA" ? "active" : ""
                }`}
                onClick={() => handleSelect("M-PESA")}
              >
                <input
                  type="radio"
                  name="payment"
                  checked={selectedOption === "M-PESA"}
                  readOnly
                />
                <span>M-PESA</span>
              </div>

              <div
                className={`payment-option ${
                  selectedOption === "Pay on Delivery" ? "active" : ""
                }`}
                onClick={() => handleSelect("Pay on Delivery")}
              >
                <input
                  type="radio"
                  name="payment"
                  checked={selectedOption === "Pay on Delivery"}
                  readOnly
                />
                <span>Pay on Delivery</span>
              </div>
            </div>

            <div className="payment-actions">
              <button className="confirm-btn" onClick={handleConfirm}>
                Confirm
              </button>
              <button
                className="cancel-btn"
                onClick={() => setShowOptions(false)}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {message && <div className="payment-message">{message}</div>}
    </div>
  );
};

export default Payment;
