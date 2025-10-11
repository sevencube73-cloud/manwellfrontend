import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../../../utils/api";
import AdminNavbar from "../AdminSidebar";
import './AdminDashboard.css';
import './orders.css';

const AdminOrderDetails = () => {
  const { orderId } = useParams();
  const navigate = useNavigate();

  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [status, setStatus] = useState("");

  const fetchOrder = async () => {
    try {
      const { data } = await api.get(`/orders/${orderId}`);
      setOrder(data);
      setStatus(data.status);
    } catch (err) {
      setError(err.response?.data?.message || "Failed to fetch order");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrder();
  }, [orderId]);

  const handleStatusChange = async (e) => {
    const newStatus = e.target.value;
    try {
      await api.put(`/orders/${order._id}/status`, { status: newStatus });
      setStatus(newStatus);
    } catch (err) {
      alert(err.response?.data?.message || "Failed to update status");
    }
  };

  if (loading) return <div className="admin-loading">Loading order...</div>;
  if (error) return <div className="admin-error">{error}</div>;
  if (!order) return <div>No order found</div>;

  return (
    <div className="admin-orders-bg">
      <AdminNavbar />
      <main className="admin-content" style={{ maxWidth: '1000px', margin: '0 auto', padding: '32px 24px', minHeight: '80vh' }}>
        <button onClick={() => navigate(-1)} className="admin-btn-secondary" style={{ marginBottom: 16 }}>← Back to Orders</button>
        <h2 className="admin-page-title" style={{ marginBottom: 24 }}>Order Details: {order.orderId}</h2>

        {/* Customer Info */}
        <section style={{ marginBottom: 24 }}>
          <h3>Customer Info</h3>
          <p><strong>Name:</strong> {order.user?.name || 'N/A'}</p>
          <p><strong>Email:</strong> {order.user?.email || 'N/A'}</p>
          <p><strong>Phone:</strong> {order.user?.phone || 'N/A'}</p>
        </section>

        {/* Order Items */}
        <section style={{ marginBottom: 24 }}>
          <h3>Products</h3>
          <table className="orders-table" style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead>
              <tr>
                <th style={{ padding: '8px' }}>Product</th>
                <th style={{ padding: '8px' }}>Qty</th>
                <th style={{ padding: '8px' }}>Price</th>
                <th style={{ padding: '8px' }}>Total</th>
              </tr>
            </thead>
            <tbody>
              {order.orderItems.map((item) => (
                <tr key={item.product._id}>
                  <td>{item.product.name}</td>
                  <td>{item.qty}</td>
                  <td>{item.price.toFixed(2)}</td>
                  <td>{(item.qty * item.price).toFixed(2)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </section>

        {/* Order Summary */}
        <section style={{ marginBottom: 24 }}>
          <h3>Order Summary</h3>
          <p><strong>Total Price:</strong> KES {order.totalPrice.toFixed(2)}</p>
          <p><strong>Payment Method:</strong> {order.paymentMethod}</p>
          <p><strong>Status:</strong> 
            <select value={status} onChange={handleStatusChange} style={{ marginLeft: 8, padding: 4 }}>
              <option value="Pending">Pending</option>
              <option value="Processing">Processing</option>
              <option value="Shipped">Shipped</option>
              <option value="Delivered">Delivered</option>
              <option value="Cancelled">Cancelled</option>
              <option value="Returned">Returned</option>
            </select>
          </p>
        </section>

        {/* Shipping Info */}
        {order.shippingAddress && (
          <section style={{ marginBottom: 24 }}>
            <h3>Shipping Address</h3>
            <p>{order.shippingAddress.address}</p>
            <p>{order.shippingAddress.city}, {order.shippingAddress.postalCode}</p>
            <p>{order.shippingAddress.country}</p>
          </section>
        )}
      </main>
    </div>
  );
};

export default AdminOrderDetails;
