import { createContext, useContext, useState, useEffect } from "react";
import axios from 'axios';

const CartContext = createContext();

export const useCart = () => {
  return useContext(CartContext);
};

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);
  const [loading, setLoading] = useState(true);

  // Add useEffect to fetch cart on mount
  useEffect(() => {
    fetchCart();
  }, []);

  const fetchCart = async () => {
    try {
      const response = await axios.get('http://localhost:3000/api/cart', {
        withCredentials: true
      });
      setCart(response.data);
    } catch (err) {
      console.error('Error fetching cart:', err);
    } finally {
      setLoading(false);
    }
  };

  const addToCart = async (pizza) => {
    try {
      const cartItem = {
        pizza_id: pizza.id,
        name: pizza.name,
        quantity: 1,
        size: pizza.size,
        price: parseFloat(pizza.price),
        image: pizza.image
      };

      console.log('Sending cart item:', cartItem); // Debug log

      const response = await axios.post('http://localhost:3000/api/cart', cartItem, {
        withCredentials: true,
        headers: {
          'Content-Type': 'application/json'
        }
      });

      if (response.data) {
        await fetchCart(); // Refresh cart after successful addition
        return response.data;
      }
    } catch (error) {
      console.error('Error adding to cart:', error);
      throw new Error(error.response?.data?.message || 'Failed to add to cart');
    }
  };

  const removeFromCart = async (id) => {
    try {
      await axios.delete(`http://localhost:3000/api/cart/remove/${id}`, {
        withCredentials: true
      });
      await fetchCart(); // Refresh cart after removing item
    } catch (err) {
      console.error('Error removing from cart:', err);
      throw new Error('Failed to remove item from cart');
    }
  };

  const clearCart = async () => {
    try {
      const token = localStorage.getItem('token');
      await axios.delete('http://localhost:3000/api/cart', {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      setCart([]);
    } catch (err) {
      console.error('Error clearing cart:', err);
    }
  };

  const updateCartItem = async (id, quantity) => {
    try {
      await axios.put(`http://localhost:3000/api/cart/update/${id}`, 
        { quantity },
        { withCredentials: true }
      );
      await fetchCart(); // Refresh cart after updating item
    } catch (err) {
      console.error('Error updating cart item:', err);
      throw new Error('Failed to update cart item');
    }
  };

  return (
    <CartContext.Provider value={{ 
      cart, 
      loading, 
      addToCart, 
      removeFromCart, 
      clearCart, 
      updateCartItem 
    }}>
      {children}
    </CartContext.Provider>
  );
};