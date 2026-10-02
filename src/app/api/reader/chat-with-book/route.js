import { NextResponse } from "next/server";
import { GoogleGenAI } from "@google/genai";
import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth";

// Initialize Gemini Client using environment variable
const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
});

export async function POST(req) {
  try {
    // 1. Authenticate Reader Role
    const session = await getServerSession(authOptions);
    if (!session || session?.user?.role !== "READER") {
      return NextResponse.json({ error: "Unauthorized access" }, { status: 401 });
    }

    const { ebookId, question, chatHistory, selectedText, currentChapter } = await req.json();

    if (!ebookId || !question) {
      return NextResponse.json(
        { error: "eBook ID and question are required." },
        { status: 400 }
      );
    }

    // 2. Fetch authentic eBook metadata AND chapter content groundings from Prisma
    const ebook = await prisma.ebook.findUnique({
      where: { id: ebookId },
      include: {
        chapters: {
          where: currentChapter ? { title: currentChapter } : undefined,
          take: 1,
          select: { title: true, content: true },
        },
      },
    });

    if (!ebook) {
      return NextResponse.json({ error: "eBook not found." }, { status: 404 });
    }

    // Extract real text from chapter if found
    const chapterText = ebook.chapters?.[0]?.content || "Full chapter text not pre-loaded.";

    // 3. Convert UI history format to standard Gemini API SDK format
    const formattedHistory = (chatHistory || []).map((msg) => ({
      role: msg.sender === "user" ? "user" : "model",
      parts: [{ text: msg.text }],
    }));

    // 4. Initialize Gemini Chat Session
    const chat = ai.chats.create({
      model: "gemini-2.5-flash",
      history: formattedHistory,
      config: {
        systemInstruction: `You are "Fable Companion", the dedicated AI reader assistant for Fable Book House.
You have access to the actual content of the book "${ebook.title}" by ${ebook.authorName}.

STRICT GUIDELINES:
1. Ground your answers directly in the provided chapter text and book context.
2. If the user provided a highlighted passage, center your explanation or analysis on that text.
3. Keep your tone analytical, engaging, and clear. Avoid major unprompted plot spoilers beyond the reader's current chapter.`,
        temperature: 0.3,
      },
    });

    // 5. Construct the contextual prompt payload
    const contextualPrompt = `
=== BOOK GROUNDING CONTEXT ===
Title: ${ebook.title}
Author: ${ebook.authorName}
Genre: ${ebook.genre}
Current Chapter: ${currentChapter || "General Context"}

=== CHAPTER EXCERPT / TEXT ===
${chapterText.slice(0, 4000)}

=== USER HIGHLIGHTED PASSAGE ===
${selectedText ? `"${selectedText}"` : "None"}

=== READER'S QUESTION ===
${question}
`;

    // 6. Stream response back via Server-Sent Events (SSE)
    const responseStream = await chat.sendMessageStream({
      message: contextualPrompt,
    });

    const encoder = new TextEncoder();
    const stream = new ReadableStream({
      async start(controller) {
        try {
          for await (const chunk of responseStream) {
            if (chunk.text) {
              controller.enqueue(encoder.encode(chunk.text));
            }
          }
        } catch (err) {
          controller.error(err);
        } finally {
          controller.close();
        }
      },
    });

    return new Response(stream, {
      headers: {
        "Content-Type": "text/event-stream",
        "Cache-Control": "no-cache",
        Connection: "keep-alive",
      },
    });
  } catch (err) {
    console.error("AI Chat API Error:", err);
    return NextResponse.json(
      { error: "Failed to generate AI response." },
      { status: 500 }
    );
  }
}