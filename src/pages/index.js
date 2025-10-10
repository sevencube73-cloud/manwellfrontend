import React from 'react';
import '../components/Layout/.css';
import { Link } from 'react-router-dom'; // to navigate between pages
import ProductList from '../components/product/ProductList';
import './HomePage.css';  // import the styles

const HomePage = () => {
  return (
    <div className="home-container">
      <h1 className="home-title">MANWELL STORE</h1>
      <h3 className='home-slogan'>where street meet sleek</h3>
      <div className="auth-buttons">
        {/* <Link to="/login" className="btn login-btn">Login</Link>
        <Link to="/register" className="btn register-btn">Register</Link> */}
      </div>

      <ProductList />
    </div>
  );
};

export default HomePage;
