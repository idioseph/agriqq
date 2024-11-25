import mongoose, { Document, Schema, Types } from "mongoose";

export interface IProduct extends Document {
  farmerId: Types.ObjectId;
  name: string;
  description: string;
  category: string;
  price: number;
  isAvalable: boolean;
  stock: number;
  images: string[];
  createdAt: Date;
}

const ProductSchema = new Schema<IProduct>(
  {
    farmerId: { type: Schema.Types.ObjectId, ref: "User", required: true },
    name: { type: String, required: true },
    description: { type: String, required: true },
    category: { type: String, required: true },
    price: { type: Number, required: true },
    stock: { type: Number, required: true },
    images: { type: [String], default: [] },
    createdAt: { type: Date, default: Date.now },
    isAvalable: { type: Boolean, default: true },
  },
  { timestamps: true }
);

export default mongoose.models.Product ||
  mongoose.model<IProduct>("Product", ProductSchema);
