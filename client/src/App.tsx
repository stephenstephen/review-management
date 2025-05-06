import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Layout from '@/components/layout/Layout';
import LandingPage from '@/pages/landing/Landing';
import LoginPage from '@/pages/auth/Login';
import DashboardPage from '@/pages/dashboard/Dashboard';
import { AuthProvider } from '@/features/auth/context/AuthContext';
import { ProtectedRoute } from '@/features/auth/guards/ProtectedRoute';

export default function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          <Route element={<Layout />}>
            <Route path="/" element={<LandingPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route
              path="/dashboard"
              element={
                <ProtectedRoute>
                  <DashboardPage />
                </ProtectedRoute>
              }
            />
          </Route>
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
}
