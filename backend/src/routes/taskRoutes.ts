import { Router } from "express";
import {
  createTask,
  deleteTask,
  getStatusKpi,
  getTasks,
  updateStatus,
  updateTask,
} from "../controllers/taskController.js";
import { authMiddleware } from "../middlewares/authMiddleware.js";

const router = Router();

router.post("/", authMiddleware, createTask);
router.get("/", authMiddleware, getTasks);
router.get("/status", authMiddleware, getStatusKpi);
router.patch("/:id", authMiddleware, updateTask);
router.patch("/:id/status", authMiddleware, updateStatus);
router.delete("/:id", authMiddleware, deleteTask);

export default router;
