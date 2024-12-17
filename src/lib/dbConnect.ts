import mongoose from "mongoose";

let isConnected = false; // track the connection

const mongodbURL = process.env.MONGODB_URI;

const connectToDB = async () => {
  mongoose.set("strictQuery", true);

  if (isConnected) {
    return;
  }

  try {
    await mongoose.connect(mongodbURL || "", {
      dbName: "agriqq",
    });

    isConnected = true;

  } catch (error) {
  }
};

export default connectToDB;
