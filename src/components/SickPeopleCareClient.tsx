"use client";

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function SickPeopleCareClient() {
  const { data: session } = useSession();
  const router = useRouter();

  const handleBookService = () => {
    if (session) {
      router.push("/booking/sick-people-care");
    } else {
      router.push("/auth/login");
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <main className="container section">
        <div className="card">
          <h1 className="text-3xl font-bold text-center mb-6 text-foreground">
            Sick People Care Service
          </h1>
          <div className="flex flex-col md:flex-row items-center mb-6">
            <div className="md:w-1/2 mb-4 md:mb-0 md:pr-6">
              <img
                src="https://plus.unsplash.com/premium_photo-1726880565274-aa060f8c4ee6?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8U2ljayUyMFBlb3BsZSUyMENhcmUlMjBTZXJ2aWNlfGVufDB8fDB8fHww"
                alt="Sick People Care Service"
                className="w-full h-auto rounded-lg shadow-md"
              />
            </div>
            <div className="md:w-1/2 space-y-4">
              <p className="text-lg leading-relaxed text-foreground">
                Our Sick People Care service provides specialized care for individuals who need medical attention and support. Whether you need assistance with medication management, wound care, or general support, our caretakers are here to help.
              </p>
              <p className="text-lg leading-relaxed text-foreground">
                We offer personalized care plans to meet the unique needs of each individual. Our caretakers are trained to provide the highest level of care and support.
              </p>
              <div className="bg-muted p-4 rounded-lg">
                <h3 className="text-xl font-semibold text-foreground mb-2">Pricing</h3>
                <p className="text-foreground">$70 per hour/day</p>
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