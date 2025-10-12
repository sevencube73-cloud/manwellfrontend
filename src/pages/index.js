import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import ProductList from '../components/product/ProductList';
import './HomePage.css';
import api from '../utils/api'; // axios instance

const HomePage = () => {
  return (
    <div className="products-section">
      {/* Hero Section */}
      <section className="">
        <h2 className="section-title">MANWELL STORE</h2>
        <ProductList />
      </section>
    </div>
  );
};

export default HomePage;
