import React from "react";
import ProductList from "../components/product/ProductList";
import { Helmet } from "react-helmet";
import "./HomePage.css";

const HomePage = () => {
  const getTimeBasedGreeting = () => {
    const hour = new Date().getHours();
    if (hour >= 5 && hour < 12) {
      return "Good Morning";
    } else if (hour >= 12 && hour < 18) {
      return "Good Afternoon";
    } else {
      return "Good Evening";
    }
  };

  return (
    <div className="products-section">
      <Helmet>
        {/* Home Page Meta Tags */}
        <title>Manwell Store | Trendy Fashion Clothing in Eastleigh, Nairobi</title>
        <meta
          name="description"
          content="Shop premium quality fashion for men & women at Manwell Store. Affordable, stylish, and latest trends in Eastleigh. Visit us or shop online now!"
        />
        <meta name="keywords" content="fashion store, Eastleigh fashion, trendy clothes, Manwell Store, men fashion, women fashion, Nairobi clothing" />
        <meta name="author" content="Manwell Store" />

        {/* Optional Open Graph / Social Sharing */}
        <meta property="og:title" content="Manwell Store | Trendy Fashion Clothing in Eastleigh, Nairobi" />
        <meta property="og:description" content="Shop premium quality fashion for men & women at Manwell Store. Affordable, stylish, and latest trends in Eastleigh. Visit us or shop online now!" />
        <meta property="og:type" content="website" />
        <meta property="og:image" content="URL_TO_YOUR_HERO_IMAGE" />
        <meta property="og:url" content="https://yourstorewebsite.com" />

        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Manwell Store | Trendy Fashion Clothing in Eastleigh, Nairobi" />
        <meta name="twitter:description" content="Shop premium quality fashion for men & women at Manwell Store. Affordable, stylish, and latest trends in Eastleigh. Visit us or shop online now!" />
        <meta name="twitter:image" content="URL_TO_YOUR_HERO_IMAGE" />
      </Helmet>

      {/* Hero Section */}
      <section>
        <h2 className="section-title">{getTimeBasedGreeting()}</h2>
        <p className="section-tagline">Manwell Store, Your one-stop destination for trendy fashion in Nairobi</p>
        <ProductList />
      </section>
    </div>
  );
};

export default HomePage;
