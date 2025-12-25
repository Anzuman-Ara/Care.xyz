"use client";

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function BabyCareClient() {
  const { data: session } = useSession();
  const router = useRouter();

  const handleBookService = () => {
    if (session) {
      router.push("/booking/baby-care");
    } else {
      router.push("/auth/login");
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <main className="container section">
        <div className="card">
          <h1 className="text-3xl font-bold text-center mb-6 text-foreground">
            Baby Care Service
          </h1>
          <div className="flex flex-col md:flex-row items-center mb-6">
            <div className="md:w-1/2 mb-4 md:mb-0 md:pr-6">
              <img
                src="https://images.unsplash.com/photo-1702788176230-a652ea2125eb?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8QmFieSUyMENhcmUlMjBTZXJ2aWNlfGVufDB8fDB8fHww"
                alt="Baby Care Service"
                className="w-full h-auto rounded-lg shadow-md"
              />
            </div>
            <div className="md:w-1/2 space-y-4">
              <p className="text-lg leading-relaxed text-foreground">
                Our Baby Care service provides professional and reliable babysitting for your children. Whether you need a babysitter for a few hours or a full day, our caretakers are trained to ensure your child's safety and well-being.
              </p>
              <p className="text-lg leading-relaxed text-foreground">
                We offer flexible scheduling and personalized care plans to meet your family's needs. Our caretakers are background-checked and experienced in childcare.
              </p>
              <div className="bg-muted p-4 rounded-lg">
                <h3 className="text-xl font-semibold text-foreground mb-2">Pricing</h3>
                <p className="text-foreground">$50 per hour/day</p>
              </div>
            </div>
          </div>
          <div className="flex justify-center">
            <button
              onClick={handleBookService}
              className="btn-primary px-8 py-3 text-lg font-medium"
            >
              Book Service
            </button>
          </div>
        </div>
      </main>
    </div>
  );
}