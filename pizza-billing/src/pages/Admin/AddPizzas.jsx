import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { FaUpload } from 'react-icons/fa';

const AddPizza = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    price: '',
    category: 'Vegetarian'
  });
  const [selectedImage, setSelectedImage] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const categories = ['Vegetarian', 'Classic', 'Supreme', 'Signature', 'Favorite'];

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) { // 5MB limit
        setError('Image size should be less than 5MB');
        return;
      }
      setSelectedImage(file);
      setPreviewUrl(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    if (!selectedImage) {
      setError('Please select an image');
      setLoading(false);
      return;
    }

    try {
      const formPayload = new FormData();
      formPayload.append('name', formData.name);
      formPayload.append('description', formData.description);
      formPayload.append('price', parseFloat(formData.price));
      formPayload.append('category', formData.category);
      formPayload.append('image', selectedImage);

      await axios.post('http://localhost:3000/api/pizzas', formPayload, {
        withCredentials: true,
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });

      alert('Pizza added successfully!');
      navigate('/admin/inventory');
    } catch (err) {
      console.error('Error adding pizza:', err);
      setError(err.response?.data?.message || 'Failed to add pizza');
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
            {/* Image Upload Section */}
            <div className="space-y-2">
              <label className="block text-gray-700 font-semibold mb-2">
                Pizza Image
              </label>
              <div className="flex flex-col items-center p-4 border-2 border-dashed border-gray-300 rounded-lg hover:border-red-600 transition-colors">
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                  className="hidden"
                  id="image-upload"
                />
                <label
                  htmlFor="image-upload"
                  className="cursor-pointer flex flex-col items-center"
                >
                  {previewUrl ? (
                    <img
                      src={previewUrl}
                      alt="Preview"
                      className="w-48 h-48 object-cover rounded-lg mb-4"
                    />
                  ) : (
                    <div className="w-48 h-48 bg-gray-100 flex items-center justify-center rounded-lg mb-4">
                      <FaUpload className="text-4xl text-gray-400" />
                    </div>
                  )}
                  <span className="bg-red-600 text-white px-4 py-2 rounded-full hover:bg-red-700">
                    {previewUrl ? 'Change Image' : 'Upload Image'}
                  </span>
                </label>
                {previewUrl && (
                  <button
                    type="button"
                    onClick={() => {
                      setSelectedImage(null);
                      setPreviewUrl(null);
                    }}
                    className="mt-2 text-red-600 hover:text-red-700"
                  >
                    Remove Image
                  </button>
                )}
              </div>
            </div>

            {/* Other form fields remain the same */}
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
                type="number"
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