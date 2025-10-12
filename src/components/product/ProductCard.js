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
    // Add to cart
    addToCart(product, qty);

    // Fly-to-cart animation: clone image and animate to cart icon
    const img = e.currentTarget.closest('.product-card').querySelector('img');
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

      // find cart icon position
      const cartIcon = document.querySelector('.nav-cart');
      const targetRect = cartIcon ? cartIcon.getBoundingClientRect() : { left: window.innerWidth - 40, top: 20 };
      const translateX = targetRect.left - rect.left;
      const translateY = targetRect.top - rect.top;

      requestAnimationFrame(() => {
        clone.style.transform = `translate(${translateX}px, ${translateY}px) scale(0.2)`;
        clone.style.opacity = '0.6';
      });

      setTimeout(() => {
        clone.remove();
      }, 900);
    }

    // show small toast
    setShowToast(true);
    setTimeout(() => setShowToast(false), 1200);
  };

  return (
    <div className="product-card">
      
      <Link to={`/product/${product._id}`} className="">
          <img
        src={product.image || product.images?.[0]?.url || ''}
        alt={product.name}
        className="product-image"
      />
        </Link>
      <div className="product-info">
        <h3 className="product-name">{product.name}</h3>
        <p className="product-price">KES {(Number(product?.price) || 0).toFixed(2)}</p>

        <div className="card-actions">
          <div className="qty-controls">
            
          </div>
          
        </div>

        <Link to={`/product/${product._id}`} className="view-btn">
          Details
        </Link>

        {showToast && (
          <div className="card-toast">Added to cart</div>
        )}
      </div>
    </div>
  );
};

export default ProductCard;
