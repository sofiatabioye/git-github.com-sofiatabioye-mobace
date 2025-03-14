import { NextResponse } from "next/server";
import db from "@/app/lib/db";

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const userId = searchParams.get("userId");

    // If a userId is provided, filter devices by user; otherwise, list all devices.
    const devices = userId
      ? await db.device.findMany({ where: { userId } })
      : await db.device.findMany();

    return NextResponse.json({ success: true, devices });
  } catch (error) {
    return NextResponse.json(
      { success: false, message: "Failed to list devices.", error: error },
      { status: 500 }
    );
  }
}
