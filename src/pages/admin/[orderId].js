import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "../../utils/api"; // your axios instance

const OrderDetails = () => {
  const { orderId } = useParams(); // grabs the dynamic orderId from the URL
  const [order, setOrder] = useState(null);

  useEffect(() => {
    // Fetch order details by ID
    const fetchOrder = async () => {
      try {
        const res = await axios.get(`/api/admin/orders/${orderId}`);
        setOrder(res.data);
      } catch (err) {
        console.error(err);
      }
    };

    fetchOrder();
  }, [orderId]);

  if (!order) return <p>Loading order details...</p>;

  return (
    <div className="order-details">
      <h2>Order #{order._id}</h2>
      <p><strong>Customer Name:</strong> {order.customerName}</p>
      <p><strong>Email:</strong> {order.customerEmail}</p>
      <p><strong>Phone:</strong> {order.customerPhone}</p>
      <h3>Products:</h3>
      <ul>
        {order.products.map((item) => (
          <li key={item._id}>
            {item.name} - Quantity: {item.quantity}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default OrderDetails;
