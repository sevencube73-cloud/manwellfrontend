import React from "react";
import ProductList from "../components/product/ProductList";
import "./HomePage.css";

const HomePage = () => {
  return (
    <div className="products-section">
      {/* Hero Section */}
      <section>
        <h2 className="section-title">MANWELL STORE</h2>
        <ProductList />
      </section>
    </div>
  );
};

export default HomePage;
