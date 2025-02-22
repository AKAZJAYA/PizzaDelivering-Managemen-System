import { useState, useEffect } from "react";
import { useCart } from "../store/CartContext";
import { useNavigate } from "react-router-dom";
import { loadStripe } from "@stripe/stripe-js";
import axios from 'axios';
import { toast } from 'react-toastify';

const Checkout = () => {
  const { cart, clearCart } = useCart();
  const navigate = useNavigate();
  const [isProcessing, setIsProcessing] = useState(false);
  const [pizzaDetails, setPizzaDetails] = useState({});
  const [paymentMethod, setPaymentMethod] = useState('');
  const [showCardForm, setShowCardForm] = useState(false);
  const [cardDetails, setCardDetails] = useState({
    cardNumber: '',
    expiryDate: '',
    cvv: '',
    cardName: ''
  });
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    streetAddress: '',
    city: '',
    postalCode: '',
    deliveryInstructions: ''
  });

  // Fetch pizza details for cart items
  useEffect(() => {
    const fetchPizzaDetails = async () => {
      const details = {};
      for (const item of cart) {
        try {
          const response = await axios.get(`http://localhost:3000/api/pizzas/${item.pizza_id}`, {
            withCredentials: true
          });
          details[item.pizza_id] = response.data;
        } catch (err) {
          console.error(`Error fetching details for pizza ${item.pizza_id}:`, err);
        }
      }
      setPizzaDetails(details);
    };

    if (cart.length > 0) {
      fetchPizzaDetails();
    }
  }, [cart]);

  const totalPrice = cart.reduce((total, item) => {
    return total + (parseFloat(item.price) * item.quantity);
  }, 0).toFixed(2);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handlePaymentMethodChange = (method) => {
    setPaymentMethod(method);
    setShowCardForm(method === 'Card');
  };

  const handleCardDetailsChange = (e) => {
    const { name, value } = e.target;
    setCardDetails(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsProcessing(true);

    try {
      const orderData = {
        items: cart.map(item => ({
          pizza_id: item.pizza_id,
          quantity: item.quantity,
          size: item.size,
          price: item.price
        })),
        name: formData.fullName,
        email: formData.email,
        phone: formData.phone,
        street: formData.streetAddress,
        city: formData.city,
        postal_code: formData.postalCode,
        instructions: formData.deliveryInstructions,
        total_amount: parseFloat(totalPrice),
        payment_method: paymentMethod,
        status: 'pending'
      };

      // If paying by card, process payment first
      if (paymentMethod === 'card') {
        // Add your payment processing logic here
        const paymentSuccess = await processCardPayment(cardDetails);
        if (!paymentSuccess) {
          throw new Error('Payment failed');
        }
      }

      // Create order
      const response = await axios.post('http://localhost:3000/api/orders', orderData, {
        withCredentials: true
      });

      if (response.data) {
        await clearCart();
        toast.success('Order placed successfully!');
        navigate('/dashboard');
      }
    } catch (err) {
      toast.error('Failed to place order. Please try again.');
      console.error("Order Error: ", err);
    } finally {
      setIsProcessing(false);
    }
  };

  const isTakeaway = paymentMethod === 'TakeAway';

  const renderDeliveryForm = () => (
    <>
      <input
        type="text"
        name="streetAddress"
        value={formData.streetAddress}
        onChange={handleInputChange}
        placeholder="Street Address"
        className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-600"
        required={!isTakeaway}
      />
      <input
        type="text"
        name="city"
        value={formData.city}
        onChange={handleInputChange}
        placeholder="City"
        className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-600"
        required={!isTakeaway}
      />
      <input
        type="text"
        name="postalCode"
        value={formData.postalCode}
        onChange={handleInputChange}
        placeholder="Postal Code"
        className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-600"
        required={!isTakeaway}
      />
      <textarea
        name="deliveryInstructions"
        value={formData.deliveryInstructions}
        onChange={handleInputChange}
        placeholder="Delivery Instructions (Optional)"
        className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-600 min-h-[100px]"
      />
    </>
  );

  return (
    <div className="py-10 px-4">
      <h1 className="text-4xl font-bold text-center mb-10 text-red-600">Checkout</h1>

      {cart.length === 0 ? (
        <div className="text-center text-lg text-gray-500">Your cart is empty.</div>
      ) : (
        <div className="max-w-4xl mx-auto">
          {/* Order Summary Section */}
          <h2 className="text-2xl font-semibold mb-6">Order Summary</h2>
          <div className="space-y-4">
            {cart.map((item) => {
              const pizza = pizzaDetails[item.pizza_id];
              const itemTotal = (parseFloat(item.price) * item.quantity).toFixed(2);

              return (
                <div key={item._id} className="flex items-center justify-between bg-white p-4 rounded-lg shadow-lg mb-4">
                  <div className="flex items-center flex-1">
                    <img
                      src={pizza?.image || '/images/pizza-placeholder.jpg'}
                      alt={pizza?.name || 'Pizza'}
                      className="w-20 h-20 object-cover rounded-md mr-4"
                      onError={(e) => {
                        e.target.onerror = null;
                        e.target.src = '/images/pizza-placeholder.jpg';
                      }}
                    />
                    <div>
                      <h3 className="font-semibold text-lg">{pizza?.name || 'Loading...'}</h3>
                      <p className="text-sm text-gray-500">Size: {item.size}</p>
                      <p className="text-sm text-gray-500">Quantity: {item.quantity}</p>
                      <span className="text-red-600">${item.price} each</span>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-semibold">${itemTotal}</p>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="mt-6 bg-white p-4 rounded-lg shadow-lg">
            <div className="text-right">
              <h2 className="text-2xl font-semibold">Total: ${totalPrice}</h2>
            </div>
          </div>

          {/* Payment Method Section */}
          <div className="mt-8 bg-white p-6 rounded-lg shadow-lg">
            <h3 className="text-xl font-semibold mb-4">Payment Method</h3>
            <div className="space-y-4">
              <div className="flex space-x-4">
                <button
                  type="button"
                  onClick={() => handlePaymentMethodChange('Cash On Delivery')}
                  className={`flex-1 py-3 rounded-full border-2 ${
                    paymentMethod === 'Cash On Delivery' 
                      ? 'border-red-600 bg-red-50 text-red-600' 
                      : 'border-gray-300'
                  }`}
                >
                  Cash on Delivery
                </button>
                <button
                  type="button"
                  onClick={() => handlePaymentMethodChange('Card')}
                  className={`flex-1 py-3 rounded-full border-2 ${
                    paymentMethod === 'Card' 
                      ? 'border-red-600 bg-red-50 text-red-600' 
                      : 'border-gray-300'
                  }`}
                >
                  Pay by Card
                </button>
                <button
                  type="button"
                  onClick={() => handlePaymentMethodChange('TakeAway')}
                  className={`flex-1 py-3 rounded-full border-2 ${
                    paymentMethod === 'TakeAway' 
                      ? 'border-red-600 bg-red-50 text-red-600' 
                      : 'border-gray-300'
                  }`}
                >
                  Take Away
                </button>
              </div>

              {/* Card Payment Form */}
              {showCardForm && (
                <div className="mt-4 space-y-4">
                  <input
                    type="text"
                    name="cardName"
                    value={cardDetails.cardName}
                    onChange={handleCardDetailsChange}
                    placeholder="Name on Card"
                    className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-600"
                    required
                  />
                  <input
                    type="text"
                    name="cardNumber"
                    value={cardDetails.cardNumber}
                    onChange={handleCardDetailsChange}
                    placeholder="Card Number"
                    className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-600"
                    required
                  />
                  <div className="grid grid-cols-2 gap-4">
                    <input
                      type="text"
                      name="expiryDate"
                      value={cardDetails.expiryDate}
                      onChange={handleCardDetailsChange}
                      placeholder="MM/YY"
                      className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-600"
                      required
                    />
                    <input
                      type="text"
                      name="cvv"
                      value={cardDetails.cvv}
                      onChange={handleCardDetailsChange}
                      placeholder="CVV"
                      className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-600"
                      required
                    />
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Customer Details Form */}
          <div className="mt-8 bg-white p-6 rounded-lg shadow-lg">
            <h3 className="text-xl font-semibold mb-4">Enter Your Details</h3>
            <form className="space-y-4" onSubmit={handleSubmit}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <input
                  type="text"
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleInputChange}
                  placeholder="Full Name"
                  className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-600"
                  required
                />
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  placeholder="Email Address"
                  className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-600"
                  required
                />
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  placeholder="Phone Number"
                  className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-600"
                  required
                />
                {!isTakeaway && renderDeliveryForm()}
              </div>
              <button
                type="submit"
                disabled={isProcessing || !paymentMethod}
                className={`w-full ${
                  isProcessing || !paymentMethod ? "bg-gray-400" : "bg-red-600 hover:bg-red-700"
                } text-white py-3 rounded-full transition-all duration-300`}
              >
                {isProcessing ? "Processing..." : "Place Order"}
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Checkout;