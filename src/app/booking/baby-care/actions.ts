"use server";

import { redirect } from "next/navigation";
import { getServerSession } from "next-auth/next";
import { authOptions } from "../../api/auth/[...nextauth]/route";
import dbConnect from "@/lib/db";
import Booking from "@/lib/models/Booking";

export async function handleSubmit(formData: FormData) {
  const duration = formData.get("duration") as string;
  const division = formData.get("division") as string;
  const district = formData.get("district") as string;
  const city = formData.get("city") as string;
  const area = formData.get("area") as string;
  const address = formData.get("address") as string;

  const serviceCharge = 50; // Example service charge per hour/day
  const totalCost = parseInt(duration) * serviceCharge;

  // Get session
  const session = await getServerSession(authOptions);
  console.log("Server action session:", session);

  if (!session?.user?.id) {
    throw new Error("User not authenticated");
  }

  await dbConnect();

  const booking = new Booking({
    user: session.user.id,
    service: "Baby Care",
    duration: parseInt(duration),
    location: { division, district, city, area, address },
    totalCost,
    status: "pending",
  });

  await booking.save();
  console.log("Booking created:", booking._id);

  // Create Stripe checkout session
  const response = await fetch("http://localhost:3000/api/stripe", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      amount: totalCost * 100, // Convert to cents
      email: session.user.email,
      service: "Baby Care",
      bookingId: booking._id.toString(),
    }),
  });

  const { url } = await response.json();

  // Redirect to Stripe checkout
  redirect(url);
}