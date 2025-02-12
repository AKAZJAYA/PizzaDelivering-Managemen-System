import { useState, useEffect } from 'react';
import axios from 'axios';

const UpdatePizza = () => {
  const [pizzas, setPizzas] = useState([]);
  const [selectedPizza, setSelectedPizza] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const categories = ['Vegetarian', 'Classic', 'Supreme', 'Signature', 'Favorite'];

  useEffect(() => {
    fetchPizzas();
  }, []);

  const fetchPizzas = async () => {
    try {
      const response = await axios.get('http://localhost:3000/api/pizzas');
      setPizzas(response.data);
    } catch (err) {
      setError('Failed to fetch pizzas');
    }
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await axios.put(`http://localhost:3000/api/pizzas/${selectedPizza.id}`, selectedPizza);
      alert('Pizza updated successfully!');
      fetchPizzas();
      setSelectedPizza(null);
    } catch (err) {
      setError('Failed to update pizza');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-gray-800">Update Pizza</h2>
      
      {/* Pizza Selection */}
      <div className="bg-white p-6 rounded-lg shadow-md">
        <select 
          className="w-full p-2 border rounded"
          onChange={(e) => setSelectedPizza(pizzas.find(p => p.id === e.target.value))}
        >
          <option value="">Select a pizza to update</option>
          {pizzas.map((pizza) => (
            <option key={pizza.id} value={pizza.id}>{pizza.name}</option>
          ))}
        </select>
      </div>

      {/* Update Form */}
      {selectedPizza && (
        <form onSubmit={handleUpdate} className="bg-white p-6 rounded-lg shadow-md space-y-4">
          <div>
            <label className="block text-gray-700 font-semibold mb-2">Name</label>
            <input
              type="text"
              value={selectedPizza.name}
              onChange={(e) => setSelectedPizza({...selectedPizza, name: e.target.value})}
              className="w-full p-2 border rounded"
            />
          </div>

          <div>
            <label className="block text-gray-700 font-semibold mb-2">Description</label>
            <textarea
              value={selectedPizza.description}
              onChange={(e) => setSelectedPizza({...selectedPizza, description: e.target.value})}
              className="w-full p-2 border rounded"
            />
          </div>

          <div>
            <label className="block text-gray-700 font-semibold mb-2">Price</label>
            <input
              type="number"
              step="0.01"
              value={selectedPizza.price}
              onChange={(e) => setSelectedPizza({...selectedPizza, price: e.target.value})}
              className="w-full p-2 border rounded"
            />
          </div>

          <div>
            <label className="block text-gray-700 font-semibold mb-2">Category</label>
            <select
              value={selectedPizza.category}
              onChange={(e) => setSelectedPizza({...selectedPizza, category: e.target.value})}
              className="w-full p-2 border rounded"
            >
              {categories.map(category => (
                <option key={category} value={category}>{category}</option>
              ))}
            </select>
          </div>

          <button
            type="submit"
            disabled={loading}
            className={`w-full py-2 rounded text-white ${loading ? 'bg-gray-400' : 'bg-red-600 hover:bg-red-700'}`}
          >
            {loading ? 'Updating...' : 'Update Pizza'}
          </button>
        </form>
      )}
    </div>
  );
};

export default UpdatePizza;