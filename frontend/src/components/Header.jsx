import { Link, NavLink } from "react-router-dom";
import { useContext } from "react";
import { ThemeContext } from "../contexts/ThemeContext";
import { AuthContext } from "../contexts/AuthContext"; 
import { MdDarkMode, MdLightMode } from "react-icons/md";
import { FaLinkedin, FaGithub } from "react-icons/fa";

export const Header = () => {
  const { theme, toggleTheme } = useContext(ThemeContext);
  const { user, logout } = useContext(AuthContext); // Access the user from AuthContext

  return (
    <header
      className={`shadow sticky z-50 top-0 ${
        theme === "dark" ? "dark:bg-gray-900" : ""
      }`}
    >
      <nav className="bg-white dark:bg-[#131314] border-gray-200 px-4 lg:px-6 py-2.5">
        <div className="flex flex-wrap justify-between items-center mx-auto max-w-screen-xl">
          <Link to="/" className="flex items-center">
            <span className="self-center text-xl font-semibold whitespace-nowrap dark:text-[#c4c7c5] text-gray-900">
              User Management
            </span>
          </Link>
          <div className="flex items-center lg:order-2">
            {/* Theme toggle */}
            <div
              onClick={toggleTheme}
              className="flex items-center cursor-pointer mr-4 text-xl"
            >
              {theme === "light" ? (
                <span className="text-gray-900">
                  <MdLightMode />
                </span>
              ) : (
                <span className="text-gray-100">
                  <MdDarkMode />
                </span>
              )}
              <p className="ml-2 text-sm text-gray-900 dark:text-gray-100">
                {theme === "light" ? "Light Mode" : "Dark Mode"}
              </p>
            </div>
            {/* User profile and logout button */}
            {user && (
              <button
                onClick={logout}
                className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
              >
                Logout
              </button>
            )}
            {!user && (
              <>
                {/* Login button */}
                <Link
                  to="/login"
                  className="text-gray-900 dark:text-gray-100 hover:bg-orange-800 hover:text-white focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-4 lg:px-5 py-2 lg:py-2.5 mr-2 focus:outline-none"
                >
                  Log in
                </Link>
                {/* Register button */}
                <Link
                  to="/register"
                  className="text-white bg-orange-700 hover:bg-orange-800 focus:ring-4 focus:ring-orange-300 font-medium rounded-lg text-sm px-4 lg:px-5 py-2 lg:py-2.5 mr-2 focus:outline-none"
                >
                  Register
                </Link>
              </>
            )}
            {/* Social Media Icons */}
            <div className="flex items-center space-x-4 ml-4">
              <a
                href="https://linkedin.com/in/scookiehail"
                target="_blank"
                rel="noopener noreferrer"
              >
                <FaLinkedin className="text-gray-900 dark:text-gray-100 hover:text-orange-700 text-xl dark:hover:text-orange-700" />
              </a>
              <a
                href="https://github.com/sohail019"
                target="_blank"
                rel="noopener noreferrer"
              >
                <FaGithub className="text-gray-900 dark:text-gray-100 text-xl hover:text-orange-700 dark:hover:text-orange-700" />
              </a>
            </div>
          </div>
          <div
            className="hidden justify-between items-center w-full lg:flex lg:w-auto lg:order-1"
            id="mobile-menu-2"
          >
            <ul className="flex flex-col mt-4 font-medium lg:flex-row lg:space-x-8 lg:mt-0">
              <li>
                <NavLink
                  to="/"
                  className={({ isActive }) =>
                    `block py-2 pr-4 pl-3 duration-200 ${
                      isActive
                        ? "text-orange-700"
                        : "text-gray-700 dark:text-gray-100"
                    } border-b border-gray-100 hover:bg-gray-50 lg:hover:bg-transparent lg:border-0 hover:text-orange-700 lg:p-0`
                  }
                >
                  Home
                </NavLink>
              </li>
              {!user && (
                <>
                  <li>
                    <NavLink
                      to="/register"
                      className={({ isActive }) =>
                        `block py-2 pr-4 pl-3 duration-200 ${
                          isActive
                            ? "text-orange-700"
                            : "text-gray-700 dark:text-gray-100"
                        } border-b border-gray-100 hover:bg-gray-50 lg:hover:bg-transparent lg:border-0 hover:text-orange-700 lg:p-0`
                      }
                    >
                      Register
                    </NavLink>
                  </li>
                  <li>
                    <NavLink
                      to="/login"
                      className={({ isActive }) =>
                        `block py-2 pr-4 pl-3 duration-200 ${
                          isActive
                            ? "text-orange-700"
                            : "text-gray-700 dark:text-gray-100"
                        } border-b border-gray-100 hover:bg-gray-50 lg:hover:bg-transparent lg:border-0 hover:text-orange-700 lg:p-0`
                      }
                    >
                      Login
                    </NavLink>
                  </li>
                </>
              )}
              <li>
                <NavLink
                  to="/profile"
                  className={({ isActive }) =>
                    `block py-2 pr-4 pl-3 duration-200 ${
                      isActive
                        ? "text-orange-700"
                        : "text-gray-700 dark:text-gray-100"
                    } border-b border-gray-100 hover:bg-gray-50 lg:hover:bg-transparent lg:border-0 hover:text-orange-700 lg:p-0`
                  }
                >
                  Profile
                </NavLink>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </header>
  );
};
