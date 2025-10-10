import React, { useEffect, useState, useContext } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import api from '../../utils/api';
import { CartContext } from '../../context/CartContext';
import './ProductDetails.css';


const ProductDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useContext(CartContext);
  const [product, setProduct] = useState(null);
  const [qty, setQty] = useState(1);

  useEffect(() => {
    const fetchProduct = async () => {
      const { data } = await api.get(`/products/${id}`);
      setProduct(data);
    };
    fetchProduct();
  }, [id]);

  const handleAddToCart = () => {
    addToCart(product, qty);
    navigate('/cart');
  };

  if (!product) return <p className="loading">Loading...</p>;

  return (
    <div className="product-details">
      <div className="product-image">
        <img src={product.image || product.images?.[0]?.url || ''} alt={product.name} />
      </div>
      <div className="product-info">
        <h2>{product.name}</h2>
        <p className="description">{product.description}</p>
  <p className="price">Price: ${(Number(product?.price) || 0).toFixed(2)}</p>
        <p className="stock">In Stock: {product.stock}</p>

        <div className="actions">
          <input
            type="number"
            min="1"
            max={product.stock}
            value={qty}
            onChange={e => setQty(Number(e.target.value))}
          />
          <button
            onClick={handleAddToCart}
            disabled={product.stock < 1}
          >
            {product.stock < 1 ? 'Out of Stock' : 'Add to Cart'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
