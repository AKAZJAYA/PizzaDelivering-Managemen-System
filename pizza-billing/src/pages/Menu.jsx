import { useCart } from "../store/CartContext";
import PizzaItem from "../components/PizzaItem";

const pizzaCategories = {
  delight: {
    title: "Delight Pizzas",
    priceRange: "8.99 - 11.99",
    items: [
      {
        id: "d1",
        name: "Garden Fresh",
        description: "Fresh bell peppers, mushrooms, onions, tomatoes with light cheese",
        price: "8.99",
        image: "https://images.unsplash.com/photo-1528137871618-79d2761e3fd5",
      },
      {
        id: "d2",
        name: "Veggie Paradise",
        description: "Corn, black olives, capsicum and fresh vegetables",
        price: "9.49",
        image: "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38",
      },
      {
        id: "d3",
        name: "Mediterranean",
        description: "Feta cheese, olives, tomatoes, and fresh herbs",
        price: "9.99",
        image: "https://images.unsplash.com/photo-1513104890138-7c749659a591",
      },
      {
        id: "d4",
        name: "Light Margherita",
        description: "Light cheese, fresh basil, and cherry tomatoes",
        price: "8.99",
        image: "https://images.unsplash.com/photo-1574071318508-1cdbab80d002",
      },
      {
        id: "d5",
        name: "Green Garden",
        description: "Spinach, broccoli, green peppers, and pesto",
        price: "10.49",
        image: "https://images.unsplash.com/photo-1595708684082-a173bb3a06c5",
      },
      {
        id: "d6",
        name: "Mushroom Magic",
        description: "Three types of mushrooms with herbs",
        price: "10.99",
        image: "https://images.unsplash.com/photo-1571407970349-bc81e7e96d47",
      },
      {
        id: "d7",
        name: "Fresh & Light",
        description: "Cherry tomatoes, rocket leaves, and light mozzarella",
        price: "9.99",
        image: "https://images.unsplash.com/photo-1598023696416-0193a0bcd302",
      },
      {
        id: "d8",
        name: "Herb Garden",
        description: "Mixed herbs, cherry tomatoes, and goat cheese",
        price: "11.99",
        image: "https://images.unsplash.com/photo-1600628421055-4d30de868b8f",
      }
    ]
  },
  classic: {
    title: "Classic Pizzas",
    priceRange: "10.99 - 13.99",
    items: [
      {
        id: "c1",
        name: "Pepperoni Classic",
        description: "Classic pepperoni with mozzarella cheese",
        price: "11.99",
        image: "https://images.unsplash.com/photo-1628840042765-356cda07504e",
      },
      {
        id: "c2",
        name: "Hawaiian",
        description: "Ham, pineapple, and extra cheese",
        price: "12.49",
        image: "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38",
      },
      {
        id: "c3",
        name: "BBQ Chicken",
        description: "Grilled chicken with BBQ sauce and onions",
        price: "12.99",
        image: "https://images.unsplash.com/photo-1513104890138-7c749659a591",
      },
      {
        id: "c4",
        name: "Four Cheese",
        description: "Mozzarella, cheddar, parmesan, and blue cheese",
        price: "11.99",
        image: "https://images.unsplash.com/photo-1574071318508-1cdbab80d002",
      },
      {
        id: "c5",
        name: "Margherita Plus",
        description: "Buffalo mozzarella, fresh basil, and olive oil",
        price: "10.99",
        image: "https://images.unsplash.com/photo-1595708684082-a173bb3a06c5",
      },
      {
        id: "c6",
        name: "Vegetarian",
        description: "Mixed vegetables with double cheese",
        price: "11.49",
        image: "https://images.unsplash.com/photo-1571407970349-bc81e7e96d47",
      },
      {
        id: "c7",
        name: "Mushroom & Olive",
        description: "Mushrooms, black olives, and mozzarella",
        price: "12.99",
        image: "https://images.unsplash.com/photo-1598023696416-0193a0bcd302",
      },
      {
        id: "c8",
        name: "Italian Classic",
        description: "Italian herbs, tomatoes, and fresh mozzarella",
        price: "13.99",
        image: "https://images.unsplash.com/photo-1600628421055-4d30de868b8f",
      }
    ]
  },
  signature: {
    title: "Signature Pizzas",
    priceRange: "12.99 - 15.99",
    items: [
      {
        id: "s1",
        name: "Chef's Special",
        description: "Secret recipe with premium toppings",
        price: "14.99",
        image: "https://images.unsplash.com/photo-1628840042765-356cda07504e",
      },
      {
        id: "s2",
        name: "Mediterranean Delight",
        description: "Feta, olives, sun-dried tomatoes",
        price: "13.99",
        image: "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38",
      },
      {
        id: "s3",
        name: "Spicy Supreme",
        description: "Jalapeños, spicy chicken, and hot sauce",
        price: "14.49",
        image: "https://images.unsplash.com/photo-1513104890138-7c749659a591",
      },
      {
        id: "s4",
        name: "Seafood Special",
        description: "Shrimp, calamari, and fresh herbs",
        price: "15.99",
        image: "https://images.unsplash.com/photo-1574071318508-1cdbab80d002",
      },
      {
        id: "s5",
        name: "BBQ Explosion",
        description: "Mixed meats with special BBQ sauce",
        price: "14.99",
        image: "https://images.unsplash.com/photo-1595708684082-a173bb3a06c5",
      },
      {
        id: "s6",
        name: "Pesto Chicken",
        description: "Grilled chicken with homemade pesto",
        price: "13.99",
        image: "https://images.unsplash.com/photo-1571407970349-bc81e7e96d47",
      },
      {
        id: "s7",
        name: "Mexican Fiesta",
        description: "Ground beef, jalapeños, and Mexican spices",
        price: "14.99",
        image: "https://images.unsplash.com/photo-1598023696416-0193a0bcd302",
      },
      {
        id: "s8",
        name: "Truffle Mushroom",
        description: "Mixed mushrooms with truffle oil",
        price: "15.99",
        image: "https://images.unsplash.com/photo-1600628421055-4d30de868b8f",
      }
    ]
  },
  favorite: {
    title: "Favorite Pizzas",
    priceRange: "14.99 - 17.99",
    items: [
      {
        id: "f1",
        name: "Meat Lover's",
        description: "Five different premium meats",
        price: "16.99",
        image: "https://images.unsplash.com/photo-1628840042765-356cda07504e",
      },
      {
        id: "f2",
        name: "Seafood Deluxe",
        description: "Premium seafood mix with special sauce",
        price: "17.99",
        image: "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38",
      },
      {
        id: "f3",
        name: "Double Pepperoni",
        description: "Extra pepperoni with double cheese",
        price: "15.99",
        image: "https://images.unsplash.com/photo-1513104890138-7c749659a591",
      },
      {
        id: "f4",
        name: "Chicken Supreme",
        description: "Three types of chicken with special herbs",
        price: "16.49",
        image: "https://images.unsplash.com/photo-1574071318508-1cdbab80d002",
      },
      {
        id: "f5",
        name: "Ultimate Cheese",
        description: "Six different types of cheese blend",
        price: "15.99",
        image: "https://images.unsplash.com/photo-1595708684082-a173bb3a06c5",
      },
      {
        id: "f6",
        name: "Bacon Deluxe",
        description: "Loaded with bacon and special toppings",
        price: "16.99",
        image: "https://images.unsplash.com/photo-1571407970349-bc81e7e96d47",
      },
      {
        id: "f7",
        name: "Buffalo Chicken",
        description: "Spicy buffalo chicken with ranch",
        price: "15.99",
        image: "https://images.unsplash.com/photo-1598023696416-0193a0bcd302",
      },
      {
        id: "f8",
        name: "Pulled Pork",
        description: "BBQ pulled pork with caramelized onions",
        price: "17.49",
        image: "https://images.unsplash.com/photo-1600628421055-4d30de868b8f",
      }
    ]
  },
  supreme: {
    title: "Supreme Pizzas",
    priceRange: "16.99 - 19.99",
    items: [
      {
        id: "sp1",
        name: "Royal Supreme",
        description: "Premium meats, truffles, and gold leaf",
        price: "19.99",
        image: "https://images.unsplash.com/photo-1628840042765-356cda07504e",
      },
      {
        id: "sp2",
        name: "Wagyu Special",
        description: "Wagyu beef with premium toppings",
        price: "19.99",
        image: "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38",
      },
      {
        id: "sp3",
        name: "Lobster Delight",
        description: "Fresh lobster with special sauce",
        price: "18.99",
        image: "https://images.unsplash.com/photo-1513104890138-7c749659a591",
      },
      {
        id: "sp4",
        name: "Truffle Supreme",
        description: "Black truffle with premium mushrooms",
        price: "17.99",
        image: "https://images.unsplash.com/photo-1574071318508-1cdbab80d002",
      },
      {
        id: "sp5",
        name: "Caviar Special",
        description: "Premium caviar with special blend",
        price: "19.99",
        image: "https://images.unsplash.com/photo-1595708684082-a173bb3a06c5",
      },
      {
        id: "sp6",
        name: "Gold Leaf Deluxe",
        description: "24k gold leaf with premium ingredients",
        price: "19.99",
        image: "https://images.unsplash.com/photo-1571407970349-bc81e7e96d47",
      },
      {
        id: "sp7",
        name: "King's Special",
        description: "Premium meat selection with truffles",
        price: "18.99",
        image: "https://images.unsplash.com/photo-1598023696416-0193a0bcd302",
      },
      {
        id: "sp8",
        name: "Ultimate Supreme",
        description: "All premium toppings in one",
        price: "19.99",
        image: "https://images.unsplash.com/photo-1600628421055-4d30de868b8f",
      }
    ]
  }
};

const Menu = () => {
  const { addToCart } = useCart();

  return (
    <div className="py-10 px-4">
      <h1 className="text-4xl font-bold text-center mb-10 text-red-600">Our Menu</h1>
      
      {Object.entries(pizzaCategories).map(([category, { title, priceRange, items }]) => (
        <div key={category} className="mb-12">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-gray-800">{title}</h2>
            <p className="text-gray-600">Price Range: ${priceRange}</p>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
            {items.map((pizza) => (
              <PizzaItem
                key={pizza.id}
                pizza={pizza}
                addToCart={() => addToCart(pizza)}
              />
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default Menu;