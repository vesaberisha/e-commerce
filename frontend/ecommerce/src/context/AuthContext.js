import React, { createContext, useState, useEffect } from 'react';
import { jwtDecode } from 'jwt-decode';


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

  const login = (userData) => {
    setUser(userData);
  };

  const logoutUser = () => {
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, setUser, login, logout: logoutUser }}>
      {children}
    </AuthContext.Provider>
  );
};
export default AuthProvider;