import { NextResponse } from "next/server";
import db from "@/app/lib/db";

export async function PUT(req: Request) {
  try {
    const { id, name, location, status } = await req.json();

    if (!id) {
      return NextResponse.json(
        { success: false, message: "Missing device id." },
        { status: 400 }
      );
    }

    // Update only provided fields using a conditional spread
    const updatedDevice = await db.device.update({
      where: { id },
      data: {
        ...(name && { name }),
        ...(location && { location }),
        ...(status && { status }),
      },
    });

    return NextResponse.json({
      success: true,
      message: "Device updated successfully!",
      device: updatedDevice,
    });
  } catch (error) {
    console.error("Error updating device:", error);
    return NextResponse.json(
      { success: false, message: "Device update failed." },
      { status: 500 }
    );
  }
}
