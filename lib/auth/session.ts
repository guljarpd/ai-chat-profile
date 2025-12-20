import {verifyToken} from "./jwt";
import { NextApiRequest } from "next";


export function getUserFromRequest(req: NextApiRequest) {
  const token = req.cookies?.auth_token;
  if (!token) return null;

  try {
    return verifyToken(token) as { userId: string };
  } catch {
    return null;
  }
}
