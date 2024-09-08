import { createContext, useState, useEffect } from "react";
import axios from "axios";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  // State for user and token
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem("token"));
  const [loading, setLoading] = useState(true);

  // useEffect(() => {
  //    const token = localStorage.getItem("token");
  //   if (token) {
  //     console.log("Token used for profile request", token);
  //     axios
  //       .get("http://localhost:5000/api/auth/profile", {
  //         headers: { Authorization: `Bearer ${token}` },
  //       })
  //       .then((res) => {
  //         setUser(res.data)
  //         setLoading(false);
  //       })
  //       .catch((err) => {
  //         console.error("Failed to fetch user profile", err);
  //         localStorage.removeItem("token");
  //         setLoading(false)
  //         // Handle token expiration
  //         // setToken(null);
  //       });
  //   } else{
  //     setLoading(false)
  //   }
  // }, []);

  useEffect(() => {
    const fetchUserProfile = async () => {
      const token = localStorage.getItem("token");

      if (token) {
        try {
          console.log("Token used for profile request:", token);
          const response = await axios.get(
            "http://localhost:5000/api/auth/profile",
            {
              headers: { Authorization: `Bearer ${token}` },
            }
          );

          // Successfully fetched user profile
          console.log("User profile fetched:", response.data);
          setUser(response.data);
        } catch (error) {
          console.error("Failed to fetch user profile:", error);
          localStorage.removeItem("token"); // Remove invalid token
          setUser(null); // Clear user state
        } finally {
          setLoading(false); // Stop loading in either case
        }
      } else {
        setLoading(false); // No token, stop loading
      }
    };

    fetchUserProfile(); // Invoke the function
  }, []);

  const login = async (email, password) => {
    try {
      const res = await axios.post("http://localhost:5000/api/auth/login", {
        email,
        password,
      });

      if (res.status === 200) {
        const { token, user } = res.data;

        // Save the token in localStorage and state
        localStorage.setItem("token", token);
        setToken(token);
        setUser(user);

        console.log("Login Successful, Token Stored:", token);
        return { success: true };
      }
    } catch (err) {
      console.error("Login Failed:", err.response?.data || err.message);
      return {
        success: false,
        message: err.response?.data.err || "Login failed",
      };
    }
  };

  const register = async (username, email, password, role) => {
    try {
      const res = await axios.post("http://localhost:5000/api/auth/register", {
        username,
        email,
        password,
        role,
      });

      if (res.status === 201) {
        // Registration successful, now log in the user automatically
        const { token, user } = res.data;

        // Save the token in localStorage and state
        localStorage.setItem("token", token);
        setToken(token);
        setUser(user);

        console.log("Registration Successful, Token Stored:", token);
        return { success: true };
      }
    } catch (err) {
      console.error("Registration Failed:", err.response?.data || err.message);
      return {
        success: false,
        message: err.response?.data.err || "Registration failed",
      };
    }
  };

  const logout = () => {
    setToken(null);
    localStorage.removeItem("token");
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, token, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
