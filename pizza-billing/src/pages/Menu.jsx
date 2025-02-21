import { useCart } from "../store/CartContext";
import { useState, useEffect } from "react";
import axios from "axios";

const Menu = () => {
  const { addToCart } = useCart();
  const [pizzaCategories, setPizzaCategories] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPizzas = async () => {
      try {
        const response = await axios.get("http://localhost:3000/api/pizzas");
        const pizzas = response.data;

        const categorizedPizzas = pizzas.reduce((acc, pizza) => {
          const category = pizza.category.toLowerCase().replace(" ", "_");

          if (!acc[category]) {
            acc[category] = {
              title: pizza.category,
              items: [],
              priceRange: "",
            };
          }

          acc[category].items.push({
            id: pizza.id,
            name: pizza.name,
            description: pizza.description,
            price: pizza.price.toFixed(2),
            image: pizza.image_url || pizza.image, // Use image_url if available, fallback to image
          });

          return acc;
        }, {});

        Object.keys(categorizedPizzas).forEach((category) => {
          const prices = categorizedPizzas[category].items.map((item) =>
            parseFloat(item.price)
          );
          const minPrice = Math.min(...prices).toFixed(2);
          const maxPrice = Math.max(...prices).toFixed(2);
          categorizedPizzas[category].priceRange = `${minPrice} - ${maxPrice}`;
        });

        setPizzaCategories(categorizedPizzas);
        // console.log('fetched pizzas: ', pizzas);
        console.log('categorized pizzas: ', categorizedPizzas);
      } catch (err) {
        setError("Failed to fetch pizzas");
        console.error("Error fetching pizzas:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchPizzas();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-red-600"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-10 text-red-600">
        <h2 className="text-2xl font-bold">Error</h2>
        <p>{error}</p>
      </div>
    );
  }

  return (
    <div className="py-10 px-4">
      <h1 className="text-4xl font-bold text-center mb-10 text-red-600">
        Our Menu
      </h1>

      {Object.entries(pizzaCategories).map(
        ([category, { title, priceRange, items }]) => (
          <div key={category} className="mb-12">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold text-gray-800">{title}</h2>
              <p className="text-gray-600">Price Range: ${priceRange}</p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
              {items.map((pizza) => {
                // console.log('product: ', pizza);
                return (
                  <div
                    key={pizza.id}
                    className="bg-white p-6 rounded-lg shadow-lg"
                  >
                    <img
                      src={pizza.image}
                      alt={pizza.name}
                      className="w-full h-48 object-cover rounded-md mb-4"
                      onError={(e) => {
                        e.target.src = "/default-pizza.jpg";
                        console.log("Failed to load image:", pizza.image); // Debug log
                      }}
                    />
                    <h3 className="text-xl font-semibold mb-2">{pizza.name}</h3>
                    <p className="text-gray-600 mb-3">{pizza.description}</p>
                    <p className="text-2xl font-bold text-red-600 mb-3">
                      ${pizza.price}
                    </p>
                    <button
                      onClick={() => addToCart(pizza)}
                      className="w-full bg-red-600 text-white py-2 px-4 rounded-full hover:bg-red-700 transition-colors"
                    >
                      Add to Cart
                    </button>
                  </div>
                );
              })}
            </div>
          </div>
        )
      )}
    </div>
  );
};

export default Menu;
