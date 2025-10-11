import React, { useContext, useState } from 'react';
import { CartContext } from '../context/CartContext';
import api from '../utils/api';
import './checkout.css';
import '../components/Layout/.css'; // fixed path to layout helper

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
        // Send order to backend for admin processing
        const orderPayload = {
          orderItems: cartItems.map(i => ({ product: i.product._id, qty: i.qty })),
          shippingAddress: {}, // Add address fields if available
          paymentMethod,
          totalPrice,
        };
        await api.post('/orders', orderPayload);
        setMessage('✅ Order placed. Admin will process, ship, and deliver your order.');
        clearCart();
      } else {
        await api.post('/payments/mpesa', {
          phoneNumber: phone,
          amount: totalPrice,
          items: cartItems.map(i => ({ productId: i.product._id, qty: i.qty })),
        });
        setMessage('✅ Payment request sent. Complete payment on your phone.');
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
        Success, 
         Your order is being processed.<br />
        <button
          style={{
            marginTop: 20,
            background: 'linear-gradient(90deg, #5d95daff 0%, #5bd2e2ff 100%)',
            color: '#ffffffff',
            border: 'none',
            borderRadius: 8,
            padding: '10px 24px',
            fontWeight: 600,
            fontSize: '1.1rem',
            cursor: 'pointer',
            boxShadow: '0 2px 8px rgba(33,150,243,0.10)',
            transition: 'background 0.2s, transform 0.2s'
          }}
          onClick={() => window.location.href = '/cart'}
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
  <p><strong>Total Amount:</strong> ${(Number(totalPrice) || 0).toFixed(2)}</p>
      </div>

      <div className="checkout-main" style={{ display: 'flex', justifyContent: 'center', alignItems: 'flex-start', minHeight: '70vh' }}>
        <div className="checkout-left" style={{ width: '100%', maxWidth: 420, margin: '0 auto' }}>
          <button
            style={{
              marginBottom: 18,
              background: 'linear-gradient(90deg, #1f4068 0%, #00e0ff 100%)',
              color: '#fff',
              border: 'none',
              borderRadius: 8,
              padding: '10px 24px',
              fontWeight: 600,
              fontSize: '1.1rem',
              cursor: 'pointer',
              boxShadow: '0 2px 8px rgba(33,150,243,0.10)',
              transition: 'background 0.2s, transform 0.2s'
            }}
            onClick={() => window.location.href = '/cart'}
          >
            ⬅️ Back to Cart
          </button>
          <form className="checkout-form" style={{ background: '#fff', borderRadius: 12, boxShadow: '0 2px 12px rgba(33,150,243,0.10)', padding: 24, marginBottom: 24 }}>
            <div className="form-row">
              <div className="form-group">
                <label style={{ fontWeight: 600, fontSize: '1.1rem' }}>Item's Retail Price</label>
                <input type="number" value={totalPrice} readOnly style={{ background: '#f7f7f7', borderRadius: 8, padding: '8px 14px', border: '1px solid #ccc', fontSize: '1.1rem' }} />
              </div>
            </div>
            <div className="form-group">
              <label style={{ fontWeight: 600, fontSize: '1.1rem' }}>Payment Method</label>
              <select value={paymentMethod} onChange={e => setPaymentMethod(e.target.value)} style={{ background: '#f7f7f7', borderRadius: 8, padding: '8px 14px', border: '1px solid #ccc', fontSize: '1.1rem' }}>
                <option value="Mpesa">M-PESA</option>
                <option value="Pesapal">Pesapal</option>
                <option value="Pay on Delivery">Pay on Delivery</option>
              </select>
            </div>
            {paymentMethod !== 'Pay on Delivery' && (
              <div className="form-group">
                <label style={{ fontWeight: 600, fontSize: '1.1rem' }}>Phone Number</label>
                <input
                  type="tel"
                  placeholder="Enter mobile phone number"
                  value={phone}
                  onChange={e => setPhone(e.target.value)}
                  style={{ background: '#f7f7f7', borderRadius: 8, padding: '8px 14px', border: '1px solid #ccc', fontSize: '1.1rem' }}
                />
              </div>
            )}
            {paymentMethod === 'Pay on Delivery' && (
              <div style={{ background: '#e6f7e6', borderRadius: 8, padding: '16px', margin: '18px 0', color: '#2e7d32', fontWeight: 500, fontSize: '1.08rem', boxShadow: '0 2px 8px rgba(33,150,243,0.07)' }}>
                <span role="img" aria-label="delivery">🚚</span> You have selected <b>Pay on Delivery</b>. Your order will be processed and you can pay when your items arrive.
              </div>
            )}
            <button type="button" className="next-btn" style={{ background: paymentMethod === 'Pay on Delivery' ? 'linear-gradient(90deg, #5cb85c 0%, #1f4068 100%)' : '', color: '#fff', fontWeight: 600, fontSize: '1.1rem', borderRadius: 8, padding: '10px 24px', marginTop: 12, boxShadow: '0 2px 8px rgba(33,150,243,0.10)' }} onClick={handlePayment}>
              {paymentMethod === 'Pay on Delivery' ? 'Place Order & Pay on Delivery' : 'Next'}
            </button>
          </form>
          {message && (
            <div style={{ background: '#e6f7e6', borderRadius: 8, padding: '16px', margin: '18px 0', color: '#2e7d32', fontWeight: 500, fontSize: '1.08rem', boxShadow: '0 2px 8px rgba(33,150,243,0.07)' }}>
              <span role="img" aria-label="success">✅</span> {message}
            </div>
          )}
        </div>
        <div className="checkout-right" style={{ display: 'none' }}></div>
      </div>
    </div>
  );
};

export default CheckoutPage;
