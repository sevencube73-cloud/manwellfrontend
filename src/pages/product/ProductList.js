import React, { useEffect, useState } from 'react';
import '../../components/Layout/.css';
import ProductCard from '../components/product/ProductCard';
import './ProductList.css';
import api from '../utils/api';

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [newProducts, setNewProducts] = useState([]);
  const [flashSales, setFlashSales] = useState([]);
  const [recommended, setRecommended] = useState([]);
  const [topPicks, setTopPicks] = useState([]);

  useEffect(() => {
    api.get('/products')
      .then(res => {
        const data = res.data;
        setProducts(data);
        setNewProducts(data.filter(p => p.isNew));
        setFlashSales(data.filter(p => p.isFlashSale));
        setRecommended(data.filter(p => p.isRecommended));
        setTopPicks(data.filter(p => p.isTopPick));
      })
      .catch(err => console.error('Failed to load products', err));
  }, []);

  return (
    <div className="product-list-page">
      <h2>New Products In</h2>
      <div className="product-section">
        {newProducts.map(product => (
          <ProductCard key={product._id} product={product} />
        ))}
      </div>
      <h2>Flash Sales</h2>
      <div className="product-section">
        {flashSales.map(product => (
          <ProductCard key={product._id} product={product} />
        ))}
      </div>
      <h2>Recommended For You</h2>
      <div className="product-section">
        {recommended.map(product => (
          <ProductCard key={product._id} product={product} />
        ))}
      </div>
      <h2>Top Picks</h2>
      <div className="product-section">
        {topPicks.map(product => (
          <ProductCard key={product._id} product={product} />
        ))}
      </div>
      <h2>All Products</h2>
      <div className="product-section">
        {products.map(product => (
          <ProductCard key={product._id} product={product} />
        ))}
      </div>
    </div>
  );
};

export default ProductList;