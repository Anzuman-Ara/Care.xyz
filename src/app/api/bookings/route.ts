import { NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import { authOptions } from "../auth/[...nextauth]/route";
import dbConnect from "@/lib/db";
import Booking from "@/lib/models/Booking";

export async function POST(request: Request) {
  try {
    console.log("Creating booking - checking session...");
    const session = await getServerSession(authOptions);
    console.log("Session:", session);

    if (!session?.user?.id) {
      console.log("No session or user ID");
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { service, duration, location, totalCost } = await request.json();
    console.log("Booking data:", { service, duration, location, totalCost });

    console.log("Connecting to DB...");
    await dbConnect();
    console.log("DB connected");

    const booking = new Booking({
      user: session.user.id,
      service,
      duration: parseInt(duration),
      location,
      totalCost: parseFloat(totalCost),
      status: "pending",
    });

    console.log("Saving booking...");
    await booking.save();
    console.log("Booking saved:", booking._id);

    return NextResponse.json({ bookingId: booking._id.toString() }, { status: 201 });
  } catch (error) {
    console.error("Booking creation error:", error);
    return NextResponse.json({ error: "Internal server error", details: (error as Error).message }, { status: 500 });
  }
}

export async function GET(request: Request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    await dbConnect();

    const bookings = await Booking.find({ user: session.user.id }).sort({ createdAt: -1 });

    return NextResponse.json({ bookings });
  } catch (error) {
    console.error("Fetch bookings error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}