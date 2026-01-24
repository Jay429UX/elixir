import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";

const SITE_PASSWORD = "HereWeGo1984";
const AUTH_COOKIE_NAME = "dicey_auth";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { password } = body;

    if (password === SITE_PASSWORD) {
      const cookieStore = await cookies();

      // Set auth cookie that expires in 7 days
      cookieStore.set(AUTH_COOKIE_NAME, "authenticated", {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
        maxAge: 60 * 60 * 24 * 7, // 7 days
        path: "/",
      });

      return NextResponse.json({ success: true });
    }

    return NextResponse.json({ error: "Invalid password" }, { status: 401 });
  } catch {
    return NextResponse.json({ error: "Invalid request" }, { status: 400 });
  }
}
