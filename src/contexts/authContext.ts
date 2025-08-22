import { createContext } from "react";

export const AuthContext = createContext({
  isAuthenticated: false,
  setIsAuthenticated: (_: boolean) => {},
  logout: () => {},
});