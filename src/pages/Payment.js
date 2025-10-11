import React, { useContext, useState } from "react";
import { CartContext } from "../context/CartContext";
import api from "../utils/api";
import "./Payment.css";

const Payment = ({ shippingAddress }) => {
  const { cartItems, clearCart } = useContext(CartContext);
  const [paymentMethod, setPaymentMethod] = useState("Mpesa");
  const [message, setMessage] = useState("");

  const totalPrice = cartItems.reduce((a, c) => a + c.product.price * c.qty, 0);

  const handlePayment = async () => {
    try {
      const orderPayload = {
        orderItems: cartItems.map(i => ({
          product: i.product._id,
          qty: i.qty,
        })),
        shippingAddress,
        paymentMethod,
        totalPrice,
      };

      const token = localStorage.getItem("token"); // adjust to your auth key
      const config = { headers: { Authorization: `Bearer ${token}` } };

      const { data } = await api.post("/orders", orderPayload, config);

      setMessage("✅ Order placed successfully!");
      clearCart();
    } catch (err) {
      console.error("Payment error:", err);
      setMessage(`❌ ${err.response?.data?.message || "Payment failed"}`);
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

      <div className="payment-options">
        <label>
          <input
            type="radio"
            name="paymentMethod"
            value="Mpesa"
            checked={paymentMethod === "Mpesa"}
            onChange={e => setPaymentMethod(e.target.value)}
          />
          M-PESA
        </label>
        <label>
          <input
            type="radio"
            name="paymentMethod"
            value="Pay on Delivery"
            checked={paymentMethod === "Pay on Delivery"}
            onChange={e => setPaymentMethod(e.target.value)}
          />
          Pay on Delivery
        </label>
      </div>

      <button className="pay-btn" onClick={handlePayment}>Pay Now</button>

      {message && <p className="status-message">{message}</p>}
    </div>
  );
};

export default Payment;
