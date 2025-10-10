import React, { useEffect, useState, useContext } from 'react';
import '../components/Layout/.css';
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
        // handle error
      } finally {
        setLoading(false);
      }
    };
    fetchOrders();
  }, [user]);

  if (!user)
    return <p style={styles.message}>⚠️ Please login to view your orders.</p>;
  if (loading)
    return <p style={styles.message}>⏳ Loading orders...</p>;
  if (orders.length === 0)
    return <p style={styles.message}>🛒 You have no orders.</p>;

  return (
    <div style={styles.container}>
      <h2 style={styles.title}>Your Orders</h2>
      <div style={styles.ordersList}>
        {orders.map(order => (
          <div key={order._id} style={styles.card}>
            <p><strong>Order ID:</strong> {order.orderId}</p>
            <p><strong>Total:</strong> ${(Number(order?.totalPrice) || 0).toFixed(2)}</p>
            <p><strong>Status:</strong> 
              <span style={{
                ...styles.status,
                backgroundColor: order.status === 'Delivered' ? '#28a745' :
                                order.status === 'Pending' ? '#ffc107' : '#17a2b8'
              }}>
                {order.status}
              </span>
            </p>
            <p><strong>Date:</strong> {new Date(order.createdAt).toLocaleDateString()}</p>
            <div style={{ marginTop: '12px' }}>
              <strong>Products:</strong>
              <ul style={{ paddingLeft: '18px', marginTop: '6px' }}>
                {order.orderItems.map((item, idx) => (
                  <li key={idx} style={{ marginBottom: '8px' }}>
                    <div><strong>Name:</strong> {item.product?.name || item.name || 'N/A'}</div>
                    {item.product?.description && <div><strong>Description:</strong> {item.product.description}</div>}
                    <div><strong>Quantity:</strong> {item.qty}</div>
                    <div><strong>Price:</strong> ${(Number(item?.price) || 0).toFixed(2)}</div>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

const styles = {
  container: {
    maxWidth: '800px',
    margin: '40px auto',
    padding: '20px',
    fontFamily: 'Arial, sans-serif',
  },
  title: {
    textAlign: 'center',
    marginBottom: '30px',
    fontSize: '24px',
    color: '#333',
  },
  ordersList: {
    display: 'grid',
    gridTemplateColumns: '1fr',
    gap: '20px',
  },
  card: {
    border: '1px solid #ddd',
    borderRadius: '12px',
    padding: '20px',
    backgroundColor: '#fff',
    boxShadow: '0 4px 10px rgba(0,0,0,0.05)',
  },
  status: {
    color: '#fff',
    padding: '3px 10px',
    borderRadius: '6px',
    marginLeft: '8px',
    fontSize: '13px',
  },
  message: {
    textAlign: 'center',
    marginTop: '50px',
    fontSize: '18px',
    color: '#555',
  },
};

export default OrdersPage;
