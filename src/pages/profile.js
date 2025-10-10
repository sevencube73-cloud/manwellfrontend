import React, { useContext, useState, useEffect } from 'react';
import '../components/Layout/.css';
import api from '../utils/api';
import { AuthContext } from '../context/AuthContext';
import './profile.css';

const sidebarLinks = [
  { label: 'My Account', to: '/profile', icon: '👤' },
  { label: 'Orders', to: '/orders', icon: '🛒' },
  // { label: 'Inbox', to: '/inbox', icon: '✉️' },
  // { label: 'Vouchers', to: '/vouchers', icon: '🎟️' },
  // { label: 'Wishlist', to: '/wishlist', icon: '❤️' },
  // { label: 'Recently Viewed', to: '/recently-viewed', icon: '⏳' },
];

const ProfilePage = () => {
  const { user, token, logout, login } = useContext(AuthContext);
  const [form, setForm] = useState({ name: '', email: '', phone: '', address: '', city: '', postalCode: '', country: '' });
  const [message, setMessage] = useState('');

  useEffect(() => {
    if (user) {
      setForm({
        name: user.name,
        email: user.email,
        phone: user.phone || '',
        address: user.address || '',
        city: user.city || '',
        postalCode: user.postalCode || '',
        country: user.country || '',
      });
    }
  }, [user]);

  const handleChange = e => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async e => {
    e.preventDefault();
    setMessage('');
    try {
      const { data } = await api.put('/users/profile', form);
      login(data, token); 
      setMessage('Profile updated successfully.');
    } catch (err) {
      setMessage(err.response?.data?.message || 'Update failed.');
    }
  };

  if (!user) {
    return <p className="profile-message">Please login to view profile.</p>;
  }

  return (
    <div className="account-layout">
      {/* Sidebar */}
      <aside className="account-sidebar">
        <h3 className="sidebar-title">My Account</h3>
        <ul className="sidebar-nav">
          {sidebarLinks.map(link => (
            <li key={link.label}>
              <a href={link.to} className="sidebar-link">
                <span>{link.icon}</span> {link.label}
              </a>
            </li>
          ))}
        </ul>
        <button onClick={logout} className="sidebar-logout">Log Out</button>
      </aside>

      {/* Main Content */}
      <main className="account-main">
        <h2 className="account-title">Account Overview</h2>
        <div className="account-grid">
          
          {/* Account Details */}
          <div className="account-card">
            <div className="account-card-header">Account Details</div>
            <div className="account-card-body">
              <p>{form.name}</p>
              <p>{form.email}</p>
              <p>{form.phone || 'No phone added'}</p>
            </div>
          </div>

          {/* Address Book */}
          <div className="account-card">
            <div className="account-card-header">
              Address Book
              <span className="account-edit">✎</span>
            </div>
            <div className="account-card-body">
              {form.address ? (
                <p>{form.address}, {form.city}, {form.country} - {form.postalCode}</p>
              ) : (
                <p>No address added yet.</p>
              )}
            </div>
          </div>

          {/* Store Credit */}
          <div className="account-card">
            <div className="account-card-header">Store Credit</div>
            <div className="account-card-body">
              <p>Balance: KSh 0</p>
            </div>
          </div>

          {/* Newsletter */}
          <div className="account-card">
            <div className="account-card-header">Newsletter Preferences</div>
            <div className="account-card-body">
              <p>Manage your email communications to stay updated with latest news and offers.</p>
              <a href="#">Edit Newsletter Preferences</a>
            </div>
          </div>

        </div>
      </main>
    </div>
  );
};

export default ProfilePage;
