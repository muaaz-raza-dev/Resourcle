import express from "express";
import GetTopUsers from "../controllers/users/user.controller";

const router = express.Router();

router.get("/feed", GetTopUsers);

export default router;
