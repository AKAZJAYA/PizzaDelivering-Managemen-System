import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Menu from "./pages/Menu";
import Cart from "./pages/Cart";
import Checkout from "./pages/Checkout";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import PackageDetails from "./components/PackageDetails";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import Layout from "./components/Layout";
import SideBar from "./components/Admin/SideBar"
import ProtectedAdminRoute from './components/ProtectedAdminRoute';

import ViewInventory from "./pages/Admin/ViewInventory";
import AddPizza from "./pages/Admin/AddPizzas";
import AdminDash from "./pages/Admin/AdminDash";
import AdminLayout from "./components/Admin/AdminLayout";
import EditPizzaDetails from "./pages/Admin/EditPizzaDetails";
import PizzaList from "./components/Admin/PizzaList";



function App() {
  return (
    <Router>
      <div className="min-h-screen flex flex-col">
        <main className="flex-grow">
          <Routes>
            {/* Admin Routes - Protected */}
            <Route
              path="admin"
              element={
                <ProtectedAdminRoute>
                  <SideBar />
                </ProtectedAdminRoute>
              }
            >
              <Route path="dash" element={<AdminDash />} />
              <Route path="add-pizza" element={<AddPizza />} />
              <Route path="inventory" element={<ViewInventory />} />
              <Route path="update-pizza" element={<PizzaList />} />
              <Route path="update-pizza/:id" element={<EditPizzaDetails />} />
            </Route>

            {/* Existing Routes */}
            <Route path="/" element={<Layout />}>
              <Route path="/home" element={<Home />} />
              <Route path="/menu" element={<Menu />} />
              <Route path="/cart" element={<Cart />} />
              <Route path="/checkout" element={<Checkout />} />
              <Route path="/package/:id" element={<PackageDetails />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/add-pizza" element={<AddPizza />} />
            </Route>
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;