import React, { createContext, useContext, useState, useEffect } from 'react';

/**
 * 1. Create the Authentication Context.
 * This will hold the logged-in user's information and login/logout functions.
 */
const AuthContext = createContext();

/**
 * 2. Create the AuthProvider component.
 */
export const AuthProvider = ({ children }) => {
  // 'user' will be null if nobody is logged in, or an object if they are.
  const [user, setUser] = useState(null);

  // 'loading' helps us wait for the browser to check if a user was already logged in.
  const [loading, setLoading] = useState(true);

  /**
   * useEffect runs once when the app starts.
   * We check 'localStorage' to see if a user was previously logged in.
   */
  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      // If we found a user, we 'parse' the string back into a JavaScript object.
      setUser(JSON.parse(storedUser));
    }
    // Once checking is done, we set loading to false.
    setLoading(false);
  }, []);

  /**
   * Function to handle user login.
   * Since we don't have a real backend, we 'mock' it here.
   */
  const login = (email, password) => {
    // Basic logic to decide the role based on the email address.
    let role = 'customer';
    if (email.includes('support')) role = 'support';
    if (email.includes('manager')) role = 'manager';

    // Create a mock user object.
    const userData = {
      email: email,
      role: role,
      token: 'mock-jwt-token',
      // Get the name from the email (e.g., 'john@example.com' -> 'John')
      name: email.split('@')[0].charAt(0).toUpperCase() + email.split('@')[0].slice(1)
    };

    // Store the user in the browser's memory so they stay logged in if they refresh.
    localStorage.setItem('user', JSON.stringify(userData));

    // Update our 'user' state so the whole app knows who is logged in.
    setUser(userData);
    return userData;
  };

  /**
   * Function to handle new user sign up.
   */
  const signup = (name, email, password) => {
    const userData = {
      email: email,
      role: 'customer', // New users always start as customers.
      token: 'mock-jwt-token',
      name: name
    };

    localStorage.setItem('user', JSON.stringify(userData));
    setUser(userData);
    return userData;
  };

  /**
   * Function to log the user out.
   */
  const logout = () => {
    // Remove the user from the browser's memory.
    localStorage.removeItem('user');

    // Set our state back to null.
    setUser(null);
  };

  // Provide the user data and functions to the rest of the app.
  return (
    <AuthContext.Provider value={{ user, login, signup, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

/**
 * 3. Simplify access with a custom 'useAuth' hook.
 */
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

