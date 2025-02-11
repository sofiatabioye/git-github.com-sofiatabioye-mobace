import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import db from "@/lib/db";

export async function POST(req: Request) {
  try {
    const { email, password } = await req.json();
    const existingUser = await db.user.findUnique({ where: { email } });

    if (existingUser) {
      return NextResponse.json({ message: "User already exists" }, { status: 400 });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    await db.user.create({
      data: { email, password: hashedPassword, emailVerified: null },
    });

    return NextResponse.json({ message: "User registered. Please verify your email." });
  } catch (error) {
    return NextResponse.json({ message: "Registration failed" }, { status: 500 });
  }
}
