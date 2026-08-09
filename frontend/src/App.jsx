import { Routes, Route, useLocation } from "react-router-dom";

import ScrollToTop from "./components/ScrollToTop";
import RequireSeller from "./components/RequireSeller";
import ProtectedRoute from "./context/ProtectedRoute";

import Navbar from "./components/layout/NavBar";
import AdminLayout from "./layouts/AdminLayout";

import Home from "./pages/Home";
import Products from "./pages/Products";
import ProductDetails from "./pages/ProductDetails";
import Farms from "./pages/Farms";
import SmartFarming from "./pages/SmartFarming";
import Sustainability from "./pages/Sustainability";
import About from "./pages/About";
import Contact from "./pages/Contact";

import Cart from "./pages/Cart";
import Wishlist from "./pages/Wishlist";
import Checkout from "./pages/Checkout";
import Orders from "./pages/Orders";
import OrderDetails from "./pages/OrderDetails";

import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Profile from "./pages/Profile";

import NotFound from "./pages/NotFound";

import AdminLogin from "./admin/AdminLogin";
import Footer from "./components/layout/Footer";

import AdminDashboard from "./admin/Dashboard";
import AddProduct from "./admin/AddProduct";
import Inventory from "./admin/Inventory";
import Users from "./admin/Users";
import OrderAdmin from "./admin/Orders";
import Analytics from "./admin/Analytics";
import EditProduct from "./admin/EditProduct";

function App() {
  const location = useLocation();
  const isAdminRoute = location.pathname.startsWith("/admin");
  const hideNavAndFooter = ["/login", "/signup"].includes(location.pathname) || isAdminRoute;

  return (
    <>
      <ScrollToTop />

      {!hideNavAndFooter && <Navbar />}

      <Routes>
        <Route element={<ProtectedRoute />}>
          <Route path="/" element={<Home />} />
          <Route path="/products" element={<Products />} />
          <Route path="/products/:id" element={<ProductDetails />} />

          <Route path="/farms" element={<Farms />} />
          <Route path="/smart-farming" element={<SmartFarming />} />
          <Route path="/sustainability" element={<Sustainability />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />

          <Route path="/cart" element={<Cart />} />
          <Route path="/wishlist" element={<Wishlist />} />
          <Route path="/checkout" element={<Checkout />} />

          <Route path="/orders" element={<Orders />} />
          <Route path="/orders/:id" element={<OrderDetails />} />

          <Route path="/profile" element={<Profile />} />
        </Route>

        {/* These stay OUTSIDE ProtectedRoute — must be reachable without login */}
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/admin/login" element={<AdminLogin />} />

        <Route
          path="/admin"
          element={
            <RequireSeller>
              <AdminLayout />
            </RequireSeller>
          }
        >
          <Route path="dashboard" element={<AdminDashboard />} />
          <Route path="add-product" element={<AddProduct />} />
          <Route path="inventory" element={<Inventory />} />
          <Route path="users" element={<Users />} />
          <Route path="orders" element={<OrderAdmin />} />
          <Route path="analytics" element={<Analytics />} />
          <Route path="edit-product/:id" element={<EditProduct />} />
        </Route>

        <Route path="*" element={<NotFound />} />
      </Routes>

      {!hideNavAndFooter && <Footer />}
    </>
  );
}

export default App;