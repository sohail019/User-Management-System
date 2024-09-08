import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { AuthContext } from "../contexts/AuthContext";

export const Profile = () => {
  const [profile, setProfile] = useState({});
  const [editMode, setEditMode] = useState(false);
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const { user, logout } = useContext(AuthContext);
  const [showPassword, setShowPassword] = useState(false); // State to toggle password visibility

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await axios.get("/api/auth/profile", {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });
        setProfile(res.data);
        setUsername(res.data.username);
        setEmail(res.data.email);
      } catch (error) {
        console.error("Error fetching profile:", error);
      }
    };

    fetchProfile();
  }, []);

  const handleUpdate = async () => {
    try {
      const res = await axios.put(
        "/api/auth/profile",
        { username, email },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      setProfile(res.data);
      setEditMode(false);
    } catch (error) {
      console.error("Error updating profile:", error);
    }
  };


  return (
    <div className="max-w-4xl mx-auto p-6 bg-white shadow-md rounded-lg">
      <div className="flex flex-col items-center md:flex-row md:items-start">
        <div className="flex-shrink-0">
          <div className="relative flex items-center justify-center w-32 h-32 rounded-full overflow-hidden bg-gray-200">
            <img
              src="https://avatars.githubusercontent.com/u/69633245?v=4"
              alt="User Avatar"
              className="w-full h-full object-cover"
            />
          </div>
          <div className="mt-4 flex flex-col items-center">
            <h4 className="text-2xl font-semibold text-gray-800">
              {user.username}
            </h4>
            <p className="text-lg text-gray-600">{user.email}</p>
            <p className="text-sm text-gray-500">{user.role}</p>
          </div>
        </div>

        <div className="flex-1 ml-0 md:ml-8 mt-6 md:mt-0">
          {editMode ? (
            <div className="space-y-4">
              <div className="flex flex-col">
                <label className="text-sm font-medium mb-1 text-gray-700">
                  Username
                </label>
                <input
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-400"
                />
              </div>
              <div className="flex flex-col">
                <label className="text-sm font-medium mb-1 text-gray-700">
                  Email
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-400"
                />
              </div>
              <div className="flex space-x-4 mt-4">
                <button
                  onClick={handleUpdate}
                  className="px-4 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600"
                >
                  Update
                </button>
                <button
                  onClick={() => setEditMode(false)}
                  className="px-4 py-2 bg-gray-300 text-gray-800 rounded-lg hover:bg-gray-400"
                >
                  Cancel
                </button>
              </div>
            </div>
          ) : (
            <div className="space-y-4">
              <p className="text-lg font-semibold text-gray-800">
                <strong>Username:</strong> {profile.username}
              </p>
              <p className="text-lg font-semibold text-gray-800">
                <strong>Email:</strong> {profile.email}
              </p>
              <p className="text-lg font-semibold text-gray-800">
                <button
                  onClick={() => setShowPassword(!showPassword)}
                  className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
                >
                  {showPassword ? "Hide Password" : "Show Password"}
                </button>
                {showPassword && (
                  <p className="text-lg font-semibold text-gray-800">
                    <strong>Password:</strong> {user.password}
                  </p>
                )}
              </p>
              <div className="flex items-center space-x-4">
                <button
                  onClick={() => setEditMode(true)}
                  className="px-4 py-2 bg-orange-700 text-white rounded-lg hover:bg-orange-800"
                >
                  Edit
                </button>
                <button
                  onClick={logout}
                  className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
                >
                  Logout
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
      {user.role === "Admin" && (
        <div className="mt-6 border-t pt-4 text-center">
          <h3 className="text-lg font-semibold text-gray-800">Admin Section</h3>
          <a href="/admin" className="text-orange-500 hover:underline">
            Go to Admin Dashboard
          </a>
        </div>
      )}
    </div>
  );
};
