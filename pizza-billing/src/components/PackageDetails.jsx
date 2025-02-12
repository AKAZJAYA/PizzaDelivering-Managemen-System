import { useParams, Link } from 'react-router-dom';
import { useEffect } from 'react';

const packageData = {
  combo1: {
    title: "Combo Meal 1",
    price: "24.99",
    image: "/images/combo1.jpeg",
    items: [
      "1 Medium Classic Pizza (Choose from Margherita, Pepperoni, or Hawaiian)",
      "2 Regular Soft Drinks (330ml)",
      "1 Garlic Bread",
      "4 Chicken Wings"
    ],
    description: "Perfect for couples or small gatherings",
    savings: "Save $8.99",
    serves: "2-3 people",
    terms: "* Prices may vary. Available for dine-in and takeaway"
  },
  combo2: {
    title: "Combo Meal 2",
    price: "34.99",
    image: "/images/combo2.jpeg",
    items: [
      "1 Large Signature Pizza (Any from our Signature collection)",
      "1 Regular Classic Pizza",
      "3 Regular Soft Drinks (330ml)",
      "2 Garlic Breads",
      "6 Chicken Wings"
    ],
    description: "Ideal for friends and small parties",
    savings: "Save $12.99",
    serves: "4-5 people",
    terms: "* Prices may vary. Available for dine-in and takeaway"
  },
  family: {
    title: "Family Deal Package",
    price: "49.99",
    image: "/images/family-deal.jpeg",
    items: [
      "2 Large Supreme Pizzas (Any from our Supreme collection)",
      "1 Medium Classic Pizza",
      "4 Regular Soft Drinks (330ml)",
      "2 Garlic Breads",
      "8 Chicken Wings",
      "1 Chocolate Dessert"
    ],
    description: "Perfect for family gatherings",
    savings: "Save $25.99",
    serves: "6-8 people",
    terms: "* Prices may vary. Available for dine-in and takeaway"
  }
};

const PackageDetails = () => {
  const { id } = useParams();
  const packageInfo = packageData[id];

  useEffect(() => {
    window.scrollTo(0, 0); // Scroll to top when component mounts
  }, []);

  if (!packageInfo) return <div>Package not found</div>;

  return (
    <div className="py-10 px-4 animate-fadeIn">
      <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-lg overflow-hidden transform transition-all duration-500 hover:shadow-xl">
        <div className="relative h-96">
          <img
            src={packageInfo.image}
            alt={packageInfo.title}
            className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
          />
          <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center">
            <h1 className="text-4xl font-bold text-white">{packageInfo.title}</h1>
          </div>
        </div>

        <div className="p-8">
          <div className="mb-6">
            <div className="flex justify-between items-center mb-4">
              <span className="text-3xl font-bold text-red-600">${packageInfo.price}</span>
              <span className="text-green-600 font-semibold">{packageInfo.savings}</span>
            </div>
            <p className="text-gray-600">{packageInfo.description}</p>
            <p className="text-gray-600 mt-2">Serves: {packageInfo.serves}</p>
          </div>

          <div className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">Package Includes:</h2>
            <ul className="space-y-3">
              {packageInfo.items.map((item, index) => (
                <li key={index} className="flex items-center text-gray-700">
                  <span className="w-2 h-2 bg-red-600 rounded-full mr-3"></span>
                  {item}
                </li>
              ))}
            </ul>
          </div>

          <p className="text-sm text-gray-500 mb-6">{packageInfo.terms}</p>

          <div className="flex space-x-4">
            <Link
              to="/cart"
              className="flex-1 bg-red-600 text-white text-center py-3 rounded-full hover:bg-red-700 transition-all"
            >
              Add to Cart - ${packageInfo.price}
            </Link>
            <Link
              to="/"
              className="px-6 py-3 border border-red-600 text-red-600 rounded-full hover:bg-red-50 transition-all"
            >
              Back
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PackageDetails;