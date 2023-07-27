import { createContext, useContext, useState } from "react";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [userLoggedIn, setUserLoggedIn] = useState(false);

  const handleLogoff = () => {
    setUserLoggedIn(false);
    setUserIdLoggedIn(0);
    setUserNameLoggedIn("");
    sessionStorage.removeItem("loginState");
  };

  return (
    <AuthContext.Provider value={{ userLoggedIn, handleLogoff }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
