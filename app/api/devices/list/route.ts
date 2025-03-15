import { NextResponse } from "next/server";
import db from "@/app/lib/db";

export async function GET(req: Request) {
  try {
    // Using req.nextUrl is recommended in Next.js App Router
    const { searchParams } = new URL(req.url);
    const userId = searchParams.get("userId");
    
    if (!userId) {
      return NextResponse.json(
        { success: false, message: "User ID is required" },
        { status: 400 }
      );
    }

    // Return only devices that belong to the specified user
    const devices = await db.device.findMany({
      where: { userId },
    });
    console.log(devices);

    return NextResponse.json({ success: true, devices });
  } catch (error) {
    return NextResponse.json(
      { success: false, message: "Failed to list devices.", error: error },
      { status: 500 }
    );
  }
}

