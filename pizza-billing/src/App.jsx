import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Menu from "./pages/Menu";
import Cart from "./pages/Cart";
import Checkout from "./pages/Checkout";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import PackageDetails from "./components/PackageDetails";
import Login from "./pages/Login";
import Register from "./pages/register";
import Dashboard from "./pages/Dashboard";
import Layout from "./components/Layout";
import SideBar from "./components/Admin/SideBar"
import ProtectedAdminRoute from './components/ProtectedAdminRoute';

import ViewInventory from "./pages/Admin/ViewInventory";
import UpdatePizza from "./pages/Admin/UpdatePizza";
import AddPizza from "./pages/Admin/AddPizzas";
import AdminDash from "./pages/Admin/AdminDash";



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
              <Route path="update-pizza" element={<UpdatePizza />} />
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