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

export async function findTasksByUser(user_id: string, status?: string) {
  if (status) {
    return prisma.task.findMany({
      where: {
        user_id,
        status: status,
      },
      orderBy: {
        created_at: "desc",
      },
    });
  }
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

export async function deleteTask(taskId: string) {
  return prisma.task.delete({
    where: { id: taskId },
  });
}

export async function getTaskStatus(userId: string) {
  const status = await prisma.task.groupBy({
    by: ["status"],
    where: {
      user_id: userId,
    },
    _count: {
      status: true,
    },
  });

  let pending: number = 0;
  let completed: number = 0;

  status.forEach((item) => {
    if (item.status === "pending") {
      pending = item._count.status;
    }

    if (item.status === "completed") {
      completed = item._count.status;
    }
  });

  return {
    total: pending + completed,
    pending,
    completed,
  };
}
