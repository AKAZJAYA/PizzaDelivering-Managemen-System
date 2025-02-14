import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const PizzaList = () => {
  const [pizzas, setPizzas] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPizzas = async () => {
      try {
        const response = await axios.get('http://localhost:3000/api/pizzas', {
          withCredentials: true
        });
        setPizzas(response.data);
      } catch (err) {
        setError('Failed to fetch pizzas');
      } finally {
        setLoading(false);
      }
    };

    fetchPizzas();
  }, []);

  const handlePizzaClick = (pizzaId) => {
    if (pizzaId) {
      navigate(`/admin/update-pizza/${pizzaId}`);
    } else {
      console.error('Pizza ID is undefined');
    }
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-6">Update Pizzas</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {pizzas.map((pizza) => (
          <div 
            key={pizza._id || pizza.id}
            className="bg-white rounded-lg shadow-md overflow-hidden cursor-pointer hover:shadow-lg transition-shadow"
            onClick={() => handlePizzaClick(pizza._id || pizza.id)}
          >
            <img 
              src={pizza.image_url || pizza.image}
              alt={pizza.name}
              className="w-full h-48 object-cover"
              onError={(e) => {
                e.target.src = '/default-pizza.jpg';
              }}
            />
            <div className="p-4">
              <h3 className="text-xl font-semibold">{pizza.name}</h3>
              <p className="text-gray-600">${typeof pizza.price === 'number' ? pizza.price.toFixed(2) : pizza.price}</p>
              <p className="text-sm text-gray-500">{pizza.category}</p>
              <p className="text-xs text-gray-400">ID: {pizza._id || pizza.id}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PizzaList;