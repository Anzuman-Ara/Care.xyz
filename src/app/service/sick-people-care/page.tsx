import { Metadata } from "next";
import SickPeopleCareClient from "@/components/SickPeopleCareClient";

export const metadata: Metadata = {
  title: "Sick People Care Service - Care.xyz",
  description: "Specialized medical care and support for individuals in need. Assistance with medication, wound care, and general health support.",
  keywords: "sick care, medical care, health support, caregiving",
  openGraph: {
    title: "Sick People Care Service - Care.xyz",
    description: "Professional care for those needing medical attention.",
    type: "website",
  },
};

export default function SickPeopleCarePage() {
  return <SickPeopleCareClient />;
}