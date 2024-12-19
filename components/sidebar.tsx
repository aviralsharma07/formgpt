"use client";
import { useAuth } from "@/app/context/AuthContext";
import { Home, LayoutDashboard, LogOut } from "lucide-react";
import { useRouter } from "next/navigation";
import React from "react";

interface NavItemProps {
  icon: React.ReactNode;
  label: string;
  onClick?: () => void;
  isActive?: boolean;
}

function NavItem({ icon, label, onClick, isActive }: NavItemProps) {
  return (
    <button onClick={onClick} className={`group relative flex items-center justify-center ${isActive ? "text-white" : "text-gray-400 hover:text-white"} transition-colors duration-200`} title={label}>
      <div>{icon}</div>
      <span className="absolute left-16 bg-gray-800 text-white px-2 py-1 rounded text-sm opacity-0 group-hover:opacity-100 transition-opacity duration-200 whitespace-nowrap">{label}</span>
    </button>
  );
}

const Sidebar = () => {
  const { signOut } = useAuth();
  const router = useRouter();
  // const currentPath = window.location.pathname;
  return (
    <nav className="fixed left-0 top-0 h-screen w-16 border-r bg-opacity-15 bg-white/5 border-gray-500 flex flex-col items-center py-8">
      <div className="flex flex-col space-y-8">
        <NavItem icon={<Home className="w-6 h-6" />} onClick={() => router.push("/")} label="Home" />
        <NavItem icon={<LayoutDashboard className="w-6 h-6" />} label="Dashboard" />
      </div>
      <div className="mt-auto mb-8">
        <NavItem icon={<LogOut className="w-6 h-6" />} label="Sign Out" onClick={signOut} />
      </div>
    </nav>
  );
};

export default Sidebar;
