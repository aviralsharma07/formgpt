"use client";
import { createClient } from "@/utils/supabase/client";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useFetch } from "../lib/hooks/useFetch";

const Dashboard = () => {
  const { signOut, googleAccessToken, user } = useAuth();

  const { data, error, loading, fetchData } = useFetch();
  console.log(data);
  console.log("Fetched Form", (data as any)?.info?.title);

  const form = {
    info: {
      title: "Test Form: Checking documentTitle",
      documentTitle: "Document Title Form",
    },
  };

  const handleCreateForm = async () => {
    fetchData("https://forms.googleapis.com/v1/forms", {
      method: "POST",
      requireAuth: true,
      body: JSON.stringify(form),
    });
  };

  const formId = "1NCqb-7TOvL3qRaV_1x7-Y9P_XJD_RB-PUnn-bm4LF9U";

  const handleGetForm = async () => {
    fetchData(`https://forms.googleapis.com/v1/forms/${formId}`, {
      method: "GET",
      requireAuth: true,
    });
  };

  const handleUpdateForm = async () => {
    fetchData(`https://forms.googleapis.com/v1/forms/${formId}:batchUpdate`, {
      method: "POST",
      requireAuth: true,
      body: JSON.stringify({
        includeFormInResponse: true,
        requests: [
          {
            updateFormInfo: {
              info: {
                title: "Updated Form Title Again",
                description: "Testing writing and updating form description",
              },
              updateMask: "title,description",
            },
          },
          {
            createItem: {
              item: {
                title: "What is your favorite color?",
                questionItem: {
                  question: {
                    required: true,
                    textQuestion: {
                      paragraph: true,
                    },
                  },
                },
              },
              location: {
                index: 0, // Position in the form where the question will be added
              },
            },
          },
        ],
      }),
    });
  };

  return (
    <div>
      <h1 className="text-4xl text-white">Dashboard</h1>
      <p className="text-white"></p>
      <p className="text-white">Access Token: {googleAccessToken}</p>
      <button className="py-3 px-8 text-gray-800 bg-white rounded-2xl" onClick={signOut}>
        Sign Out
      </button>

      <button onClick={handleCreateForm} className="bg-gradient-to-tr from-blue-400 to-purple-400 text-white px-5 py-3">
        Create Google Form
      </button>
      <button onClick={handleGetForm} className="bg-gradient-to-tr from-green-400 to-gray-400 text-white px-5 py-3">
        GET FORM
      </button>
      <button onClick={handleUpdateForm} className="bg-gradient-to-tr from-red-400 to-yellow-400 text-white px-5 py-3">
        Update FORM
      </button>
    </div>
  );
};

export default Dashboard;
