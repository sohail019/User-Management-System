import { useState, useContext } from "react";
import { AuthContext } from "../contexts/AuthContext";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { IoMdLock, IoMdMail } from "react-icons/io";
export const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:5000/api/auth/login",
        { email, password }
      );
      login(response.data.token);
      // await login(email, password)
      console.log("Login Successful", response.data);
      navigate("/profile");
    } catch (err) {
        setError("Login Failed");
      console.error("Login Failed", err);
    }
  };

  return (
    <div>
      <section className="flex items-center justify-center">
        <div className="flex flex-col lg:flex-row w-full max-w-4xl mx-auto sm:px-40 md:px-64 lg:px-64">
          <main className="flex flex-col justify-center flex-grow  p-6 rounded-lg ">
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
                    className="bg-gray-50 border border-gray-300 text-sm rounded-lg block w-full ps-10 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:border-blue-500"
                    placeholder="email@digitalsalt.in"
                  />
                </div>
              </div>

              {/* PAssword */}
              <div className="flex flex-col">
                <label className="block mb-2 text-sm font-medium ">
                  Password
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 start-0 flex items-center ps-3.5 pointer-events-none">
                    <IoMdLock className="text-gray-500" />
                  </div>
                  <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    className="bg-gray-50 border border-gray-300 text-sm rounded-lg block w-full ps-10 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:border-blue-500"
                    placeholder="Password"
                  />
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

                <p className="mt-2 text-sm ">
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

      {/* <form onSubmit={handleFormSubmit}>
        <h2>Login Form</h2>
        {error && <p style={{ color: "red" }}>{error}</p>}
        <label htmlFor="email">
          Email:
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email"
            required
          />
        </label>
        <label htmlFor="password">
          Password:
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
            required
          />
        </label>
        <button type="submit">Login</button>
      </form> */}
    </div>
  );
};
