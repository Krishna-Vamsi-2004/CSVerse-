// test_gemini.js
// Run this file with: node test_gemini.js
// Make sure VITE_GEMINI_API_KEY is set in your .env.local file
// For Node.js, you may need to use dotenv: npm install dotenv
// Then add at top: import 'dotenv/config'

import { GoogleGenerativeAI } from "@google/generative-ai";

// Read API key from environment variable
const apiKey = process.env.VITE_GEMINI_API_KEY;

if (!apiKey) {
  console.error("Error: VITE_GEMINI_API_KEY environment variable is not set");
  console.log("Please set it in your .env.local file");
  process.exit(1);
}

const genAI = new GoogleGenerativeAI(apiKey);

async function test() {
  const models = ["gemini-2.5-flash", "gemini-2.0-flash", "gemini-3.5-flash"];
  for (const m of models) {
    try {
      console.log(`Testing model: ${m}`);
      const model = genAI.getGenerativeModel({ model: m });
      const result = await model.generateContent("Hello, respond with 'success'.");
      const response = await result.response;
      console.log(`Success with ${m}:`, response.text());
      return;
    } catch (e) {
      console.error(`Error with ${m}:`, e.message);
    }
  }
}

test();
