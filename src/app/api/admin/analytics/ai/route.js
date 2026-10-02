// // app/api/admin/analytics/ai/route.js
// import { NextResponse } from "next/server";

// async function fetchRawPlatformData() {
//   return {
//     period: "Last 30 Days",
//     totalUsers: {
//       readers: 12450,
//       writers: 820,
//       admin: 5,
//       newReadersThisMonth: 1420,
//       newWritersThisMonth: 68,
//     },
//     publishingStats: {
//       totalEbooks: 3450,
//       publishedThisMonth: 185,
//       topGenres: [
//         { genre: "Fantasy", count: 1200 },
//         { genre: "Sci-Fi", count: 850 },
//         { genre: "Romance", count: 640 },
//         { genre: "Non-Fiction", count: 410 },
//       ],
//       pendingReview: 14,
//     },
//     engagementAndSales: {
//       activeMonthlyReaders: 8900,
//       totalPurchasesCount: 4120,
//       grossRevenueUSD: 28840.5,
//       avgReadingHoursPerUser: 14.2,
//       completionRatePercent: 68.5,
//     },
//   };
// }

// // 2. OpenAI / Gemini Prompt Execution
// async function generateAIInsights(rawMetrics) {
//   const apiKey = process.env.OPENAI_API_KEY;
//   if (!apiKey) {
//     // Fallback static mock AI response if API key is missing
//     return getFallbackInsights(rawMetrics);
//   }

//   const systemPrompt = `You are an expert platform analytics engine for Fable Book House, a full-stack ebook platform.
// Your task is to analyze the provided JSON platform activity metrics and output a strictly valid JSON response with strategic insights.

// Return JSON matching this schema ONLY:
// {
//   "healthScore": number (0-100),
//   "summary": "string (2 sentences overview)",
//   "highlights": [
//     { "title": "string", "description": "string", "type": "positive" | "warning" | "neutral" }
//   ],
//   "readerWriterBalance": {
//     "ratio": "string",
//     "status": "Healthy" | "Attention Needed" | "Critical",
//     "observation": "string"
//   },
//   "actionableRecommendations": [
//     { "action": "string", "impact": "High" | "Medium" | "Low", "targetRole": "Reader" | "Writer" | "Admin" }
//   ]
// }`;

//   const response = await fetch("https://api.openai.com/v1/chat/completions", {
//     method: "POST",
//     headers: {
//       "Content-Type": "application/json",
//       Authorization: `Bearer ${apiKey}`,
//     },
//     body: JSON.stringify({
//       model: "gpt-4o-mini",
//       response_format: { type: "json_object" },
//       messages: [
//         { role: "system", content: systemPrompt },
//         { role: "user", content: JSON.stringify(rawMetrics) },
//       ],
//       temperature: 0.3,
//     }),
//   });

//   const data = await response.json();
//   return JSON.parse(data.choices[0].message.content);
// }

// export async function GET() {
//   try {
//     const rawMetrics = await fetchRawPlatformData();
//     const aiInsights = await generateAIInsights(rawMetrics);

//     return NextResponse.json({
//       success: true,
//       timestamp: new Date().toISOString(),
//       rawMetrics,
//       aiInsights,
//     });
//   } catch (error) {
//     console.error("Error generating AI analytics:", error);
//     return NextResponse.json(
//       { success: false, error: "Failed to generate AI analytics." },
//       { status: 500 }
//     );
//   }
// }

// // Static fallback to prevent UI crash when API key is unconfigured
// function getFallbackInsights(metrics) {
//   return {
//     healthScore: 88,
//     summary:
//       "Fable Book House shows strong monthly user growth driven by high Fantasy and Sci-Fi demand. Writer retention is solid, but pending reviews require attention.",
//     highlights: [
//       {
//         title: "Strong Reader Acquisition",
//         description: `Added ${metrics.totalUsers.newReadersThisMonth} new readers this month, up 12% from last cycle.`,
//         type: "positive",
//       },
//       {
//         title: "Publishing Bottleneck",
//         description: `${metrics.publishingStats.pendingReview} ebooks are currently awaiting review approval in the queue.`,
//         type: "warning",
//       },
//     ],
//     readerWriterBalance: {
//       ratio: "15:1 Reader-to-Writer Ratio",
//       status: "Healthy",
//       observation:
//         "The current platform supply matches incoming reader demand adequately.",
//     },
//     actionableRecommendations: [
//       {
//         action: "Clear the 14 pending ebook reviews to reduce writer publish times.",
//         impact: "High",
//         targetRole: "Admin",
//       },
//       {
//         action: "Launch a Fantasy writing contest to capitalize on high reader genre demand.",
//         impact: "Medium",
//         targetRole: "Writer",
//       },
//     ],
//   };
// }


