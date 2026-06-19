import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";

export async function POST(request) {
  try {
    const { password } = await request.json();
    const adminPassword = process.env.ADMIN_PASSWORD || "lenscape_admin";
    const jwtSecret = process.env.JWT_SECRET || "lenscape_secret_key_2026_xyz";

    if (password === adminPassword) {
      const token = jwt.sign({ role: "admin" }, jwtSecret, { expiresIn: "7d" });

      const response = NextResponse.json({ success: true, message: "Logged in successfully" });
      
      response.cookies.set("admin_token", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax",   // "lax" allows the cookie to be sent with same-site requests
        maxAge: 7 * 24 * 60 * 60, // 7 days
        path: "/",
      });

      return response;
    }

    return NextResponse.json({ success: false, message: "Incorrect password" }, { status: 401 });
  } catch (error) {
    console.error("Login API error:", error);
    return NextResponse.json({ success: false, message: "An error occurred during login" }, { status: 500 });
  }
}
