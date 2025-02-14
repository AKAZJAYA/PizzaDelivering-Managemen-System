import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaUser, FaEnvelope, FaLock, FaPhone, FaMapMarkerAlt } from 'react-icons/fa';
import axios from 'axios';

const Register = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    phone: '',
    address: ''
  });
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    // Create the request body according to API requirements
    const requestBody = {
      username: formData.name,      // Changed from name to username
      email: formData.email,
      password: formData.password,
      phone: formData.phone,    // Changed from phone to contactNo
      address: formData.address
    };

    try {
      const response = await axios.post('http://localhost:3000/api/register', requestBody, {
        headers: {
          'Content-Type': 'application/json'
        }
      });
      
      if (response.data) {
        alert('Registration successful! Please login.');
        navigate('/login');
      }
    } catch (err) {
      console.error('Registration error:', err);
      setError(err.response?.data?.message || 'Registration failed. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
    setError(''); // Clear error when user types
  };

  return (
    <div className="min-h-screen py-20 bg-gray-100">
      <div className="container mx-auto px-4">
        <div className="max-w-md mx-auto bg-white rounded-lg shadow-lg overflow-hidden">
          <div className="bg-red-600 text-white py-6 px-8">
            <h2 className="text-3xl font-bold text-center">Create Account</h2>
            <p className="text-center mt-2 text-yellow-400">
              Join us for delicious pizza deals
            </p>
          </div>

          {error && (
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 mx-8 mt-4 rounded relative" role="alert">
              <span className="block sm:inline">{error}</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="py-8 px-8 space-y-6">
            {/* Name Field */}
            <div className="space-y-2">
              <label htmlFor="name" className="text-gray-700 font-semibold">
                First Name
              </label>
              <div className="flex items-center bg-gray-50 rounded-full px-4 border border-gray-300 focus-within:border-red-600">
                <FaUser className="text-gray-400" />
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full py-3 px-4 bg-transparent focus:outline-none"
                  placeholder="Enter your name"
                  required
                  disabled={isLoading}
                />
              </div>
            </div>

            {/* Email Field */}
            <div className="space-y-2">
              <label htmlFor="email" className="text-gray-700 font-semibold">
                Email Address
              </label>
              <div className="flex items-center bg-gray-50 rounded-full px-4 border border-gray-300 focus-within:border-red-600">
                <FaEnvelope className="text-gray-400" />
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full py-3 px-4 bg-transparent focus:outline-none"
                  placeholder="Enter your email"
                  required
                  disabled={isLoading}
                />
              </div>
            </div>

            {/* Password Field */}
            <div className="space-y-2">
              <label htmlFor="password" className="text-gray-700 font-semibold">
                Password
              </label>
              <div className="flex items-center bg-gray-50 rounded-full px-4 border border-gray-300 focus-within:border-red-600">
                <FaLock className="text-gray-400" />
                <input
                  type="password"
                  id="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  className="w-full py-3 px-4 bg-transparent focus:outline-none"
                  placeholder="Enter your password"
                  required
                  disabled={isLoading}
                />
              </div>
            </div>

            {/* Phone Field (Required) */}
            <div className="space-y-2">
              <label htmlFor="phone" className="text-gray-700 font-semibold">
                Phone Number
              </label>
              <div className="flex items-center bg-gray-50 rounded-full px-4 border border-gray-300 focus-within:border-red-600">
                <FaPhone className="text-gray-400" />
                <input
                  type="text"
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  className="w-full py-3 px-4 bg-transparent focus:outline-none"
                  placeholder="Enter your phone number"
                  required
                  disabled={isLoading}
                />
              </div>
            </div>

            {/* Address Field (Optional) */}
            <div className="space-y-2">
              <label htmlFor="address" className="text-gray-700 font-semibold">
                Delivery Address (Optional)
              </label>
              <div className="flex items-center bg-gray-50 rounded-full px-4 border border-gray-300 focus-within:border-red-600">
                <FaMapMarkerAlt className="text-gray-400" />
                <input
                  type="text"
                  id="address"
                  name="address"
                  value={formData.address}
                  onChange={handleChange}
                  className="w-full py-3 px-4 bg-transparent focus:outline-none"
                  placeholder="Enter your address"
                  disabled={isLoading}
                />
              </div>
            </div>

            <button
              type="submit"
              className={`w-full ${
                isLoading ? 'bg-gray-400' : 'bg-red-600 hover:bg-red-700'
              } text-white py-3 rounded-full transition-colors duration-300`}
              disabled={isLoading}
            >
              {isLoading ? 'Registering...' : 'Register'}
            </button>

            <div className="text-center">
              <p className="text-gray-600">
                Already have an account?{' '}
                <Link to="/login" className="text-red-600 hover:text-red-700 font-semibold">
                  Login here
                </Link>
              </p>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Register;