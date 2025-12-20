import { NextApiRequest, NextApiResponse } from "next";
import {serialize} from "cookie";

export default function handler(req: NextApiRequest, res: NextApiResponse) {
    res.setHeader(
        "Set-Cookie",
        serialize("auth_token", "", {
          path: "/",
          maxAge: 0,
        })
      );

  res.status(200).json({ success: true });
}