import { NextResponse } from "next/server";
import { GoogleGenAI, Type } from "@google/genai";

async function fetchRawPlatformData() {
  return {
    period: "Last 30 Days",
    totalUsers: {
      readers: 12450,
      writers: 820,
      admin: 5,
      newReadersThisMonth: 1420,
      newWritersThisMonth: 68,
    },
    publishingStats: {
      totalEbooks: 3450,
      publishedThisMonth: 185,
      topGenres: [
        { genre: "Fantasy", count: 1200 },
        { genre: "Sci-Fi", count: 850 },
        { genre: "Romance", count: 640 },
        { genre: "Non-Fiction", count: 410 },
      ],
      pendingReview: 14,
    },
    engagementAndSales: {
      activeMonthlyReaders: 8900,
      totalPurchasesCount: 4120,
      grossRevenueUSD: 28840.5,
      avgReadingHoursPerUser: 14.2,
      completionRatePercent: 68.5,
    },
  };
}

async function generateAIInsights(rawMetrics) {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) return getFallbackInsights(rawMetrics);

  const ai = new GoogleGenAI({ apiKey });

  const systemPrompt = `You are an analytics engine for Fable Book House. 
Analyze platform metrics and produce actionable strategic insights adhering strictly to the JSON schema.`;

  const responseSchema = {
    type: Type.OBJECT,
    properties: {
      healthScore: { type: Type.INTEGER, description: "Health score between 0 and 100" },
      summary: { type: Type.STRING, description: "Brief executive summary" },
      highlights: {
        type: Type.ARRAY,
        items: {
          type: Type.OBJECT,
          properties: {
            title: { type: Type.STRING },
            description: { type: Type.STRING },
            type: { type: Type.STRING, enum: ["positive", "warning", "neutral"] },
          },
          required: ["title", "description", "type"],
        },
      },
      readerWriterBalance: {
        type: Type.OBJECT,
        properties: {
          ratio: { type: Type.STRING },
          status: { type: Type.STRING, enum: ["Healthy", "Attention Needed", "Critical"] },
          observation: { type: Type.STRING },
        },
        required: ["ratio", "status", "observation"],
      },
      actionableRecommendations: {
        type: Type.ARRAY,
        items: {
          type: Type.OBJECT,
          properties: {
            action: { type: Type.STRING },
            impact: { type: Type.STRING, enum: ["High", "Medium", "Low"] },
            targetRole: { type: Type.STRING, enum: ["Reader", "Writer", "Admin"] },
          },
          required: ["action", "impact", "targetRole"],
        },
      },
    },
    required: [
      "healthScore",
      "summary",
      "highlights",
      "readerWriterBalance",
      "actionableRecommendations",
    ],
  };

  try {
    const response = await ai.models.generateContent({
      model: "gemini-2.0-flash",
      contents: JSON.stringify(rawMetrics),
      config: {
        systemInstruction: systemPrompt,
        responseMimeType: "application/json",
        responseSchema: responseSchema,
        temperature: 0.2,
      },
    });

    return JSON.parse(response.text);
  } catch (err) {
    console.error("Gemini Execution Error:", err);
    return getFallbackInsights(rawMetrics);
  }
}

export async function GET() {
  try {
    const rawMetrics = await fetchRawPlatformData();
    const aiInsights = await generateAIInsights(rawMetrics);

    return NextResponse.json({
      success: true,
      timestamp: new Date().toISOString(),
      rawMetrics,
      aiInsights,
    });
  } catch (error) {
    console.error("Error generating AI analytics:", error);
    return NextResponse.json(
      { success: false, error: "Failed to generate AI analytics." },
      { status: 500 }
    );
  }
}

function getFallbackInsights(metrics) {
  return {
    healthScore: 88,
    summary:
      "Fable Book House shows strong reader engagement and healthy revenue growth. Queue backlogs require administrative action.",
    highlights: [
      {
        title: "Strong Reader Growth",
        description: `Acquired ${metrics.totalUsers.newReadersThisMonth} new readers this month.`,
        type: "positive",
      },
      {
        title: "Review Bottleneck",
        description: `${metrics.publishingStats.pendingReview} ebooks pending review approval.`,
        type: "warning",
      },
    ],
    readerWriterBalance: {
      ratio: "15:1 Reader-to-Writer Ratio",
      status: "Healthy",
      observation: "Catalog growth matches active audience engagement.",
    },
    actionableRecommendations: [
      {
        action: "Clear pending review queue to decrease publisher wait times.",
        impact: "High",
        targetRole: "Admin",
      },
    ],
  };
}






