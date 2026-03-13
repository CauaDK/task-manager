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
