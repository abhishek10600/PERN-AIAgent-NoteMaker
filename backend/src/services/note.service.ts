import { prisma } from "../lib/prisma.js";
import { normalize } from "../utils/normalize.js";

export const noteService = {
  async create(userId: string, content: string) {
    return prisma.note.create({
      data: {
        content,
        userId,
      },
    });
  },

  async search(userId: string, query: string) {
    return prisma.note.findMany({
      where: {
        userId,
        content: {
          contains: query,
          mode: "insensitive",
        },
      },
      select: {
        id: true,
        content: true,
        isCompleted: true,
      },
    });
  },

  async findByContent(userId: string, content: string) {
    const notes = await prisma.note.findMany({
      where: { userId },
    });

    const target = normalize(content);

    return notes.find((note) => normalize(note.content) === target);
  },

  async searchCompletedNotes(userId: string) {
    return prisma.note.findMany({
      where: {
        userId,
        isCompleted: true,
      },
      select: {
        id: true,
        content: true,
        isCompleted: true,
      },
    });
  },

  async searchIncompletedNotes(userId: string) {
    return prisma.note.findMany({
      where: {
        userId,
        isCompleted: false,
      },
      select: {
        id: true,
        content: true,
        isCompleted: true,
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
