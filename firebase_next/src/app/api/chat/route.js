import { GoogleGenerativeAI } from "@google/generative-ai";//This line imports the GoogleGenerativeAI class from the official Google Generative AI Node.js SDK. This class is the primary entry point for interacting with the Gemini models.
import { NextResponse } from "next/server";

export async function POST(request) {// This function, POST, is an asynchronous handler that will be executed whenever a POST request is sent to the /api/chat endpoint. 
    try { //setup a try catch block
        const { prompt } = await request.json(); //This line reads the body of the incoming POST request. request.json() is an asynchronous method that parses the JSON payload from the request body and returns a JavaScript object. We use destructuring ({ prompt }) to extract the prompt property from that object, which should contain the user's message.

        if (!prompt) { //This is an input validation step. It checks if the prompt variable is empty or null.
            return NextResponse.json({ message: 'Prompt is required' }, { status: 400 })
        }

        const genAI = new GoogleGenerativeAI(process.env.NEXT_PUBLIC_GEMINI_API_KEY); //This line creates a new instance of the GoogleGenerativeAI class. You pass your API key as an argument, which is retrieved from your environment variables using process.env.NEXT_PUBLIC_GEMINI_API_KEY.
        const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" }); //This line gets an instance of the specific model you want to use. We are calling the getGenerativeModel method and specifying the model name "gemini-2.0-flash". You will find the model name here. This tells the SDK which version of the Gemini model to communicate with.

        const result = await model.generateContent(prompt); //the request is sent to the Gemini API. The generateContent method takes the user's prompt as input and asynchronously sends it to the Gemini model to generate a response.
        const response = await result.response; //After the model generates a response, this line extracts the content from the result object.
        const text = response.text(); //This line gets the text content from the response object. The text() method converts the model's output into a simple string.

        return NextResponse.json({ text }, { status: 200 });
    } catch (error) {
        console.error('Error generating content:', error);
        return NextResponse.json({ message: 'Internal Server Error' }, { status: 500 });
    }
}