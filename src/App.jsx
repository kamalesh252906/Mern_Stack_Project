import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';

// Context Providers
import { AuthProvider, useAuth } from './context/AuthContext';
import { TicketProvider } from './context/TicketContext';

// Layout
import Layout from './components/common/Layout';

// Pages
import Login from './pages/auth/Login';
import Signup from './pages/auth/Signup';
import CustomerDashboard from './pages/customer/Dashboard';
import ManagerDashboard from './pages/manager/Dashboard';
import SupportDashboard from './pages/support/Dashboard';

/**
 * Route protection: Redirects to login if not authenticated.
 */
const PrivateRoute = ({ children, allowedRoles }) => {
  const { user, loading } = useAuth();

  if (loading) return (
    <div className="loading-container">
      <div className="loading-spinner"></div>
      <h2>Checking access...</h2>
    </div>
  );

  if (!user) return <Navigate to="/login" />;

  if (allowedRoles && !allowedRoles.includes(user.role)) {
    if (user.role === 'manager') return <Navigate to="/manager/dashboard" />;
    if (user.role === 'support') return <Navigate to="/support/dashboard" />;
    return <Navigate to="/customer/dashboard" />;
  }

  return children;
};

const RootRedirect = () => {
  const { user, loading } = useAuth();

  if (loading) return (
    <div className="loading-container">
      <div className="loading-spinner"></div>
      <h2>Loading...</h2>
    </div>
  );

  if (!user) return <Navigate to="/login" />;

  if (user.role === 'manager') return <Navigate to="/manager/dashboard" />;
  if (user.role === 'support') return <Navigate to="/support/dashboard" />;
  return <Navigate to="/customer/dashboard" />;
};

function App() {
  return (
    <AuthProvider>
      <TicketProvider>
        <BrowserRouter>
          <Routes>
            {/* Public Routes */}
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />

            {/* Customer Routes - Main App Area */}
            <Route path="/customer" element={
              <PrivateRoute allowedRoles={['customer']}>
                <Layout />
              </PrivateRoute>
            }>
              <Route path="dashboard" element={<CustomerDashboard />} />
              <Route index element={<Navigate to="dashboard" />} />
            </Route>

            {/* Manager Routes */}
            <Route path="/manager" element={
              <PrivateRoute allowedRoles={['manager']}>
                <Layout />
              </PrivateRoute>
            }>
              <Route path="dashboard" element={<ManagerDashboard />} />
              <Route index element={<Navigate to="dashboard" />} />
            </Route>

            {/* Support Routes */}
            <Route path="/support" element={
              <PrivateRoute allowedRoles={['support']}>
                <Layout />
              </PrivateRoute>
            }>
              <Route path="dashboard" element={<SupportDashboard />} />
              <Route index element={<Navigate to="dashboard" />} />
            </Route>

            {/* Catch-all: Send to Login or Dashboard */}
            <Route path="/" element={<RootRedirect />} />
            <Route path="*" element={<Navigate to="/" />} />
          </Routes>
        </BrowserRouter>
      </TicketProvider>
    </AuthProvider>
  );
}

export default App;
