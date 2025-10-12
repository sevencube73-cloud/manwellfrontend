import React from 'react';

import { Link } from 'react-router-dom';
import ProductList from '../components/product/ProductList';
import './HomePage.css';

const HomePage = () => {
  return (
    <div className="home-container">
      {/* Sidebar */}
      <aside className="sidebar">
        <ul className="category-list">
          <li>Official Stores</li>
          <li>Phones & Tablets</li>
          <li>TVs & Audio</li>
          <li>Appliances</li>
          <li>Health & Beauty</li>
          <li>Home & Office</li>
          <li>Fashion</li>
          <li>Computing</li>
          <li>Gaming</li>
          <li>Supermarket</li>
          <li>Baby Products</li>
          <li>Other Categories</li>
        </ul>
      </aside>

      {/* Main content */}
      <main className="main-content">
        <div className="hero-banner">
          <div className="hero-text">
            <h1>MANWELL STORE</h1>
            <p>Premium Fashion, Business Class Service</p>
            <Link to="/shop" className="shop-now-btn">Shop Now</Link>
          </div>
        </div>

        <section className="product-section">
          <h2 className="section-title">Flash Sales | Live Now</h2>
          <ProductList />
        </section>
      </main>
    </div>
  );
};

export default HomePage;
