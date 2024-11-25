import { NextApiRequest, NextApiResponse } from "next";
import dbConnect from "@/lib/dbConnect";
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
    case "GET":
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

      const { role, id } = decoded;

      try {
        const products = await Product.find({ farmerId: id });

        return res.status(200).json({ products });
      } catch (error) {
        if (error instanceof Error) {
          console.error(error);
          return res
            .status(500)
            .json({
              message: "An error occurred while fetching your products.",
            });
        }
      }
    default:
      res.status(405).end(`Method ${method} Not Allowed`);
  }
};
