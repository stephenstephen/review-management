import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Layout from '@/components/layout/Layout';
import LandingPage from '@/pages/landing/Landing';
import LoginPage from '@/features/auth/pages/Login';
import DashboardPage from '@/pages/dashboard/Dashboard';
import { AuthProvider } from '@/features/auth/context/AuthContext';
import { ProtectedRoute } from '@/features/auth/guards/ProtectedRoute';
import { Toaster } from 'sonner';
import ProductsPage from '@/features/products/ProductsPage';
import NotFoundPage from '@/components/errors/NotFoundPage';

export default function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          <Route element={<Layout />}>
            <Route path="/" element={<LandingPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="*" element={<NotFoundPage />} />
            <Route
              path="/dashboard"
              element={
                <ProtectedRoute>
                  <DashboardPage />
                </ProtectedRoute>
              }
            />
            <Route
              path="/products"
              element={
                <ProtectedRoute>
                  <ProductsPage />
                </ProtectedRoute>
              }
            />
          </Route>
        </Routes>
      </AuthProvider>
      <Toaster richColors position="bottom-right" />
    </BrowserRouter>
  );
}
