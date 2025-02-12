const CartItem = ({ item, removeFromCart }) => {
    return (
      <div className="flex items-center justify-between bg-white p-4 rounded-lg shadow-lg mb-4">
        <div className="flex items-center">
          <img
            src={item.image}
            alt={item.name}
            className="w-20 h-20 object-cover rounded-md mr-4"
          />
          <div>
            <h3 className="font-semibold">{item.name}</h3>
            <span className="text-gray-600">${item.price}</span>
          </div>
        </div>
        <button
          onClick={() => removeFromCart(item.id)}
          className="bg-red-600 text-white py-1 px-3 rounded-full hover:bg-red-700"
        >
          Remove
        </button>
      </div>
    );
  };
  
  export default CartItem;