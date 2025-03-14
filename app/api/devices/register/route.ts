import { NextResponse } from "next/server";
import db from "@/app/lib/db";

export async function POST(req: Request) {
  try {
    const { userId, deviceId } = await req.json();

    if (!userId || !deviceId) {
      return NextResponse.json({ message: "Missing user ID or device ID." }, { status: 400 });
    }

    // Check if the device is already registered
    const existingDevice = await db.device.findUnique({ where: { id: deviceId } });
    if (existingDevice) {
      return NextResponse.json({ message: "Device already registered." }, { status: 400 });
    }

    // Register the device
    await db.device.create({
      data: { userId, id: deviceId, name: "User Registered Device", status: "inactive", location: 'Nigeria' },
    });

    return NextResponse.json({ success: true, message: "Device registered successfully!" });
  } catch (error) {
    return NextResponse.json({ success: false, message: "Device registration failed." }, { status: 500 });
  }
}
