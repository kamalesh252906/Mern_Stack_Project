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
<<<<<<< HEAD
import ManagerDashboard from './pages/manager/Dashboard';
import SupportDashboard from './pages/support/Dashboard';
=======
>>>>>>> a871b3c86d545d04a745a8f39da3ffe50c224086

/**
 * Route protection: Redirects to login if not authenticated.
 */
<<<<<<< HEAD
const PrivateRoute = ({ children, allowedRoles }) => {
=======
const PrivateRoute = ({ children }) => {
>>>>>>> a871b3c86d545d04a745a8f39da3ffe50c224086
  const { user, loading } = useAuth();

  if (loading) return (
    <div className="loading-container">
      <div className="loading-spinner"></div>
      <h2>Checking access...</h2>
    </div>
  );

  if (!user) return <Navigate to="/login" />;

<<<<<<< HEAD
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

=======
  return children;
};

>>>>>>> a871b3c86d545d04a745a8f39da3ffe50c224086
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
<<<<<<< HEAD
              <PrivateRoute allowedRoles={['customer']}>
=======
              <PrivateRoute>
>>>>>>> a871b3c86d545d04a745a8f39da3ffe50c224086
                <Layout />
              </PrivateRoute>
            }>
              <Route path="dashboard" element={<CustomerDashboard />} />
              <Route index element={<Navigate to="dashboard" />} />
            </Route>

<<<<<<< HEAD
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
=======
            {/* Catch-all: Send to Login or Dashboard */}
            <Route path="/" element={<Navigate to="/customer/dashboard" />} />
>>>>>>> a871b3c86d545d04a745a8f39da3ffe50c224086
            <Route path="*" element={<Navigate to="/" />} />
          </Routes>
        </BrowserRouter>
      </TicketProvider>
    </AuthProvider>
  );
}

export default App;
<<<<<<< HEAD
=======



>>>>>>> a871b3c86d545d04a745a8f39da3ffe50c224086
