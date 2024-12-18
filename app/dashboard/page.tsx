"use client";
import { createClient } from "@/utils/supabase/client";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useFetch } from "../lib/hooks/useFetch";
const Dashboard = () => {
  const { signOut, googleAccessToken, user } = useAuth();

  const { data, error, loading, fetchData } = useFetch();

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

  console.log("Data Fetched", data);
  console.log("Error", error);

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
    </div>
  );
};

export default Dashboard;
