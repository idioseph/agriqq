import Footer from "@/components/FRONTEND/Footer";
import Topbar from "@/components/FRONTEND/Topbar";
import "@/styles/globals.css";
import { AuthProvider } from "@/utils/auth";
import { jwtDecode } from "jwt-decode";
import type { AppProps } from "next/app";
import { createContext, useEffect, useState } from "react";
import Cookies from "js-cookie";

export const UserContext = createContext<any[]>([]);

export default function App({ Component, pageProps }: AppProps) {
  const [user, setUser] = useState<any>(null);
  const getUser = () => {
    const token = Cookies.get("token") || "";
    console.log(token);
    let payload;
    try {
      payload = jwtDecode(token);
    } catch (error) {
      console.log(error);
    } finally {
      setUser(payload);
    }
  };

  useEffect(() => {
    getUser();
  }, []);

  return (
    <UserContext.Provider value={[user, getUser]}>
      <Topbar />
      <Component {...pageProps} />
      <Footer />
    </UserContext.Provider>
  );
}
