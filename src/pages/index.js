import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import ProductList from './product/ProductList';
import './HomePage.css';
import api from '../utils/api'; // axios instance

const HomePage = () => {
  

  return (
    <div className="home-container">
      {/* Hero Section */}
      

      {/* Products Section */}
      <section className="products-section">
        <h2 className="section-title">Explore Our Products</h2>
        <ProductList />
      </section>
    </div>
  );
};

export default HomePage;
