import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import './AdminDashboard.css';

const adminNavLinks = [
  { label: 'Dashboard', to: '/admin/dashboard' },
  { label: 'Products', to: '/admin/products' },
  { label: 'Orders', to: '/admin/orders' },
  { label: 'Customers', to: '/admin/customers' },
  { label: 'Manage Returns', to: '/admin/returns' },
  
];

const AdminNavbar = () => {
  const location = useLocation();
  return (
    <nav className="admin-navbar-flex">
  <div className="admin-navbar-title">MANWELL</div>
      <ul className="admin-navbar-links-flex">
        {adminNavLinks.map(link => (
          <li key={link.label}>
            <Link
              to={link.to}
              className={location.pathname === link.to ? 'active' : ''}
            >
              {link.label}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default AdminNavbar;
