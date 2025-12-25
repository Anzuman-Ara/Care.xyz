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

    // Get pagination parameters from URL
    const { searchParams } = new URL(request.url);
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '8');

    // Calculate skip value for pagination
    const skip = (page - 1) * limit;

    // Get total count for pagination metadata
    const totalBookings = await Booking.countDocuments({ user: session.user.id });

    // Get paginated bookings
    const bookings = await Booking.find({ user: session.user.id })
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit);

    // Calculate pagination metadata
    const totalPages = Math.ceil(totalBookings / limit);
    const hasNextPage = page < totalPages;
    const hasPrevPage = page > 1;

    return NextResponse.json({
      bookings,
      pagination: {
        currentPage: page,
        totalPages,
        totalBookings,
        hasNextPage,
        hasPrevPage,
        limit
      }
    });
  } catch (error) {
    console.error("Fetch bookings error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}