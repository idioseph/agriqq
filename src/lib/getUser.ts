import { useEffect } from "react";
import jwt from "jsonwebtoken";
import Cookies from "js-cookie";
import { jwtDecode } from "jwt-decode";

const SECRET_KEY = process.env.JWT_SECRET || "your_jwt_secret_key";

export const useData = () => {
  const token = Cookies.get("token") || "";

  try {
    const payload = jwtDecode(token)
    return payload;
  } catch (error) {
    return null;
  }
};
