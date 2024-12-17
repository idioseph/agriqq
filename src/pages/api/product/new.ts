import type { NextApiRequest, NextApiResponse } from "next";
import dbConnect from "@/lib/dbConnect";
import Product from "@/models/Product";
import { ObjectId } from "mongoose";
import { verifyToken } from "@/lib/auth";
import { JwtPayload } from "jsonwebtoken";
// import { getToken } from "next-auth/jwt";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  // Connect to database
  await dbConnect();

  // Only allow POST requests
  if (req.method !== "POST") {
    return res.status(405).json({
      success: false,
      message: "Method not allowed",
    });
  }

  try {
    // Verify authentication token
    const token = req.headers.authorization?.split(" ")[1];

    if (!token) {
      return res.status(401).json({
        success: false,
        message: "Not authenticated",
      });
    }

    const decoded = verifyToken(token) as JwtPayload;
    const { id, role } = decoded;

    if (role !== "farmer") {
      return res.status(403).json({
        success: false,
        message: "You are not authorized to create a product",
      });
    }

    const { name, description, category, price, stock, images } = req.body;

    // Validate required fields
    if (!name || !description || !category || !price || !stock || !images) {
      return res.status(400).json({
        success: false,
        message: "All fields are required",
      });
    }

    // Create the product
    const product = await Product.create({
      farmerId: id, // Use the user ID from the token
      name,
      description,
      category,
      price: Number(price),
      stock: Number(stock),
      images,
      isAvailable: true,
    });

    return res.status(201).json({
      success: true,
      message: "Product created successfully",
      product,
    });
  } catch (error) {
    console.error("Error in /api/product/new:", error);
    return res.status(500).json({
      success: false,
      message: "Error creating product",
      error: error instanceof Error ? error.message : "Unknown error",
    });
  }
};

export default handler;
