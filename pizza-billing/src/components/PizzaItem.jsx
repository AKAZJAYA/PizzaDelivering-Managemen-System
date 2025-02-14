import { useNavigate } from 'react-router-dom';
import { useAuth } from '../store/AuthContext';
import { useState } from 'react';

const PizzaItem = ({ pizza, addToCart }) => {
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const [selectedSize, setSelectedSize] = useState('large');
  const [isAdding, setIsAdding] = useState(false);

  const handleAddToCart = async () => {
    if (!isAuthenticated) {
      navigate('/login');
      return;
    }

    try {
      setIsAdding(true);
      const sizeAdjustedPizza = {
        pizzaId: pizza.id || pizza._id, // Handle both id formats
        name: pizza.name,
        size: selectedSize,
        price: selectedSize === 'small' ? 
          parseFloat(pizza.price) - 5 : 
          parseFloat(pizza.price),
        image: pizza.image
      };
      
      console.log('Adding pizza:', sizeAdjustedPizza); // Debug log
      await addToCart(sizeAdjustedPizza);
      navigate('/cart');
    } catch (err) {
      console.error('Error adding to cart:', err);
      alert('Failed to add item to cart. Please try again.');
    } finally {
      setIsAdding(false);
    }
  };

  // Calculate price based on size
  const getPrice = (size) => {
    const basePrice = parseFloat(pizza.price);
    return size === 'small' ? (basePrice - 5).toFixed(2) : basePrice.toFixed(2);
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-lg relative flex flex-col h-full">
      <img
        src={pizza.image}
        alt={pizza.name}
        className="w-full h-40 object-cover rounded-md mb-4"
        onError={(e) => {
          e.target.src = '/images/pizza-placeholder.jpg'; // Add a placeholder image
          console.error('Error loading image:', pizza.image);
        }}
      />
      <div className="flex-grow">
        <h3 className="text-xl font-semibold mb-2">{pizza.name}</h3>
        <p className="text-gray-600 mb-4">{pizza.description}</p>
        
        {/* Size Selection */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex space-x-2">
            <button
              onClick={() => setSelectedSize('small')}
              className={`px-3 py-1 rounded-full text-sm ${
                selectedSize === 'small'
                  ? 'bg-red-600 text-white'
                  : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
              }`}
              disabled={isAdding}
            >
              Small
            </button>
            <button
              onClick={() => setSelectedSize('large')}
              className={`px-3 py-1 rounded-full text-sm ${
                selectedSize === 'large'
                  ? 'bg-red-600 text-white'
                  : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
              }`}
              disabled={isAdding}
            >
              Large
            </button>
          </div>
          <span className="text-red-600 font-bold text-lg">
            ${getPrice(selectedSize)}
          </span>
        </div>

        <div className="flex justify-end">
          <button
            onClick={handleAddToCart}
            disabled={isAdding}
            className={`${
              isAdding ? 'bg-gray-400' : 'bg-red-600 hover:bg-red-700'
            } text-white py-2 px-4 rounded-full transition-all text-sm flex items-center`}
          >
            {isAdding ? (
              <>
                <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Adding...
              </>
            ) : (
              'Add to Cart'
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default PizzaItem;