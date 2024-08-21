import React, { createContext, useState, useEffect } from 'react';

// Create a context
export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [authToken, setAuthToken] = useState(null);

  // This effect runs when the component mounts, for example, to fetch the token from local storage or an API.
  useEffect(() => {
    const token = localStorage.getItem('authToken');
    if (token) {
      setAuthToken(token);
    }
  }, []);

  // Function to log in (set token)
  const login = (token) => {
    setAuthToken(token);
    localStorage.setItem('authToken', token);
  };

  // Function to log out (clear token)
  const logout = () => {
    setAuthToken(null);
    localStorage.removeItem('authToken');
  };

  return (
    <AuthContext.Provider value={{ authToken, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
