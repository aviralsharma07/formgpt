import React from "react";
import { LucideIcon } from "lucide-react";

interface ActionButtonProps {
  icon: LucideIcon;
  label: string;
  onClick: () => void;
  variant?: "primary" | "secondary";
}

export function ActionButton({ icon: Icon, label, onClick, variant = "primary" }: ActionButtonProps) {
  const baseStyles = "flex items-center gap-2 px-4 py-2 rounded-lg transition-colors duration-200";
  const variants = {
    primary: "bg-blue-500 text-white hover:bg-blue-600",
    secondary: "bg-gray-700 text-gray-200 hover:bg-gray-600",
  };

  return (
    <button onClick={onClick} className={`${baseStyles} ${variants[variant]}`}>
      <Icon className="w-5 h-5" />
      <span>{label}</span>
    </button>
  );
}
