import React, { createContext, useState, useEffect } from 'react';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [authToken, setAuthToken] = useState(null);
  const [user, setUser] = useState(null);
  // This effect runs when the component mounts, for example, to fetch the token from local storage or an API.
  useEffect(() => {
    const token = localStorage.getItem('authToken');
    const userString = localStorage.getItem('user');
    
    if (token) {
      setAuthToken(token);
    }
    if (userString) {
      try {
        const user = JSON.parse(userString);
        setUser(user);
      } catch (error) {
        console.error("Error parsing user data:", error);
        setUser(null);
      }
    } else {
      setUser(null);
    }
  }, []);
  // Function to log in (set token)
  const login = (token, user) => {
    setAuthToken(token);
    setUser(user);
    localStorage.setItem('authToken', token);
    localStorage.setItem('user', JSON.stringify(user));
  };

  // Function to log out (clear token)
  const logout = () => {
    setAuthToken(null);
    setUser(null);
    localStorage.removeItem('authToken');
    localStorage.removeItem('user');
  };

  return (
    <AuthContext.Provider value={{ authToken,user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
