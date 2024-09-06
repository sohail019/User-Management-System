import { Link, NavLink } from "react-router-dom";
import { useContext } from "react";
import { ThemeContext } from "../contexts/ThemeContext";

export const Header = () => {
  const { theme, toggleTheme } = useContext(ThemeContext); // Access theme and toggleTheme

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
              className="flex items-center cursor-pointer mr-4"
            >
              {theme === "light" ? (
                <span className="text-gray-900">🌞</span> // Light mode icon
              ) : (
                <span className="text-gray-100">🌙</span> // Dark mode icon
              )}
              <p className="ml-2 text-sm text-gray-900 dark:text-gray-100">
                {theme === "light" ? "Light Mode" : "Dark Mode"}
              </p>
            </div>
            {/* Login button */}
            <Link
              to="#"
              className="text-gray-900 dark:text-gray-100 hover:bg-gray-50 dark:hover:bg-gray-800 focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-4 lg:px-5 py-2 lg:py-2.5 mr-2 focus:outline-none"
            >
              Log in
            </Link>
            {/* Get Started button */}
            <Link
              to="#"
              className="text-white bg-orange-700 hover:bg-orange-800 focus:ring-4 focus:ring-orange-300 font-medium rounded-lg text-sm px-4 lg:px-5 py-2 lg:py-2.5 mr-2 focus:outline-none"
            >
              Get started
            </Link>
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
                    } border-b border-gray-100 hover:bg-gray-50 dark:hover:bg-gray-800 lg:hover:bg-transparent lg:border-0 hover:text-orange-700 lg:p-0`
                  }
                >
                  Home
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/register"
                  className={({ isActive }) =>
                    `block py-2 pr-4 pl-3 duration-200 ${
                      isActive
                        ? "text-orange-700"
                        : "text-gray-700 dark:text-gray-100"
                    } border-b border-gray-100 hover:bg-gray-50 dark:hover:bg-gray-800 lg:hover:bg-transparent lg:border-0 hover:text-orange-700 lg:p-0`
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
                    } border-b border-gray-100 hover:bg-gray-50 dark:hover:bg-gray-800 lg:hover:bg-transparent lg:border-0 hover:text-orange-700 lg:p-0`
                  }
                >
                  Login
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/profile"
                  className={({ isActive }) =>
                    `block py-2 pr-4 pl-3 duration-200 ${
                      isActive
                        ? "text-orange-700"
                        : "text-gray-700 dark:text-gray-100"
                    } border-b border-gray-100 hover:bg-gray-50 dark:hover:bg-gray-800 lg:hover:bg-transparent lg:border-0 hover:text-orange-700 lg:p-0`
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
