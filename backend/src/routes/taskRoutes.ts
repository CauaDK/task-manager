import { Router } from "express";
import {
  createTask,
  getTasks,
  updateStatus,
  updateTask,
} from "../controllers/taskController.js";
import { authMiddleware } from "../middlewares/authMiddleware.js";

const router = Router();

router.post("/", authMiddleware, createTask);
router.get("/", authMiddleware, getTasks);
router.patch("/:id", authMiddleware, updateTask);
router.patch("/:id/status", authMiddleware, updateStatus);

export default router;
