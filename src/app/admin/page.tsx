"use client";

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";

interface Booking {
  _id: string;
  service: string;
  totalCost: number;
  status: string;
  createdAt: string;
  user: {
    email: string;
  };
}

export default function AdminDashboardPage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loadingBookings, setLoadingBookings] = useState(false);

  useEffect(() => {
    if (status === "loading") return;
    if (!session) {
      router.push("/auth/login");
    } else {
      fetchBookings();
      // Set up polling for real-time updates
      const interval = setInterval(fetchBookings, 30000); // Update every 30 seconds
      return () => clearInterval(interval);
    }
  }, [session, status, router]);

  const fetchBookings = async () => {
    setLoadingBookings(true);
    try {
      const response = await fetch("/api/admin/bookings");
      const data = await response.json();
      if (data.bookings) {
        setBookings(data.bookings);
      }
    } catch (error) {
      console.error("Failed to fetch bookings:", error);
    } finally {
      setLoadingBookings(false);
    }
  };

  if (status === "loading") {
    return <div>Loading...</div>;
  }

  if (!session) {
    return null;
  }

  return (
    <div className="min-h-screen flex flex-col">
      <main className="container section">
        <div className="details-card">
          <h1 className="text-3xl font-bold text-center mb-6 text-foreground">
            Admin Dashboard
          </h1>
          <div className="overflow-x-auto">
            {loadingBookings ? (
              <div className="flex justify-center items-center py-12">
                <div className="flex flex-col items-center space-y-4">
                  <svg className="animate-spin h-8 w-8 text-primary" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  <p className="text-muted-foreground">Loading bookings data...</p>
                </div>
              </div>
            ) : (
              <table className="min-w-full">
                <thead>
                  <tr>
                    <th className="py-2 px-4 border-b border-border text-left text-sm font-medium text-foreground">
                      Service
                    </th>
                    <th className="py-2 px-4 border-b border-border text-left text-sm font-medium text-foreground">
                      Amount
                    </th>
                    <th className="py-2 px-4 border-b border-border text-left text-sm font-medium text-foreground">
                      Email
                    </th>
                    <th className="py-2 px-4 border-b border-border text-left text-sm font-medium text-foreground">
                      Date
                    </th>
                    <th className="py-2 px-4 border-b border-border text-left text-sm font-medium text-foreground">
                      Status
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {bookings.length === 0 ? (
                    <tr>
                      <td colSpan={5} className="py-8 text-center text-muted-foreground">
                        No bookings found.
                      </td>
                    </tr>
                  ) : (
                    bookings.map((booking) => (
                      <tr key={booking._id} className="hover:bg-muted">
                        <td className="py-2 px-4 border-b border-border text-sm text-foreground">
                          {booking.service}
                        </td>
                        <td className="py-2 px-4 border-b border-border text-sm text-foreground">
                          ${booking.totalCost}
                        </td>
                        <td className="py-2 px-4 border-b border-border text-sm text-foreground">
                          {booking.user.email}
                        </td>
                        <td className="py-2 px-4 border-b border-border text-sm text-foreground">
                          {new Date(booking.createdAt).toLocaleDateString()}
                        </td>
                        <td className="py-2 px-4 border-b border-border text-sm text-foreground">
                          {booking.status.charAt(0).toUpperCase() + booking.status.slice(1)}
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}