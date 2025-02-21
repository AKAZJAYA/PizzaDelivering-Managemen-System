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
        pizza_id: pizza.pizzaid,
        name: pizza.name,
        quantity: 1,
        size: pizza.size,
        price: parseFloat(pizza.price),
        image_url: pizza.image
      };

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

  const removeFromCart = async (itemId) => {
    try {
      await axios.delete(`http://localhost:3000/api/cart/${itemId}`, {
        withCredentials: true
      });
      await fetchCart(); // Refresh cart after removing item
    } catch (err) {
      console.error('Error removing from cart:', err);
      throw new Error('Failed to remove item from cart');
    }
  };

  const clearCart = async () => {
    console.log('Clearing cart...');
    
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

  const updateCartItem = async (itemId, quantity) => {
    if (!itemId) {
      console.error('Item ID is missing');
      throw new Error('Item ID is required');
    }

    console.log('Updating item:', { itemId, quantity });
    
    try {
      const response = await axios.put(
        `http://localhost:3000/api/cart/${itemId}`, 
        { quantity },
        { 
          withCredentials: true,
          headers: {
            'Content-Type': 'application/json'
          }
        }
      );

      if (response.data) {
        await fetchCart(); // Refresh cart after updating item
      }
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