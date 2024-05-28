// src/contexts/SessionContext.js
import React, { createContext, useContext, useState, useEffect } from "react";
import SessionHelper from "./SessionHelper";

const SessionContext = createContext();

export const useSession = () => {
  return useContext(SessionContext);
};

export const SessionProvider = ({ children }) => {
  const [user, setUser] = useState(SessionHelper.getUser());

  useEffect(() => {
    const user = SessionHelper.getUser();
    setUser(user);
  }, []);

  const login = (userData) => {
    SessionHelper.setUser(userData);
    setUser(userData);
  };

  const logout = () => {
    SessionHelper.deleteUser();
    setUser(null);
  };

  return (
    <SessionContext.Provider value={{ user, login, logout }}>
      {children}
    </SessionContext.Provider>
  );
};
