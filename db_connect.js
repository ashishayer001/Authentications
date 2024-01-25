import mongoose from "mongoose";

export const connectDB = async () => {
  try {
    await mongoose.connect(
      "mongodb+srv://ashishayer:hellomongo@cluster0.whlrgtz.mongodb.net/auth?retryWrites=true&w=majority"
    );
    console.log("DB connection successful");
  } catch (error) {
    console.log("Db connection failed");
    console.log(error.message);
  }
};
