import { Link, useLocation, useNavigate } from "react-router-dom";
import { FaPizzaSlice, FaShoppingCart, FaHome, FaList, FaUserCircle, FaUserPlus } from "react-icons/fa";
import { useAuth } from "../store/AuthContext"; // Add this import
import axios from 'axios';

export default function DefaultNavbar() {
  const location = useLocation();
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth(); // Add this line

  const isActive = (path) => {
    return location.pathname === path ? "bg-yellow-400 text-red-600" : "";
  };

  const handleCartClick = (e) => {
    e.preventDefault();
    if (!isAuthenticated) {
      navigate('/login');
    } else {
      navigate('/cart');
    }
  };

  const handleMenuClick = (e) => {
    e.preventDefault();
    if (!isAuthenticated) {
      navigate('/login');
    } else {
      navigate('/menu');
    }
  };

  return (
    <nav className="bg-red-600 text-white py-4 shadow-md">
      <div className="container mx-auto flex items-center justify-between px-4">
        {/* Logo */}
        <div className="flex items-center">
          <FaPizzaSlice className="text-4xl mr-2 text-yellow-400" />
          <h1 className="text-3xl font-bold">Pizza Shop</h1>
        </div>

        {/* Center Navigation */}
        <div className="flex space-x-6 absolute left-1/2 transform -translate-x-1/2">
          <Link
            to="/home"
            className={`flex items-center space-x-2 px-4 py-2 rounded-full transition-all duration-300 hover:bg-yellow-400 hover:text-red-600 ${isActive(
              "/home"
            )}`}
          >
            <FaHome className="text-xl" />
            <span>Home</span>
          </Link>
          <Link
            onClick={handleMenuClick}
            className={`flex items-center space-x-2 px-4 py-2 rounded-full transition-all duration-300 hover:bg-yellow-400 hover:text-red-600 ${isActive(
              "/menu"
            )}`}
          >
            <FaList className="text-xl" />
            <span>Menu</span>
          </Link>
          <button
            onClick={handleCartClick}
            className={`flex items-center space-x-2 px-4 py-2 rounded-full transition-all duration-300 hover:bg-yellow-400 hover:text-red-600 ${isActive(
              "/cart"
            )}`}
          >
            <FaShoppingCart className="text-xl" />
            <span>Cart</span>
          </button>
        </div>

        {/* Auth Buttons */}
        <div className="flex space-x-4">
          <Link
            to="/login"
            className="flex items-center space-x-2 px-4 py-2 rounded-full bg-yellow-400 text-red-600 transition-all duration-300 hover:bg-yellow-500"
          >
            <FaUserCircle className="text-xl" />
            <span>Login</span>
          </Link>
          <Link
            to="/register"
            className="flex items-center space-x-2 px-4 py-2 rounded-full bg-white text-red-600 transition-all duration-300 hover:bg-gray-100"
          >
            <FaUserPlus className="text-xl" />
            <span>Register</span>
          </Link>
        </div>
      </div>
    </nav>
  );
}

// Also update the DashNavBar component similarly
export function DashNavBar() {
  const location = useLocation();
  const navigate = useNavigate();
  const user = { name: "John" }; // Replace with actual user data
  const { isAuthenticated, logout } = useAuth();

  const isActive = (path) => {
    return location.pathname === path ? "bg-yellow-400 text-red-600" : "";
  };

  const handleLogout = async () => {
    try {
      await axios.post('http://localhost:3000/api/logout');
      logout(); // This calls the logout function from AuthContext
      localStorage.removeItem('user'); // Clear local storage
      navigate('/home');
    } catch (err) {
      console.error('Logout failed:', err);
    }
  };

  const handleCartClick = (e) => {
    e.preventDefault();
    if (!isAuthenticated) {
      navigate('/login');
    } else {
      navigate('/cart');
    }
  };

  const handleMenuClick = (e) => {
    e.preventDefault();
    if (!isAuthenticated) {
      navigate('/login');
    } else {
      navigate('/menu');
    }
  };

  return (
    <nav className="bg-red-600 text-white py-4 shadow-md">
      <div className="container mx-auto flex items-center justify-between px-4">
        {/* Logo */}
        <div className="flex items-center">
          <FaPizzaSlice className="text-4xl mr-2 text-yellow-400" />
          <h1 className="text-3xl font-bold">Pizza Shop</h1>
        </div>

        {/* Center Navigation */}
        <div className="flex space-x-6 absolute left-1/2 transform -translate-x-1/2">
          <Link
            to="/menu"
            onClick={handleMenuClick}
            className={`flex items-center space-x-2 px-4 py-2 rounded-full transition-all duration-300 hover:bg-yellow-400 hover:text-red-600 ${isActive("/menu")}`}
          >
            <FaList className="text-xl" />
            <span>Menu</span>
          </Link>
          <button
            onClick={handleCartClick}
            className={`flex items-center space-x-2 px-4 py-2 rounded-full transition-all duration-300 hover:bg-yellow-400 hover:text-red-600 ${isActive("/cart")}`}
          >
            <FaShoppingCart className="text-xl" />
            <span>Cart</span>
          </button>
        </div>

        {/* User Welcome and Logout */}
        <div className="flex items-center space-x-4">
          <div className="flex items-center">
            <FaUserCircle className="text-2xl text-yellow-400 mr-2" />
            <span className="text-white">Welcome, {user.name}!</span>
          </div>
          <button
            onClick={handleLogout}
            className="bg-white text-red-600 px-4 py-2 rounded-full hover:bg-yellow-400 transition-all duration-300"
          >
            Logout
          </button>
        </div>
      </div>
    </nav>
  );
}

