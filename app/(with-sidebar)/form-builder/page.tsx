"use client";
import Sidebar from "@/components/sidebar";
import React, { useState } from "react";
import { PromptInput } from "./_components/PromptInput";
import { useFetch } from "@/app/lib/hooks/useFetch";
import { createFormUsingGroq } from "@/app/lib/groq/groqClient";
import { validateFormResponse, FormGeneratorResponse } from "@/app/lib/types/response";
import { IForm } from "@/app/lib/types/form";
import { FormPreview } from "./_components/formPreview";
import Loader from "./_components/Loader";
import { useAuth } from "@/app/context/AuthContext";

// const suggestions = [
//   {
//     id: 1,
//     title: "Contact Form",
//     defaultPrompt: "Create a contact form with fields for name, email, message",
//   },
//   {
//     id: 2,
//     title: "Feedback Form",
//     defaultPrompt: "Create a feedback form with fields for name, email, message",
//   },
//   {
//     id: 3,
//     title: "Job Application Form",
//     defaultPrompt: "Create a job application form with fields for name, email, phone, resume",
//   },
//   {
//     id: 4,
//     title: "Survey Form",

//   },
//   {
//     id: 5,
//     title: "Order Form",
//   },
//   {
//     id: 6,
//     title: "Registration Form",
//   },
//   {
//     id: 7,
//     title: "Lead Generation Form",
//   },
//   {
//     id: 8,
//     title: "Payment Form",
//   },
// ];

const suggestions = [
  {
    id: 1,
    title: "Contact Form",
    defaultPrompt: "Create a contact form with fields for name, email, phone number, and message. ",
  },
  {
    id: 2,
    title: "Feedback Form",
    defaultPrompt: "Create a feedback form that collects customer satisfaction ratings and comments about ",
  },
  {
    id: 3,
    title: "Job Application Form",
    defaultPrompt: "Create a job application form for the position of ",
  },
  {
    id: 4,
    title: "Survey Form",
    defaultPrompt: "Create a survey form to gather information about ",
  },
  {
    id: 5,
    title: "Order Form",
    defaultPrompt: "Create an order form for customers to purchase ",
  },
  {
    id: 6,
    title: "Registration Form",
    defaultPrompt: "Create a registration form for ",
  },
  {
    id: 7,
    title: "Lead Generation Form",
    defaultPrompt: "Create a lead generation form to collect information from potential customers interested in ",
  },
  {
    id: 8,
    title: "Payment Form",
    defaultPrompt: "Create a payment form that collects billing information for ",
  },
];

const FormBuilder = () => {
  const [isProcessing, setIsProcessing] = useState(false);
  const [formLinks, setFormLinks] = useState<{ editLink: string; viewLink: string } | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [currentPrompt, setCurrentPrompt] = useState<string>("");
  const { fetchData } = useFetch();

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
      return (await fetchData("https://forms.googleapis.com/v1/forms", {
        method: "POST",
        requireAuth: true,
        body: JSON.stringify({
          info: {
            title: formData?.initialForm?.info.title,
          },
        }),
      })) as IForm;
    } catch (error) {
      console.error("Error creating Resume...", error);
      setError(error as string);
      return null;
    }
  };

  const sendBatchUpdateToGoogleForm = async (FormData: FormGeneratorResponse, formId: string) => {
    try {
      const response = await fetchData(`https://forms.googleapis.com/v1/forms/${formId}:batchUpdate`, {
        method: "POST",
        requireAuth: true,
        body: JSON.stringify({
          includeFormInResponse: true,
          requests: FormData.batchUpdate.requests,
        }),
      });
      if ((response as any)?.form?.formId) {
        const formId = (response as any).form.formId;
        setFormLinks({
          editLink: `https://docs.google.com/forms/d/${formId}/edit`,
          viewLink: (response as any).form.responderUri || `https://docs.google.com/forms/d/e/${formId}/viewform`,
        });
      }
      return response;
    } catch (error) {
      setError(error as string);
      console.error("Error Batch Updating Form...", error);
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
        console.log((updatedForm as any)?.form?.formId);
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

  const handleSuggestionClick = (suggestion: (typeof suggestions)[0]) => {
    setCurrentPrompt(suggestion.defaultPrompt);
  };

  if (isProcessing) {
    return <Loader />;
  }

  return (
    <section className="max-h-screen overflow-y-auto h-full">
      {formLinks ? (
        <div className="flex items-center justify-center p-10">
          <FormPreview editLink={formLinks.editLink} viewLink={formLinks.viewLink} onNewChat={() => setFormLinks(null)} />
        </div>
      ) : (
        <div className="flex flex-col justify-center items-center h-full">
          <h1 className="text-[44px] font-bold text-gray-200">What form would you like to create?</h1>
          <p className="text-gray-400 text-lg mb-5">Describe your form in natural language, and we'll create it for you instantly</p>
          <PromptInput onSubmit={handleFormSubmit} isLoading={isProcessing} error={error} value={currentPrompt} onChange={setCurrentPrompt} />
          <div className="flex max-w-2xl mt-16 flex-wrap justify-center gap-3 items-center">
            {suggestions.map((suggestion) => (
              <button key={suggestion.id} className="text-gray-300 text-[10px] border-purple-400 hover:bg-gray-800 hover:scale-110 transition-all rounded-3xl bg-transparent border py-1 px-2" onClick={() => handleSuggestionClick(suggestion)}>
                {suggestion.title}
              </button>
            ))}
          </div>
        </div>
      )}
    </section>
  );
};

export default FormBuilder;
