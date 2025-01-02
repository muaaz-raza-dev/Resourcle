import dotenv from "dotenv";
dotenv.config();
import authRoute from "./routes/auth.route.js";
import tagsRoute from "./routes/tags.route.js";
import resourceRoute from "./routes/resource.route.js";
import profileRoute from "./routes/profile.route.js";
import usersRoute from "./routes/users.route.js";
import upvotesRoute from "./routes/upvotes.route.js";
import ResourceCollectionRoute from "./routes/resource-collection.route.js";
import express from "express";
import cors from "cors";
import { dbConnection } from "./db.js";
import cookieParser from "cookie-parser";

const app = express();
const PORT = process.env.PORT || 5000;
app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    origin: ["https://resourcle.vercel.app", "https://localhost:3000"],
    credentials: true,
  })
);

// Route for the home page
app.get("/", (req, res) => {
  res.send("You are hacked");
});

app.use("/api/v1/auth", authRoute);
app.use("/api/v1/tags", tagsRoute);
app.use("/api/v1/resource", resourceRoute);
app.use("/api/v1/profile", profileRoute);
app.use("/api/v1/users", usersRoute);
app.use("/api/v1/upvotes", upvotesRoute);
app.use("/api/v1/resoruceCollection", ResourceCollectionRoute);

const startServer = async () => {
  try {
    // Ensure the database connection is established before starting the server
    await dbConnection();
    app.listen(PORT, () => {
      console.log(`Primary server is running on http://localhost:${PORT}`);
    });
  } catch (err) {
    console.error("Failed to start the server:", err);
    console.error("Stack trace:", err);
    process.exit(1); // Exit with a failure code
  }
};

// Start the server
startServer();