import { createTask, findTasksByUser } from "../repositories/taskRepository.js";

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
