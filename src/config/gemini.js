import { GoogleGenerativeAI } from "@google/generative-ai";

// Directly paste API key (⚠ Not secure, but works for testing)
const genAI = new GoogleGenerativeAI("AIzaSyCS1E1ZqWcDdgel04Vfb8I7ufKECnCHZZU");

// Example: Generate text
export async function runGemini(prompt) {
  const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });


  const result = await model.generateContent(prompt);
  const responseText = result.response.text();
  console.log("Response:", responseText);
  
  return responseText;
}

export default runGemini;

