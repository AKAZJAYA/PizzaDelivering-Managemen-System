import { useCart } from "../store/CartContext";
import { loadStripe } from "@stripe/stripe-js";
import { useState } from "react";

const Checkout = () => {
  const { cart } = useCart();
  const [isProcessing, setIsProcessing] = useState(false);

  // Calculate total price
  const totalPrice = cart.reduce((total, item) => total + item.price, 0).toFixed(2);

  const stripePromise = loadStripe("your-public-key-from-stripe");

  const handlePayment = async (event) => {
    event.preventDefault();
    setIsProcessing(true);

    const stripe = await stripePromise;

    // Call your backend to create a checkout session
    const response = await fetch("/create-checkout-session", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ cart }),
    });

    const session = await response.json();

    // Redirect to Stripe's checkout page
    const { error } = await stripe.redirectToCheckout({
      sessionId: session.id,
    });

    if (error) {
      console.error("Payment Error: ", error);
      setIsProcessing(false);
    }
  };

  return (
    <div className="py-10 px-4">
      <h1 className="text-4xl font-bold text-center mb-10 text-red-600">Checkout</h1>

      {cart.length === 0 ? (
        <div className="text-center text-lg text-gray-500">Your cart is empty.</div>
      ) : (
        <div>
          <h2 className="text-2xl font-semibold mb-6">Order Summary</h2>
          <div className="space-y-4">
            {cart.map((item) => (
              <div key={item.id} className="flex items-center justify-between bg-white p-4 rounded-lg shadow-lg mb-4">
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
              </div>
            ))}
          </div>

          <div className="mt-6 text-right">
            <h2 className="text-2xl font-semibold">Total: ${totalPrice}</h2>
          </div>

          <div className="mt-8">
            <h3 className="text-xl font-semibold mb-4">Enter Your Details</h3>
            <form className="space-y-4" onSubmit={handlePayment}>
              <input
                type="text"
                placeholder="Full Name"
                className="w-full p-3 border border-gray-300 rounded-md"
              />
              <input
                type="email"
                placeholder="Email Address"
                className="w-full p-3 border border-gray-300 rounded-md"
              />
              <input
                type="text"
                placeholder="Delivery Address"
                className="w-full p-3 border border-gray-300 rounded-md"
              />
              <button
                type="submit"
                disabled={isProcessing}
                className={`w-full ${isProcessing ? "bg-gray-500" : "bg-yellow-500"} text-black py-2 px-6 rounded-full text-lg font-semibold hover:bg-yellow-400 transition-all`}
              >
                {isProcessing ? "Processing..." : "Proceed to Payment"}
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Checkout;