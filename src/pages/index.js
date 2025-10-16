import React from "react";
import ProductList from "../components/product/ProductList";
import "./HomePage.css";

const HomePage = () => {
  return (
    <div className="products-section">
      {/* Hero Section */}
      <section>
        <h2 className="section-title">Welcome, Manwell Store</h2>
        <ProductList />
      </section>
    </div>
  );
};

export default HomePage;
