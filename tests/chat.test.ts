import { describe, it, expect, vi } from "vitest";

/* ================================
   MOCK LLM (ALL EXPORTS USED)
================================ */
vi.mock("@/lib/llm", () => ({
  askLLM: vi.fn(async (messages: any[]) => {
    const last = messages[messages.length - 1]?.content || "";

    if (last.toLowerCase().includes("hello")) {
      return "Hello! This is a mocked AI response.";
    }

    return "Generic mocked response.";
  }),

  chatCompletion: vi.fn(async () => {
    return {
      content:
        "You are a thoughtful, curious, and reflective person who values clarity and structure. You tend to ask deep questions and care about building things properly.",
    };
  }),
}));

/* ================================
   MOCK DATABASE MODELS
================================ */
vi.mock("@/models/User", () => ({
  User: {
    create: vi.fn(async (data) => ({
      id: "test-user-id",
      ...data,
    })),
  },
}));

vi.mock("@/models/Chat", () => ({
  Chat: {
    findByPk: vi.fn(async (id) => ({
      id,
      userId: "test-user-id",
    })),
    findOne: vi.fn(async () => null),
    create: vi.fn(async (data) => ({
      id: data.id,
      userId: data.userId,
    })),
  },
}));

vi.mock("@/models/Message", () => ({
  Message: {
    create: vi.fn(async (data) => data),
    findAll: vi.fn(async () => [
      { role: "user", content: "Hello AI" },
    ]),
  },
}));

/* ================================
   IMPORT HANDLER AFTER MOCKS
================================ */
import handler from "@/pages/api/chat";
import httpMocks from "node-mocks-http";

/* ================================
   TESTS
================================ */
describe("Chat API", () => {
  it("stores message and returns response", async () => {
    const req = httpMocks.createRequest({
      method: "POST",
      body: {
        chatId: "test-chat-id",
        message: "Hello AI",
      },
    });

    const res = httpMocks.createResponse();

    await handler(req as any, res as any);

    const data = res._getJSONData();

    expect(res.statusCode).toBe(200);
    expect(typeof data.reply).toBe("string");
    expect(data.reply).toContain("mocked");
  });

  it("returns personality profile when asked", async () => {
    const req = httpMocks.createRequest({
      method: "POST",
      body: {
        chatId: "test-chat-id",
        message: "Tell me about myself",
      },
    });

    const res = httpMocks.createResponse();

    await handler(req as any, res as any);

    const data = res._getJSONData();

    expect(res.statusCode).toBe(200);
    expect(data.reply.length).toBeGreaterThan(50);
    expect(data.reply).toContain("thoughtful");
  });
});
