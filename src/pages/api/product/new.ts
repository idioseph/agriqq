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
import Product from "@/models/Product";

dbConnect();

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const { method } = req;

  switch (method) {
    case "POST":
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

        const { name, description, category, price, stock, images } = req.body;

        const { role, id } = decoded;

        if (role !== "farmer") {
          return res.status(403).json({
            message: "Access denied. Only farmers can create products.",
          });
        }

        const newProduct = new Product({
          farmerId: id,
          name,
          description,
          category,
          price,
          stock,
          images,
        });

        await newProduct.save();

        return res.status(201).json({
          message: "Product created successfully.",
          product: newProduct,
        });
        break;
      } catch (error) {
        if (error instanceof Error) {
          res.status(400).json({ message: error.message });
        }
        break;
      }

    default:
      res.status(405).end(`Method ${method} Not Allowed`);
  }
};
