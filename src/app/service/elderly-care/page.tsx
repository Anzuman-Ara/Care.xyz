import { Metadata } from "next";
import ElderlyCareClient from "@/components/ElderlyCareClient";

export const metadata: Metadata = {
  title: "Elderly Care Service - Care.xyz",
  description: "Compassionate care for seniors. Professional assistance with daily activities, companionship, and medical support.",
  keywords: "elderly care, senior care, caregiving, medical support",
  openGraph: {
    title: "Elderly Care Service - Care.xyz",
    description: "Dedicated care services for the elderly.",
    type: "website",
  },
};

export default function ElderlyCarePage() {
  return <ElderlyCareClient />;
}