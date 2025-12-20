import { chatCompletion } from "./llm";

export async function updateSummary(
  oldSummary: string | null,
  messages: string[]
) {
  const prompt = `
    Summarize the user based on the conversation.

    Previous summary:
    ${oldSummary || "None"}

    Messages:
    ${messages.join("\n")}

    Focus on:
    - Personality
    - Interests
    - Communication style
  `;

  return chatCompletion([{ role: "user", content: prompt }]);
}
