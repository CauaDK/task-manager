import { Router } from "express";
import { createTask, getTasks } from "../controllers/taskController.js";
import { authMiddleware } from "../middlewares/authMiddleware.js";

const router = Router();

router.post("/", authMiddleware, createTask);
router.get("/", authMiddleware, getTasks);

export default router;
