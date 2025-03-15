import { NextRequest, NextResponse } from "next/server";
import db from "@/lib/db";


export async function DELETE(req: NextRequest) {
    try {
      const urlParts = req.nextUrl.pathname.split("/");
      const id = urlParts[urlParts.length - 1]; // Extract the ID from the URL
  
      if (!id) {
        return NextResponse.json({ message: "Device id is required" }, { status: 400 });
      }
  
      const device = await db.device.findUnique({ where: { id } });
      if (!device) {
        return NextResponse.json({ message: "Device not found" }, { status: 404 });
      }
  
      await db.device.delete({ where: { id } });
  
      return NextResponse.json({ success: true, message: "Device deleted successfully!" });
    } catch (error) {
      return NextResponse.json(
        { success: false, message: "Device deletion failed.", error: error },
        { status: 500 }
      );
    }
  }
  