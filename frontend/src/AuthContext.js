import React, { createContext, useContext, useState } from 'react';
import { Navigate } from 'react-router-dom';

// Create the AuthContext
const AuthContext = createContext();

// AuthProvider component to manage authentication state
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  const login = (userInfo) => {
    setUser(userInfo);
    localStorage.setItem("user", JSON.stringify(userInfo));
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("user");
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook to use the AuthContext
export const useAuth = () => {
  return useContext(AuthContext);
};

// ProtectedRoute component to protect routes
export const ProtectedRoute = ({ element }) => {
  const { user } = useAuth(); // Get the user from the context

  // If the user is not logged in, redirect to login
  if (!user) {
    return <Navigate to="/login" />;
  }

  // If the user is logged in, render the element
  return element;
};
