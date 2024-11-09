import mongoose from "mongoose";

const connectDB = async (uri: string|undefined) => {
  try {
    if(uri==undefined){
      throw new Error();
    }
    await mongoose.connect(uri);
    console.log("MongoDB connected successfully");
  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
    process.exit(1);
  }
};

export default connectDB;
