import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import ProductList from '../components/product/ProductList';
import './HomePage.css';
import api from '../utils/api'; // axios instance

const HomePage = () => {
  const [latestProduct, setLatestProduct] = useState(null);

  useEffect(() => {
    const fetchLatest = async () => {
      try {
        const { data } = await api.get('/products?limit=1&sort=-createdAt');
        setLatestProduct(data[0]);
      } catch (err) {
        console.error('Failed to fetch latest product:', err);
      }
    };
    fetchLatest();
  }, []);

  return (
    <div className="home-container">
      <div className="main-content">
        {/* Dynamic Hero Section */}
        {latestProduct ? (
          <div
            className="hero-banner"
            style={{
              backgroundImage: `url(${latestProduct.image || '/default.jpg'})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
            }}
          >
            <div className="hero-text">
              <h1>{latestProduct.name}</h1>
              <p>{latestProduct.description?.substring(0, 100)}...</p>
              <Link to={`/product/${latestProduct._id}`} className="shop-now-btn">
                Shop Now
              </Link>
            </div>
          </div>
        ) : (
          <div className="hero-banner fallback-hero">
            <div className="hero-text">
              <h1>MANWELL STORE</h1>
              <p>Premium Quality Fashion — Where Street Meets Sleek</p>
            </div>
          </div>
        )}

        {/* Products Section */}
        <h2 className="section-title">Explore Our Products</h2>
        <ProductList />
      </div>
    </div>
  );
};

export default HomePage;
