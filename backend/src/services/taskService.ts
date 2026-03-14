import {
  createTask,
  findTasksByUser,
  findTaskById,
  updateTask,
  updateStatusbyTaskId,
} from "../repositories/taskRepository.js";

export async function createTaskService(
  title: string,
  description: string | null,
  userId: string,
) {
  if (!title) {
    throw new Error("Title is required");
  }

  return createTask(title, description, userId);
}

export async function getUserTasks(userId: string) {
  return findTasksByUser(userId);
}

export async function updateTaskService(
  taskId: string,
  userId: string,
  title?: string,
  description?: string,
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

  if (title === undefined && description === undefined) {
    throw new Error("Nothing to update");
  }

  return updateTask(taskId, title, description);
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
