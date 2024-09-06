import { useState, useContext } from "react";
import { AuthContext } from "../contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import axios from "axios";
export const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:5000/api/auth/login",
        { email, password }
      );
      login(response.data.token);
      // await login(email, password)
      console.log("Login Successful", response.data);
      navigate("/profile");
    } catch (err) {
        setError("Login Failed");
      console.error("Login Failed", err);
    }
  };

  return (
    <div>
      <form onSubmit={handleFormSubmit}>
        <h2>Login Form</h2>
        {error && <p style={{ color: "red" }}>{error}</p>}
        <label htmlFor="email">
          Email:
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email"
            required
          />
        </label>
        <label htmlFor="password">
          Password:
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
            required
          />
        </label>
        <button type="submit">Login</button>
      </form>
    </div>
  );
};
