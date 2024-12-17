"use client";
import { createClient } from "@/utils/supabase/client";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
const Dashboard = () => {
  const { signOut, googleAccessToken, user } = useAuth();
  const [createFormResponse, setCreateFormResponse] = useState(null);
  const [accessToken, setAccessToken] = useState(null);
  console.log("User", user);

  const form = {
    info: {
      title: "Test Form",
    },
  };

  // Create the form
  const createForm = async () => {
    try {
      const response = await fetch("https://forms.googleapis.com/v1/forms", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(form),
      });

      const data = await response.json();
      console.log("Form created:", data);
      setCreateFormResponse(data);
      // Will give you formId, editUrl, and responseUrl
    } catch (error) {
      console.error("Error creating form:", error);
    }
  };

  return (
    <div>
      <h1 className="text-4xl text-white">Dashboard</h1>
      <p className="text-white"></p>
      <p className="text-white">Access Token: {googleAccessToken}</p>
      <button className="py-3 px-8 text-gray-800 bg-white rounded-2xl" onClick={signOut}>
        Sign Out
      </button>

      <button onClick={createForm} className="bg-gradient-to-tr from-blue-400 to-purple-400 text-white px-5 py-3">
        Create Google Form
      </button>
    </div>
  );
};

export default Dashboard;
