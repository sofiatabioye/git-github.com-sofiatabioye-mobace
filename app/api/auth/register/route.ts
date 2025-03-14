import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import db from "@/app/lib/db";
import { sendVerificationEmail } from "@/app/lib/email";

// Function to generate a 6-digit numeric code
const generateVerificationCode = () => {
  return Math.floor(100000 + Math.random() * 900000).toString(); // Ensures a 6-digit number
};

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

    // Generate 6-digit verification code
    const emailVerificationCode = generateVerificationCode();

    // Save user to database with verification code
    await db.user.create({
      data: {
        email,
        password: hashedPassword,
        emailVerificationToken: emailVerificationCode, // Store numeric code
        emailVerified: null,
      },
    });

    // Send verification email with numeric code
    await sendVerificationEmail(email, emailVerificationCode);

    return NextResponse.json({ message: "User registered. Check your email to verify." });
  } catch (error) {
    console.error("Registration error:", error);
    return NextResponse.json({ message: "Registration failed" }, { status: 500 });
  }
}
