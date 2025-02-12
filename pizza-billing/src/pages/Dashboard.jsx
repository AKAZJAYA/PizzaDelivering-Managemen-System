import ImageSlider from '../components/ImageSlider';
import { Link } from 'react-router-dom';
import { FaUser } from 'react-icons/fa';

const promotions = [
  {
    id: "combo1",
    title: "Combo Meal 1",
    description: "Get a pizza, drink, and sides for a special price!",
    image: "/images/combo1.jpeg"
  },
  {
    id: "combo2",
    title: "Combo Meal 2",
    description: "Enjoy the best deals with our Combo Meal 2!",
    image: "/images/combo2.jpeg"
  },
  {
    id: "family",
    title: "Family Deal",
    description: "Get a large pizza for the whole family at a discounted price.",
    image: "/images/family-deal.jpeg"
  }
];

const Dashboard = () => {
  // Example user data - in a real app, this would come from your auth context
  const user = {
    name: "John Doe",
    email: "john@example.com"
  };

  return (
    <div>
      
      {/* Banner Section */}
      <section className="relative h-[600px] w-full overflow-hidden">
        <ImageSlider />
        <div className="absolute inset-0 z-10 flex items-center justify-center">
          <div className="container mx-auto text-center text-white px-4">
            <h1 className="text-5xl font-bold mb-4">Welcome to Your Pizza Dashboard!</h1>
            <p className="text-xl mb-6">Order your favorite pizza now and enjoy a tasty meal.</p>
            <Link to="/menu">
              <button className="bg-yellow-500 text-black py-2 px-6 rounded-full text-lg font-semibold hover:bg-yellow-400 transition-all">
                Order Now
              </button>
            </Link>
          </div>
        </div>
      </section>

      {/* Quick Actions */}
      <section className="bg-white py-8 shadow-md">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-3 gap-4">
            <Link to="/orders" className="bg-gray-50 p-4 rounded-lg text-center hover:bg-gray-100 transition-all">
              <h3 className="font-semibold text-gray-800">Your Orders</h3>
              <p className="text-sm text-gray-600">View your order history</p>
            </Link>
            <Link to="/profile" className="bg-gray-50 p-4 rounded-lg text-center hover:bg-gray-100 transition-all">
              <h3 className="font-semibold text-gray-800">Profile Settings</h3>
              <p className="text-sm text-gray-600">Update your information</p>
            </Link>
            <Link to="/favorites" className="bg-gray-50 p-4 rounded-lg text-center hover:bg-gray-100 transition-all">
              <h3 className="font-semibold text-gray-800">Favorites</h3>
              <p className="text-sm text-gray-600">Your favorite pizzas</p>
            </Link>
          </div>
        </div>
      </section>

      {/* Promotions Section */}
      <section className="bg-gray-100 py-16">
        <div className="container mx-auto text-center px-4">
          <h2 className="text-4xl font-bold mb-8">Special Offers For You</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {promotions.map((promo) => (
              <div 
                key={promo.id} 
                className="bg-white p-6 rounded-lg shadow-lg transform hover:scale-105 transition-all duration-500"
              >
                <img 
                  src={promo.image} 
                  alt={promo.title} 
                  className="w-full h-48 object-cover rounded-lg mb-4"
                />
                <h3 className="text-xl font-semibold mb-4">{promo.title}</h3>
                <p className="text-gray-600 mb-6">{promo.description}</p>
                <Link 
                  to={`/package/${promo.id}`}
                  className="inline-block hover:-translate-y-1 transition-all duration-300"
                >
                  <button className="bg-red-600 text-white py-2 px-6 rounded-full hover:bg-red-700 transition-all duration-300 hover:shadow-lg">
                    Order Now
                  </button>
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Dashboard;