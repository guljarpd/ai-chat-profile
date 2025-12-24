import type { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "@/lib/prisma";
import { hashPassword } from "@/lib/auth/password";
import { signToken } from "@/lib/auth/jwt";
import { serialize } from "cookie";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "POST") return res.status(405).end();

  const { email, password, firstName, lastName } = req.body;

  if (!email || !password || !firstName) {
    return res.status(400).json({ error: "Missing fields" });
  }

  const existing = await prisma.user.findUnique({ where: { email } });
  if (existing) {
    return res.status(409).json({ error: "User already exists" });
  }

  const passwordHash = await hashPassword(password);

  const user = await prisma.user.create({
    data: {
      email,
      firstName,
      lastName,
      passwordHash,
    },
  });

  const token = signToken({ userId: user.id, email: user.email });

  res.setHeader(
    "Set-Cookie",
    serialize("auth_token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
      maxAge: 60 * 60,
    })
  );

  res.status(200).json({ success: true });
}
