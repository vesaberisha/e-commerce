import React, { createContext, useState, useEffect } from 'react';
import jwtDecode from 'jwt-decode';  // Install: npm install jwt-decode

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem('accessToken');
    if (token) {
      const decoded = jwtDecode(token);
      setUser({ id: decoded.id, role: decoded.role });
    }
  }, []);

  return (
    <AuthContext.Provider value={{ user, setUser }}>
      {children}
    </AuthContext.Provider>
  );
};