import { error } from "node:console";
import { prisma } from "../config/prisma.js";

export async function createTask(
  title: string,
  description: string | null,
  user_id: string,
) {
  return prisma.task.create({
    data: {
      title,
      description,
      user_id,
    },
  });
}

export async function findTasksByUser(user_id: string) {
  return prisma.task.findMany({
    where: {
      user_id,
    },
    orderBy: {
      created_at: "desc",
    },
  });
}

export async function findTaskById(taskId: string) {
  return prisma.task.findUnique({
    where: { id: taskId },
  });
}

export async function updateTask(
  taskId: string,
  title?: string,
  description?: string,
) {
  const data: any = {};

  if (title !== undefined) {
    data.title = title;
  }

  if (description !== undefined) {
    data.description = description;
  }

  return prisma.task.update({
    where: { id: taskId },
    data,
  });
}

export async function updateStatusbyTaskId(taskId: string, status: string) {
  return prisma.task.update({
    where: { id: taskId },
    data: { status },
  });
}
