import Link from "next/link";

export default function BookingCancelPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <main className="container section">
        <div className="max-w-2xl mx-auto">
          <div className="card">
          <h1 className="text-3xl font-bold text-center mb-6 text-foreground">
            Payment Cancelled
          </h1>
          <p className="text-lg text-muted-foreground leading-relaxed mb-4 text-center">
            Your payment was cancelled. You can try again or return to the homepage.
          </p>
          <div className="flex justify-center space-x-4">
            <Link
              href="/"
              className="btn-primary text-lg font-medium"
            >
              Return to Home
            </Link>
            <Link
              href="/my-bookings"
              className="btn-primary text-lg font-medium bg-secondary hover:bg-secondary/80"
            >
              My Bookings
            </Link>
          </div>
          </div>
        </div>
      </main>
    </div>
  );
}