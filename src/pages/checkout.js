import React, { useContext, useState } from 'react';
import { CartContext } from '../context/CartContext';
import api from '../utils/api';
import './checkout.css';

const CheckoutPage = () => {
  const { cartItems, clearCart } = useContext(CartContext);
  const [phone, setPhone] = useState('');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState('Mpesa');

  const totalPrice = cartItems.reduce((a, c) => a + c.product.price * c.qty, 0);

  const handlePayment = async () => {
    if (!phone && paymentMethod !== 'Pay on Delivery') {
      setMessage('⚠️ Please enter your phone number');
      return;
    }
    try {
      setLoading(true);
      if (paymentMethod === 'Pay on Delivery') {
        const orderPayload = {
          orderItems: cartItems.map(i => ({ product: i.product._id, qty: i.qty })),
          paymentMethod,
          totalPrice,
        };
        await api.post('/orders', orderPayload);
        setMessage('✅ Order placed successfully! You can pay upon delivery.');
        clearCart();
      } else {
        await api.post('/payments/mpesa', {
          phoneNumber: phone,
          amount: totalPrice,
          items: cartItems.map(i => ({ productId: i.product._id, qty: i.qty })),
        });
        setMessage('✅ Payment request sent to your phone.');
        clearCart();
      }
    } catch (err) {
      setMessage(`❌ ${err.response?.data?.message || 'Payment failed'}`);
    } finally {
      setLoading(false);
    }
  };

  if (cartItems.length === 0) {
    return (
      <div className="empty-checkout">
        <p>Success! Your order is being processed.</p>
        <button className="back-btn" onClick={() => window.location.href = '/cart'}>
          ⬅️ Back to Cart
        </button>
      </div>
    );
  }

  return (
    <div className="checkout-container">
      <h2>Checkout</h2>

      <div className="checkout-summary">
        <p><strong>Total Amount:</strong> Ksh {(Number(totalPrice) || 0).toFixed(2)}</p>
      </div>

      <div className="checkout-form">
        <div className="form-group">
          <label>Item’s Retail Price</label>
          <input type="number" value={totalPrice} readOnly />
        </div>

        <div className="form-group">
          <label>Payment Method</label>
          <div className="payment-options">
            <label className={`payment-option ${paymentMethod === 'Mpesa' ? 'active' : ''}`}>
              <input
                type="radio"
                value="Mpesa"
                checked={paymentMethod === 'Mpesa'}
                onChange={e => setPaymentMethod(e.target.value)}
              />
              <span>M-PESA</span>
            </label>
            <label className={`payment-option ${paymentMethod === 'Pay on Delivery' ? 'active' : ''}`}>
              <input
                type="radio"
                value="Pay on Delivery"
                checked={paymentMethod === 'Pay on Delivery'}
                onChange={e => setPaymentMethod(e.target.value)}
              />
              <span>Pay on Delivery</span>
            </label>
          </div>
        </div>

        {paymentMethod !== 'Pay on Delivery' && (
          <div className="form-group">
            <label>Phone Number</label>
            <input
              type="tel"
              placeholder="Enter your M-PESA number"
              value={phone}
              onChange={e => setPhone(e.target.value)}
            />
          </div>
        )}

        {paymentMethod === 'Pay on Delivery' && (
          <div className="delivery-info">
            🚚 You selected <b>Pay on Delivery</b>. Pay when your items arrive.
          </div>
        )}

        {message && <div className="checkout-message">{message}</div>}

        <button
          className="checkout-btn"
          onClick={handlePayment}
          disabled={loading}
        >
          {loading
            ? 'Processing...'
            : paymentMethod === 'Pay on Delivery'
            ? 'Place Order'
            : 'Pay Now'}
        </button>

        <button className="back-btn" onClick={() => window.location.href = '/cart'}>
          ⬅️ Back to Cart
        </button>
      </div>
    </div>
  );
};

export default CheckoutPage;
