"use client";

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";

interface Booking {
  _id: string;
  service: string;
  duration: number;
  location: {
    division: string;
    district: string;
    city: string;
    area: string;
    address: string;
  };
  totalCost: number;
  status: string;
  createdAt: string;
  updatedAt: string;
}

export default function MyBookingsPage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [selectedBooking, setSelectedBooking] = useState<Booking | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [showCancelConfirm, setShowCancelConfirm] = useState(false);
  const [cancelling, setCancelling] = useState(false);

  useEffect(() => {
    if (status === "loading") return;
    if (!session) {
      router.push("/auth/login");
    } else {
      fetchBookings();
    }
  }, [session, status, router]);

  const fetchBookings = async () => {
    const response = await fetch("/api/bookings");
    const data = await response.json();
    if (data.bookings) {
      setBookings(data.bookings);
    } else {
      console.error("Failed to fetch bookings:", data.error);
      setBookings([]);
    }
  };

  const openModal = (booking: Booking) => {
    setSelectedBooking(booking);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedBooking(null);
    setShowCancelConfirm(false);
  };

  const handleCancelBooking = async () => {
    if (!selectedBooking) return;

    setCancelling(true);
    try {
      const response = await fetch(`/api/bookings/${selectedBooking._id}`, {
        method: "DELETE",
      });

      if (response.ok) {
        setShowCancelConfirm(false);
        setIsModalOpen(false);
        setSelectedBooking(null);
        // Refresh the bookings list
        fetchBookings();
      } else {
        // Handle error
        alert("Failed to cancel booking. Please try again.");
      }
    } catch (error) {
      alert("An error occurred while cancelling the booking.");
    } finally {
      setCancelling(false);
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
            My Bookings
          </h1>
          <div className="overflow-x-auto">
            <table className="min-w-full">
              <thead>
                <tr>
                  <th className="py-2 px-4 border-b border-border text-left text-sm font-medium text-foreground">
                    Service
                  </th>
                  <th className="py-2 px-4 border-b border-border text-left text-sm font-medium text-foreground">
                    Duration
                  </th>
                  <th className="py-2 px-4 border-b border-border text-left text-sm font-medium text-foreground">
                    Location
                  </th>
                  <th className="py-2 px-4 border-b border-border text-left text-sm font-medium text-foreground">
                    Total Cost
                  </th>
                  <th className="py-2 px-4 border-b border-border text-left text-sm font-medium text-foreground">
                    Status
                  </th>
                  <th className="py-2 px-4 border-b border-border text-left text-sm font-medium text-foreground">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody>
                {bookings.map((booking) => (
                  <tr key={booking._id.toString()} className="hover:bg-muted">
                    <td className="py-2 px-4 border-b border-border text-sm text-foreground">
                      {booking.service}
                    </td>
                    <td className="py-2 px-4 border-b border-border text-sm text-foreground">
                      {booking.duration} {booking.duration === 1 ? "hour/day" : "hours/days"}
                    </td>
                    <td className="py-2 px-4 border-b border-border text-sm text-foreground">
                      {booking.location.city}, {booking.location.district}, {booking.location.division}
                    </td>
                    <td className="py-2 px-4 border-b border-border text-sm text-foreground">
                      ${booking.totalCost}
                    </td>
                    <td className="py-2 px-4 border-b border-border text-sm text-foreground">
                      {booking.status.charAt(0).toUpperCase() + booking.status.slice(1)}
                    </td>
                    <td className="py-2 px-4 border-b border-border text-sm text-foreground">
                      <button
                        onClick={() => openModal(booking)}
                        className="auth-link mr-2"
                      >
                        View Details
                      </button>
                      {booking.status === "pending" && (
                        <button
                          onClick={() => {
                            setSelectedBooking(booking);
                            setShowCancelConfirm(true);
                            setIsModalOpen(true);
                          }}
                          className="text-red-500 hover:text-red-600 dark:text-red-400 dark:hover:text-red-300"
                        >
                          Cancel
                        </button>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </main>

      {/* Modal */}
      {isModalOpen && selectedBooking && (
        <div className="fixed inset-0 backdrop-blur flex items-center justify-center z-50">
          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg max-w-md w-full mx-4 shadow-xl">
            {showCancelConfirm ? (
              <>
                <h2 className="text-2xl font-bold mb-4 text-red-600">Cancel Booking</h2>
                <p className="mb-4">Are you sure you want to cancel this booking? This action cannot be undone.</p>
                <div className="flex justify-end space-x-2">
                  <button
                    onClick={() => setShowCancelConfirm(false)}
                    className="px-4 py-2 text-gray-600 hover:text-gray-800 dark:text-gray-400 dark:hover:text-gray-200"
                    disabled={cancelling}
                  >
                    No, Keep Booking
                  </button>
                  <button
                    onClick={handleCancelBooking}
                    disabled={cancelling}
                    className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 disabled:opacity-50"
                  >
                    {cancelling ? "Cancelling..." : "Yes, Cancel Booking"}
                  </button>
                </div>
              </>
            ) : (
              <>
                <h2 className="text-2xl font-bold mb-4">Booking Details</h2>
                <div className="space-y-2">
                  <p><strong>Service:</strong> {selectedBooking.service}</p>
                  <p><strong>Duration:</strong> {selectedBooking.duration} {selectedBooking.duration === 1 ? "hour/day" : "hours/days"}</p>
                  <p><strong>Location:</strong> {selectedBooking.location.area}, {selectedBooking.location.city}, {selectedBooking.location.district}, {selectedBooking.location.division}</p>
                  <p><strong>Address:</strong> {selectedBooking.location.address}</p>
                  <p><strong>Total Cost:</strong> ${selectedBooking.totalCost}</p>
                  <p><strong>Status:</strong> {selectedBooking.status.charAt(0).toUpperCase() + selectedBooking.status.slice(1)}</p>
                  <p><strong>Created At:</strong> {new Date(selectedBooking.createdAt).toLocaleString()}</p>
                  <p><strong>Updated At:</strong> {new Date(selectedBooking.updatedAt).toLocaleString()}</p>
                </div>
                <div className="flex justify-end mt-6">
                  <button
                    onClick={closeModal}
                    className="btn-primary"
                  >
                    Close
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
