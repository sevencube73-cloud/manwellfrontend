import React, { useEffect, useState, useContext } from 'react';
import './Orders.css';
import api from '../utils/api';
import { AuthContext } from '../context/AuthContext';

const OrdersPage = () => {
  const { user } = useContext(AuthContext);
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) return;
    const fetchOrders = async () => {
      try {
        const { data } = await api.get('/orders/myorders');
        setOrders(data);
      } catch (e) {
        console.error(e);
      } finally {
        setLoading(false);
      }
    };
    fetchOrders();
  }, [user]);

  if (!user)
    return <p className="order-message">⚠️ Please login to view your orders.</p>;
  if (loading)
    return <p className="order-message">⏳ Loading your orders...</p>;
  if (orders.length === 0)
    return <p className="order-message">🛒 You have no orders yet.</p>;

  return (
    <div className="orders-container">
      <h2 className="orders-title">Your Orders</h2>
      <div className="orders-list">
        {orders.map((order) => (
          <div key={order._id} className="order-card">
            <p><strong>Order ID:</strong> {order.orderId}</p>
            <p><strong>Total:</strong> ${(Number(order?.totalPrice) || 0).toFixed(2)}</p>
            <p>
              <strong>Status:</strong>
              <span
                className={`order-status ${
                  order.status === 'Delivered'
                    ? 'status-delivered'
                    : order.status === 'Pending'
                    ? 'status-pending'
                    : 'status-processing'
                }`}
              >
                {order.status}
              </span>
            </p>
            <p><strong>Date:</strong> {new Date(order.createdAt).toLocaleDateString()}</p>

            <div className="order-products">
              <strong>Products:</strong>
              <div>
                {order.orderItems.map((item, idx) => (
                  <div key={idx} className="order-product-item">
                    <div><strong>Name:</strong> {item.product?.name || item.name || 'N/A'}</div>
                    {item.product?.description && (
                      <div><strong>Description:</strong> {item.product.description}</div>
                    )}
                    <div><strong>Quantity:</strong> {item.qty}</div>
                    <div><strong>Price:</strong> ${(Number(item?.price) || 0).toFixed(2)}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default OrdersPage;
