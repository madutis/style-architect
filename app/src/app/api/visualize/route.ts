import { fal } from "@fal-ai/client";
import { NextRequest, NextResponse } from "next/server";

fal.config({ credentials: process.env.FAL_KEY! });

export async function POST(req: NextRequest) {
  const { roomDescription, products, style } = await req.json();

  const productList = products
    ?.map((p: { name: string; brand: string; description: string }) => `${p.brand} ${p.name}: ${p.description}`)
    .join(". ") || "";

  const prompt = `A photorealistic interior photograph of a ${roomDescription || "modern living room"}.
The room features these specific design pieces: ${productList}.
Style: ${style || "Scandinavian modern"}, warm natural lighting, editorial interior photography,
high-end European design magazine quality, shot on medium format camera, soft shadows,
neutral color palette with warm accents. The furniture is arranged naturally in the space
with proper scale and proportions. Clean, minimal, sophisticated.`;

  try {
    const result = await fal.subscribe("fal-ai/flux-pro/v1.1", {
      input: {
        prompt,
        image_size: "landscape_16_9",
        num_images: 1,
        safety_tolerance: "5",
      },
    });

    const imageUrl = (result.data as { images?: { url: string }[] })?.images?.[0]?.url;

    if (!imageUrl) {
      return NextResponse.json(
        { error: "No image generated" },
        { status: 500 }
      );
    }

    return NextResponse.json({ image_url: imageUrl });
  } catch (error) {
    console.error("Visualization error:", error);
    return NextResponse.json(
      { error: "Failed to generate visualization" },
      { status: 500 }
    );
  }
}
