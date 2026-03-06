import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';

// Layouts
import ClientLayout from "./components/layout/ClientLayout";
import AdminLayout from "./components/layout/AdminLayout";

// Context
import { CartProvider } from "./context/CartContext";

// Pages
import HomePage from "./pages/Dashboard/HomePage";
import MedicineDetail from './pages/Medicine/MedicineDetail';
import UserProfile from './pages/Profile/UserProfile';
import Login from './pages/Auth/Login/Login';
import CartPage from "./pages/Cart/CartPage";
import CheckoutPage from "./pages/Checkout/CheckoutPage";

// Admin Pages
import DashboardHome from "./pages/Admin/DashboardHome";
import ImportList from './pages/Dashboard/Import/ImportList';
import ImportCreate from './pages/Dashboard/Import/ImportCreate';
import UserProfile from './pages/Profile/UserProfile';
import Navbar from "./components/layout/Navbar";
import Footer from "./components/layout/Footer";
import HomePage from "./pages/Dashboard/HomePage";
import CategoryList from './pages/Dashboard/CategoryList';
import CategoryCreate from './pages/Dashboard/CategoryCreate';
function App() {
  return (
    <CartProvider>
      <Router>
        <Routes>
          {/* Auth Routes - Không dùng Layout chung */}
          <Route path="/login" element={<Login />} />

          {/* Cấu hình Route cho trang người dùng */}
          <Route path="/" element={<ClientLayout />}>
            <Route index element={<HomePage />} />
            <Route path="dashboard" element={<HomePage />} />
            <Route path="cart" element={<CartPage />} />
            <Route path="checkout" element={<CheckoutPage />} />
            <Route path="profile" element={<UserProfile />} />
            <Route path=":medicineId" element={<MedicineDetail />} />
          </Route>

          {/* Cấu hình Route cho trang quản trị (Admin) */}
          <Route path="/admin" element={<AdminLayout />}>
            <Route index element={<Navigate to="/admin/dashboard" replace />} />
            <Route path="dashboard" element={<DashboardHome />} />

        <main className="flex-grow-1">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/dashboard" element={<HomePage />} />
            <Route path="/dashboard/import/list" element={<ImportList />} />
            <Route path="/dashboard/import/create" element={<ImportCreate />} />
            <Route path="/profile" element={<UserProfile />} />
            <Route path="/category-list" element={<CategoryList />} />
            <Route path="/category-create" element={<CategoryCreate />} />
          </Routes>
        </main>

          {/* Fallback */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </Router>
    </CartProvider>
  );
}

export default App;
