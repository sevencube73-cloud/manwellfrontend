import React, { useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import { CartContext } from '../../context/CartContext';
import './ProductCard.css';

const ProductCard = ({ product }) => {
  const [qty, setQty] = useState(1);
  const [showToast, setShowToast] = useState(false);
  const { addToCart } = useContext(CartContext);

  const handleAdd = (e) => {
    e.preventDefault();
    addToCart(product, qty);

    const img = e.currentTarget.closest('.shop-item-card').querySelector('img');
    if (img) {
      const clone = img.cloneNode(true);
      const rect = img.getBoundingClientRect();
      clone.style.position = 'fixed';
      clone.style.left = `${rect.left}px`;
      clone.style.top = `${rect.top}px`;
      clone.style.width = `${rect.width}px`;
      clone.style.height = `${rect.height}px`;
      clone.style.transition = 'transform 0.8s ease-in-out, opacity 0.8s ease-in-out';
      clone.style.zIndex = 9999;
      document.body.appendChild(clone);

      const cartIcon = document.querySelector('.nav-cart');
      const targetRect = cartIcon
        ? cartIcon.getBoundingClientRect()
        : { left: window.innerWidth - 40, top: 20 };
      const translateX = targetRect.left - rect.left;
      const translateY = targetRect.top - rect.top;

      requestAnimationFrame(() => {
        clone.style.transform = `translate(${translateX}px, ${translateY}px) scale(0.2)`;
        clone.style.opacity = '0.6';
      });

      setTimeout(() => clone.remove(), 900);
    }

    setShowToast(true);
    setTimeout(() => setShowToast(false), 1200);
  };

  return (
    <div className="shop-item-card">
      <Link to={`/product/${product._id}`} className="shop-item-link">
        <img
          src={product.image || product.images?.[0]?.url || ''}
          alt={product.name}
          className="shop-item-image"
        />
      </Link>

      <div className="shop-item-info">
        <h3 className="shop-item-name">{product.name}</h3>
        <p className="shop-item-price">KES {(Number(product?.price) || 0).toFixed(2)}</p>

        <Link to={`/product/${product._id}`} className="shop-item-btn" >
          Add to Cart
        </Link>

        {showToast && <div className="shop-item-toast">Added to cart</div>}
      </div>
    </div>
  );
};

export default ProductCard;
