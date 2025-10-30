import React, { useState } from "react";
import "./ShippingAddressForm.css";

const kenyaCounties = [
  "Baringo", "Bomet", "Bungoma", "Busia", "Elgeyo-Marakwet", "Embu", "Garissa",
  "Homa Bay", "Isiolo", "Kajiado", "Kakamega", "Kericho", "Kiambu", "Kilifi",
  "Kirinyaga", "Kisii", "Kisumu", "Kitui", "Kwale", "Laikipia", "Lamu",
  "Machakos", "Makueni", "Mandera", "Marsabit", "Meru", "Migori", "Mombasa",
  "Murang'a", "Nairobi", "Nakuru", "Nandi", "Narok", "Nyamira", "Nyandarua",
  "Nyeri", "Samburu", "Siaya", "Taita Taveta", "Tana River", "Tharaka-Nithi",
  "Trans Nzoia", "Turkana", "Uasin Gishu", "Vihiga", "Wajir", "West Pokot"
];

// East African countries (common grouping plus nearby island nations)
const eastAfricanCountries = [
  "Kenya",
  "Uganda",
  "Tanzania",
  "Rwanda",
  "Burundi",
  "South Sudan",
  "Ethiopia",
  "Somalia",
  "Djibouti",
  "Eritrea",
  "Seychelles",
  "Comoros",
  "Madagascar",
  "Mauritius"
];

const ShippingAddressForm = ({ onSubmit }) => {
  const [formData, setFormData] = useState({
    fullName: "",
    phone: "",
    address: "",
    city: "", // will hold county or city
    postalCode: "",
    country: "Kenya",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Shipping form data:", formData);

    onSubmit(formData); // city field already exists
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
          {/* County selector when Kenya is selected, otherwise free-text city/region */}
          {formData.country === "Kenya" ? (
            <select
              name="city"
              value={formData.city}
              onChange={handleChange}
              required
            >
              <option value="">Select County</option>
              {kenyaCounties.map((county) => (
                <option key={county} value={county}>
                  {county}
                </option>
              ))}
            </select>
          ) : (
            <input
              type="text"
              name="city"
              placeholder="City / Region"
              value={formData.city}
              onChange={handleChange}
              required
            />
          )}

          <input
            type="text"
            name="postalCode"
            placeholder="Postal Code"
            value={formData.postalCode}
            onChange={handleChange}
            required
          />
        </div>

        {/* Country select: East African countries + UK + US */}
        <select name="country" value={formData.country} onChange={handleChange} required>
          {eastAfricanCountries.map((c) => (
            <option key={c} value={c}>
              {c}
            </option>
          ))}
          <option value="United Kingdom">United Kingdom</option>
          <option value="United States">United States</option>
        </select>

        <button type="submit" className="shipping-btn">
          Continue to Payment
        </button>
      </form>
    </div>
  );
};

export default ShippingAddressForm;
