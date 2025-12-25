import { Metadata } from "next";
import HomeClient from "@/components/HomeClient";

export const metadata: Metadata = {
  title: "Care.xyz - Trusted Care Services for Your Loved Ones",
  description: "Find reliable and trusted care services for children, elderly, and other family members. Book easily and securely through our platform.",
  keywords: "care services, babysitting, elderly care, sick care, caregiving",
  openGraph: {
    title: "Care.xyz - Trusted Care Services",
    description: "Professional care services for your loved ones. Book now!",
    type: "website",
  },
};

export default function Home() {
  return <HomeClient />;
}
