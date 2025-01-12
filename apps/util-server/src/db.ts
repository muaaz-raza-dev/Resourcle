import mongoose from "mongoose";
export const dbConnection = async () => {
  try {
    const uri: string = process.env.db as string;
    await mongoose.connect(uri, { dbName: "resourcle" });
    console.log("Mongo servers is connected successfuly!");
  } catch (err) {
    console.log("An error ocurred while connection with mongodb", err);
  }
};
