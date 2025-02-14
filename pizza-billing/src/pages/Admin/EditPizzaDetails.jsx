import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

const EditPizzaDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [pizza, setPizza] = useState({
    name: '',
    description: '',
    price: '',
    image: '',
    category: ''
  });
  
  const categories = ['Vegetarian', 'Classic', 'Supreme', 'Signature', 'Favorite'];

  useEffect(() => {
    const fetchPizza = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get(`http://localhost:3000/api/pizzas/${id}`, {
          headers: { 'Authorization': `Bearer ${token}` }
        });
        
        // Log the response to see the data structure
        console.log('Pizza data:', response.data);
        
        // Set the pizza data
        setPizza({
          name: response.data.name || '',
          description: response.data.description || '',
          price: response.data.price || '',
          image: response.data.image || '',
          category: response.data.category || ''
        });
        
      } catch (err) {
        console.error('Error fetching pizza:', err);
        setError('Failed to fetch pizza details');
      } finally {
        setLoading(false);
      }
    };

    fetchPizza();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setPizza(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const token = localStorage.getItem('token');
      await axios.put(
        `http://localhost:3000/api/pizzas/${id}`,
        {
          name: pizza.name,
          description: pizza.description,
          price: parseFloat(pizza.price),
          category: pizza.category,
          image: pizza.image
        },
        {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        }
      );
      alert('Pizza updated successfully!');
      navigate('/admin/update-pizza');
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to update pizza');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async () => {
    if (!window.confirm('Are you sure you want to delete this pizza?')) return;
    
    try {
      const token = localStorage.getItem('token');
      await axios.delete(`http://localhost:3000/api/pizzas/${id}`, {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      alert('Pizza deleted successfully!');
      navigate('/admin/update-pizza');
    } catch (err) {
      setError('Failed to delete pizza');
    }
  };

  if (loading) return (
    <div className="flex justify-center items-center min-h-screen">
      <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-red-600"></div>
    </div>
  );
  
  if (error) return (
    <div className="text-center py-10 text-red-600">
      <h2 className="text-2xl font-bold">Error</h2>
      <p>{error}</p>
    </div>
  );

  return (
    <div className="max-w-2xl mx-auto p-6">
      <h2 className="text-2xl font-bold mb-6">Edit Pizza</h2>
      <form onSubmit={handleUpdate} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">Name</label>
          <input
            type="text"
            name="name"
            value={pizza.name}
            onChange={handleChange}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-red-500 focus:ring-red-500 p-2"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Description</label>
          <textarea
            name="description"
            value={pizza.description}
            onChange={handleChange}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-red-500 focus:ring-red-500 p-2"
            rows="3"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Price</label>
          <input
            type="number"
            name="price"
            step="0.01"
            value={pizza.price}
            onChange={handleChange}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-red-500 focus:ring-red-500 p-2"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Image URL</label>
          <input
            type="text"
            name="image"
            value={pizza.image}
            onChange={handleChange}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-red-500 focus:ring-red-500 p-2"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Category</label>
          <select
            name="category"
            value={pizza.category}
            onChange={handleChange}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-red-500 focus:ring-red-500 p-2"
            required
          >
            <option value="">Select a category</option>
            {categories.map(category => (
              <option key={category} value={category}>{category}</option>
            ))}
          </select>
        </div>

        <div className="flex space-x-4">
          <button
            type="submit"
            disabled={loading}
            className="bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700"
          >
            Update Pizza
          </button>
          <button
            type="button"
            onClick={handleDelete}
            className="bg-gray-600 text-white px-4 py-2 rounded-md hover:bg-gray-700"
          >
            Delete Pizza
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditPizzaDetails;