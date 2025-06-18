/* eslint-disable react-refresh/only-export-components */
import { createContext, useContext, useEffect, useState } from "react";

// Create Auth Context
const AuthContext = createContext();

// Auth Provider
export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(localStorage.getItem("token") || null);
  const [userData, setUser] = useState(null); // default null to detect loading state
  const [services, setServices] = useState([]); // fixed initial state
  const [isLoading, setLoading] = useState(true);
  const AuthorizationToken = `Bearer ${token}`;

  const storeToken = (serverToken) => {
    localStorage.setItem("token", serverToken);
    setToken(serverToken);
  };

  const logout = () => {
    localStorage.removeItem("token");
    setToken(null);
    setUser(null);
  };

  const isAuthenticated = !!token;

  const userAuthentication = async () => {
    try {
      setLoading(true);
      const response = await fetch("http://localhost:5000/api/auth/user", {
        method: "GET",
        headers: {
          Authorization: AuthorizationToken,
        },
      });

      if (response.ok) {
        const data = await response.json();
        if (data.userData) setUser(data.userData);
        console.log("User data:", data);
        setLoading(false);
      } else {
        setLoading(false);
        console.error("Unauthorized: Invalid or expired token");
        logout(); // clear invalid token
      }
    } catch (error) {
      console.error("Error fetching user data:", error);
    }
  };

  const getServices = async () => {
    try {
      const response = await fetch("http://localhost:5000/api/service", {
        method: "GET",
      });

      if (response.ok) {
        const data = await response.json();
        console.log("services: ", data.response);
        setServices(data.response);
      }
    } catch (error) {
      console.log("Error fetching services:", error);
    }
  };

  // On mount: get services
  useEffect(() => {
    getServices();
  }, []);

  // On token change: authenticate user
  useEffect(() => {
    if (token) {
      userAuthentication();
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [token]);

  return (
    <AuthContext.Provider
      value={{
        token,
        storeToken,
        logout,
        isAuthenticated,
        userData,
        services,
        AuthorizationToken,
        isLoading,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook to use auth context
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
