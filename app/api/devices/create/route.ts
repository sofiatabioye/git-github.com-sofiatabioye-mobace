import { NextResponse } from "next/server";
import db from "@/app/lib/db";

export async function POST(req: Request) {
  try {
    const { userId, name, location, status, batteryPercentage, id } = await req.json();

    // Validate required parameters
    if (!userId || !name || !location) {
      return NextResponse.json(
        { success: false, message: "Missing required parameters: userId, name, or location." },
        { status: 400 }
      );
    }

    // Create the new device (id and createdAt are auto-generated)
    const newDevice = await db.device.create({
      data: {
        id,
        userId,
        name,
        location,
        status: status || "inactive",
        batteryPercentage: batteryPercentage ?? 0
      },
    });

    return NextResponse.json({
      success: true,
      message: "Device added successfully!",
      device: newDevice,
    });
  } catch (error) {
    return NextResponse.json(
      { success: false, message: "Device creation failed.", error: error },
      { status: 500 }
    );
  }
}
