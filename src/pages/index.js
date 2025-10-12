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
      {/* Hero Section */}
      <section
        className="hero-banner"
        style={{
          backgroundImage: latestProduct
            ? `linear-gradient(rgba(0,0,0,0.55), rgba(0,0,0,0.55)), url(${latestProduct.image || '/default.jpg'})`
            : `linear-gradient(rgba(0,0,0,0.55), rgba(0,0,0,0.55)), url('/default.jpg')`,
        }}
      >
        <div className="hero-content">
          {latestProduct ? (
            <>
              <h1 className="hero-title">{latestProduct.name}</h1>
              <p className="hero-description">
                {latestProduct.description?.substring(0, 100)}...
              </p>
              <Link to={`/product/${latestProduct._id}`} className="shop-now-btn">
                Shop Now
              </Link>
            </>
          ) : (
            <>
              <h1 className="hero-title">MANWELL STORE</h1>
              <p className="hero-description">
                Premium Quality Fashion — Where Street Meets Sleek
              </p>
            </>
          )}
        </div>
      </section>

      {/* Products Section */}
      <section className="products-section">
        <h2 className="section-title">Explore Our Products</h2>
        <ProductList />
      </section>
    </div>
  );
};

export default HomePage;
