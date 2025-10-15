import React, { useState } from "react";
import ShippingAddressForm from "./ShippingAddressForm";
import Payment from "./Payment";
import "./checkout.css";

const Checkout = () => {
  const [shippingData, setShippingData] = useState(null);
  const [coupon, setCoupon] = useState("");
  const [discount, setDiscount] = useState(0);
  const [couponError, setCouponError] = useState("");
  const [couponSuccess, setCouponSuccess] = useState("");

  const handleShippingSubmit = (data) => {
    setShippingData(data);
  };

  const handleBackToAddress = () => {
    setShippingData(null);
  };

  const handleApplyCoupon = async () => {
    if (!coupon.trim()) {
      setCouponError("Please enter a coupon code.");
      return;
    }

    try {
      const res = await fetch(
        `${process.env.REACT_APP_API_URL}/api/coupons/validate/${coupon}`
      );
      const data = await res.json();

      if (res.ok && data.valid) {
        setDiscount(data.discountPercentage);
        setCouponSuccess(`Coupon applied! You saved ${data.discountPercentage}%`);
        setCouponError("");
      } else {
        setDiscount(0);
        setCouponError(data.message || "Invalid coupon code.");
        setCouponSuccess("");
      }
    } catch (error) {
      setCouponError("Server error. Try again.");
      setCouponSuccess("");
    }
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

          {/* Coupon Section */}
          <div className="coupon-section">
            <h3>Have a Coupon?</h3>
            <div className="coupon-input-row">
              <input
                type="text"
                placeholder="Enter coupon code"
                value={coupon}
                onChange={(e) => setCoupon(e.target.value)}
                className="coupon-input"
              />
              <button onClick={handleApplyCoupon} className="apply-btn">
                Apply
              </button>
            </div>
            {couponError && <p className="coupon-error">{couponError}</p>}
            {couponSuccess && <p className="coupon-success">{couponSuccess}</p>}
          </div>

          {/* Payment Section */}
          <Payment shippingAddress={shippingData} discount={discount} />
        </div>
      )}
    </div>
  );
};

export default Checkout;
