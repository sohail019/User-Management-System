import React, { useState, useEffect } from "react";
import { useContext } from "react";
import { AuthContext } from "../contexts/AuthContext";
import { Link, useNavigate } from "react-router-dom";
import { IoMdLock, IoMdMail } from "react-icons/io";
import axios from "axios";
import { FaEye, FaEyeSlash } from "react-icons/fa";

export const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const togglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    try {
      // Make login request using environment variable and include credentials
      const response = await axios.post(
        `https://user-management-system-vwcq.onrender.com/api/auth/login`,
        { email, password },
        { withCredentials: true } // Include credentials for CORS
      );

      // If login is successful
      if (response.status === 200) {
        const { token, user } = response.data;

        // Save token and user information
        localStorage.setItem("token", token);

        // Assuming you set user state in your context or login function
        await login(email, password); // You can remove this if login is already handled

        console.log("Login Successful", response.data);

        // Navigate to profile page after login
        navigate("/profile");
        console.log("Navigated to profile");
      } else {
        setError("Login failed");
      }
    } catch (err) {
      setError("Login Failed");
      console.error("Login Failed", err);
    }
  };
  return (
    <section className="flex items-center justify-center">
      <div className="flex flex-col lg:flex-row w-full max-w-4xl mx-auto sm:px-40 md:px-64 lg:px-64">
        <main className="flex flex-col justify-center flex-grow p-6 rounded-lg">
          <h1 className="text-2xl font-bold sm:text-3xl md:text-4xl text-center">
            Login
          </h1>
          <form
            className="mt-6 flex flex-col gap-4"
            onSubmit={handleFormSubmit}
          >
            {/* Email */}
            <div className="flex flex-col">
              <label className="block mb-2 text-sm font-medium">Email</label>
              <div className="relative">
                <div className="absolute inset-y-0 start-0 flex items-center ps-3.5 pointer-events-none">
                  <IoMdMail className="text-gray-500" />
                </div>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="bg-gray-50 border border-gray-300 text-sm rounded-lg block w-full ps-10 p-2.5 dark:bg-gray-800 dark:border-gray-600 dark:text-gray-300"
                  placeholder="email@digitalsalt.in"
                />
              </div>
            </div>

            {/* Password */}
            <div className="flex flex-col">
              <label className="block mb-2 text-sm font-medium">Password</label>
              <div className="relative">
                <div className="absolute inset-y-0 start-0 flex items-center ps-3.5 pointer-events-none">
                  <IoMdLock className="text-gray-500" />
                </div>
                <input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="bg-gray-50 border border-gray-300 text-sm rounded-lg block w-full ps-10 p-2.5 dark:bg-gray-800 dark:border-gray-600 dark:text-gray-300"
                  placeholder="Password"
                />
                <button
                  type="button"
                  onClick={togglePasswordVisibility}
                  className="absolute inset-y-0 end-0 flex items-center pe-3 cursor-pointer"
                >
                  {showPassword ? (
                    <FaEyeSlash className="text-gray-500" />
                  ) : (
                    <FaEye className="text-gray-500" />
                  )}
                </button>
              </div>
            </div>

            {error && <p className="text-red-500 text-center">{error}</p>}

            <div className="flex flex-col items-center">
              <button
                className="rounded-md border border-orange-600 bg-orange-700 px-6 py-2 text-sm font-medium text-white transition hover:bg-transparent hover:text-orange-800 focus:outline-none focus:ring active:text-orange-500"
                type="submit"
              >
                Login
              </button>
              <p className="mt-2 text-sm">
                Don't have an account?
                <Link to="/register" className="text-orange-700 underline ml-2">
                  Register
                </Link>
                .
              </p>
            </div>
          </form>
        </main>
      </div>
    </section>
  );
};
