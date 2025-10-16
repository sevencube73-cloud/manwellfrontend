import React from "react";
import ProductList from "../components/product/ProductList";
import "./HomePage.css";

const HomePage = () => {
  const phoneNumber = "+254712345678"; // 🔹 replace with your actual business number

  return (
    <div className="products-section">
      {/* Hero Section */}
      <section className="hero-section">
        <h2 className="section-title">MANWELL STORE</h2>
        <p className="hero-tagline">
          Premium fashion in Eastleigh — where style meets quality.
        </p>

        {/* ✅ Call to Order Button */}
        <a href={`tel:${phoneNumber}`} className="call-button">
          📞 Call to Order
        </a>
      </section>

      {/* Products */}
      <ProductList />
    </div>
  );
};

export default HomePage;
