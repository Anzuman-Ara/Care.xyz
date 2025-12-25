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
    try {
      const response = await fetch("/api/admin/bookings");
      const data = await response.json();
      if (data.bookings) {
        setBookings(data.bookings);
      }
    } catch (error) {
      console.error("Failed to fetch bookings:", error);
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
                {bookings.map((booking) => (
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
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </main>
    </div>
  );
}