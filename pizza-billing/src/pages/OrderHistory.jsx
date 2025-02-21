import { useState, useEffect } from 'react';
import axios from 'axios';

const OrderHistory = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchUserOrders();
  }, []);

  const fetchUserOrders = async () => {
    try {
      const response = await axios.get('http://localhost:3000/api/orders/user', {
        withCredentials: true
      });
      setOrders(response.data);
    } catch (err) {
      setError('Failed to fetch orders');
      console.error('Error fetching orders:', err);
    } finally {
      setLoading(false);
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'pending':
        return 'bg-yellow-200 text-yellow-800';
      case 'delivered':
        return 'bg-green-200 text-green-800';
      case 'cancelled':
        return 'bg-red-200 text-red-800';
      default:
        return 'bg-gray-200 text-gray-800';
    }
  };

  if (loading) return (
    <div className="flex justify-center items-center min-h-screen">
      <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-red-600"></div>
    </div>
  );

  if (error) return (
    <div className="text-center text-red-600 py-8">
      <p>{error}</p>
    </div>
  );

  return (
    <div className="py-10 px-4">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-8">Your Orders</h1>

        {orders.length === 0 ? (
          <div className="text-center py-8">
            <p className="text-gray-500">You haven't placed any orders yet.</p>
          </div>
        ) : (
          <div className="space-y-6">
            {orders.map((order) => (
              <div key={order._id} className="bg-white rounded-lg shadow-md p-6">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h2 className="text-lg font-semibold">
                      Order #{order._id.slice(-6)}
                    </h2>
                    <p className="text-gray-600">
                      Placed on: {new Date(order.createdAt).toLocaleDateString()}
                    </p>
                  </div>
                  <span className={`px-3 py-1 rounded-full text-sm ${getStatusColor(order.status)}`}>
                    {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                  </span>
                </div>

                <div className="border-t border-b py-4 my-4">
                  {order.items.map((item, index) => (
                    <div key={index} className="flex justify-between items-center py-2">
                      <div>
                        <p className="font-semibold">{item.name}</p>
                        <p className="text-sm text-gray-600">
                          Quantity: {item.quantity} | Size: {item.size}
                        </p>
                      </div>
                      <p className="text-gray-800">${(item.price * item.quantity).toFixed(2)}</p>
                    </div>
                  ))}
                </div>

                <div className="flex justify-between items-center">
                  <div>
                    <p className="text-gray-600">Delivery Address:</p>
                    <p className="text-sm">{order.street}</p>
                    <p className="text-sm">{order.city}, {order.postal_code}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-gray-600">Total Amount:</p>
                    <p className="text-xl font-bold text-red-600">
                      ${order.total_amount.toFixed(2)}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default OrderHistory;