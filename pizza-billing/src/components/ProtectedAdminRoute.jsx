import { Navigate } from 'react-router-dom';
import { useAuth } from '../store/AuthContext';

const ProtectedAdminRoute = ({ children }) => {
  const { user } = useAuth();
  
  if (!user || user.email !== 'admin@gmail.com') {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <div className="bg-white p-8 rounded-lg shadow-md">
          <h1 className="text-2xl font-bold text-red-600 mb-4">Access Denied</h1>
          <p className="text-gray-600">You are not authorized to access this page.</p>
          <button
            onClick={() => window.location.href = '/login'}
            className="mt-4 bg-red-600 text-white px-4 py-2 rounded-full hover:bg-red-700"
          >
            Go to Login
          </button>
        </div>
      </div>
    );
  }

  return children;
};

export default ProtectedAdminRoute;