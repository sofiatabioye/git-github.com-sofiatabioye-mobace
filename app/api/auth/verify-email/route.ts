import { NextResponse } from "next/server";
import db from "@/lib/db";

export async function POST(req: Request) {
  const { token } = await req.json();
  
  const user = await db.user.findFirst({
    where: { emailVerificationToken: token },
  });

  if (!user) {
    return NextResponse.json({ message: "Invalid or expired token" }, { status: 400 });
  }

  await db.user.update({
    where: { id: user.id },
    data: { emailVerified: new Date(), emailVerificationToken: null },
  });

  return NextResponse.json({ message: "Email verified successfully" });
}
