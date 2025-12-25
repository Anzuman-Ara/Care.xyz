import { NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import { authOptions } from "../../auth/[...nextauth]/route";
import dbConnect from "@/lib/db";
import Booking from "@/lib/models/Booking";

export async function DELETE(request: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { id: bookingId } = await params;

    await dbConnect();

    const booking = await Booking.findOneAndUpdate(
      { _id: bookingId, user: session.user.id, status: { $in: ['pending', 'paid'] } },
      { status: 'cancelled' },
      { new: true }
    );

    if (!booking) {
      return NextResponse.json({ error: "Booking not found or cannot be cancelled" }, { status: 404 });
    }

    return NextResponse.json({ message: "Booking cancelled successfully" });
  } catch (error) {
    console.error("Cancel booking error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}