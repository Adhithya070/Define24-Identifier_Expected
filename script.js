import { GoogleGenerativeAI } from "@google/generative-ai";

const API_KEY = "AIzaSyDL4ZpKf9FEitEUgZ1RxTlfdlTV-8kfv2E";
const genAI = new GoogleGenerativeAI(API_KEY);

async function run() {
  const model = genAI.getGenerativeModel({ model: "gemini-pro" });

  const prompt = "Write a story about a magic backpack.";

  const result = await model.generateContent(prompt);
  const response = await result.response;
  const text = response.text();
  console.log(text);
}

run();
