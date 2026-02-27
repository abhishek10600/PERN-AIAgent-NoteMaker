export const noteTools = [
  {
    name: "create_note",
    description: "Create a new note",
    parameters: {
      type: "object",
      properties: {
        content: { type: "string" },
      },
      required: ["content"],
    },
  },

  {
    name: "update_note",
    description: "Update an exising note",
    parameters: {
      type: "object",
      properties: {
        noteId: { type: "string" },
        content: { type: "string" },
      },
      required: ["noteId", "content"],
    },
  },

  {
    name: "delete_note",
    description: "Delete a note",
    parameters: {
      type: "object",
      properties: {
        noteId: { type: "string" },
      },
      required: ["noteId"],
    },
  },
];
