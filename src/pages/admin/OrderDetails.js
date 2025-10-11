import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import api from '../../utils/api';
// Import the external CSS file
import './OrderDetails.css'; 

const OrderDetails = () => {
  const { orderId } = useParams();
  const [order, setOrder] = useState(null);

  useEffect(() => {
    const fetchOrder = async () => {
      try {
        const { data } = await api.get(`/orders/${orderId}`);
        setOrder(data);
      } catch (error) {
        console.error('Failed to fetch order:', error);
      }
    };

    fetchOrder();
  }, [orderId]);

  if (!order) return <div className="order-details-loading">Loading...</div>;

  return (
    <div className="order-details-container">
      <h2 className="order-details-title">Order #{order.orderId}</h2>
      
      <div className="customer-info-card">
        <h3>Customer Information</h3>
        <p><strong>Customer:</strong> {order.user?.name}</p>
        <p><strong>Email:</strong> {order.user?.email}</p>
        <p><strong>Phone:</strong> {order.user?.phoneNumber}</p>
      </div>

      <div className="products-list-card">
        <h3>Products</h3>
        <ul className="order-items-list">
          {order.orderItems.map(item => (
            <li key={item._id} className="order-item">
              <span className="item-name">{item.product?.name}</span> 
              <span className="item-details">
                x <span className="item-qty">{item.qty}</span> 
                - <span className="item-price">${item.price}</span>
              </span>
            </li>
          ))}
        </ul>
      </div>
      
    </div>
  );
};

export default OrderDetails;
