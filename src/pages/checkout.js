import React, { useContext, useState } from "react";
import { CartContext } from "../context/CartContext";
import api from "../utils/api";
import "./checkout.css";

const CheckoutPage = () => {
  const { cartItems, clearCart } = useContext(CartContext);
  const [phone, setPhone] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState("Mpesa");
  const [shipping, setShipping] = useState({
    fullName: "",
    address: "",
    city: "",
    postalCode: "",
  });

  const totalPrice = cartItems.reduce((a, c) => a + c.product.price * c.qty, 0);

  const handlePayment = async () => {
    if (!shipping.fullName || !shipping.address || !shipping.city) {
      setMessage("⚠️ Please fill in your shipping details.");
      return;
    }

    if (!phone && paymentMethod !== "Pay on Delivery") {
      setMessage("⚠️ Please enter your phone number.");
      return;
    }

    try {
      setLoading(true);

      const orderPayload = {
        orderItems: cartItems.map((i) => ({
          product: i.product._id,
          qty: i.qty,
        })),
        shippingAddress: shipping,
        paymentMethod,
        totalPrice,
        phone,
      };

      if (paymentMethod === "Pay on Delivery") {
        await api.post("/orders", orderPayload);
        setMessage("✅ Order placed. Admin will process your delivery.");
      } else {
        await api.post("/payments/mpesa", {
          phoneNumber: phone,
          amount: totalPrice,
          items: cartItems.map((i) => ({
            productId: i.product._id,
            qty: i.qty,
          })),
          shipping,
        });
        setMessage(
          "✅ Payment request sent. Complete payment on your phone to confirm your order."
        );
      }

      clearCart();
    } catch (err) {
      setMessage(`❌ ${err.response?.data?.message || "Payment failed"}`);
    } finally {
      setLoading(false);
    }
  };

  if (cartItems.length === 0) {
    return (
      <div className="empty-checkout">
        ✅ Your order has been processed successfully.<br />
        <button
          className="back-cart-btn"
          onClick={() => (window.location.href = "/cart")}
        >
          ⬅️ Back to Cart
        </button>
      </div>
    );
  }

  return (
    <div className="checkout-container">
      <h2>Checkout</h2>

      <div className="checkout-summary">
        <p>
          <strong>Total Amount:</strong> KSh {(Number(totalPrice) || 0).toFixed(2)}
        </p>
      </div>

      <div className="checkout-main">
        <div className="checkout-left">
          <button
            className="back-cart-btn"
            onClick={() => (window.location.href = "/cart")}
          >
            ⬅️ Back to Cart
          </button>

          <form className="checkout-form">
            <h3>Shipping Details</h3>
            <div className="form-group">
              <label>Full Name</label>
              <input
                type="text"
                placeholder="Enter your full name"
                value={shipping.fullName}
                onChange={(e) =>
                  setShipping({ ...shipping, fullName: e.target.value })
                }
              />
            </div>

            <div className="form-group">
              <label>Address</label>
              <input
                type="text"
                placeholder="Street / Apartment / Building"
                value={shipping.address}
                onChange={(e) =>
                  setShipping({ ...shipping, address: e.target.value })
                }
              />
            </div>

            <div className="form-row">
              <div className="form-group">
                <label>City</label>
                <input
                  type="text"
                  placeholder="City"
                  value={shipping.city}
                  onChange={(e) =>
                    setShipping({ ...shipping, city: e.target.value })
                  }
                />
              </div>
              <div className="form-group">
                <label>Postal Code</label>
                <input
                  type="text"
                  placeholder="Postal Code"
                  value={shipping.postalCode}
                  onChange={(e) =>
                    setShipping({ ...shipping, postalCode: e.target.value })
                  }
                />
              </div>
            </div>

            <h3>Payment</h3>

            <div className="payment-options">
              <label className="radio-option">
                <input
                  type="radio"
                  name="paymentMethod"
                  value="Mpesa"
                  checked={paymentMethod === "Mpesa"}
                  onChange={() => setPaymentMethod("Mpesa")}
                />
                <span>M-PESA</span>
              </label>

              <label className="radio-option">
                <input
                  type="radio"
                  name="paymentMethod"
                  value="Pay on Delivery"
                  checked={paymentMethod === "Pay on Delivery"}
                  onChange={() => setPaymentMethod("Pay on Delivery")}
                />
                <span>Pay on Delivery</span>
              </label>
            </div>

            {paymentMethod === "Mpesa" && (
              <div className="form-group">
                <label>Phone Number</label>
                <input
                  type="tel"
                  placeholder="e.g. 0712345678"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                />
              </div>
            )}

            <button
              type="button"
              className="next-btn"
              onClick={handlePayment}
              disabled={loading}
            >
              {loading
                ? "Processing..."
                : paymentMethod === "Pay on Delivery"
                ? "Place Order"
                : "Pay Now"}
            </button>

            {message && <div className="message-box">{message}</div>}
          </form>
        </div>
      </div>
    </div>
  );
};

export default CheckoutPage;
