import { Link, Outlet, useNavigate, useLocation } from 'react-router-dom';
import { FaPizzaSlice, FaPlus, FaList, FaEdit, FaSignOutAlt } from 'react-icons/fa';
import { useAuth } from '../../store/AuthContext';
import axios from 'axios';

export default function AdminLayout() {
  const location = useLocation();
  const navigate = useNavigate();
  const { logout } = useAuth();

  const isActive = (path) => {
    return location.pathname === path ? "bg-red-700" : "";
  };

  const handleLogout = async () => {
    try {
      // Get token from localStorage
      const token = localStorage.getItem('token');
      
      // Call logout API with auth header
      await axios.post('http://localhost:3000/api/logout', {}, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      // Clear local storage
      localStorage.removeItem('user');
      localStorage.removeItem('token');

      // Clear auth context
      logout();

      // Redirect to login
      navigate('/login');
    } catch (err) {
      console.error('Logout failed:', err);
      // Still clear everything and redirect even if API call fails
      localStorage.removeItem('user');
      localStorage.removeItem('token');
      logout();
      navigate('/login');
    }
  };

  return (
    <div className="flex min-h-screen">
      {/* Sidebar */}
      <div className="w-64 bg-red-600 text-white min-h-screen">
        {/* Logo */}
        <div className="p-4 border-b border-red-500">
          <div className="flex items-center space-x-2">
            <FaPizzaSlice className="text-2xl text-yellow-400" />
            <span className="text-xl font-bold">Admin Panel</span>
          </div>
        </div>

        {/* Navigation Links */}
        <nav className="mt-6">
          <Link
            to="/admin/add-pizza"
            className={`flex items-center space-x-3 px-6 py-3 hover:bg-red-700 transition-colors ${isActive('/admin/add-pizza')}`}
          >
            <FaPlus />
            <span>Add Pizza</span>
          </Link>

          <Link
            to="/admin/inventory"
            className={`flex items-center space-x-3 px-6 py-3 hover:bg-red-700 transition-colors ${isActive('/admin/inventory')}`}
          >
            <FaList />
            <span>View Inventory</span>
          </Link>

          <Link
            to="/admin/update-pizza"
            className={`flex items-center space-x-3 px-6 py-3 hover:bg-red-700 transition-colors ${isActive('/admin/update-pizza')}`}
          >
            <FaEdit />
            <span>Update Pizza</span>
          </Link>

          <button
            onClick={handleLogout}
            className="w-full flex items-center space-x-3 px-6 py-3 hover:bg-red-700 transition-colors text-left"
          >
            <FaSignOutAlt />
            <span>Logout</span>
          </button>
        </nav>
      </div>
    </div>
  );
};