import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { CartProvider } from "./store/CartContext";
import { AuthProvider } from "./store/AuthContext";
import "./index.css";  // This imports the Tailwind CSS

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <AuthProvider>
      <CartProvider>
        <App />
      </CartProvider>
    </AuthProvider>
  </React.StrictMode>
);