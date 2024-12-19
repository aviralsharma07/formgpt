"use client";
import { useState } from "react";
import { useAuth } from "./context/AuthContext";
import { getGroqChatCompletion } from "./lib/groq/groqClient";
import { validateFormResponse } from "./lib/types/response";

export default function Home() {
  const { signInWithGoogle, loading, user } = useAuth();
  const [chatRes, setChatRes] = useState<string | null>(null);

  const checkGroq = async () => {
    const chatCompletion = await getGroqChatCompletion();
    console.log(chatCompletion.choices[0]?.message?.content || "");
    setChatRes(chatCompletion.choices[0]?.message?.content || "");
    if (chatCompletion.choices[0]?.message?.content) {
      const isValid = validateFormResponse(JSON.parse(chatCompletion.choices[0]?.message?.content));
      console.log("isValid", isValid);
    }
  };

  return (
    <div>
      <button onClick={signInWithGoogle} className="bg-white text-gray-800 px-8 py-3 rounded-2xl">
        LogIn with Google
      </button>
      <button onClick={checkGroq} className="text-white bg-gradient-to-tr from-red-500 to-yellow-400 px-5 py-2">
        Use Groq
      </button>
      <p className="text-white">{chatRes ? chatRes : "No response  yet"}</p>
    </div>
  );
}
