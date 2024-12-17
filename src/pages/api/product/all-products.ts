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


// eslint-disable-next-line import/no-anonymous-default-export
export default async (req: NextApiRequest, res: NextApiResponse) => {
  await dbConnect();
  
  const { method } = req;

  switch (method) {
    case "GET":
      try {
        const products = await Product.find() // Populate farmer details
        return res.status(200).json({ products });
      } catch (error) {
        if (error instanceof Error) {
          console.error(error);
          return res.status(500).json({ message: error.message });
        }
      }
    default:
      res.status(405).end(`Method ${method} Not Allowed`);
  }
};
