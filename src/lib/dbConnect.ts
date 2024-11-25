import mongoose from "mongoose";

let isConnected = false; // track the connection

const mongodbURL = process.env.MONGODB_URI;

const connectToDB = async () => {
  mongoose.set("strictQuery", true);

  if (isConnected) {
    console.log("MongoDB is already connected");

    return;
  }

  try {
    await mongoose.connect(mongodbURL || "", {
      dbName: "agriqq",
    });

    isConnected = true;

    console.log("MongoDB connected");
  } catch (error) {
    console.log(error);
  }
};

export default connectToDB;
