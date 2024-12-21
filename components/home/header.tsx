"use client";
import * as React from "react";
import Link from "next/link";
import { Button } from "../ui/button";
import { ArrowRightIcon, LogInIcon } from "lucide-react";
import { useAuth } from "@/app/context/AuthContext";

export const Header = () => {
  const { user, signInWithGoogle } = useAuth();
  const linkStyle = "relative text-white font-medium transition-all duration-300 ease-in-out hover:text-blue-400 after:absolute after:left-0 after:bottom-0 after:h-[2px] after:w-0 after:bg-gradient-to-r after:from-blue-500 after:to-purple-500 after:transition-all after:duration-300 hover:after:w-full active:text-blue-500";
  return (
    <header className="sticky top-0 z-50 w-full border-b border-gray-500">
      <nav className="flex h-16 justify-between items-center px-6">
        <Link href="/" className="text-white mr-8 font-bold text-2xl flex items-center space-x-2">
          form<span className="bg-gradient-to-r from-indigo-500 to-purple-600 bg-clip-text text-transparent">GPT</span>
        </Link>
        <div className="flex items-center space-x-6">
          <Link className={linkStyle} href="/#features">
            Features
          </Link>
          <Link className={linkStyle} href="/#how-it-works">
            User Guide
          </Link>
          <Link className={linkStyle} href="https://www.github.com/aviralsharma07/formgpt">
            Documentation
          </Link>
          <Link className={linkStyle} href="https://www.github.com/aviralsharma07/formgpt">
            Live Demo
          </Link>
        </div>
        <div>
          {user ? (
            <Link href="/dashboard">
              <Button className="bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-700 text-white shadow-lg shadow-blue-500/25 hover:shadow-purple-500/35">
                Dashboard
                <ArrowRightIcon className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          ) : (
            <Button size="lg" className="bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 text-white shadow-lg shadow-indigo-500/25 hover:shadow-indigo-500/35" onClick={signInWithGoogle}>
              Login
              <LogInIcon className="ml-1 h-4 w-4" />
            </Button>
          )}
        </div>
      </nav>
    </header>
  );
};
