import { NextApiRequest, NextApiResponse } from "next";
import dbConnect from "@/lib/dbConnect";
import { verifyToken } from "@/lib/auth";
import { JwtPayload } from "jsonwebtoken";
import Product from "@/models/Product";

// eslint-disable-next-line import/no-anonymous-default-export
export default async (req: NextApiRequest, res: NextApiResponse) => {
  await dbConnect();
  const { method } = req;

  switch (method) {
    case "GET":
      try {
        const token = req.headers.authorization?.split(" ")[1];
        if (!token) {
          return res.status(401).json({ message: "No token provided" });
        }

        const decoded = verifyToken(token) as JwtPayload;
        const { id, role } = decoded;

        if (!id) {
          return res.status(401).json({ message: "Invalid token" });
        }

        if (role !== "farmer") {
          return res.status(403).json({
            message: "Access denied. Only farmers can view their products.",
          });
        }

        // Fetch products associated with the logged-in user (farmer)
        const products = await Product.find({ farmerId: id }, "-__v"); // Exclude the `__v` field

        return res.status(200).json({ products });
      } catch (error) {
        console.error("Error fetching products:", error);
        return res.status(500).json({
          message: "An error occurred while fetching your products.",
        });
      }

    default:
      res.setHeader("Allow", ["GET"]);
      res.status(405).json({ message: `Method ${method} Not Allowed` });
  }
};
