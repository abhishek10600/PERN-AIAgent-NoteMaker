import OpenAI from "openai";
import { noteTools } from "./tools.js";
import { noteService } from "../services/note.service.js";
import { toolRegistry } from "./toolExecutor.js";

const client = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

const MAX_STEPS = 10;

export async function runAgent(userId: string, message: string) {
  let messages: any[] = [
    {
      role: "system",
      content: `
You are a note management AI.

Rules:
- NEVER create a note unless explicitly asked.
- When searching notes, extract ONLY the core note text.
- Remove pronouns and tense changes.

Examples:
User: "I woke up at 5am"
Search query: "wake up at 5am"

User: "I finished reading"
Search query: "reading"

Always normalize before searching.
`,
    },
    {
      role: "user",
      content: message,
    },
  ];

  for (let step = 0; step < MAX_STEPS; step++) {
    const completion = await client.chat.completions.create({
      model: "gpt-4.1",
      messages,
      tools: noteTools.map((tool) => ({
        type: "function",
        function: tool,
      })),
    });

    const msg = completion.choices[0].message;
    messages.push(msg);

    const toolCalls = msg.tool_calls;

    if (!toolCalls || toolCalls.length === 0) {
      return msg.content;
    }

    for (const toolCall of toolCalls) {
      if (toolCall.type !== "function") {
        continue;
      }

      const toolName = toolCall.function.name;
      const args = JSON.parse(toolCall.function.arguments || "{}");
      const executor = toolRegistry[toolName];

      if (!executor) {
        throw new Error(`Unknow tool: ${toolName}`);
      }

      const result = await executor(userId, args);

      messages.push({
        role: "tool",
        tool_call_id: toolCall.id,
        content: JSON.stringify(result),
      });
    }
  }

  throw new Error("Agent exceeded max steps");
}
