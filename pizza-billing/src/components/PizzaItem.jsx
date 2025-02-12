import { useNavigate } from 'react-router-dom';
import { useAuth } from '../store/AuthContext';

const PizzaItem = ({ pizza, addToCart }) => {
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();

  const handleAddToCart = () => {
    if (!isAuthenticated) {
      navigate('/login');
    } else {
      addToCart();
    }
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-lg relative flex flex-col h-full">
      <img
        src={pizza.image}
        alt={pizza.name}
        className="w-full h-40 object-cover rounded-md mb-4"
      />
      <div className="flex-grow">
        <h3 className="text-xl font-semibold mb-2">{pizza.name}</h3>
        <p className="text-gray-600 mb-4">{pizza.description}</p>
        <div className="flex justify-between items-end mt-auto">
          <span className="text-red-600 font-bold text-lg">${pizza.price}</span>
          <button
            onClick={handleAddToCart}
            className="bg-red-600 text-white py-2 px-4 rounded-full hover:bg-red-700 transition-all text-sm"
          >
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
};

export default PizzaItem;