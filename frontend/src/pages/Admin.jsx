import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { AuthContext } from "../contexts/AuthContext";

export const Admin = () => {
  const [users, setUsers] = useState([]);
  const { user } = useContext(AuthContext);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        console.log("Fetching users from API..."); // Debugging log
        const res = await axios.get("http://localhost:5000/api/auth/users", {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`, // Ensure token is sent
          },
        });
        console.log("API response:", res.data); // Debugging log
        setUsers(res.data);
      } catch (error) {
        console.error("Error fetching users:", error); // Debugging log
      }
    };

    fetchUsers();
  }, []);

  const handleDelete = async (userId) => {
    try {
      await axios.delete(`/api/auth/users/${userId}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      setUsers(users.filter((user) => user._id !== userId));
    } catch (error) {
      console.error("Error deleting user:", error);
    }
  };

  return (
    <div className="min-h-screen p-6">
      <h2 className="text-3xl font-bold text-center mb-8">Admin Dashboard</h2>
      <div className="container mx-auto  shadow-md rounded-lg p-6">
        {users.length > 0 ? (
          <ul className="space-y-4">
            {users.map((user) => (
              <li
                key={user._id}
                className=" p-4 rounded-lg shadow flex items-center justify-between"
              >
                <div>
                  <p className="text-lg font-semibold">
                    Username: {user.username}
                  </p>
                  <p>Email: {user.email}</p>
                  <p>Role: {user.role}</p>
                </div>
                <button
                  onClick={() => handleDelete(user._id)}
                  className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700 transition duration-300"
                >
                  Delete
                </button>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-center text-gray-500">No users found</p>
        )}
      </div>
    </div>
  );
};
