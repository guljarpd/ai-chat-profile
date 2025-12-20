import { NextApiRequest, NextApiResponse } from "next";
import { verifyToken } from "./jwt";

export function requireAuth(
  handler: (req: NextApiRequest, res: NextApiResponse) => Promise<void>
) {
  return async (req, res) => {
    const token = req.cookies?.auth_token;

    if (!token) {
      return res.status(401).json({ error: "Unauthorized" });
    }

    try {
      const payload = verifyToken(token);
      (req as any).user = payload;
      return handler(req, res);
    } catch {
      return res.status(401).json({ error: "Unauthorized" });
    }
  };
}
