import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Login } from "./pages/Login";
import { Register } from "./pages/Register";
import { Profile } from "./pages/Profile";
import App from "./App.jsx";
import "./index.css";
import { AuthProvider } from "./contexts/AuthContext";
import { ProtectedRoute } from "./components/ProtectedRoute";
import { Admin } from "./pages/Admin";
import { ThemeProvider } from "./contexts/ThemeContext";
import { Home } from "./pages/Home";
import ConditionalRoute from "./components/ConditionalRoute";

// Define routes
const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      { path: "/", element: <Home /> },
      {
        path: "/login",
        element: (
          <ConditionalRoute
            element={<Login />}
            redirectTo="/profile"
            condition={(user) => user}
          />
        ),
      },
      {
        path: "/register",
        element: (
          <ConditionalRoute
            element={<Register />}
            redirectTo="/profile"
            condition={(user) => user}
          />
        ),
      },
      {
        path: "/profile",
        element: (
          <ProtectedRoute
            element={<Profile />}
            roles={["Regular User", "Admin"]}
          />
        ),
      },
      {
        path: "/admin",
        element: <ProtectedRoute element={<Admin />} roles={["Admin"]} />,
      },
    ],
  },
]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <AuthProvider>
      <ThemeProvider>
        <RouterProvider router={router} />
      </ThemeProvider>
    </AuthProvider>
  </StrictMode>
);
