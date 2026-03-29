import Anthropic from "@anthropic-ai/sdk";
import { NextRequest, NextResponse } from "next/server";

const anthropic = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY! });

export async function POST(req: NextRequest) {
  const { image } = await req.json();

  if (!image) {
    return NextResponse.json({ error: "No image provided" }, { status: 400 });
  }

  const response = await anthropic.messages.create({
    model: "claude-sonnet-4-20250514",
    max_tokens: 1024,
    messages: [
      {
        role: "user",
        content: [
          {
            type: "image",
            source: {
              type: "base64",
              media_type: "image/jpeg",
              data: image.replace(/^data:image\/\w+;base64,/, ""),
            },
          },
          {
            type: "text",
            text: `You are an expert interior designer working for Style Architect, a premium European design platform.

Analyze this room photo and provide a structured assessment. Be specific and observational.

Respond in this exact JSON format:
{
  "room_type": "living room" | "bedroom" | "dining room" | "kitchen" | "study" | "bathroom" | "hallway",
  "style_indicators": ["list of current style elements you observe"],
  "lighting": "description of lighting conditions",
  "color_palette": ["dominant colors in the space"],
  "proportions": "description of room proportions and scale",
  "existing_furniture": ["list of furniture/items already present"],
  "mood": "overall mood/atmosphere of the space",
  "summary": "A warm, conversational 2-3 sentence description of what you see, speaking directly to the user. Be specific about what makes this space unique."
}

Return ONLY valid JSON, no markdown.`,
          },
        ],
      },
    ],
  });

  const text =
    response.content[0].type === "text" ? response.content[0].text : "";

  try {
    const analysis = JSON.parse(text);
    return NextResponse.json(analysis);
  } catch {
    return NextResponse.json({ summary: text, raw: true });
  }
}
