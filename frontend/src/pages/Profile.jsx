import React, { useContext } from "react";
import { AuthContext } from "../contexts/AuthContext";

export const Profile = () => {
 const [profile, setProfile] = useState({});
 const [editMode, setEditMode] = useState(false);
 const [username, setUsername] = useState("");
 const [email, setEmail] = useState("");
 const { user } = useContext(AuthContext);

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
    <div>
      <h2>Profile</h2>
      {editMode ? (
        <>
          <input
            type="text"
            value={user.username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <input
            type="email"
            value={user.email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <button onClick={handleUpdate}>Update</button>
          <button onClick={() => setEditMode(false)}>Cancel</button>
        </>
      ) : (
        <>
          <p>Username: {profile.username}</p>
          <p>Email: {profile.email}</p>
          <button onClick={() => setEditMode(true)}>Edit</button>
        </>
      )}
      {user ? (
        <div>
          <p>Username: {user.username}</p>
          <p>Email: {user.email}</p>
          <p>Role: {user.role}</p>
          {user.role === "Admin" && (
            <div>
              <h3>Admin Section</h3>
              <a href="/admin">Go to Admin Dashboard</a>
            </div>
          )}
          <button onClick={logout}>Logout</button>
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};
