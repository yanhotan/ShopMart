import React, { useContext } from 'react';
import { CartContext } from '../context/CartContext';
import '../styles/CartScreen.css';

export default function CartScreen() {
  const { cartItems, checkoutCart } = useContext(CartContext);

  const calculateTotal = () =>
    cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);

  return (
    <div className="cart-screen">
      <h1>Your Cart</h1>
      {cartItems.length === 0 ? (
        <p>No items in the cart</p>
      ) : (
        <>
          <ul>
            {cartItems.map((item) => (
              <li key={item.id}>
                {item.name} - RM{item.price} x {item.quantity}
              </li>
            ))}
          </ul>
          <p>Total: RM{calculateTotal()}</p>
          <button onClick={checkoutCart}>Checkout</button>
        </>
      )}
    </div>
  );
}
