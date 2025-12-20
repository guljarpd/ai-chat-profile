import { NextRequest, NextResponse } from "next/server";
import { verifyToken } from "@/lib/auth/jwt";

export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  // ✅ DO NOT TOUCH API ROUTES
  if (pathname.startsWith("/api")) {
    return NextResponse.next();
  }

  // Only protect /chat
  if (!pathname.startsWith("/chat")) {
    return NextResponse.next();
  }

  const token = req.cookies.get("auth_token")?.value;

  if (!token) {
    return NextResponse.redirect(new URL("/login", req.url));
  }

  try {
    verifyToken(token);
    return NextResponse.next();
  } catch {
    return NextResponse.redirect(new URL("/login", req.url));
  }
}

export const config = {
  matcher: ["/chat/:path*"],
};
