import { prisma } from "../config/prisma.js";

export async function getAllUsers() {
  return await prisma.user.findMany();
}

export async function deleteUserWithTasks(userId: string) {
  return prisma.$transaction(async (tx) => {

    await tx.task.deleteMany({
      where: {
        user_id: userId,
        project_id: null
      }
    });

    await tx.task.updateMany({
      where: {
        user_id: userId,
        NOT: {
          project_id: null
        }
      },
      data: {
        user_id: null
      }
    });

    await tx.user.delete({
      where: {
        id: userId
      }
    });

  });
}
