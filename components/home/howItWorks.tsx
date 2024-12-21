import React from "react";
import { MessageSquare, Sparkles, Share2 } from "lucide-react";

interface StepProps {
  number: number;
  icon: React.ReactNode;
  title: string;
  description: string;
}

function Step({ number, icon, title, description }: StepProps) {
  return (
    <div className="relative">
      {/* Connector line */}
      {number < 3 && <div className="absolute top-12 left-1/2 w-full h-1 bg-gradient-to-r from-blue-500/50 to-transparent md:block hidden" />}

      <div className="relative flex flex-col items-center text-center">
        <div className="w-24 h-24 rounded-full bg-blue-500/10 flex items-center justify-center mb-4 relative">
          <div className="absolute -top-2 -right-2 w-8 h-8 rounded-full bg-blue-500 text-white flex items-center justify-center font-bold">{number}</div>
          {icon}
        </div>
        <h3 className="text-xl font-semibold mb-2">{title}</h3>
        <p className="text-gray-400 max-w-sm">{description}</p>
      </div>
    </div>
  );
}

export function HowItWorks() {
  return (
    <div className="py-24 mb-16 text-gray-200" id="how-it-works">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold mb-4">How It Works</h2>
          <p className="text-gray-400">Create forms in three simple steps</p>
        </div>

        <div className="grid md:grid-cols-3 gap-12">
          <Step number={1} icon={<MessageSquare className="w-8 h-8 text-blue-500" />} title="Describe Your Form" description="Tell us what kind of form you need in plain English" />
          <Step number={2} icon={<Sparkles className="w-8 h-8 text-blue-500" />} title="AI Generation" description="Our AI creates a professional form based on your description" />
          <Step number={3} icon={<Share2 className="w-8 h-8 text-blue-500" />} title="Share & Collect" description="Share your form instantly and start collecting responses" />
        </div>
      </div>
    </div>
  );
}
