"use client";
import { Header } from "@/components/home/header";
import Hero from "@/components/home/hero";
import Footer from "@/components/home/footer";
import { Features } from "@/components/home/features";
import { HowItWorks } from "@/components/home/howItWorks";

export default function Home() {
  return (
    <div className="min-h-screen">
      <Header />
      <Hero />
      <Features />
      <HowItWorks />
      <Footer />
    </div>
  );
}
