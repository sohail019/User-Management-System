import { createContext, useState, useEffect } from "react";
import axios from "axios";

export const AuthContext = createContext()

export const AuthProvider = ({children}) => {

    //? State for user
    const [user, setUser] = useState(null)
    //? State for token
    const [token, setToken] = useState(localStorage.getItem("token"))

    useEffect(() => {
        if(token){
            console.log("Token used for profile request", token)
            axios
              .get("http://localhost:5000/api/auth/profile", {
                headers: { Authorization: `Bearer ${token}` },
              })
              .then((res) => setUser(res.data))
              .catch((err) => {
                console.error("Failed to fetch user profile", err);

                //? handle token expiration
                setToken(null)
                localStorage.removeItem("token")
              });
        }
    }, [token])

    const login = async (email, password) => {
        try{
            const res = await axios.post(
              "http://localhost:5000/api/auth/login",
              { email, password }
            );
            const {token} = res.data
            // setToken(token)
            // localStorage.setItem("token", token)

            if(token) {
                console.log("Token received", token)
                localStorage.setItem("token", token)
                setToken(token)

                const profileRes = await axios.get(
                  "http://localhost:5000/api/auth/profile",
                  {
                    headers: { Authorization: `Bearer ${token}` },
                  }
                );
                setUser(profileRes.data);
            } else{
                console.error("No Token Received");
            }  
        } catch(err) {
            console.error(
              "Login Failed:",
              err.response ? err.response.data : err.message
            );
        }
    }


    const logout = () => {
        setToken(null)
        localStorage.removeItem("token")
        setUser(null)
    }

    return (
        <AuthContext.Provider value={{user, token, login, logout}}>
            {children}
        </AuthContext.Provider>
    )
}