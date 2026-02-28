import { noteService } from "../services/note.service.js";
import { ToolExecutor } from "../types/index.js";

async function resolveNoteId(userId: string, args: any) {
  if (args.noteId) return args.noteId;

  if (!args.query) return null;

  const results = await noteService.search(userId, args.query);

  if (!results.length) return null;

  return results[0].id;
}

export const toolRegistry: Record<string, ToolExecutor> = {
  create_note: async (userId, args) => {
    return noteService.create(userId, args.content);
  },

  search_notes: async (userId, args) => {
    return noteService.search(userId, args.query);
  },

  search_completed_notes: async (userId) => {
    return noteService.searchCompletedNotes(userId);
  },

  search_incompleted_notes: async (userId) => {
    return noteService.searchIncompletedNotes(userId);
  },

  update_note: async (userId, args) => {
    const noteId = await resolveNoteId(userId, args);
    if (!noteId) {
      return { success: false, message: "Note not found" };
    }
    return noteService.update(noteId, userId, args.content);
  },

  complete_note: async (userId, args) => {
    const noteId = await resolveNoteId(userId, args);
    if (!noteId) {
      return { success: false, message: "Note not found" };
    }
    return noteService.markCompleted(noteId, userId);
  },

  delete_note: async (userId, args) => {
    const noteId = await resolveNoteId(userId, args);
    if (!noteId) {
      return { success: false, message: "Note not found" };
    }
    return await noteService.delete(noteId, userId);
  },
};
