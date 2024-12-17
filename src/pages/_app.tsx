import Footer from "@/components/FRONTEND/Footer";
import Topbar from "@/components/FRONTEND/Topbar";
import "@/styles/globals.css";
import { jwtDecode } from "jwt-decode";
import type { AppProps } from "next/app";
import { createContext, useEffect, useState } from "react";
import Cookies from "js-cookie";
import { LikedProductsProvider } from "@/context/LikedProducts";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

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
      <LikedProductsProvider>
        <Topbar />
        <Component {...pageProps} />
        <Footer />
        <ToastContainer
          position="top-right"
          autoClose={3000}
          hideProgressBar={false}
          newestOnTop
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="colored"
          className="!font-poppins"
          toastClassName="!rounded-lg !shadow-lg"
          closeButton={({ closeToast }) => (
            <button 
              onClick={closeToast} 
              className="ml-2 text-white opacity-70 hover:opacity-100 transition-opacity"
            >
              ✕
            </button>
          )}
        />
      </LikedProductsProvider>
    </UserContext.Provider>
  );
}
