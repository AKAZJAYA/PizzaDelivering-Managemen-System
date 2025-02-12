import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const AddPizza = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    price: '',
    image: '',
    category: 'Vegetarian'
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const categories = ['Vegetarian', 'Classic', 'Supreme', 'Signature', 'Favorite'];

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      // Get token from localStorage
      const token = localStorage.getItem('token');

      // Format price as number
      const requestData = {
        ...formData,
        price: parseFloat(formData.price) // Convert price to number
      };

      // Add auth header and content type
      const config = {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      };

      await axios.post('http://localhost:3000/api/pizzas', requestData, config);
      alert('Pizza added successfully!');
      navigate('/admin/inventory');
    } catch (err) {
      console.error('Error adding pizza:', err);
      setError(err.response?.data?.message || 'Failed to add pizza. Please check your authorization.');
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <div className="min-h-screen py-20 bg-gray-100">
      <div className="container mx-auto px-4">
        <div className="max-w-md mx-auto bg-white rounded-lg shadow-lg p-8">
          <h2 className="text-3xl font-bold text-center mb-8 text-red-600">Add New Pizza</h2>

          {error && (
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-gray-700 font-semibold mb-2">
                Pizza Name
              </label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-600"
                required
              />
            </div>

            <div>
              <label className="block text-gray-700 font-semibold mb-2">
                Description
              </label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-600"
                rows="3"
                required
              />
            </div>

            <div>
              <label className="block text-gray-700 font-semibold mb-2">
                Price ($)
              </label>
              <input
                type="text"
                name="price"
                value={formData.price}
                onChange={handleChange}
                step="0.01"
                className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-600"
                required
              />
            </div>

            <div>
              <label className="block text-gray-700 font-semibold mb-2">
                Image URL
              </label>
              <input
                type="text"
                name="image"
                value={formData.image}
                onChange={handleChange}
                className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-600"
                required
              />
            </div>

            <div>
              <label className="block text-gray-700 font-semibold mb-2">
                Category
              </label>
              <select
                name="category"
                value={formData.category}
                onChange={handleChange}
                className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-600"
                required
              >
                {categories.map(category => (
                  <option key={category} value={category}>
                    {category}
                  </option>
                ))}
              </select>
            </div>

            <button
              type="submit"
              disabled={loading}
              className={`w-full py-3 rounded-full text-white font-semibold ${
                loading ? 'bg-gray-400' : 'bg-red-600 hover:bg-red-700'
              }`}
            >
              {loading ? 'Adding...' : 'Add Pizza'}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddPizza;