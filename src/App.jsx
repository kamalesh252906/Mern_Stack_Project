import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';

// Context Providers: These allow data to be shared across the entire app.
import { AuthProvider, useAuth } from './context/AuthContext';
import { TicketProvider } from './context/TicketContext';

// Layout: A common wrapper that includes things like the Sidebar and Navbar.
import Layout from './components/common/Layout';

// Pages: The different screens of our application.
import Login from './pages/auth/Login';
import Signup from './pages/auth/Signup';
import CustomerDashboard from './pages/customer/Dashboard';
import SupportDashboard from './pages/support/Dashboard';
import ManagerDashboard from './pages/manager/Dashboard';

/**
 * Route protection: This helper checks if the user is authorized for a page.
 * If not, it redirects them safely.
 */
const PrivateRoute = ({ children, role }) => {
  const { user, loading } = useAuth();

  // Show a loading screen while we verify authentication.
  if (loading) return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="loading-spinner"></div>
      <h2 className="ml-4 font-bold">Checking access...</h2>
    </div>
  );

  // Redirect to login if not authenticated at all.
  if (!user) return <Navigate to="/login" />;

  // Enforce role-based access if specified.
  if (role && user.role !== role) {
    // Redirect to their own dashboard if they have the wrong role for this path
    if (user.role === 'customer') return <Navigate to="/customer/dashboard" />;
    if (user.role === 'support') return <Navigate to="/support/dashboard" />;
    if (user.role === 'manager') return <Navigate to="/manager/dashboard" />;
    return <Navigate to="/login" />;
  }

  return children;
};

/**
 * App: The Root Component.
 * This is where we define the overall application structure and navigation.
 */
function App() {
  return (
    /* We use Providers to share state globally across all pages. */
    <AuthProvider>
      <TicketProvider>
        {/* React Router handles the URL logic. */}
        <BrowserRouter>
          <Routes>
            {/* 1. Public Entry Points */}
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />

            {/* 2. Customer Routes - Protected by role check */}
            <Route path="/customer" element={
              <PrivateRoute role="customer">
                <Layout />
              </PrivateRoute>
            }>
              <Route path="dashboard" element={<CustomerDashboard />} />
              <Route index element={<Navigate to="dashboard" />} />
            </Route>

            {/* 3. Support Team Operations */}
            <Route path="/support" element={
              <PrivateRoute role="support">
                <Layout />
              </PrivateRoute>
            }>
              <Route path="dashboard" element={<SupportDashboard />} />
              <Route index element={<Navigate to="dashboard" />} />
            </Route>

            {/* 4. Manager Oversight and Analytics */}
            <Route path="/manager" element={
              <PrivateRoute role="manager">
                <Layout />
              </PrivateRoute>
            }>
              <Route path="dashboard" element={<ManagerDashboard />} />
              <Route index element={<Navigate to="dashboard" />} />
            </Route>

            {/* 5. Catch-all: Send any direct root access to Login */}
            <Route path="/" element={<Navigate to="/login" />} />
          </Routes>
        </BrowserRouter>
      </TicketProvider>
    </AuthProvider>
  );
}

export default App;


