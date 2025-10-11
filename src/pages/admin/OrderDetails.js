import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import api from '../../utils/api';

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

  if (!order) return <div>Loading...</div>;

  return (
    <div>
      <h2>Order {order.orderId}</h2>
      <p>Customer: {order.user?.name}</p>
      <p>Email: {order.user?.email}</p>
      <p>Phone: {order.user?.phoneNumber}</p>
      <h3>Products:</h3>
      <ul>
        {order.orderItems.map(item => (
          <li key={item._id}>
            {item.product?.name} x {item.qty} - ${item.price}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default OrderDetails;
