import React, { useState } from "react";
import "./ShippingAddressForm.css";

const ShippingAddressForm = ({ onSubmit }) => {
  const [formData, setFormData] = useState({
    fullName: "",
    phone: "",
    address: "",
    city: "",
    postalCode: "",
    country: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <div className="shipping-form-container">
      <h2 className="shipping-title">Shipping Address</h2>
      <form className="shipping-form" onSubmit={handleSubmit}>
        <div className="form-row">
          <input
            type="text"
            name="fullName"
            placeholder="Full Name"
            value={formData.fullName}
            onChange={handleChange}
            required
          />
          <input
            type="tel"
            name="phone"
            placeholder="Phone Number"
            value={formData.phone}
            onChange={handleChange}
            required
          />
        </div>

        <textarea
          name="address"
          placeholder="Street Address"
          value={formData.address}
          onChange={handleChange}
          required
        ></textarea>

        <div className="form-row">
          <input
            type="text"
            name="city"
            placeholder="City"
            value={formData.city}
            onChange={handleChange}
            required
          />
          <input
            type="text"
            name="postalCode"
            placeholder="Postal Code"
            value={formData.postalCode}
            onChange={handleChange}
            required
          />
        </div>

        <input
          type="text"
          name="country"
          placeholder="Country"
          value={formData.country}
          onChange={handleChange}
          required
        />

        <button type="submit" className="shipping-btn">
          Continue to Payment
        </button>
      </form>
    </div>
  );
};

export default ShippingAddressForm;
