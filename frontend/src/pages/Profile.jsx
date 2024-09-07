import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { AuthContext } from "../contexts/AuthContext";

export const Profile = () => {
  const [profile, setProfile] = useState({});
  const [editMode, setEditMode] = useState(false);
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const { user, logout } = useContext(AuthContext);

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
      await axios.put(
        "/api/auth/profile",
        { username, email },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      setProfile({ ...profile, username, email });
      setEditMode(false);
    } catch (error) {
      console.error("Error updating profile:", error);
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white shadow-md rounded-lg">
      <h2 className="text-2xl font-bold mb-4">Profile</h2>
      {editMode ? (
        <div className="space-y-4">
          <div className="flex flex-col">
            <label className="text-sm font-medium mb-1">Username</label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="p-2 border rounded"
            />
          </div>
          <div className="flex flex-col">
            <label className="text-sm font-medium mb-1">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="p-2 border rounded"
            />
          </div>
          <div className="flex space-x-4">
            <button
              onClick={handleUpdate}
              className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
            >
              Update
            </button>
            <button
              onClick={() => setEditMode(false)}
              className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600"
            >
              Cancel
            </button>
          </div>
        </div>
      ) : (
        <div className="space-y-4">
          <p className="text-sm">
            <strong>Username:</strong> {profile.username}
          </p>
          <p className="text-sm">
            <strong>Email:</strong> {profile.email}
          </p>
          <button
            onClick={() => setEditMode(true)}
            className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
          >
            Edit
          </button>
        </div>
      )}
      {user && (
        <div className="mt-6 border-t pt-4">
          <p className="text-sm">
            <strong>Role:</strong> {user.role}
          </p>
          {user.role === "Admin" && (
            <div className="mt-4">
              <h3 className="text-lg font-semibold">Admin Section</h3>
              <a href="/admin" className="text-blue-500 hover:underline">
                Go to Admin Dashboard
              </a>
            </div>
          )}
          <button
            onClick={logout}
            className="mt-4 px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
          >
            Logout
          </button>
        </div>
      )}
    </div>
  );
};
