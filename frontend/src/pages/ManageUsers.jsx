import axios from 'axios'
import { useEffect } from 'react'
import { useState } from 'react'

export const ManageUsers = () => {

    const [users, setUsers] = useState([])
    const [editingUser, setEditingUser] = useState(null)
    const [newRole, setNewRole] = useState("")

    useEffect(() => {
        axios.get('/api/auth/users', {
            headers: {Authorization: `Bearer ${localStorage.getItem("token")}`}
        })
        .then(res => setUsers(res.data))
        .catch(err => console.error(err))
    }, [])

    const handleRoleChange = (id) => {
        axios
          .put(
            `/api/auth/users/${id}`,
            { role: newRole },
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
            setEditingUser(null);
          })
          .catch((err) => console.error(err));
    }

    const handleDelete = (id) => {
        axios.delete(`api/auth/users/${id}`, {
            headers: {Authorization: `Bearer ${localStorage.getItem("token")}`}
        })
        .then(() => {
            setUsers(users.filter(user => user._id !== id))
        })
        .catch(err => console.error(err))
    }
  return (
    <div>
        <h2>Handle Users</h2>
        <ul>
            {
                users.map((user) => (
                    <li key={user._id}>
                        <p>Username: {user.username}</p>
                        <p>Email: {user.email}</p>
                        <p>Role: {user.role}</p>
                        <button onClick={() => setEditingUser(user)}>Edit Role</button>
                        <button onClick={() => handleDelete(user._id)}>Delete</button>
                    </li>
                )) 
            }
        </ul>

        {
            editingUser && (
                <div>
                    <h3>Editing Role for ${editingUser.username}</h3>
                    <select value={newRole} onChange={(e) => setNewRole(e.target.value)} >
                        <option value="Regular User">Regular User</option>
                        <option value="Admin">Admin</option>
                    </select>
                    <button onClick={() => handleRoleChange(editingUser._id)}>Save</button>
                </div>
            )
        }
    </div>
  )
}
