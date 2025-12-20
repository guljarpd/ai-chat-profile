import OpenAI from "openai";

const client = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY!,
});

export async function chatCompletion(messages: any[]) {
  const res = await client.chat.completions.create({
    model: "gpt-4o-mini",
    messages,
  });

  return res.choices[0].message.content!;
}
