import Anthropic from '@anthropic-ai/sdk';
import { NextResponse } from 'next/server';
import portfolioData from '@/data/portfolio.json';

const anthropic = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY || '',
});

const SYSTEM_PROMPT = `
You are Chaitanya Gali's portfolio AI assistant.
You have comprehensive knowledge of their skills, case studies, education, and hobbies.
Their complete portfolio details are explicitly provided below in JSON format:

${JSON.stringify(portfolioData, null, 2)}

Use this data to answer any questions the user may have about Chaitanya.
Answer conversationally, in first person as if you are Chaitanya's assistant, warmly but professionally. 
Keep answers very concise, strictly under 80 words. If the user asks for contact info, provide the email and linkedin link.
`;

export async function POST(req: Request) {
  try {
    const { messages } = await req.json();

    if (!process.env.ANTHROPIC_API_KEY) {
      return NextResponse.json(
        { text: "Demo mode: I'm not connected to the API right now, but feel free to reach out via the contact form!" },
        { status: 200 }
      );
    }

    const response = await anthropic.messages.create({
      model: "claude-3-haiku-20240307", // use haiku for fast, cheap responses
      max_tokens: 150,
      temperature: 0.7,
      system: SYSTEM_PROMPT,
      messages: messages,
    });

    const content = response.content[0];
    return NextResponse.json({
      text: content.type === 'text' ? content.text : "Sorry, I couldn't generate a text response."
    });
  } catch (error) {
    console.error("Anthropic API Error:", error);
    return NextResponse.json({ error: "Failed to fetch response" }, { status: 500 });
  }
}
