import mongoose from "mongoose";

let isConnected = false; // to track connection status

export const connectToDB = async () => {
  mongoose.set('strictQuery', true);

  if (isConnected) {
    console.log("MongoDB is already connected");
    return;
  }

  const connectionString = process.env.MONGODB_URI

  try {
    await mongoose.connect(connectionString, {
        dbName: "share_prompt",
        useNewUrlParser: true,
        useUnifiedTopology: true,
    })

    isConnected = true;

    console.log('MongoDB connected')
  } catch (error) {
    console.log("Error: ", error);
  }
}