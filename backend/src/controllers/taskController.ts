import type { Request, Response } from "express";
import {
  createTaskService,
  getUserTasks,
  updateTaskService,
  updateTaskStatus,
  deleteTaskService,
  getTaskStatusService,
} from "../services/taskService.js";
import type { StringFieldRefInput } from "../../generated/prisma/internal/prismaNamespace.js";

export async function createTask(req: Request, res: Response) {
  try {
    const { title, description, due_date } = req.body;
    const userId = (req as any).user.userId;

    const task = await createTaskService(title, description, due_date, userId);

    return res.status(201).json(task);
  } catch (error) {
    return res.status(400).json({ error: (error as Error).message });
  }
}

export async function getTasks(req: Request, res: Response) {
  try {
    const userId = (req as any).user.userId;

    const status = req.query.status as "pending" | "completed" | undefined;

    const tasks = await getUserTasks(userId, status);

    return res.json(tasks);
  } catch (error) {
    return res.status(400).json({ error: (error as Error).message });
  }
}

export async function updateTask(req: Request, res: Response) {
  try {
    const taskId = req.params.id as string;
    const { title, description, due_date } = req.body;

    const userId = (req as any).user.userId;

    const task = await updateTaskService(
      taskId,
      userId,
      title,
      description,
      due_date,
    );

    return res.json(task);
  } catch (error) {
    return res.status(400).json({
      error: (error as Error).message,
    });
  }
}

export async function updateStatus(req: Request, res: Response) {
  try {
    const taskId = req.params.id as string;

    const userId = (req as any).user.userId;

    const status = await updateTaskStatus(taskId, userId);

    return res.json(status);
  } catch (error) {
    return res.status(400).json({
      error: (error as Error).message,
    });
  }
}

export async function deleteTask(req: Request, res: Response) {
  try {
    const taskId: string = req.params.id as string;

    const userId = (req as any).user.userId;

    const task = await deleteTaskService(taskId, userId);

    return res.json(task);
  } catch (error) {
    return res.status(400).json({
      error: (error as Error).message,
    });
  }
}

export async function getStatusKpi(req: Request, res: Response) {
  try {
    const userId = (req as any).user.userId;

    const task = await getTaskStatusService(userId);

    return res.json(task);
  } catch (error) {
    return res.status(400).json({
      error: (error as Error).message,
    });
  }
}
