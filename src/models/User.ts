import mongoose, { Schema, Document } from "mongoose";

export interface IUser extends Document {
  firstname: string;
  lastname: string;
  email: string;
  password: string;
  role: "farmer" | "buyer";
  profileImage?: string; // Optional
  farmName?: string; // Required for farmers
  farmDescription?: string;
  farmerContact?: string;
  farmAddress?: string;
  joinedDate: Date;
}

const UserSchema = new Schema<IUser>(
  {
    firstname: { type: String, required: true },
    lastname: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: { type: String, enum: ["farmer", "buyer"], required: true },
    profileImage: { type: String },
    farmName: {
      type: String,
      required: function () {
        return this.role === "farmer";
      },
    },
    farmerContact: {
      type: String,
      required: function () {
        return this.role === "farmer";
      },
    },
    farmAddress: {
      type: String,
      required: function () {
        return this.role === "farmer";
      },
    },
    farmDescription: {
      type: String,
    },
    joinedDate: { type: Date, default: Date.now },
  },
  { timestamps: true }
);

export default mongoose.models.User ||
  mongoose.model<IUser>("User", UserSchema);
