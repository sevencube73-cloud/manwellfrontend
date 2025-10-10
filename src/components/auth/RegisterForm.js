import React, { useState } from 'react';
import api from '../../utils/api';
import './auth-form.css';

const bgSvg = (
  <div className="auth-form-bg">
    <svg width="180" height="180" style={{top: '10%', left: '5%'}}>
      <circle cx="90" cy="90" r="80" fill="#007bff" />
    </svg>
    <svg width="120" height="120" style={{bottom: '10%', right: '8%'}}>
      <rect x="20" y="20" width="80" height="80" rx="30" fill="#4CAF50" />
    </svg>
  </div>
);

const RegisterForm = () => {
  const [form, setForm] = useState({ name: '', email: '', password: '', phone: '', address: '' });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleChange = e => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async e => {
    e.preventDefault();
    setError('');
    setSuccess('');
    if (!form.name || !form.email || !form.password) {
      setError('Name, email, and password are required');
      return;
    }
    try {
      await api.post('/auth/register', form);
      setSuccess('Registration successful. Please check your email to verify your account.');
      setForm({ name: '', email: '', password: '', phone: '', address: '' });
    } catch (err) {
      setError(err.response?.data?.message || 'Registration failed');
    }
  };

  return (
    <>
      {bgSvg}
      <div className="auth-form-container">
        <form onSubmit={handleSubmit} noValidate className="auth-form">
          {error && <p className="error">{error}</p>}
          {success && <p className="success">{success}</p>}
          <div className="auth-form-input-group">
            <input name="name" placeholder="Full Name" value={form.name} onChange={handleChange} required />
            <span className="auth-form-icon" role="img" aria-label="user">👤</span>
          </div>
          <div className="auth-form-input-group">
            <input name="email" type="email" placeholder="Email" value={form.email} onChange={handleChange} required />
            <span className="auth-form-icon" role="img" aria-label="email">📧</span>
          </div>
          <div className="auth-form-input-group">
            <input name="password" type="password" placeholder="Password" value={form.password} onChange={handleChange} required />
            <span className="auth-form-icon" role="img" aria-label="lock">🔒</span>
          </div>
          <div className="auth-form-input-group">
            <input name="phone" placeholder="Phone" value={form.phone} onChange={handleChange} />
            <span className="auth-form-icon" role="img" aria-label="phone">📱</span>
          </div>
          <div className="auth-form-input-group">
            <input name="address" placeholder="Address" value={form.address} onChange={handleChange} />
            <span className="auth-form-icon" role="img" aria-label="address">🏠</span>
          </div>
          <button type="submit">Register</button>
        </form>
      </div>
    </>
  );
};

export default RegisterForm;