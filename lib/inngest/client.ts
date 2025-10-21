import { Inngest} from "inngest";

export const inngest = new Inngest({
    id: 'quantum-shares',
    ai: { gemini: { apiKey: process.env.GEMINI_API_KEY! }}
})

// This code initializes an Inngest client configured to use Google Gemini AI, setting up the app to trigger 
// events and workflows within Inngest, call the Gemini AI model programmatically using the provided API key, 
// and serve as an orchestrator for serverless or event-driven logic with seamless AI integration - all without 
// building a full backend infrastructure.
