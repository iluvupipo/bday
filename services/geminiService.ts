import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export const generateBirthdayWish = async (name: string = "My Love"): Promise<string> => {
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: `Write a short, incredibly romantic, and whimsical birthday poem for a girlfriend turning 20. 
      Her name is ${name}. The tone should be magical, aesthetic, and loving. 
      Keep it under 80 words. Don't use markdown formatting, just plain text.`,
    });
    return response.text || "Happy 20th Birthday to the most beautiful soul.";
  } catch (error) {
    console.error("Gemini API Error:", error);
    return "Happy 20th Birthday! May your year be as beautiful as you are.";
  }
};

export const generateYearForecast = async (): Promise<string> => {
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: `Write a fun, positive, and exciting "Year Ahead Forecast" for a girl turning 20. 
      Focus on themes of love, adventure, and success. 2-3 sentences max.`,
    });
    return response.text || "This year brings amazing adventures and endless love!";
  } catch (error) {
    console.error("Gemini API Error:", error);
    return "Your 20s are going to be your best decade yet!";
  }
};