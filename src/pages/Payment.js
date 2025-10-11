import React from "react";
import "./Payment.css";

const Payment = ({ shippingAddress }) => {
  return (
    <div className="payment-container">
      <h2>Payment</h2>
      <p className="summary-text">
        Deliver to: <strong>{shippingAddress.fullName}</strong> <br />
        {shippingAddress.address}, {shippingAddress.city},{" "}
        {shippingAddress.country}
      </p>

      <button className="pay-btn">Pay Now</button>
    </div>
  );
};

export default Payment;
