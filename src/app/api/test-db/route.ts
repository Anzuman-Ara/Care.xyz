import { NextResponse } from "next/server";
import dbConnect from "@/lib/db";

export async function GET() {
  try {
    await dbConnect();
    return NextResponse.json({ status: "Connected to MongoDB Atlas successfully!" });
  } catch (error) {
    console.error("Database connection error:", error);
    return NextResponse.json(
      { error: "Failed to connect to MongoDB Atlas", details: (error as Error).message },
      { status: 500 }
    );
  }
}