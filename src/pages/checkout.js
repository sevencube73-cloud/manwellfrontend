import React, { useState } from "react";
import ShippingAddressForm from "./ShippingAddressForm";
import Payment from "./Payment";
import "./checkout.css";

const Checkout = () => {
  const [shippingData, setShippingData] = useState(null);

  const handleShippingSubmit = (data) => {
    setShippingData(data);
  };

  const handleBackToAddress = () => {
    setShippingData(null);
  };

  return (
    <div className="checkout-container">
      {!shippingData ? (
        <ShippingAddressForm onSubmit={handleShippingSubmit} />
      ) : (
        <div className="payment-step">
          <button className="back-btn" onClick={handleBackToAddress}>
            ← Edit Shipping Address
          </button>
          <Payment shippingAddress={shippingData} />
        </div>
      )}
    </div>
  );
};

export default Checkout;
