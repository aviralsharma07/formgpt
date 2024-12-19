import Sidebar from "@/components/sidebar";
import React from "react";
import { PromptInput } from "./_components/PromptInput";
import { Button } from "@/components/ui/button";

const suggestions = [
  {
    id: 1,
    title: "Contact Form",
  },
  {
    id: 2,
    title: "Feedback Form",
  },
  {
    id: 3,
    title: "Job Application Form",
  },
  {
    id: 4,
    title: "Survey Form",
  },
  {
    id: 5,
    title: "Order Form",
  },
  {
    id: 6,
    title: "Registration Form",
  },
  {
    id: 7,
    title: "Lead Generation Form",
  },
  {
    id: 8,
    title: "Payment Form",
  },
];

const FormBuilder = () => {
  return (
    <section className="w-screen h-screen">
      <Sidebar />
      <div className="flex flex-col justify-center items-center h-full">
        <h1 className="text-[44px] font-bold text-gray-200">What form would you like to create?</h1>
        <p className="text-gray-400 text-lg mb-5">Describe your form in natural language, and we'll create it for you instantly</p>
        <PromptInput />
        <div className="flex max-w-2xl mt-16 flex-wrap justify-center gap-3 items-center">
          {suggestions.map((suggestion) => (
            <button key={suggestion.id} className="text-gray-300 text-[10px] border-purple-400 hover:bg-gray-800 hover:scale-110 transition-all rounded-3xl bg-transparent border py-1 px-2">
              {suggestion.title}
            </button>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FormBuilder;
