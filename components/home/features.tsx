import React from "react";
import { Sparkles, Zap, Lock, BarChart3 } from "lucide-react";

interface FeatureCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  glowColor: string;
}

function FeatureCard({ icon, title, description, glowColor }: FeatureCardProps) {
  return (
    <div
      className={`bg-${glowColor} bg-opacity-5 backdrop-blur-sm rounded-lg p-6 
      hover:bg-opacity-10 transition-all duration-300
      hover:shadow-[0_0_30px_rgba(147,51,234,0.3)]
      group relative overflow-hidden`}
    >
      <div
        className={`bg-${glowColor} bg-opacity-10 w-12 h-12 rounded-lg 
        flex items-center justify-center mb-4 
        group-hover:bg-opacity-20 transition-all duration-300`}
      >
        {icon}
      </div>
      <h3 className="text-xl font-semibold mb-2">{title}</h3>
      <p className="text-gray-400">{description}</p>

      {/* Glow effect overlay */}
      <div
        className={`absolute inset-0 opacity-0 group-hover:opacity-100 
        transition-opacity duration-300 pointer-events-none
        bg-gradient-to-r from-blue-500/10 to-purple-500/10 
        mix-blend-overlay`}
      />
    </div>
  );
}

export function Features() {
  return (
    <div className="py-24 relative text-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold mb-4">Core Features</h2>
          <p className="text-gray-400">Everything you need to create and manage forms effectively</p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          <FeatureCard icon={<Sparkles className="w-6 h-6 text-blue-500" />} title="AI-Powered" description="Generate forms from natural language descriptions in seconds" glowColor="blue-500" />
          <FeatureCard icon={<Zap className="w-6 h-6 text-yellow-500" />} title="Instant Deploy" description="Share your forms immediately with a unique link" glowColor="yellow-500" />
          <FeatureCard icon={<Lock className="w-6 h-6 text-green-500" />} title="Secure" description="Enterprise-grade security for your form data" glowColor="green-500" />
          <FeatureCard icon={<BarChart3 className="w-6 h-6 text-purple-500" />} title="Analytics" description="Track responses and gather insights" glowColor="purple-500" />
        </div>
      </div>
    </div>
  );
}
