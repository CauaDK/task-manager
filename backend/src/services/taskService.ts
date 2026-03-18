import {
  createTask,
  findTasksByUser,
  findTaskById,
  updateTask,
  updateStatusbyTaskId,
  deleteTask,
  getTaskStatus,
} from "../repositories/taskRepository.js";

export async function createTaskService(
  title: string,
  description: string | null,
  dueDate: string,
  userId: string,
) {
  if (!title) {
    throw new Error("Title is required");
  }

  return createTask(title, description, dueDate, userId);
}

export async function getUserTasks(
  userId: string,
  status?: "pending" | "completed",
) {
  const typeStatus = ["pending", "completed"];

  if (status && !typeStatus.includes(status)) {
    throw new Error("Invalid status");
  }

  return findTasksByUser(userId, status);
}

export async function updateTaskService(
  taskId: string,
  userId: string,
  title?: string,
  description?: string,
  dueDate?: string,
) {
  const task = await findTaskById(taskId);

  if (!task) {
    throw new Error("Task not found");
  }

  if (task.user_id !== userId) {
    throw new Error("Unauthorized");
  }

  if (title !== undefined && title.trim() === "") {
    throw new Error("Title cannot be empty");
  }

  if (
    title === undefined &&
    description === undefined &&
    dueDate === undefined
  ) {
    throw new Error("Nothing to update");
  }

  return updateTask(taskId, title, description, dueDate);
}

export async function updateTaskStatus(taskId: string, userId: string) {
  const task = await findTaskById(taskId);

  if (!task) {
    throw new Error("Task not found");
  }

  if (task.user_id !== userId) {
    throw new Error("Unauthorized");
  }

  return updateStatusbyTaskId(taskId, "completed");
}

export async function deleteTaskService(taskId: string, userId: string) {
  const task = await findTaskById(taskId);

  if (!task) {
    throw new Error("Task not found");
  }

  if (task.user_id !== userId) {
    throw new Error("Unauthorized");
  }

  return deleteTask(taskId);
}

export async function getTaskStatusService(userId: string) {
  return getTaskStatus(userId);
}
