import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import User, { IUser } from "../models/User";

const SECRET_KEY = process.env.JWT_SECRET || "your_jwt_secret_key";

export const generateToken = (user: IUser) => {
  return jwt.sign({ email: user.email, firstname: user.firstname, lastname: user.lastname, id:user._id, role: user.role }, SECRET_KEY, { expiresIn: "365d" });
};

export const verifyToken = (token: string) => {
  return jwt.verify(token, SECRET_KEY);
};

export const hashPassword = async (password: string) => {
  return await bcrypt.hash(password, 10);
};

export const comparePassword = async (
  password: string,
  hashedPassword: string
) => {
  return await bcrypt.compare(password, hashedPassword);
};
