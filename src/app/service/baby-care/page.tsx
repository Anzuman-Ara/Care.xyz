import { Metadata } from "next";
import BabyCareClient from "@/components/BabyCareClient";

export const metadata: Metadata = {
  title: "Baby Care Service - Care.xyz",
  description: "Professional babysitting and childcare services. Ensure your child's safety and well-being with our trained caretakers.",
  keywords: "baby care, babysitting, childcare, care services",
  openGraph: {
    title: "Baby Care Service - Care.xyz",
    description: "Reliable babysitting services for your children.",
    type: "website",
  },
};

export default function BabyCarePage() {
  return <BabyCareClient />;
}