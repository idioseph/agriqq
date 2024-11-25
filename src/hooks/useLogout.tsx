import { useContext, useEffect } from "react";
import jwt from "jsonwebtoken";
import Cookies from "js-cookie";
import { jwtDecode } from "jwt-decode";
import { UserContext } from "@/pages/_app";
import { useRouter } from "next/navigation";

const SECRET_KEY = process.env.JWT_SECRET || "your_jwt_secret_key";

export const useLogout = () => {
  const [user, getUser] = useContext(UserContext);
  const router = useRouter();
  const logout = () => {
    Cookies.remove("token");
    getUser();
    router.refresh();
  };
  return logout;
};
