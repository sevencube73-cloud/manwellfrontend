import React, { useEffect, useState } from 'react';
import api from '../../utils/api';
import './Discounts.css';

export default function DiscountsAdmin() {
  const [discounts, setDiscounts] = useState([]);
  const [coupons, setCoupons] = useState([]);
  const [form, setForm] = useState({
    name: '',
    discountType: 'percent',
    amount: 10,
    product: '',
    startsAt: '',
    endsAt: '',
    active: true,
  });
  const [couponForm, setCouponForm] = useState({
    code: '',
    discountType: 'percent',
    amount: 10,
    minOrderValue: 0,
    maxUses: 0,
    expiresAt: '',
    active: true,
  });

  useEffect(() => {
    fetchAll();
  }, []);

  async function fetchAll() {
    try {
      const d = await api.get('/discounts/discounts'); // GET all discounts
      const c = await api.get('/coupons');             // GET all coupons
      setDiscounts(d.data);
      setCoupons(c.data);
    } catch (error) {
      console.error(error);
    }
  }

  async function createDiscount(e) {
    e.preventDefault();
    try {
      await api.post('/discounts/discount', form); // POST discount
      fetchAll();
      setForm({ name: '', discountType: 'percent', amount: 10, product: '', startsAt: '', endsAt: '', active: true });
    } catch (error) {
      console.error(error);
    }
  }

  async function createCoupon(e) {
    e.preventDefault();
    try {
      await api.post('/coupons', couponForm); // POST coupon
      fetchAll();
      setCouponForm({ code: '', discountType: 'percent', amount: 10, minOrderValue: 0, maxUses: 0, expiresAt: '', active: true });
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <div className="discounts-admin">
      <h1>🎯 Discounts & Coupons Management</h1>

      {/* DISCOUNTS SECTION */}
      <div className="admin-section">
        <h2>💸 Manage Discounts</h2>
        <form className="admin-form" onSubmit={createDiscount}>
          <input placeholder="Discount Name" value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} required />
          <select value={form.discountType} onChange={e => setForm({ ...form, discountType: e.target.value })}>
            <option value="percent">Percent</option>
            <option value="fixed">Fixed</option>
          </select>
          <input type="number" placeholder="Amount" value={form.amount} onChange={e => setForm({ ...form, amount: +e.target.value })} required />
          <input placeholder="Product ID (optional)" value={form.product} onChange={e => setForm({ ...form, product: e.target.value })} />
          <button type="submit" className="btn-primary">Add Discount</button>
        </form>

        <div className="list-section">
          <h3>🧾 Existing Discounts</h3>
          <div className="card-grid">
            {discounts.map(d => (
              <div className="card" key={d._id}>
                <h4>{d.name}</h4>
                <p><strong>Type:</strong> {d.discountType}</p>
                <p><strong>Amount:</strong> {d.amount}</p>
                <p className={d.active ? 'status-active' : 'status-inactive'}>{d.active ? 'Active' : 'Inactive'}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* COUPONS SECTION */}
      <div className="admin-section">
        <h2>🎟️ Manage Coupons</h2>
        <form className="admin-form" onSubmit={createCoupon}>
          <input placeholder="Coupon Code" value={couponForm.code} onChange={e => setCouponForm({ ...couponForm, code: e.target.value })} required />
          <select value={couponForm.discountType} onChange={e => setCouponForm({ ...couponForm, discountType: e.target.value })}>
            <option value="percent">Percent</option>
            <option value="fixed">Fixed</option>
          </select>
          <input type="number" placeholder="Amount" value={couponForm.amount} onChange={e => setCouponForm({ ...couponForm, amount: +e.target.value })} required />
          <button type="submit" className="btn-primary">Add Coupon</button>
        </form>

        <div className="list-section">
          <h3>🎫 Existing Coupons</h3>
          <div className="card-grid">
            {coupons.map(c => (
              <div className="card" key={c._id}>
                <h4>{c.code}</h4>
                <p><strong>Type:</strong> {c.discountType}</p>
                <p><strong>Amount:</strong> {c.amount}</p>
                <p className={c.active ? 'status-active' : 'status-inactive'}>{c.active ? 'Active' : 'Inactive'}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
