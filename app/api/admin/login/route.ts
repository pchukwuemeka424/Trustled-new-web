import { NextResponse } from "next/server";
import {
  checkAdminPassword,
  createAdminSession,
  setAdminCookie,
} from "@/lib/auth";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const password = String(body?.password || "");
    if (!checkAdminPassword(password)) {
      return NextResponse.json({ error: "Invalid password" }, { status: 401 });
    }
    const token = await createAdminSession();
    const res = NextResponse.json({ ok: true });
    setAdminCookie(res, token);
    return res;
  } catch {
    return NextResponse.json({ error: "Login failed" }, { status: 500 });
  }
}
