import type { NextApiRequest, NextApiResponse } from "next";
import { serialize } from "cookie";

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "POST") {
    return res.status(405).end();
  }

  res.setHeader(
    "Set-Cookie",
    serialize("auth_token", "", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
      maxAge: 0, // 🔥 delete cookie
    })
  );

  return res.status(200).json({ success: true });
}
