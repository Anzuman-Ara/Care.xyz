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
  const [loadingBookings, setLoadingBookings] = useState(false);
  const [processingPayment, setProcessingPayment] = useState(false);

  useEffect(() => {
    if (status === "loading") return;
    if (!session) {
      router.push("/auth/login");
    } else {
      fetchBookings();
    }
  }, [session, status, router]);

  const fetchBookings = async () => {
    setLoadingBookings(true);
    try {
      const response = await fetch("/api/bookings");
      const data = await response.json();
      if (data.bookings) {
        setBookings(data.bookings);
      } else {
        console.error("Failed to fetch bookings:", data.error);
        setBookings([]);
      }
    } catch (error) {
      console.error("Failed to fetch bookings:", error);
      setBookings([]);
    } finally {
      setLoadingBookings(false);
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

  const handlePayNow = async () => {
    if (!selectedBooking) return;

    setProcessingPayment(true);
    try {
      const response = await fetch(`/api/stripe`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          amount: selectedBooking.totalCost * 100, // Convert to cents
          email: session?.user?.email,
          service: selectedBooking.service,
          bookingId: selectedBooking._id.toString(),
        }),
      });

      if (response.ok) {
        const { url } = await response.json();
        window.location.href = url; // Redirect to Stripe checkout
      } else {
        alert("Failed to create payment session. Please try again.");
      }
    } catch (error) {
      alert("An error occurred while processing payment.");
    } finally {
      setProcessingPayment(false);
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
            {loadingBookings ? (
              <div className="flex justify-center items-center py-12">
                <div className="flex flex-col items-center space-y-4">
                  <svg className="animate-spin h-8 w-8 text-primary" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  <p className="text-muted-foreground">Loading your bookings...</p>
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
                  {bookings.length === 0 ? (
                    <tr>
                      <td colSpan={6} className="py-8 text-center text-muted-foreground">
                        No bookings found.
                      </td>
                    </tr>
                  ) : (
                    bookings.map((booking) => (
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
                    ))
                  )}
                </tbody>
              </table>
            )}
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
                <div className="flex justify-between mt-6">
                  {selectedBooking.status === "pending" && (
                    <button
                      onClick={handlePayNow}
                      disabled={processingPayment}
                      className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {processingPayment ? (
                        <div className="flex items-center">
                          <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                          </svg>
                          Processing...
                        </div>
                      ) : (
                        "Pay Now"
                      )}
                    </button>
                  )}
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
