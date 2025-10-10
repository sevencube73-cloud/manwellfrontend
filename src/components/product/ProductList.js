import React, { useEffect, useState } from 'react';
import api from '../../utils/api';
import ProductCard from './ProductCard';
import './ProductList.css'; // Import styles

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [keyword, setKeyword] = useState('');
  const [category, setCategory] = useState('');
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const fetchCategories = async () => {
      const { data } = await api.get('/products/categories');
      setCategories(data);
    };
    fetchCategories();
  }, []);

  useEffect(() => {
    const fetchProducts = async () => {
      const { data } = await api.get('/products', {
        params: { keyword, category }
      });
      setProducts(data);
    };
    fetchProducts();
  }, [keyword, category]);

  return (
    <div className="product-list-container">
      {/* Search and Filter Section */}
      <div className="filter-bar">
        <input
          type="text"
          placeholder="🔍 Search products..."
          value={keyword}
          onChange={e => setKeyword(e.target.value)}
          className="search-input"
        />

        <select
          value={category}
          onChange={e => setCategory(e.target.value)}
          className="category-select"
        >
          <option value="">All Categories</option>
          {categories.map(cat => (
            <option key={cat} value={cat}>{cat}</option>
          ))}
        </select>
      </div>

      {/* Products Grid */}
      <div className="products-grid">
        {products.length > 0 ? (
          products.map(product => (
            <ProductCard key={product._id} product={product} />
          ))
        ) : (
          <p className="no-products">No products found 🚫</p>
        )}
      </div>
    </div>
  );
};

export default ProductList;
