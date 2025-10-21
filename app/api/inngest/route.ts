import {serve} from "inngest/next";
//This upper code:-
// Imports the Next.js adapter for Inngest.
// serve() turns a Next.js API route into an endpoint that can receive and process events.
import {inngest} from "@/lib/inngest/client";
// Imports the singleton Inngest client.
// This client is already configured with our project ID and GEMINI API key, so all workflows triggered through
// this route know which account/project to use.
import { sendSignUpEmail } from "@/lib/inngest/functions";
export const { GET, POST, PUT } = serve({
    client: inngest,
    functions: [sendSignUpEmail],
})

// This code sets up a Next.js API route that acts as an entry point for Inngest events and workflows. 
// It connects our Inngest client to our backend so that events can be received and workflows can be triggered.

// serve({ client: inngest, functions: [] }):-
// Initializes a handler for HTTP methods in Next.js.
// client: inngest → uses our Inngest client to process events.
// functions: [] → This is where we would pass our event-driven functions (like "signup,login,summary details").



// export const { GET, POST, PUT } = serve(...)
// Exports HTTP handlers for our Next.js route.
// This allows our route to handle: GET requests,POST requests,PUT requests
// Essentially, it makes our Next.js API route “Inngest-ready,” so external services or frontend code can send 
// events to it.