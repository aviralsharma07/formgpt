import Groq from "groq-sdk";
import { getPrompt } from "./prompt";

const apiKey = process.env.NEXT_PUBLIC_GROQ_API_KEY;
const groq = new Groq({ apiKey, dangerouslyAllowBrowser: true });

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
