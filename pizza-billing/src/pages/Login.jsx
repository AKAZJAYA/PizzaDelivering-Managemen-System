import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaUser, FaLock } from 'react-icons/fa';
import axios from 'axios';
import { useAuth } from '../store/AuthContext';

const Login = () => {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    try {
      const response = await axios.post('http://localhost:3000/api/login', formData);

      if (response.data) {
        // Store user data and token
        localStorage.setItem('user', JSON.stringify(response.data.user));
        localStorage.setItem('token', response.data.token);
        login(response.data.user);
        
        // Check if admin
        if (formData.email === 'admin@gmail.com' && formData.password === 'admin@gmail.com') {
          navigate('/admin/dash');
        } else {
          navigate('/dashboard');
        }
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Login failed. Please try again.');
    } finally {
      setIsLoading(false);
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
        <div className="max-w-md mx-auto bg-white rounded-lg shadow-lg overflow-hidden">
          <div className="bg-red-600 text-white py-6 px-8">
            <h2 className="text-3xl font-bold text-center">Welcome Back!</h2>
            <p className="text-center mt-2 text-yellow-400">
              Login to access your pizza orders
            </p>
          </div>

          {error && (
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 mt-4 rounded relative" role="alert">
              <span className="block sm:inline">{error}</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="py-8 px-8 space-y-6">
            <div className="space-y-2">
              <label htmlFor="email" className="text-gray-700 font-semibold">
                Email Address
              </label>
              <div className="flex items-center bg-gray-50 rounded-full px-4 border border-gray-300 focus-within:border-red-600 transition-colors">
                <FaUser className="text-gray-400" />
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

            <div className="space-y-2">
              <label htmlFor="password" className="text-gray-700 font-semibold">
                Password
              </label>
              <div className="flex items-center bg-gray-50 rounded-full px-4 border border-gray-300 focus-within:border-red-600 transition-colors">
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

            <div className="flex items-center justify-between">
              <label className="flex items-center">
                <input 
                  type="checkbox" 
                  className="rounded border-gray-300 text-red-600 focus:ring-red-500"
                  disabled={isLoading}
                />
                <span className="ml-2 text-sm text-gray-600">Remember me</span>
              </label>
              <Link to="/forgot-password" className="text-sm text-red-600 hover:text-red-700">
                Forgot Password?
              </Link>
            </div>

            <button
              type="submit"
              className={`w-full ${
                isLoading ? 'bg-gray-400' : 'bg-red-600 hover:bg-red-700'
              } text-white py-3 rounded-full transition-colors duration-300`}
              disabled={isLoading}
            >
              {isLoading ? 'Logging in...' : 'Login'}
            </button>

            <div className="text-center mt-4">
              <p className="text-gray-600">
                Don't have an account?{' '}
                <Link to="/register" className="text-red-600 hover:text-red-700 font-semibold">
                  Register here
                </Link>
              </p>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;