"use client";
import React, { useState } from "react";
import { Wand2 } from "lucide-react";

interface PromptInputProps {
  onSubmit: (prompt: string) => void;
  isLoading?: boolean;
  error: string | null;
  value: string;
  onChange: (value: string) => void;
}

export function PromptInput({ onSubmit, isLoading, error, value, onChange }: PromptInputProps) {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (value.trim() && !isLoading) {
      onSubmit(value!);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="w-full max-w-2xl">
      <div className="relative group">
        <textarea value={value} onChange={(e) => onChange(e.target.value)} placeholder="Describe your form (e.g., 'Create a feedback form for my restaurant with ratings and comments')" className="w-full border border-gray-600 h-32 bg-gray-800 text-white rounded-lg p-4 pr-12 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500 resize-none" disabled={isLoading} />
        {error && <p className="text-red-500 text-xs mt-1">{error}</p>}
        <button
          type="submit"
          disabled={isLoading || !value.trim()}
          className={`absolute right-4 bottom-4 p-2 rounded-full 
            ${isLoading || !value.trim() ? "bg-gray-700 text-gray-500 cursor-not-allowed" : "bg-purple-500 text-white hover:bg-purple-600"} transition-colors duration-200`}
        >
          <Wand2 className="w-5 h-5" />
        </button>
      </div>
    </form>
  );
}
