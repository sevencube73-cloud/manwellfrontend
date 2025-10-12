import React, { useState, useContext, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';
import { AuthContext } from '../../context/AuthContext';
import { CartContext } from '../../context/CartContext';
import api from '../../utils/api';
import { FaShoppingCart, FaBars, FaTimes } from 'react-icons/fa';

const Navbar = () => {
  const { user, logout } = useContext(AuthContext);
  const { cartItems } = useContext(CartContext);
  const [categories, setCategories] = useState([]);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const navRef = useRef(null);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const { data } = await api.get('/products/categories');
        setCategories(data);
      } catch (err) {
        // fail silently
      }
    };
    fetchCategories();
  }, []);

  // Measure navbar height and set a CSS variable so main content can be offset dynamically
  useEffect(() => {
    const el = navRef.current;
    if (!el) return;
    const setVar = () => {
      const h = el.getBoundingClientRect().height;
      document.documentElement.style.setProperty('--navbar-height', `${Math.ceil(h)}px`);
    };
    setVar();

    let ro;
    if (window.ResizeObserver) {
      ro = new ResizeObserver(() => setVar());
      ro.observe(el);
    }
    window.addEventListener('resize', setVar);
    return () => {
      if (ro) ro.disconnect();
      window.removeEventListener('resize', setVar);
    };
  }, []);

  const cartCount = cartItems.reduce((sum, item) => sum + item.qty, 0);

  return (
  <nav ref={navRef} className="navbar">
      {/* Logo */}
      <div className="navbar-left">
          <Link to="/" className="navbar-logo">
            <img
              src={process.env.PUBLIC_URL + "/logo.png"}
              alt="MANWELL Logo"
              className="logo-img"
            />
          </Link>
      </div>

      {/* Desktop Links */}
      <div className={`nav-links ${mobileMenuOpen ? 'open' : ''}`}>
      {user && user.role === 'user' && (
        <Link to="/">Home</Link>
      )}
    {user && user.role === 'user' && (
        <Link to="/about-us">About</Link>
      )}
      {user && user.role === 'user' && (
        <Link to="/orders">Orders</Link>
      )}
    {user && user.role === 'admin' && (
        <Link to="/admin/dashboard">Admin Dashboard</Link>
      )}
          
      </div>

      {/* Right side */}
      <div className="navbar-right">
        {/* Account */}
        <div className="nav-account">
          {user ? (
            <div
              className="nav-user-trigger"
              onClick={() => setDropdownOpen((open) => !open)}
            >
              <img
                src={`https://ui-avatars.com/api/?name=${encodeURIComponent(
                  user.name
                )}&background=007bff&color=fff`}
                alt={user.name}
                className="user-avatar"
              />
              <span className="user-name">{(user.name || '').split(' ')[0]}</span>
              <span className="chevron" style={{ transform: dropdownOpen ? 'rotate(180deg)' : 'none' }}>▼</span>
              {dropdownOpen && (
                <div className="dropdown-content">
                  <Link to="/profile">My Account</Link>
                  <Link to="/orders">My Orders</Link>
                  <Link to="/change-password">Change Password</Link>
                   {user && user.role === 'user' && (
                    <Link to="/contact">Contact</Link>
                  )}
                  {user && user.role === 'user' && (
                    <Link to="/activate-account">Activate Acount</Link>
                  )}
                  {user && user.role === 'admin' && (
                    <Link to="/admin/dashboard">Admin Dashboard</Link>
                  )}
                  {user && user.role === 'admin' && (
                    <Link to="/admin/activate-account">Activate Account</Link>
                  )}
                  
                  <button onClick={logout} className="logout-btn">Logout</button>
                </div>
              )}
            </div>
          ) : (
            <Link to="/login" className="nav-login-link">
              Login / Register
            </Link>
          )}
        </div>

        {/* Cart */}
        <Link to="/cart" className="nav-cart">
          <FaShoppingCart size={20} />
          {cartCount > 0 && <span className="cart-count">{cartCount}</span>}
        </Link>

        {/* Mobile Toggle */}
        
      </div>
    </nav>
  );
};

export default Navbar;
