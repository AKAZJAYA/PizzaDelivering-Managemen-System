import React from 'react';

const OrderDetails = ({ order, onClose }) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
      <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-2xl">
        <h2 className="text-2xl font-bold mb-4">Order #{order.id}</h2>
        <p className="text-gray-600 mb-2">Customer: {order.name}</p>
        <p className="text-gray-600 mb-2">Phone: {order.phone}</p>
        <p className="text-gray-600 mb-2">Address: {order.street}, {order.city}</p>
        <p className="text-gray-600 mb-2">Total: ${order.total_amount.toFixed(2)}</p>
        <div className="border-t mt-4 pt-4">
          <h3 className="text-xl font-semibold mb-2">Items</h3>
          {order.order_items && order.order_items.length > 0 ? (
            order.order_items.map((item, index) => (
              <div key={index} className="flex justify-between items-center py-2">
                <span>{item.pizza?.name || 'Unknown Pizza'} x{item.quantity}</span>
                <span>${(item.price * item.quantity).toFixed(2)}</span>
              </div>
            ))
          ) : (
            <p className="text-gray-600">No items found</p>
          )}
        </div>
        <button
          onClick={onClose}
          className="mt-4 bg-red-600 text-white px-4 py-2 rounded-full hover:bg-red-700"
        >
          Close
        </button>
      </div>
    </div>
  );
};

export default OrderDetails;