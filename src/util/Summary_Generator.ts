// Summary Generator using Google Generative AI

import { GoogleGenerativeAI } from "@google/generative-ai";
import { GoogleGenAI } from "@google/genai";

// Summary Generator
export const symmaryGenerator = async (text: string, apiKey: string) => {
  try {
    const client = new GoogleGenerativeAI(apiKey);
    if (!client) {
      throw new Error("Google Generative AI client not initialized");
    }
    const modelGEMINI = await client.getGenerativeModel({
      model: "gemini-1.5-flash",
    });
    console.log("text will be", text);
    const promt = `Summarize the following text in 3 lines and simple language: ${text}`;
    const result = await modelGEMINI.generateContent(promt);
    // console.log("result the reult will  be the", result);
    const summary = await result.response.text();
    console.log("summary the summary will be", summary);
    return summary;
  } catch (error) {
    console.error("Error generating summary:", error);
    return "Error generating summary";
  }
};
