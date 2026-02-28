export const noteTools = [
  {
    name: "create_note",
    description:
      "Create a new note ONLY when user explicitly asks to create one.",
    parameters: {
      type: "object",
      properties: {
        content: { type: "string" },
      },
      required: ["content"],
    },
  },

  {
    name: "search_notes",
    description: "Search notes to find note IDs using text",
    parameters: {
      type: "object",
      properties: {
        query: {
          type: "string",
        },
      },
      required: ["query"],
    },
  },

  {
    name: "search_completed_notes",
    description: "Get completed notes",
    parameters: {
      type: "object",
      properties: {},
    },
  },

  {
    name: "search_incompleted_notes",
    description: "Get incompleted notes",
    parameters: {
      type: "object",
      properties: {},
    },
  },

  {
    name: "update_note",
    description: "Update an existing note. Use query if noteId is unknown.",
    parameters: {
      type: "object",
      properties: {
        noteId: { type: "string" },
        query: { type: "string" },
        content: { type: "string" },
      },
      required: ["content"],
    },
  },

  {
    name: "complete_note",
    description: "Mark a note completed. Use query if noteId is unknown.",
    parameters: {
      type: "object",
      properties: {
        noteId: { type: "string" },
        query: { type: "string" },
      },
    },
  },

  {
    name: "delete_note",
    description: "Delete an existing note. Use query if noteId is unknown.",
    parameters: {
      type: "object",
      properties: {
        noteId: { type: "string" },
        query: { type: "string" },
      },
    },
  },
];
