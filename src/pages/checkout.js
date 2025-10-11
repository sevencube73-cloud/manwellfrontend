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
  const [step, setStep] = useState(2); // Step 1: Cart, 2: Checkout, 3: Payment, 4: Done

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
          shippingAddress: {},
          paymentMethod,
          totalPrice,
        };
        await api.post('/orders', orderPayload);
        clearCart();
        setStep(4);
        setMessage('✅ Order placed. Admin will process and deliver your order.');
      } else {
        await api.post('/payments/mpesa', {
          phoneNumber: phone,
          amount: totalPrice,
          items: cartItems.map(i => ({ productId: i.product._id, qty: i.qty })),
        });
        clearCart();
        setStep(4);
        setMessage('✅ Payment request sent. Complete it on your phone.');
      }
    } catch (err) {
      setMessage(`❌ ${err.response?.data?.message || 'Payment failed'}`);
    } finally {
      setLoading(false);
    }
  };

  if (cartItems.length === 0 && step !== 4) {
    return (
      <div className="empty-checkout">
        <p>🛒 Your cart is empty.</p>
        <button className="btn-back" onClick={() => (window.location.href = '/cart')}>
          ⬅️ Back to Cart
        </button>
      </div>
    );
  }

  return (
    <div className="checkout-container">
      {/* ✅ Progress Bar */}
      <div className="checkout-progress">
        <div className={`progress-step ${step >= 1 ? 'active' : ''}`}>Cart</div>
        <div className={`progress-step ${step >= 2 ? 'active' : ''}`}>Checkout</div>
        <div className={`progress-step ${step >= 3 ? 'active' : ''}`}>Payment</div>
        <div className={`progress-step ${step >= 4 ? 'active' : ''}`}>Done</div>
      </div>

      <h2>Checkout</h2>

      {step === 4 ? (
        <div className="order-success">
          <div className="success-icon">✅</div>
          <h3>Order Successful!</h3>
          <p>{message}</p>
          <button className="btn-back" onClick={() => (window.location.href = '/')}>
            🏠 Go to Home
          </button>
        </div>
      ) : (
        <>
          <div className="checkout-summary">
            <p>
              <strong>Total Amount:</strong> ${(Number(totalPrice) || 0).toFixed(2)}
            </p>
          </div>

          <div className="checkout-main">
            <div className="checkout-left">
              <button className="btn-back" onClick={() => (window.location.href = '/cart')}>
                ⬅️ Back to Cart
              </button>

              <form className="checkout-form">
                <div className="form-group">
                  <label>Item’s Retail Price</label>
                  <input type="number" value={totalPrice} readOnly />
                </div>

                <div className="form-group">
                  <label>Payment Method</label>
                  <div className="payment-options">
                    <label
                      className={`payment-option ${paymentMethod === 'Mpesa' ? 'active' : ''}`}
                    >
                      <input
                        type="radio"
                        value="Mpesa"
                        checked={paymentMethod === 'Mpesa'}
                        onChange={() => setPaymentMethod('Mpesa')}
                      />
                      <span>M-PESA</span>
                    </label>

                    <label
                      className={`payment-option ${paymentMethod === 'Pay on Delivery' ? 'active' : ''}`}
                    >
                      <input
                        type="radio"
                        value="Pay on Delivery"
                        checked={paymentMethod === 'Pay on Delivery'}
                        onChange={() => setPaymentMethod('Pay on Delivery')}
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
                      placeholder="Enter mobile phone number"
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

                <button
                  type="button"
                  className={`next-btn ${loading ? 'loading' : ''}`}
                  onClick={handlePayment}
                >
                  {loading
                    ? 'Processing...'
                    : paymentMethod === 'Pay on Delivery'
                    ? 'Place Order & Pay on Delivery'
                    : 'Next'}
                </button>
              </form>

              {message && <div className="message-box">{message}</div>}
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default CheckoutPage;
