import { Link } from "react-router-dom";
import CartItem from "../components/CartItem";
import { useCart } from "../store/CartContext";

const Cart = () => {
  const { cart, removeFromCart } = useCart();

  const totalPrice = cart.reduce((total, item) => total + item.price, 0).toFixed(2);

  return (
    <div className="py-10 px-4">
      <h1 className="text-4xl font-bold text-center mb-10 text-red-600">Your Cart</h1>

      {cart.length === 0 ? (
        <div className="text-center text-lg text-gray-500">Your cart is empty.</div>
      ) : (
        <div>
          <div className="space-y-4">
            {cart.map((item) => (
              <CartItem key={item.id} item={item} removeFromCart={removeFromCart} />
            ))}
          </div>
          <div className="mt-6 text-right">
            <h2 className="text-2xl font-semibold">Total: ${totalPrice}</h2>
          </div>
          <div className="mt-4 text-center">
            <Link
              to="/checkout"
              className="bg-yellow-500 text-black py-2 px-6 rounded-full text-lg font-semibold hover:bg-yellow-400 transition-all"
            >
              Checkout
            </Link>
          </div>
        </div>
      )}
    </div>
  );
};

export default Cart;