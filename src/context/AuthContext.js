import React, { createContext, useContext, useState } from 'react';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) =>
{
  const [user, setUser] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const login = (userData) =>
  {
    setUser(userData);
    setIsLoggedIn(true);
    // console.log('User logged in:', userData); // Removed console.log
  };

  const logout = () =>
  {
    setUser(null);
    setIsLoggedIn(false);
    // console.log('User logged out'); // Removed console.log
  };

  const value =
  {
    user,
    isLoggedIn,
    login,
    logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () =>
{
  const context = useContext(AuthContext);
  if (context === undefined)
  {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export default AuthContext;