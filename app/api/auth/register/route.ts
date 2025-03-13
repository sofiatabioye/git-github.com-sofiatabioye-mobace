import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import crypto from "crypto";
import db from "@/lib/db";
import { sendVerificationEmail } from "@/lib/email";

export async function POST(req: Request) {
  try {
    const { email, password } = await req.json();

    // Check if user already exists
    const existingUser = await db.user.findUnique({ where: { email } });
    if (existingUser) {
      return NextResponse.json({ message: "User already exists" }, { status: 400 });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Generate email verification token
    const emailToken = crypto.randomBytes(32).toString("hex");

    // Save user to database
    const newUser = await db.user.create({
      data: {
        email,
        password: hashedPassword,
        emailVerificationToken: emailToken,
        emailVerified: null,
      },
    });
    
    // Send verification email
    await sendVerificationEmail(email, emailToken);

    return NextResponse.json({ message: "User registered. Check your email to verify." });
  } catch (error) {
    return NextResponse.json({ message: "Registration failed" }, { status: 500 });
  }
}
