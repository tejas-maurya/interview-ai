import { createContext, useState } from "react";
import { getMe } from "./services/auth.api";
export const Authcontext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);      // ✅ fixed
  const [loading, setLoading] = useState(true);
    
  return (
    <Authcontext.Provider value={{ user, setUser, loading, setLoading }}>
      {children}   {/* ✅ fixed */}
    </Authcontext.Provider>
  );
};