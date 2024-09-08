import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { AuthContext } from "../contexts/AuthContext";

export const Admin = () => {
  const [users, setUsers] = useState([]);
  const { user } = useContext(AuthContext);

  const [currentPage, setCurrentPage] = useState(1);
  const userPerPage = 4
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

  //? Get current user for pagination
  const indexOfLastUser = currentPage * userPerPage;
  const indexOfFirstUser = indexOfLastUser - userPerPage;
  const currentUsers = users.slice(indexOfFirstUser, indexOfLastUser)

  //* Change Page
  const nextPage = () => {
    if(indexOfLastUser < users.length){
      setCurrentPage(prevPage => prevPage + 1)
    }
  }

  const prevPage = () => {
    if(currentPage > 1){
      setCurrentPage(prevPage => prevPage - 1)
    }
  }

  return (
    <div className="p-2">
      <h2 className="text-3xl font-bold text-center mb-4">Admin Dashboard</h2>
      <div className="container mx-auto shadow-md rounded-lg px-4 py-6 sm:px-6 md:px-12 lg:px-24">
        {currentUsers.length > 0 ? (
          <ul className="space-y-4">
            {currentUsers.map((user) => (
              <li
                key={user._id}
                className="p-3 rounded-lg shadow flex flex-col items-center justify-between text-center sm:flex-row sm:text-left sm:items-start"
              >
                <div className="mb-4 sm:mb-0">
                  <p className="text-lg font-semibold">
                    Username: {user.username}
                  </p>
                  <p>Email: {user.email}</p>
                  <p>Role: {user.role}</p>
                </div>
                <button
                  onClick={() => handleDelete(user._id)}
                  className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700 transition duration-300 mt-4 sm:mt-0 sm:self-center"
                >
                  Delete
                </button>
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
    </div>
  );
};
