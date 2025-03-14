import { NextResponse } from "next/server";
import db from "@/app/lib/db";

export async function POST(req: Request) {
  try {
    const { email, code } = await req.json();

    // Find user by email
    const user = await db.user.findUnique({ where: { email } });
    if (!user || user.emailVerificationToken !== code) {
      return NextResponse.json({ success: false, message: "Invalid or expired code." }, { status: 400 });
    }

    // Mark email as verified
    const existingUser = await db.user.update({
      where: { email },
      data: { emailVerified: new Date(), emailVerificationToken: null },
    });

    return NextResponse.json({ success: true, message: "Email verified successfully!", userId: existingUser.id });
  } catch (error) {
    return NextResponse.json({ success: false, message: "Verification failed.", error: error }, { status: 500 });
  }
}
