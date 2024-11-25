import { useEffect } from "react";
import jwt from "jsonwebtoken";
import Cookies from "js-cookie";
import { jwtDecode } from "jwt-decode";

const SECRET_KEY = process.env.JWT_SECRET || "your_jwt_secret_key";

export const useData = () => {
  const token = Cookies.get("token") || "";
  console.log(token);

  try {
    const payload = jwtDecode(token)
    console.log(payload);
    console.log("Data", payload);
    return payload;
  } catch (error) {
    console.log(error);
    return null;
  }
};
