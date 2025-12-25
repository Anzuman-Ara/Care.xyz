"use client";

import Link from "next/link";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { handleSubmit } from "./actions";

export default function SickPeopleCareBookingPage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [totalCost, setTotalCost] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (status === "loading") return;
    if (!session) {
      router.push("/auth/login");
    }
  }, [session, status, router]);

  const handleFormSubmit = async (formData: FormData) => {
    setIsSubmitting(true);
    try {
      await handleSubmit(formData);
    } catch (error) {
      setIsSubmitting(false);
      // Error handling is done in the server action
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
        <div className="max-w-2xl mx-auto">
          <div className="card">
          <h1 className="text-3xl font-bold text-center mb-6 text-foreground">
            Book Sick People Care Service
          </h1>
          <form action={handleFormSubmit} className="space-y-4">
            <div>
              <label htmlFor="duration" className="block text-sm font-medium text-foreground">
                Duration (hours/days)
              </label>
              <input
                type="number"
                id="duration"
                name="duration"
                required
                className="auth-input"
                onChange={(e) => setTotalCost(parseInt(e.target.value || '0') * 70)}
              />
            </div>
            <div>
              <label htmlFor="division" className="block text-sm font-medium text-foreground">
                Division
              </label>
              <input
                type="text"
                id="division"
                name="division"
                required
                className="auth-input"
              />
            </div>
            <div>
              <label htmlFor="district" className="block text-sm font-medium text-foreground">
                District
              </label>
              <input
                type="text"
                id="district"
                name="district"
                required
                className="auth-input"
              />
            </div>
            <div>
              <label htmlFor="city" className="block text-sm font-medium text-foreground">
                City
              </label>
              <input
                type="text"
                id="city"
                name="city"
                required
                className="auth-input"
              />
            </div>
            <div>
              <label htmlFor="area" className="block text-sm font-medium text-foreground">
                Area
              </label>
              <input
                type="text"
                id="area"
                name="area"
                required
                className="auth-input"
              />
            </div>
            <div>
              <label htmlFor="address" className="block text-sm font-medium text-foreground">
                Address
              </label>
              <textarea
                id="address"
                name="address"
                required
                className="auth-input"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-foreground">
                Total Cost
              </label>
              <p id="totalCost" className="auth-input p-2">
                ${totalCost}
              </p>
            </div>
            <button
              type="submit"
              disabled={isSubmitting}
              className="btn-primary disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isSubmitting ? (
                <div className="flex items-center justify-center">
                  <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Processing...
                </div>
              ) : (
                "Confirm Booking"
              )}
            </button>
          </form>
          </div>
        </div>
      </main>
    </div>
  );
}