import { useState, useEffect } from 'react';
import { FaPlus, FaMinus, FaTrash } from 'react-icons/fa';
import axios from 'axios';

const CartItem = ({ item, removeFromCart, updateQuantity }) => {
  const [isUpdating, setIsUpdating] = useState(false);
  const [pizzaDetails, setPizzaDetails] = useState(null);

  // Fetch pizza details when component mounts
  useEffect(() => {
    const fetchPizzaDetails = async () => {
      try {
        const response = await axios.get(`http://localhost:3000/api/pizzas/${item.pizza_id}`, {
          withCredentials: true
        });
        setPizzaDetails(response.data);
      } catch (err) {
        console.error('Error fetching pizza details:', err);
      }
    };

    fetchPizzaDetails();
  }, [item.pizza_id]);

  const handleQuantityChange = async (newQuantity) => {
    if (newQuantity < 1) return;
    try {
      setIsUpdating(true);
      // Log the item details to verify the ID
      console.log('Updating cart item:', item);
      
      // Use item._id for MongoDB documents
      await updateQuantity(item.id, newQuantity);
    } catch (err) {
      console.error('Error updating quantity:', err);
      alert('Failed to update quantity. Please try again.');
    } finally {
      setIsUpdating(false);
    }
  };

  const itemTotal = (parseFloat(item.price) * item.quantity).toFixed(2);

  // console.log('CartItem:', item); // Debug log
  
  return (
    <div className="bg-white p-4 rounded-lg shadow-lg">
      <div className="flex items-center justify-between">
        <div className="flex items-center flex-1">
          <img
            src={pizzaDetails?.image}
            alt={pizzaDetails?.name || 'Pizza'}
            className="w-20 h-20 object-cover rounded-md mr-4"
            onError={(e) => {
              e.target.onerror = null; // Prevent infinite loop
              e.target.src = '/images/pizza-placeholder.jpg';
            }}
          />
          <div>
            <h3 className="font-semibold text-lg">{pizzaDetails?.name || 'Loading...'}</h3>
            <p className="text-sm text-gray-500">Size: {item.size}</p>
            <span className="text-red-600">${parseFloat(item.price).toFixed(2)}</span>
          </div>
        </div>

        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-2">
            <button
              onClick={() => handleQuantityChange(item.quantity - 1)}
              disabled={isUpdating || item.quantity <= 1}
              className="p-1 rounded-full hover:bg-gray-100 disabled:opacity-50"
            >
              <FaMinus className="text-gray-600" />
            </button>
            <span className="w-8 text-center">{item.quantity}</span>
            <button
              onClick={() => handleQuantityChange(item.quantity + 1)}
              disabled={isUpdating}
              className="p-1 rounded-full hover:bg-gray-100 disabled:opacity-50"
            >
              <FaPlus className="text-gray-600" />
            </button>
          </div>

          <div className="w-24 text-right font-semibold">
            ${itemTotal}
          </div>

          <button
            onClick={() => removeFromCart(item.id)} // Use _id instead of id
            disabled={isUpdating}
            className="p-2 text-red-600 hover:bg-red-50 rounded-full"
          >
            <FaTrash />
          </button>
        </div>
      </div>
    </div>
  );
};

export default CartItem;