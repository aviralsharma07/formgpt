"use client";
import Sidebar from "@/components/sidebar";
import React, { useState } from "react";
import { PromptInput } from "./_components/PromptInput";
import { useFetch } from "../lib/hooks/useFetch";
import { createFormUsingGroq } from "../lib/groq/groqClient";
import { FormGeneratorResponse, validateFormResponse } from "../lib/types/response";
import { IForm } from "../lib/types/form";
import { FormPreview } from "./_components/formPreview";
import Loader from "./_components/Loader";
import { useAuth } from "../context/AuthContext";

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
  const [formLinks, setFormLinks] = useState<{ editLink: string; viewLink: string } | null>(null);
  const [error, setError] = useState<string | null>(null);
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

  if (isProcessing) {
    return <Loader />;
  }

  return (
    <section className="w-screen h-screen">
      <Sidebar />
      {formLinks ? (
        <div className="flex items-center justify-center p-10">
          <FormPreview editLink={formLinks.editLink} viewLink={formLinks.viewLink} onNewChat={() => setFormLinks(null)} />
        </div>
      ) : (
        <div className="flex flex-col justify-center items-center h-full">
          <h1 className="text-[44px] font-bold text-gray-200">What form would you like to create?</h1>
          <p className="text-gray-400 text-lg mb-5">Describe your form in natural language, and we'll create it for you instantly</p>
          <PromptInput onSubmit={handleFormSubmit} isLoading={isProcessing} error={error} />
          <div className="flex max-w-2xl mt-16 flex-wrap justify-center gap-3 items-center">
            {suggestions.map((suggestion) => (
              <button key={suggestion.id} className="text-gray-300 text-[10px] border-purple-400 hover:bg-gray-800 hover:scale-110 transition-all rounded-3xl bg-transparent border py-1 px-2">
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

// {
//   "form": {
//     "formId": "1OyzwPTVkznWE9H8Ub3EFzYRTAJySYeWeYl-fqai-Xg4",
//     "info": {
//       "title": "User Goals and Dreams",
//       "documentTitle": "Untitled form"
//     },
//     "settings": {},
//     "revisionId": "00000004",
//     "responderUri": "https://docs.google.com/forms/d/e/1FAIpQLSepoei9Mt2hIJcu6t-M-6SEl1vYqYTu0ObigxY2rDgs1Iel-g/viewform",
//     "items": [
//       {
//         "itemId": "3de8735c",
//         "title": "What are your short-term goals?",
//         "questionItem": {
//           "question": {
//             "questionId": "60f3953a",
//             "required": true,
//             "textQuestion": {}
//           }
//         }
//       },
//       {
//         "itemId": "5693e3d1",
//         "title": "What motivates you to achieve your goals?",
//         "questionItem": {
//           "question": {
//             "questionId": "0e027454",
//             "required": true,
//             "textQuestion": {
//               "paragraph": true
//             }
//           }
//         }
//       },
//       {
//         "itemId": "157ec9e2",
//         "title": "What are your greatest strengths?",
//         "questionItem": {
//           "question": {
//             "questionId": "0088a52c",
//             "required": true,
//             "textQuestion": {
//               "paragraph": true
//             }
//           }
//         }
//       },
//       {
//         "itemId": "5ce61712",
//         "title": "What are your greatest fears?",
//         "questionItem": {
//           "question": {
//             "questionId": "00ca342a",
//             "required": true,
//             "textQuestion": {
//               "paragraph": true
//             }
//           }
//         }
//       },
//       {
//         "itemId": "3d9c0f25",
//         "title": "What are your long-term goals?",
//         "questionItem": {
//           "question": {
//             "questionId": "275a6f2c",
//             "required": true,
//             "textQuestion": {
//               "paragraph": true
//             }
//           }
//         }
//       }
//     ]
//   },
//   "replies": [
//     {
//       "createItem": {
//         "itemId": "3de8735c",
//         "questionId": [
//           "60f3953a"
//         ]
//       }
//     },
//     {
//       "createItem": {
//         "itemId": "5693e3d1",
//         "questionId": [
//           "0e027454"
//         ]
//       }
//     },
//     {
//       "createItem": {
//         "itemId": "157ec9e2",
//         "questionId": [
//           "0088a52c"
//         ]
//       }
//     },
//     {
//       "createItem": {
//         "itemId": "5ce61712",
//         "questionId": [
//           "00ca342a"
//         ]
//       }
//     },
//     {
//       "createItem": {
//         "itemId": "3d9c0f25",
//         "questionId": [
//           "275a6f2c"
//         ]
//       }
//     }
//   ],
//   "writeControl": {
//     "requiredRevisionId": "00000004"
//   }
// }
