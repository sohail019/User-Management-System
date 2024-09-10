import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { AuthContext } from "../contexts/AuthContext";
// import api from "../config/api";

export const Admin = () => {
  const [users, setUsers] = useState([]);
  const [editingUser, setEditingUser] = useState(null);
  const [newRole, setNewRole] = useState("");
  const { user } = useContext(AuthContext);

  const [currentPage, setCurrentPage] = useState(1);
  const usersPerPage = 4;
  const [isModalOpen, setIsModalOpen] = useState(false); // Modal state

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await axios.get(
          "https://user-management-system-vwcq.onrender.com/api/auth/users",
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
        console.log(res)
        // Ensure res.data is an array
        if (Array.isArray(res.data)) {
          setUsers(res.data);
        } else {
          console.error("API response is not an array:", res.data);
        }
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };

    fetchUsers();
  }, []);

  const handleRoleChange = (id) => {
    axios
      .put(
        `https://user-management-system-vwcq.onrender.com/api/auth/users/${id}`,
        { role: newRole },
        { withCredentials: true },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      )
      .then(() => {
        setUsers(
          users.map((user) =>
            user._id === id ? { ...user, role: newRole } : user
          )
        );
        setIsModalOpen(false);
        setEditingUser(null);
      })
      .catch((err) => console.error(err));
  };

   const handleDelete = async (userId) => {
     try {
       await axios.delete(
         `https://user-management-system-vwcq.onrender.com/api/auth/users/${userId}`,
         {
           headers: {
             Authorization: `Bearer ${localStorage.getItem("token")}`,
           },
         }
       );
       setUsers(users.filter((user) => user._id !== userId));
     } catch (error) {
       console.error("Error deleting user:", error);
     }
   };

  // Pagination
  const indexOfLastUser = currentPage * usersPerPage;
  const indexOfFirstUser = indexOfLastUser - usersPerPage;
  const currentUsers = users.slice(indexOfFirstUser, indexOfLastUser);

  const nextPage = () => {
    if (indexOfLastUser < users.length) {
      setCurrentPage((prevPage) => prevPage + 1);
    }
  };

  const prevPage = () => {
    if (currentPage > 1) {
      setCurrentPage((prevPage) => prevPage - 1);
    }
  };

  return (
    <div className="p-2">
      <h2 className="text-3xl font-bold text-center mb-4">Admin Dashboard</h2>
      <p className="text-center">Total Users: {users.length}</p>
      <div className="container mx-auto shadow-md rounded-lg px-4 py-4 sm:px-6 md:px-12 lg:px-24">
        {currentUsers.length > 0 ? (
          <ul className="space-y-4">
            {currentUsers.map((user) => (
              <li
                key={user._id}
                className="p-2 rounded-lg shadow flex flex-col items-center justify-between text-center sm:flex-row sm:text-left sm:items-start"
              >
                <div className="mb-4 sm:mb-0">
                  <p className="text-lg font-semibold">
                    Username: {user.username}
                  </p>
                  <p>Email: {user.email}</p>
                  <p>Role: {user.role}</p>
                </div>
                <div className="flex items-center space-x-4 mt-4">
                  <button
                    onClick={() => {
                      setEditingUser(user);
                      setNewRole(user.role);
                      setIsModalOpen(true);
                    }}
                    className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
                  >
                    Edit Role
                  </button>
                  <button
                    onClick={() => handleDelete(user._id)}
                    className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
                  >
                    Delete
                  </button>
                </div>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-center text-gray-500">No users found</p>
        )}

        {/* Pagination */}
        <div className="flex justify-center gap-3 mt-6">
          <button
            onClick={prevPage}
            disabled={currentPage === 1}
            className={`px-4 py-2 rounded ${
              currentPage === 1
                ? "bg-gray-300 dark:text-black"
                : "bg-green-600 text-white"
            }`}
          >
            Previous
          </button>
          <button
            onClick={nextPage}
            disabled={indexOfLastUser >= users.length}
            className={`px-4 py-2 rounded ${
              indexOfLastUser >= users.length
                ? "bg-gray-300 dark:text-black"
                : "bg-green-600 text-white"
            }`}
          >
            Next
          </button>
        </div>
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-gray-900 bg-opacity-50">
          <div className="bg-white dark:bg-gray-800 dark:text-gray-100 p-6 rounded-lg shadow-lg w-1/3">
            <h3 className="text-lg font-semibold mb-4">
              Editing Role for {editingUser?.username}
            </h3>
            <div className="space-y-4">
              <div className="flex flex-col">
                <label className="text-sm font-medium mb-1 text-gray-700 dark:text-gray-100">
                  New Role
                </label>
                <select
                  value={newRole}
                  onChange={(e) => setNewRole(e.target.value)}
                  className="p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 dark:text-black"
                >
                  <option value="">Select a Role</option>
                  <option value="Regular User">Regular User</option>
                  <option value="Admin">Admin</option>
                </select>
              </div>
              <div className="flex space-x-4 mt-4">
                <button
                  onClick={() => {
                    if (editingUser) {
                      handleRoleChange(editingUser._id);
                    }
                  }}
                  className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600"
                >
                  Save
                </button>
                <button
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 bg-gray-300 text-gray-800 rounded-lg hover:bg-gray-400"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
