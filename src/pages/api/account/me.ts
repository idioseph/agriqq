import { NextApiRequest, NextApiResponse } from "next";
import dbConnect from "@/lib/dbConnect";
import User from "@/models/User";
import { verifyToken } from "@/lib/auth";
import { JwtPayload } from "jsonwebtoken";


const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  await dbConnect();
  const { method } = req;

  if (method !== "GET") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  try {
    const token = req.headers.authorization?.split(" ")[1];

    if (!token) {
      res.status(401).json({ message: "No token provided" });
      throw Error("No token provided");
    }

    const decoded = verifyToken(token) as JwtPayload;

    if (!decoded.id) {
      res.status(401).json({ message: "Invalid token" });
      throw Error("Invalid token");
    }

    const user = await User.findById(decoded.id).select(
      "-password -createdAt -updatedAt"
    );

    if (!user) {
      return res.status(404).json({ message: "User not found." });
    }

    return res.status(200).json({ user });
    
  } catch (error) {
    return res
      .status(500)
      .json({
        message: "An error occurred while retrieving user information.",
      });
  }
};

export default handler;
