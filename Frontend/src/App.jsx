import { Routes, Route, useLocation } from "react-router-dom";
import { useEffect } from "react";
import ReactGA from "react-ga4";

import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import ProductList from "./pages/ProductList";
import ProductDetail from "./pages/ProductDetail";
import Cart from "./pages/Cart";
import Checkout from "./pages/Checkout";
import AdminProducts from "./pages/AdminProducts";
import { AuthProvider } from "./context/AuthContext";

function App() {
  const location = useLocation();

  
  useEffect(() => {
    ReactGA.send({
      hitType: "pageview",
      page: location.pathname,
    });
  }, [location]);

  return (
    <AuthProvider>
      <div className="min-h-screen bg-gray-50 flex flex-col">
        <Navbar />

        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/products" element={<ProductList />} />
            <Route path="/products/:id" element={<ProductDetail />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/checkout" element={<Checkout />} />
            <Route path="/admin" element={<AdminProducts />} />
          </Routes>
        </main>

        <footer className="bg-gray-800 text-white text-center py-4 mt-auto">
          <p>&copy; 2024 MarketPlace Project. All rights reserved.</p>
        </footer>
      </div>
    </AuthProvider>
  );
}

export default App;
