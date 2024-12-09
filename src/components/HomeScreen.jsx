import React, { useContext } from 'react';
import { CartContext } from '../context/CartContext';
import products from '../data/products'; // Import product data
import '../styles/HomeScreen.css';

export default function HomeScreen() {
  const { addToCart } = useContext(CartContext);

  return (
    <div className="home-screen">
      <h1>Electronics Store</h1>
      <div className="product-grid">
        {products.Electronics.map((product) => (
          <div className="product-card" key={product.id}>
            <img src={product.image} alt={product.name} />
            <h2>{product.name}</h2>
            <p>Price: RM{product.price}</p>
            <button onClick={() => addToCart(product, 1)}>Add to Cart</button>
          </div>
        ))}
      </div>
    </div>
  );
}
