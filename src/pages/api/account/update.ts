import { NextApiRequest, NextApiResponse } from "next";
import dbConnect from "@/lib/dbConnect";
import User from "@/models/User";
import {
  generateToken,
  hashPassword,
  comparePassword,
  verifyToken,
} from "@/lib/auth";
import { JwtPayload } from "jsonwebtoken";

dbConnect();

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const { method } = req;

  if (method !== "PUT") {
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
    const {
      firstname,
      lastname,
      profileImage,
      farmerContact,
      farmAddress,
      farmDescription,
    } = req.body;

    const { id, role } = decoded;

    if (role === "farmer") {
      if (!farmerContact || !farmAddress) {
        return res.status(400).json({
          message: "Farmer contact and farm address are required for updates.",
        });
      }
    }

    const updates: Partial<{
      firstname: string;
      lastname: string;
      profileImage: string;
      farmerContact: string;
      farmAddress: string;
      farmDescription: string;
    }> = {
      firstname,
      lastname,
      profileImage,
      farmerContact,
      farmAddress,
      farmDescription,
    };

    // Remove undefined values to avoid overwriting fields with `undefined`
    Object.keys(updates).forEach((key) => {
      if (updates[key as keyof typeof updates] === undefined) {
        delete updates[key as keyof typeof updates];
      }
    });

    const updatedUser = await User.findByIdAndUpdate(
      id,
      { $set: updates },
      { new: true, runValidators: true }
    );

    if (!updatedUser) {
      return res.status(404).json({ message: "User not found." });
    }

    return res.status(200).json({
      message: "Profile updated successfully.",
      user: updatedUser,
    });
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ message: "An error occurred while updating profile." });
  }
};
