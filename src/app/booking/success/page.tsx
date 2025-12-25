import Link from "next/link";
import { getServerSession } from "next-auth";
import { authOptions } from "../../api/auth/[...nextauth]/route";
import dbConnect from "@/lib/db";
import Booking from "@/lib/models/Booking";
import Stripe from "stripe";
import { sendEmailInvoice } from "@/lib/email";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2025-12-15.clover" as const,
});

export default async function BookingSuccessPage({ searchParams }: { searchParams: Promise<{ session_id: string }> }) {
  const session = await getServerSession(authOptions);
  const params = await searchParams;
  const sessionId = params.session_id;
  let bookingId: string | undefined;
  let updateResult: any;

  if (sessionId) {
    await dbConnect();

    try {
      // Retrieve the Stripe session to get metadata
      const stripeSession = await stripe.checkout.sessions.retrieve(sessionId);
      bookingId = stripeSession.metadata?.bookingId;
      const email = stripeSession.metadata?.email;

      if (bookingId) {
        // Update the specific booking
        updateResult = await Booking.findOneAndUpdate(
          { _id: bookingId, status: "pending" },
          { status: "paid", stripeSessionId: sessionId },
          { new: true }
        );

        // Send email invoice if update was successful
        if (updateResult && email) {
          const location = `${updateResult.location.division}, ${updateResult.location.district}, ${updateResult.location.city}, ${updateResult.location.area}, ${updateResult.location.address}`;
          await sendEmailInvoice(
            email,
            updateResult.service,
            updateResult.duration.toString(),
            location,
            `$${updateResult.totalCost}`
          );
        }
      }
    } catch (error) {
      console.error("Error updating booking:", error);
    }
  }

  return (
    <div className="min-h-screen flex flex-col">
      <main className="container section">
        <div className="max-w-2xl mx-auto">
          <div className="card">
            <h1 className="text-3xl font-bold text-center mb-6 text-foreground">
              Payment Successful!
            </h1>
            <p className="text-lg text-muted-foreground leading-relaxed mb-4 text-center">
              Your payment was successful. Your booking has been confirmed and you will receive an email invoice shortly.
            </p>
            <div className="flex justify-center">
              <Link
                href="/my-bookings"
                className="btn-primary"
              >
                View My Bookings
              </Link>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}