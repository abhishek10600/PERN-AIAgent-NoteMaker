import { prisma } from "../lib/prisma.js";

export const noteService = {
  async create(userId: string, content: string) {
    return prisma.note.create({
      data: {
        content,
        userId,
      },
    });
  },

  async update(noteId: string, userId: string, content: string) {
    return prisma.note.updateMany({
      where: {
        id: noteId,
        userId,
      },
      data: {
        content,
      },
    });
  },

  async markCompleted(noteId: string, userId: string) {
    return prisma.note.updateMany({
      where: {
        id: noteId,
        userId,
      },
      data: {
        isCompleted: true,
      },
    });
  },

  async delete(noteId: string, userId: string) {
    return prisma.note.deleteMany({
      where: {
        id: noteId,
        userId,
      },
    });
  },

  async getAll(userId: string) {
    return prisma.note.findMany({
      where: {
        userId,
      },
      orderBy: {
        createdAt: "desc",
      },
    });
  },
};
