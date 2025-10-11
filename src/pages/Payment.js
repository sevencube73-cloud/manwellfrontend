import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../utils/api";
import "./Payment.css";

const Payment = ({ shippingAddress, orderItems, totalPrice }) => {
  const [showOptions, setShowOptions] = useState(false);
  const [selectedOption, setSelectedOption] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

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

    setLoading(true);
    setMessage("");

    try {
      // ✅ create the order in backend
      const { data } = await api.post("/orders", {
        orderItems,
        shippingAddress,
        paymentMethod: selectedOption,
        totalPrice,
      });

      if (selectedOption === "M-PESA") {
        // 🔹 Optionally trigger your M-PESA STK push here
        setMessage("Processing M-PESA payment...");
        setTimeout(() => {
          navigate(`/order-success/${data._id}`);
        }, 2000);
      } else {
        // Pay on Delivery
        setMessage("Order placed successfully. Pay on delivery.");
        setTimeout(() => {
          navigate(`/order-success/${data._id}`);
        }, 1500);
      }
    } catch (error) {
      console.error("Payment error:", error);
      setMessage("Something went wrong while placing your order.");
    } finally {
      setLoading(false);
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

      <button className="pay-btn" onClick={handlePayNow} disabled={loading}>
        {loading ? "Processing..." : "Pay Now"}
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
              <button className="confirm-btn" onClick={handleConfirm} disabled={loading}>
                {loading ? "Placing..." : "Confirm"}
              </button>
              <button
                className="cancel-btn"
                onClick={() => setShowOptions(false)}
                disabled={loading}
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
