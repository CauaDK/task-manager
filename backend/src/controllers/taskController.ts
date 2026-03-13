import type { Request, Response } from "express";
import {
  createTaskService,
  getUserTasks,
  updateTaskService,
} from "../services/taskService.js";

export async function createTask(req: Request, res: Response) {
  try {
    const { title, description } = req.body;
    const userId = (req as any).user.userId;

    const task = await createTaskService(title, description, userId);

    return res.status(201).json(task);
  } catch (error) {
    return res.status(400).json({ error: (error as Error).message });
  }
}

export async function getTasks(req: Request, res: Response) {
  try {
    const userId = (req as any).user.userId;

    const tasks = await getUserTasks(userId);

    return res.json(tasks);
  } catch (error) {
    return res.status(400).json({ error: (error as Error).message });
  }
}

export async function updateTask(req: Request, res: Response) {
  try {
    const taskId = req.params.id as string;
    const { title, description } = req.body;

    const userId = (req as any).user.userId;

    const task = await updateTaskService(taskId, userId, title, description);

    return res.json(task);
  } catch (error) {
    return res.status(400).json({
      error: (error as Error).message,
    });
  }
}
