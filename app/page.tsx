"use client";
import { Header } from "@/components/header";
import Hero from "@/components/hero";
import Footer from "@/components/footer";

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-black">
      <Header />
      <Hero />
      <Footer />
    </div>
  );
}
