import { GoogleGenAI } from "@google/genai";

// Assume process.env.API_KEY is configured in the environment
const API_KEY = process.env.API_KEY;

if (!API_KEY) {
  // In a real app, you might want to handle this more gracefully.
  console.error("Gemini API key not found. Please set the API_KEY environment variable.");
}

const ai = new GoogleGenAI({ apiKey: API_KEY! });

export const analyzeDataWithGemini = async (data: any, userQuestion: string): Promise<string> => {
  if (!API_KEY) {
    return "Error: Gemini API key is not configured.";
  }
  
  const model = "gemini-2.5-flash";

  const prompt = `
    You are Tony's expert data analyst. Your task is to analyze Tony's business data and answer his question.
    Provide a concise, easy-to-understand summary for Tony. Use bullet points to highlight key trends or insights.
    The data represents Tony's business performance metrics. 'monthlyData' shows his revenue, expenses, and profit over time. 'categoryData' shows his sales distribution by product category.

    JSON Data:
    ${JSON.stringify(data, null, 2)}

    Tony's Question:
    "${userQuestion}"

    Your Analysis for Tony:
  `;

  try {
    const response = await ai.models.generateContent({
      model: model,
      contents: prompt,
    });
    return response.text;
  } catch (error) {
    console.error("Error calling Gemini API:", error);
    return "Sorry, I was unable to analyze the data. There might be an issue with the connection to the AI service.";
  }
};
