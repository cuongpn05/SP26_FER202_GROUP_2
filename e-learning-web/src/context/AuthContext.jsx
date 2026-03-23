import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // Check for stored user on mount
  useEffect(() => {
    const storedUser = sessionStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
      setIsLoggedIn(true);
    }
  }, []);

  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [authMode, setAuthMode] = useState('login');

  const openAuthModal = useCallback((mode = 'login') => {
    setAuthMode(mode);
    setIsAuthModalOpen(true);
  }, []);

  const closeAuthModal = useCallback(() => {
    setIsAuthModalOpen(false);
  }, []);

  const login = useCallback((userData) => {
    setUser(userData);
    setIsLoggedIn(true);
    sessionStorage.setItem('user', JSON.stringify(userData));
    closeAuthModal();
  }, [closeAuthModal]);

  const logout = useCallback(() => {
    setUser(null);
    setIsLoggedIn(false);
    sessionStorage.removeItem('user');
  }, []);

  const value = React.useMemo(() => ({
    user,
    isLoggedIn,
    login,
    logout,
    isAuthModalOpen,
    authMode,
    openAuthModal,
    closeAuthModal,
    setAuthMode
  }), [
    user,
    isLoggedIn,
    login,
    logout,
    isAuthModalOpen,
    authMode,
    openAuthModal,
    closeAuthModal,
  ]);

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
