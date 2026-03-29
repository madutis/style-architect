import Anthropic from "@anthropic-ai/sdk";
import { createClient } from "@supabase/supabase-js";
import { NextRequest, NextResponse } from "next/server";

const anthropic = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY! });

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

export async function POST(req: NextRequest) {
  const { roomAnalysis, userMessage, conversationHistory } = await req.json();

  // Fetch all products from DB
  const { data: products } = await supabase
    .from("products")
    .select("id, name, brand, brand_country, category, subcategory, price_eur, styles, materials, design_feel, colors, description");

  if (!products?.length) {
    return NextResponse.json({ error: "No products available" }, { status: 500 });
  }

  const productCatalog = products
    .map(
      (p) =>
        `[${p.id}] ${p.brand} "${p.name}" - €${p.price_eur} | ${p.category}/${p.subcategory} | Styles: ${p.styles.join(", ")} | Materials: ${p.materials.join(", ")} | Feel: ${p.design_feel.join(", ")} | Colors: ${p.colors?.join(", ") || "N/A"} | ${p.description}`
    )
    .join("\n");

  const systemPrompt = `You are the AI Design Assistant for Style Architect, a premium European interior design platform.

You help users find the perfect furniture and decor from our curated catalogue of European design brands.

PRODUCT CATALOGUE:
${productCatalog}

ROOM ANALYSIS:
${JSON.stringify(roomAnalysis, null, 2)}

GUIDELINES:
- Recommend 3-5 products that work together as a cohesive set
- Each recommendation needs a specific, personal reason tied to the room analysis
- Consider style compatibility, color harmony, proportions, and the user's stated preferences
- Mention specific product attributes (materials, colors) and how they relate to the room
- Stay within any stated budget
- Be warm but concise - like a knowledgeable friend, not a salesperson
- If the user asks to swap or change something, adapt the bundle accordingly

Respond in this exact JSON format:
{
  "message": "Your conversational response to the user (2-4 sentences, warm and specific)",
  "recommendations": [
    {
      "product_id": "uuid from catalogue",
      "reason": "1-2 sentence explanation of why this product fits this specific room and user"
    }
  ]
}

Return ONLY valid JSON, no markdown.`;

  const messages: Anthropic.MessageParam[] = [];

  // Add conversation history
  if (conversationHistory?.length) {
    for (const msg of conversationHistory) {
      messages.push({
        role: msg.role === "ai" ? "assistant" : "user",
        content: msg.content,
      });
    }
  }

  // Add current user message
  messages.push({
    role: "user",
    content: userMessage || "Please recommend products for my space based on the room analysis.",
  });

  const response = await anthropic.messages.create({
    model: "claude-sonnet-4-20250514",
    max_tokens: 2048,
    system: systemPrompt,
    messages,
  });

  const text =
    response.content[0].type === "text" ? response.content[0].text : "";

  try {
    const result = JSON.parse(text);

    // Enrich recommendations with full product data
    if (result.recommendations) {
      const enriched = result.recommendations.map((rec: { product_id: string; reason: string }) => {
        const product = products.find((p) => p.id === rec.product_id);
        return { product, reason: rec.reason };
      }).filter((r: { product: unknown }) => r.product);
      result.recommendations = enriched;
    }

    return NextResponse.json(result);
  } catch {
    return NextResponse.json({ message: text, recommendations: [] });
  }
}
