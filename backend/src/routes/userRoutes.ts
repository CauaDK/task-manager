import { Router } from "express";
import { getUsersController } from "../controllers/userController.js";
import { authMiddleware } from "../middlewares/authMiddleware.js";

const router = Router();

router.get("/", authMiddleware, getUsersController);

export default router;
