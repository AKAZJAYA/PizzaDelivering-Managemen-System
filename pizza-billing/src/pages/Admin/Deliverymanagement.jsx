import { useState, useEffect } from 'react';
import axios from 'axios';
import { FaCheck, FaTimes } from 'react-icons/fa';

const DeliveryManagement = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch all orders on component mount
  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      const response = await axios.get('http://localhost:3000/api/orders', {
        withCredentials: true
      });
      console.log("response.data", response.data);
      setOrders(response.data);
    } catch (err) {
      setError('Failed to fetch orders');
      console.error('Error fetching orders:', err);
    } finally {
      setLoading(false);
    }

    
    
  };

  // Filter orders by status
  const getPendingOrders = () => orders.filter(order => order.status === 'pending');
  const getCompletedOrders = () => orders.filter(order => order.status === 'delivered');
  const getCancelledOrders = () => orders.filter(order => order.status === 'cancelled');

  const OrderCard = ({ order }) => {
    const [isUpdating, setIsUpdating] = useState(false);

    const handleStatusUpdate = async (orderId, newStatus) => {
      setIsUpdating(true);

      
      try {
        // Use the correct endpoint for updating order status
        await axios.put(`http://localhost:3000/api/orders/${orderId}/status`, 
          { status: newStatus },
          { withCredentials: true }
        );
        await fetchOrders(); // Refresh the orders list after update
      } catch (err) {
        console.error('Error updating order status:', err);
        alert('Failed to update order status');
      } finally {
        setIsUpdating(false);
      }
      
    };

    return (
      <div className="bg-white p-4 rounded-lg shadow-md mb-4">
        <div className="flex justify-between items-start mb-4">
          <div>
            <h3 className="font-semibold text-lg">
              Order #{order.id}
            </h3>
            <p className="text-gray-600">Customer: {order.name || 'N/A'}</p>
            <p className="text-gray-600">Phone: {order.phone || 'N/A'}</p>
            <p className="text-gray-600">
              Address: {order.street ? `${order.street}, ${order.city}` : 'N/A'}
            </p>
            <p className="text-gray-600">
              Total: ${order.total_amount ? order.total_amount.toFixed(2) : '0.00'}
            </p>
          </div>
          <div className="text-right">
            <p className={`inline-block px-3 py-1 rounded-full text-sm ${
              order.status === 'pending' ? 'bg-yellow-200 text-yellow-800' :
              order.status === 'delivered' ? 'bg-green-200 text-green-800' :
              'bg-red-200 text-red-800'
            }`}>
              {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
            </p>
          </div>
        </div>

        {/* Order Items */}
        {order.items && order.items.map((item, index) => (
          <div key={index} className="flex justify-between items-center py-2 border-t">
            <span>{item.name} x{item.quantity}</span>
            <span>${(item.price * item.quantity).toFixed(2)}</span>
          </div>
        ))}

        {/* Action Buttons */}
        {order.status === 'pending' && (
          <div className="flex justify-end space-x-2 mt-4">
            <button
              onClick={() => handleStatusUpdate(order.id, 'delivered')}
              disabled={isUpdating}
              className={`${
                isUpdating ? 'bg-gray-400' : 'bg-green-500 hover:bg-green-600'
              } text-white px-4 py-2 rounded-full flex items-center`}
            >
              <FaCheck className="mr-2" /> 
              {isUpdating ? 'Updating...' : 'Mark Delivered'}
            </button>
            <button
              onClick={() => handleStatusUpdate(order.id, 'cancelled')}
              disabled={isUpdating}
              className={`${
                isUpdating ? 'bg-gray-400' : 'bg-red-500 hover:bg-red-600'
              } text-white px-4 py-2 rounded-full flex items-center`}
            >
              <FaTimes className="mr-2" /> 
              {isUpdating ? 'Updating...' : 'Cancel Order'}
            </button>
          </div>
        )}
      </div>
    );
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-red-600"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center text-red-600 py-8">
        <p>{error}</p>
      </div>
    );
  }

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Delivery Management</h1>

      {/* Pending Orders Section */}
      <div className="mb-8">
        <h2 className="text-xl font-semibold mb-4">Pending Orders</h2>
        {getPendingOrders().length === 0 ? (
          <p className="text-gray-500">No pending orders</p>
        ) : (
          getPendingOrders().map(order => (
            <OrderCard key={order._id} order={order} />
          ))
        )}
      </div>

      {/* Completed Orders Section */}
      <div className="mb-8">
        <h2 className="text-xl font-semibold mb-4">Completed Orders</h2>
        {getCompletedOrders().length === 0 ? (
          <p className="text-gray-500">No completed orders</p>
        ) : (
          getCompletedOrders().map(order => (
            <OrderCard key={order._id} order={order} />
          ))
        )}
      </div>

      {/* Cancelled Orders Section */}
      <div>
        <h2 className="text-xl font-semibold mb-4">Cancelled Orders</h2>
        {getCancelledOrders().length === 0 ? (
          <p className="text-gray-500">No cancelled orders</p>
        ) : (
          getCancelledOrders().map(order => (
            <OrderCard key={order._id} order={order} />
          ))
        )}
      </div>
    </div>
  );
};

export default DeliveryManagement;