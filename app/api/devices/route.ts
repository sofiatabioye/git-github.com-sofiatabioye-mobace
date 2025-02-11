import { NextResponse } from "next/server";
import db from "@/lib/db";

export async function GET() {
  try {
    const devices = await db.device.findMany();
    return NextResponse.json({ success: true, devices });
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : "Unknown error";
    return NextResponse.json({ success: false, error: errorMessage }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const { userId, name, location } = await req.json();
    const newDevice = await db.device.create({
      data: { userId, name, location, status: "inactive" },
    });

    return NextResponse.json({ success: true, device: newDevice });
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : "Unknown error";
    return NextResponse.json({ success: false, error: errorMessage }, { status: 500 });
  }
}
