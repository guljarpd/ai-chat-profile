import type { NextApiRequest, NextApiResponse } from "next";
import { serialize } from "cookie";
import { User } from "@/models/User";
import { hashPassword } from "@/lib/auth/password";
import { signToken } from "@/lib/auth/jwt";
import { initDB } from "@/models";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "POST") {
    return res.status(405).end();
  }

  try {
    await initDB();

    const { email, password, firstName, lastName } = req.body;

    if (!email || !password || !firstName) {
      return res.status(400).json({ error: "Missing fields" });
    }

    const existing = await User.findOne({ where: { email } });
    if (existing) {
      return res.status(409).json({ error: "User already exists" });
    }

    const passwordHash = await hashPassword(password);

    const user = await User.create({
      email,
      firstName,
      lastName,
      passwordHash,
      isActive: true,
    });

    const token = signToken({
      userId: user.id,
      email: user.email,
    });

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

    return res.status(200).json({ success: true });
  } catch (err) {
    console.error("Signup error:", err);
    return res.status(500).json({ error: "Internal server error" });
  }
}
