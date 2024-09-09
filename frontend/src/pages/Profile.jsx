import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { AuthContext } from "../contexts/AuthContext";
import { Link, useNavigate } from "react-router-dom";

export const Profile = () => {
  const [profile, setProfile] = useState({});
  const [editMode, setEditMode] = useState(false);
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const { user, logout, loading } = useContext(AuthContext);
  const [showPassword, setShowPassword] = useState(false); // State to toggle password visibility
   const navigate = useNavigate();

  useEffect(() => {
       if (!loading && !user) {
         navigate("/login"); // Redirect if not logged in and loading is done
         return;
       }
    
    const fetchProfile = async () => {
      try {
        const res = await axios.get(
          "https://user-management-system-vwcq.onrender.com/api/auth/profile",
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
            withCredentials: true, // Include credentials for cross-origin requests
          }
        );
        setProfile(res.data);
        setUsername(res.data.username);
        setEmail(res.data.email);
      } catch (error) {
        console.error("Error fetching profile:", error);
        navigate("/login");
      }
    };

    if(user){
      fetchProfile();
    }
  }, [user, loading, navigate]);

  const handleUpdate = async () => {
    try {
      const res = await axios.put(
        "https://user-management-system-vwcq.onrender.com/api/auth/profile",
        { username, email },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
          withCredentials: true, // Include credentials
        }
      );
      setProfile(res.data);
      setEditMode(false);
    } catch (error) {
      console.error("Error updating profile:", error);
    }
  };

   if (loading) {
     return <p>Loading...</p>; // Show a loading state while checking auth
   }

   if (!user) {
     return null; // Avoid rendering the page if the user is not authenticated
   }


  return (
    <div className="max-w-4xl mx-auto p-6 shadow-md rounded-lg">
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
            <h4 className="text-2xl font-semibold ">{user.username}</h4>
            <p className="text-lg text-gray-600">{user.email}</p>
            <p className="text-sm text-gray-500">{user.role}</p>
          </div>
        </div>

        <div className="flex-1 ml-0 md:ml-8 mt-6 md:mt-0">
          {editMode ? (
            <div className="space-y-4">
              <div className="flex flex-col">
                <label className="text-sm font-medium mb-1 ">Username</label>
                <input
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-400"
                />
              </div>
              <div className="flex flex-col">
                <label className="text-sm font-medium mb-1 ">Email</label>
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
                  className="px-4 py-2 bg-gray-300  rounded-lg hover:bg-gray-400"
                >
                  Cancel
                </button>
              </div>
            </div>
          ) : (
            <div className="space-y-4">
              <p className="text-lg font-semibold ">
                <strong>Username:</strong> {user.username}
              </p>
              <p className="text-lg font-semibold ">
                <strong>Email:</strong> {user.email}
              </p>
              <div className="flex items-center space-x-4">
                <button
                  onClick={() => setShowPassword(!showPassword)}
                  className="px-2 py-1 text-sm bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition duration-200 ease-in-out"
                >
                  {showPassword ? "Hide Password" : "Show Hashed Password"}
                </button>
                {showPassword && (
                  <p className="text-lg font-semibold ">
                    <strong>{user.password.slice(0, 46)}</strong>
                  </p>
                )}
              </div>
              <div className="flex items-center space-x-4">
                <button
                  onClick={() => setEditMode(true)}
                  className="p-2 text-sm bg-orange-700 text-white rounded-lg hover:bg-orange-800"
                >
                  Edit
                </button>
                <button
                  onClick={logout}
                  className="p-2 text-sm bg-red-600 text-white rounded-lg hover:bg-red-700"
                >
                  Logout
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
      {user.role === "Admin" && (
        <div className="mt-6 border-t pt-4 text-center  rounded-lg border border-gray-800 dark:border-gray-100">
          <h3 className="text-lg font-semibold  mb-4">Admin Section</h3>
          <Link
            to="/admin"
            className="block mb-2 text-lg text-orange-500 hover:underline"
          >
            Go to Admin Dashboard
          </Link>
        </div>
      )}
    </div>
  );
};
