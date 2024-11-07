import dotenv from 'dotenv';
dotenv.config();
import authRoute from "./routes/auth.route"
import utilRoute from "./routes/utils.route"
import tagsRoute from "./routes/tags.route"
import resourceRoute from "./routes/resource.route"
import profileRoute from "./routes/profile.route"
import usersRoute from "./routes/users.route"
import upvotesRoute from "./routes/upvotes.route"
import express from 'express';
import cors from 'cors';
import { dbConnection } from './db.js';
import cookieParser from "cookie-parser"
import { Authenticate } from './middlewares/Authenticate';

const app = express();
const PORT = process.env.PORT || 5000;
app.use(express.json())
app.use(cookieParser());
app.use(cors({ origin: ["http://localhost:3000","http://localhost:3001  "], credentials: true }));


// Route for the home page
app.get('/', (req, res) => {
res.send('You are hacked');
});

app.use("/api/v1/auth", authRoute);
app.use("/api/v1/utils", utilRoute);
app.use("/api/v1/tags", tagsRoute);
app.use("/api/v1/resource",resourceRoute );
app.use("/api/v1/profile",Authenticate, profileRoute);
app.use("/api/v1/users", usersRoute);
app.use("/api/v1/upvotes",upvotesRoute)

dbConnection().then(_=>{
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
})
}
)

