import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { IoMdLock, IoMdMail, IoMdPerson } from "react-icons/io";
import { FaEye, FaEyeSlash } from "react-icons/fa";

export const Register = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [role, setRole] = useState("Regular User");
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const togglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setError("Invalid email format");
      return;
    }

    // Password validation
    const minPasswordLength = 8;
    const passwordRegex = /(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^\da-zA-Z])/;
    if (!passwordRegex.test(password) || password.length < minPasswordLength) {
      setError(
        "Password must be at least 8 characters and include uppercase, lowercase, numbers, and special characters."
      );
      return;
    }

    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    try {
      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/api/auth/register`, 
        {
          username,
          email,
          password,
          role,
        }
      );
      const { token } = response.data;

      if (token) {
        localStorage.setItem("token", token); // Store token in localStorage
        console.log("Token stored after registration:", token);
      }

      console.log("User registered:", response.data);
      navigate("/login");
    } catch (err) {
      setError("Registration Failed");
      console.error("Error During Registration", err);
    }
  };

  return (
    <section className="flex items-center justify-center ">
      <div className="flex flex-col lg:flex-row w-full max-w-4xl mx-auto sm:px-40 md:px-64 lg:px-64">
        <main className="flex flex-col justify-center flex-grow rounded-lg">
          <h1 className="text-2xl font-bold sm:text-3xl md:text-4xl text-center">
            Register
          </h1>
          <form
            className="mt-4 flex flex-col gap-4"
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

            {/* Username */}
            <div className="flex flex-col">
              <label className="block mb-2 text-sm font-medium">Username</label>
              <div className="relative">
                <div className="absolute inset-y-0 start-0 flex items-center ps-3.5 pointer-events-none">
                  <IoMdPerson className="text-gray-500" />
                </div>
                <input
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  required
                  className="bg-gray-50 border border-gray-300 text-sm rounded-lg block w-full ps-10 p-2.5  dark:bg-gray-800 dark:border-gray-600 dark:text-gray-300"
                  placeholder="Username"
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

            {/* Confirm Password */}
            <div className="flex flex-col">
              <label className="block mb-2 text-sm font-medium">
                Confirm Password
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 start-0 flex items-center ps-3.5 pointer-events-none">
                  <IoMdLock className="text-gray-500" />
                </div>
                <input
                  type="password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  required
                  className="bg-gray-50 border border-gray-300 text-sm rounded-lg block w-full ps-10 p-2.5 dark:bg-gray-800 dark:border-gray-600 dark:text-gray-300"
                  placeholder="Confirm Password"
                />
              </div>
            </div>

            {/* Role */}
            <div className="flex flex-col">
              <label className="block mb-2 text-sm font-medium">Role:</label>
              <select
                value={role}
                onChange={(e) => setRole(e.target.value)}
                className="bg-gray-50 dark:bg-gray-800 dark:border-gray-600 dark:text-gray-300 border border-gray-300 text-sm rounded-lg block w-full p-2.5"
              >
                <option value="Regular">Regular</option>
                <option value="Admin">Admin</option>
              </select>
            </div>

            {error && <p className="text-red-500 text-center text-sm">{error}</p>}

            <div className="flex flex-col items-center">
              <button
                className="rounded-md border border-orange-600 bg-orange-700 px-6 py-2 text-sm font-medium text-white transition hover:bg-transparent hover:text-orange-800 focus:outline-none focus:ring active:text-orange-500"
                type="submit"
              >
                Register
              </button>
              <p className="mt-2 text-sm">
                Already have an account?
                <Link to="/login" className="text-orange-700 underline ml-2">
                  Log in
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
