import type { NextApiRequest, NextApiResponse } from "next";
import { v4 as uuidv4 } from "uuid";

import { requireAuth } from "@/lib/auth/requireAuth";
import { Chat } from "@/models/Chat";
import { Message } from "@/models/Message";
import { isProfileRequest } from "@/lib/profileDetector";
import { chatCompletion } from "@/lib/llm";
import { updateSummary } from "@/lib/memory";
import { initDB } from "@/models";

/* ------------------------------------------------------------------ */
/* 🔐 Extend request type (THIS FIXES next build) */
/* ------------------------------------------------------------------ */
interface AuthenticatedRequest extends NextApiRequest {
  user: {
    userId: string;
    email: string;
  };
}

type ChatResponse = {
  chatId: string;
  reply: string;
};

export default requireAuth(async function handler(
  req: AuthenticatedRequest,
  res: NextApiResponse<ChatResponse | { error: string }>
) {
  await initDB();
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    const { chatId, message } = req.body;
    const userId = req.user.userId; // ✅ fully typed now

    if (!message || typeof message !== "string") {
      return res.status(400).json({ error: "message is required" });
    }

    /* -------------------------------------------------------------- */
    /* 1️⃣ Get-or-create Chat (USER MUST EXIST) */
    /* -------------------------------------------------------------- */
    let chat: Chat | null =  null;

    if (chatId) {
      chat = await Chat.findOne({
        where: { id: chatId, userId },
      });
    }

    if (!chat) {
      chat = await Chat.create({
        id: chatId || uuidv4(),
        userId,
      });
    }

    /* -------------------------------------------------------------- */
    /* 2️⃣ Store user message */
    /* -------------------------------------------------------------- */
    await Message.create({
      chatId: chat.id,
      role: "user",
      content: message,
    });

    /* -------------------------------------------------------------- */
    /* 3️⃣ Fetch recent messages */
    /* -------------------------------------------------------------- */
    const recentMessages = await Message.findAll({
      where: { chatId: chat.id },
      order: [["createdDate", "DESC"]],
      limit: 10,
    });

    const formattedMessages = recentMessages
      .reverse()
      .map(m => ({ role: m.role, content: m.content }));

    let reply = "";

    /* -------------------------------------------------------------- */
    /* 4️⃣ Profile vs Normal Chat */
    /* -------------------------------------------------------------- */
    if (isProfileRequest(message)) {
      reply = await chatCompletion([
        {
          role: "system",
          content: `
Create a personality-style profile based ONLY on the data below.

Conversation summary:
${chat.summary || "No summary yet"}

Recent messages:
${formattedMessages.map(m => m.content).join("\n")}
          `,
        },
      ]);
    } else {
      reply = await chatCompletion([
        {
          role: "system",
          content: chat.summary || "",
        },
        ...formattedMessages,
        {
          role: "user",
          content: message,
        },
      ]);
    }

    /* -------------------------------------------------------------- */
    /* 5️⃣ Store assistant reply */
    /* -------------------------------------------------------------- */
    await Message.create({
      chatId: chat.id,
      role: "assistant",
      content: reply,
    });

    /* -------------------------------------------------------------- */
    /* 6️⃣ Update summary + memory confidence */
    /* -------------------------------------------------------------- */
    if (recentMessages.length >= 5) {
      const newSummary = await updateSummary(
        chat.summary,
        recentMessages.map(m => m.content)
      );

      const totalMessages = await Message.count({
        where: { chatId: chat.id },
      });

      const memoryConfidence = Math.min(
        1,
        totalMessages / 20 + (newSummary?.length || 0) / 1000
      );

      await chat.update({
        summary: newSummary,
        memoryConfidence,
      });
    }

    /* -------------------------------------------------------------- */
    /* 7️⃣ Return response */
    /* -------------------------------------------------------------- */
    return res.status(200).json({
      chatId: chat.id,
      reply,
    });
  } catch (err) {
    console.error("Chat API error:", err);
    return res.status(500).json({ error: "Internal server error" });
  }
});
