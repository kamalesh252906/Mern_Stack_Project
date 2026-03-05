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

/**
 * Route protection: Redirects to login if not authenticated.
 */
const PrivateRoute = ({ children }) => {
  const { user, loading } = useAuth();

  if (loading) return (
    <div className="loading-container">
      <div className="loading-spinner"></div>
      <h2>Checking access...</h2>
    </div>
  );

  if (!user) return <Navigate to="/login" />;

  return children;
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
              <PrivateRoute>
                <Layout />
              </PrivateRoute>
            }>
              <Route path="dashboard" element={<CustomerDashboard />} />
              <Route index element={<Navigate to="dashboard" />} />
            </Route>

            {/* Catch-all: Send to Login or Dashboard */}
            <Route path="/" element={<Navigate to="/customer/dashboard" />} />
            <Route path="*" element={<Navigate to="/" />} />
          </Routes>
        </BrowserRouter>
      </TicketProvider>
    </AuthProvider>
  );
}

export default App;



