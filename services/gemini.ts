import { GoogleGenAI } from "@google/genai";

const apiKey = process.env.API_KEY;
const ai = apiKey ? new GoogleGenAI({ apiKey }) : null;

export const getProjectAssistantResponse = async (query: string, projectContext: string) => {
  if (!ai) return "AI assistant is not configured. Add GEMINI_API_KEY to enable.";
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: `Context: You are the JetFuel AI assistant. You help clients understand their project status and digital strategy.
      Project Details: ${projectContext}
      User Question: ${query}`,
      config: {
        systemInstruction: "Be professional, concise, and bold. Align with the JetFuel brand identity: elite, high-performance, and futuristic. Use the brand voice of a high-speed technological partner.",
        temperature: 0.7,
      },
    });
    // Fixed: response.text is a property, not a method
    return response.text;
  } catch (error) {
    console.error("AI Assistant Error:", error);
    return "I'm having trouble connecting to the neural link. Please try again shortly.";
  }
};