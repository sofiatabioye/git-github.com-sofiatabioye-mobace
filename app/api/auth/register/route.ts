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
    const { email, password, firstName, lastName } = await req.json();
    console.log(firstName, lastName)
    // Check if user already exists
    const existingUser = await db.user.findUnique({ where: { email } });
    if (existingUser) {
      return NextResponse.json({ message: "User already exists" }, { status: 400 });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Generate 6-digit verification code
    const emailVerificationCode = generateVerificationCode();
    const data = {
      email,
      password: hashedPassword,
      emailVerificationToken: emailVerificationCode,
      emailVerified: null,
      firstname: firstName,
      lastname: lastName,
      nin: ''
    }
    console.log(data)
    // Save user to database with verification code
    await db.user.create({data});

    // Send verification email with numeric code
    await sendVerificationEmail(email, emailVerificationCode);

    return NextResponse.json({ message: "User registered. Check your email to verify." });
  } catch (error) {
    console.error("Registration error:", error);
    return NextResponse.json({ message: "Registration failed" }, { status: 500 });
  }
}
