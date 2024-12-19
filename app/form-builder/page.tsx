"use client";
import Sidebar from "@/components/sidebar";
import React, { useState } from "react";
import { PromptInput } from "./_components/PromptInput";
import { Button } from "@/components/ui/button";
import { useFetch } from "../lib/hooks/useFetch";
import { createFormUsingGroq } from "../lib/groq/groqClient";
import { FormGeneratorResponse, validateFormResponse } from "../lib/types/response";
import { IForm } from "../lib/types/form";

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
  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { fetchData } = useFetch<IForm>();

  const generateFormFromAI = async (userPrompt: string): Promise<FormGeneratorResponse> => {
    const chatCompletion = await createFormUsingGroq(userPrompt);
    const formResponse = JSON.parse(chatCompletion.choices[0]?.message?.content || "{}");

    const isValid = validateFormResponse(JSON.parse(chatCompletion.choices[0]?.message?.content!));
    console.log("is Valid Response", isValid);

    return formResponse;
  };

  const createGoogleForm = async (formData: FormGeneratorResponse): Promise<IForm | null> => {
    try {
      console.log("ai generated form response..", formData);
      return await fetchData("https://forms.googleapis.com/v1/forms", {
        method: "POST",
        requireAuth: true,
        body: JSON.stringify({
          info: {
            title: formData?.initialForm?.info.title,
          },
        }),
      });
    } catch (error) {
      console.error("Error creating Resume...", error);
      return null;
    }
  };

  const sendBatchUpdateToGoogleForm = async (FormData: FormGeneratorResponse, formId: string): Promise<IForm | null> => {
    try {
      return await fetchData(`https://forms.googleapis.com/v1/forms/${formId}:batchUpdate`, {
        method: "POST",
        requireAuth: true,
        body: JSON.stringify({
          includeFormInResponse: true,
          requests: FormData.batchUpdate.requests,
        }),
      });
    } catch (error) {
      console.error("Error Batch Updating Form...", error);
      return null;
    }
  };

  const handleFormSubmit = async (userPrompt: string) => {
    setIsProcessing(true);
    setError(null);
    try {
      const aiResponse = await generateFormFromAI(userPrompt);

      const createdForm = await createGoogleForm(aiResponse);

      if (createdForm?.formId) {
        console.log("Form Id is...", createdForm.formId);
        const updatedForm = await sendBatchUpdateToGoogleForm(aiResponse, createdForm.formId);
        console.log("Form updated successfully:", updatedForm);
      } else {
        throw new Error("Created Form is missing formId");
      }
    } catch (error) {
      console.error("Error creating form:", error);
      setError(error as string);
    } finally {
      setIsProcessing(false);
    }
  };

  if (error) {
    return <div>An Arror Occured</div>;
  }

  return (
    <section className="w-screen h-screen">
      <Sidebar />
      <div className="flex flex-col justify-center items-center h-full">
        <h1 className="text-[44px] font-bold text-gray-200">What form would you like to create?</h1>
        <p className="text-gray-400 text-lg mb-5">Describe your form in natural language, and we'll create it for you instantly</p>
        <PromptInput onSubmit={handleFormSubmit} isLoading={isProcessing} />
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
