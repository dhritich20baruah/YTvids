import {GoogleGenerativeAI} from "@google/generative-ai";
import {NextResponse} from "next/server";

export async function POST(request){
    try {
        const {prompt} = await request.json();

        if(!prompt){
            return NextResponse.json({ message: 'Prompt is required'}, {status: 400})
        }

        const genAI = new GoogleGenerativeAI(process.env.NEXT_PUBLIC_GEMINI_API_KEY);
        const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash"});

        const result = await model.generateContent(prompt);
        const response = await result.response;
        const text = response.text();

        return NextResponse.json({text}, {status: 200});
    } catch (error) {
        console.error("Error generating content:", error);
        return NextResponse.json({message: "Internal server error"}, {status: 500});
    }
}