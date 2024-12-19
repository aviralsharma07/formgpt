import Groq from "groq-sdk";
import { getPrompt, prompt } from "./prompt";

const apiKey = process.env.NEXT_PUBLIC_GROQ_API_KEY;
const groq = new Groq({ apiKey, dangerouslyAllowBrowser: true });

export async function main() {
  const chatCompletion = await getGroqChatCompletion();
  // Print the completion returned by the LLM.
  console.log(chatCompletion.choices[0]?.message?.content || "");
}

export async function getGroqChatCompletion() {
  return groq.chat.completions.create({
    messages: [
      {
        role: "user",
        content: prompt,
      },
    ],
    model: "llama3-8b-8192",
    response_format: {
      type: "json_object",
    },
  });
}

export async function createFormUsingGroq(userPrompt: string) {
  return groq.chat.completions.create({
    messages: [
      {
        role: "user",
        content: getPrompt(userPrompt),
      },
    ],
    model: "llama3-8b-8192",
    response_format: {
      type: "json_object",
    },
  });
}
