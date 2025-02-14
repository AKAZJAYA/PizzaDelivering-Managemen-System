import { Link } from "react-router-dom";
import CartItem from "../components/CartItem";
import { useCart } from "../store/CartContext";
import { FaTrash } from "react-icons/fa";
import { useState } from "react";

const Cart = () => {
  const { cart, loading, removeFromCart, clearCart, updateCartItem } = useCart();
  const [error, setError] = useState(null);

  const handleRemoveFromCart = async (itemId) => {
    try {
      await removeFromCart(itemId);
    } catch (err) {
      setError('Failed to remove item from cart');
      console.error('Error removing item:', err);
    }
  };

  const handleClearCart = async () => {
    try {
      await clearCart();
    } catch (err) {
      setError('Failed to clear cart');
      console.error('Error clearing cart:', err);
    }
  };

  const totalPrice = cart.reduce((total, item) => {
    return total + (parseFloat(item.price) * item.quantity)
  }, 0).toFixed(2);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-red-600"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-10">
        <p className="text-red-600 mb-4">{error}</p>
        <button 
          onClick={() => setError(null)}
          className="text-blue-600 underline"
        >
          Try Again
        </button>
      </div>
    );
  }

  return (
    <div className="py-10 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="flex justify-between items-center mb-10">
          <h1 className="text-4xl font-bold text-red-600">Your Cart</h1>
          {cart.length > 0 && (
            <button
              onClick={handleClearCart}
              className="flex items-center space-x-2 bg-gray-200 text-gray-700 px-4 py-2 rounded-full hover:bg-gray-300"
            >
              <FaTrash />
              <span>Clear Cart</span>
            </button>
          )}
        </div>

        {cart.length === 0 ? (
          <div className="text-center py-10">
            <p className="text-lg text-gray-500 mb-6">Your cart is empty.</p>
            <Link
              to="/menu"
              className="bg-red-600 text-white px-6 py-3 rounded-full hover:bg-red-700 transition-all"
            >
              Browse Menu
            </Link>
          </div>
        ) : (
          <div>
            <div className="space-y-4 mb-8">
              {cart.map((item) => (
                <CartItem 
                  key={item._id} 
                  item={item} 
                  removeFromCart={handleRemoveFromCart}
                  updateQuantity={(quantity) => updateCartItem(item._id, quantity)}
                />
              ))}
            </div>

            <div className="bg-white p-6 rounded-lg shadow-lg">
              <div className="flex justify-between items-center mb-4">
                <span className="text-gray-600">Subtotal:</span>
                <span className="text-xl font-semibold">${totalPrice}</span>
              </div>

              <Link
                to="/checkout"
                className="block w-full bg-red-600 text-white text-center py-3 rounded-full hover:bg-red-700 transition-all"
              >
                Proceed to Checkout
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Cart;