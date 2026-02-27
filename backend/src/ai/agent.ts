import OpenAI from "openai";
import { noteTools } from "./tools.js";
import { noteService } from "../services/note.service.js";

const client = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function runAgent(userId: string, message: string) {
  const completion = await client.chat.completions.create({
    model: "gpt-4.1",
    messages: [
      {
        role: "system",
        content: "You are a note management AI. Use tools to manage note",
      },
      {
        role: "user",
        content: message,
      },
    ],
    tools: noteTools.map((tool) => ({
      type: "function",
      function: tool,
    })),
  });

  const toolCall = completion.choices[0].message.tool_calls?.[0];

  if (!toolCall || toolCall.type !== "function") {
    return completion.choices[0].message.content;
  }

  const { name, arguments: argsString } = toolCall.function;
  const args = JSON.parse(argsString);

  switch (toolCall.function.name) {
    case "create_note":
      return noteService.create(userId, args.content);

    case "update_note":
      return noteService.update(args.noteId, userId, args.content);

    case "complete_note":
      return noteService.markCompleted(args.noteId, userId);

    case "delete_note":
      return noteService.delete(args.noteId, userId);
  }
}
