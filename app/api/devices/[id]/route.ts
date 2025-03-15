import { NextResponse } from "next/server";
import db from "@/app/lib/db";

export async function DELETE(req: Request, { params }: { params: { id: string } }) {
  try {
    const { id } = params;
    if (!id) {
      return NextResponse.json({ message: "Device id is required" }, { status: 400 });
    }

    // Check if device exists
    const device = await db.device.findUnique({ where: { id } });
    if (!device) {
      return NextResponse.json({ message: "Device not found" }, { status: 404 });
    }

    // Delete the device
    await db.device.delete({ where: { id } });

    return NextResponse.json({ success: true, message: "Device deleted successfully!" });
  } catch (error) {
    return NextResponse.json(
      { success: false, message: "Device deletion failed." },
      { status: 500 }
    );
  }
}
