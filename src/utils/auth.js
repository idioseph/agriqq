import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { createContext } from "react";
import Cookies from "js-cookie";
import { jwtDecode } from "jwt-decode";


const AuthContext = createContext("");

export default AuthContext;

export const AuthProvider = ({ children }) => {
  const [loading, setLoading] = useState(true)
 const [user, setUser] = useState(null);

  const getUser = () => {
    const token = Cookies.get("token") || "";
    console.log(token);
    let payload;
    try {
      payload = jwtDecode(token);
      console.log(payload)
    } catch (error) {
      console.log(error);
    } finally {
      setUser(payload);
    }
  };

  useEffect(() => {
    getUser();
    setLoading(false)
  }, []);

return (
    <AuthContext.Provider value={[user, getUser]}>
      {loading ? null : children}
    </AuthContext.Provider>
  );
}