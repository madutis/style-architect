"use client";

import { useState, useCallback } from "react";
import Navigation from "@/components/Navigation";
import ProductCard from "@/components/ProductCard";
import { products } from "@/data/products";
import {
  Upload,
  Camera,
  Sparkles,
  Send,
  ImageIcon,
  RotateCcw,
} from "lucide-react";

const mockMessages = [
  {
    role: "ai" as const,
    content:
      "I can see a spacious living room with high ceilings, warm natural light from the left, and a neutral base palette — cream walls with light oak flooring. The proportions suggest mid-century or Scandinavian furniture would sit beautifully here. What mood are you going for?",
  },
  {
    role: "user" as const,
    content:
      "Something warm and calm, Scandinavian but not cold. Budget around €8,000 for the main pieces.",
  },
  {
    role: "ai" as const,
    content:
      "Perfect. Given the warm natural light and generous proportions, I'd recommend pieces that embrace organic forms and natural materials. Here's a curated selection that creates a cohesive, inviting atmosphere while respecting your budget:",
  },
];

const recommendedProducts = [
  {
    product: products[1],
    reason:
      "The Mags sofa in Hallingdal 224 brings warmth through its nubby textile and generous proportions — it anchors the room without overwhelming the natural light.",
  },
  {
    product: products[3],
    reason:
      "Panton's Flowerpot in soft grey adds a friendly, sculptural accent beside the sofa. Its rounded form softens the room's linear architecture.",
  },
  {
    product: products[0],
    reason:
      "The Lato side table's warm Crema Diva marble pairs with the oak floor — a touch of understated luxury that ties the palette together.",
  },
  {
    product: products[4],
    reason:
      "The Restore basket in burnt orange introduces a grounding accent color while solving practical storage needs. Made from recycled materials.",
  },
];

export default function StudioPage() {
  const [uploaded, setUploaded] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [userMessage, setUserMessage] = useState("");

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    setUploaded(true);
  }, []);

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  }, []);

  const handleDragLeave = useCallback(() => {
    setIsDragging(false);
  }, []);

  // Upload state
  if (!uploaded) {
    return (
      <>
        <Navigation />
        <main className="min-h-screen pt-16 flex items-center justify-center px-8">
          <div className="max-w-2xl w-full text-center">
            <p className="text-[11px] tracking-[0.3em] uppercase text-gold mb-4">
              Design Studio
            </p>
            <h1 className="font-serif text-charcoal text-4xl sm:text-5xl font-light mb-4 leading-tight">
              Show us your space
            </h1>
            <p className="text-stone text-sm mb-12 max-w-md mx-auto">
              Upload a photograph of the room you want to transform. Our AI will
              analyze the space and guide you to the perfect pieces.
            </p>

            {/* Drop zone */}
            <div
              onDrop={handleDrop}
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
              onClick={() => setUploaded(true)}
              className={`relative aspect-[4/3] max-w-lg mx-auto border-2 border-dashed cursor-pointer transition-all duration-500 flex flex-col items-center justify-center gap-6 ${
                isDragging
                  ? "border-forest bg-forest/5 scale-[1.02]"
                  : "border-stone-light/50 hover:border-forest/30 bg-cream/30"
              }`}
            >
              <div
                className={`w-16 h-16 rounded-full flex items-center justify-center transition-colors ${
                  isDragging ? "bg-forest/10" : "bg-cream"
                }`}
              >
                {isDragging ? (
                  <Camera className="w-6 h-6 text-forest" strokeWidth={1.5} />
                ) : (
                  <Upload className="w-6 h-6 text-stone" strokeWidth={1.5} />
                )}
              </div>
              <div>
                <p className="text-sm text-charcoal mb-1">
                  {isDragging
                    ? "Release to upload"
                    : "Drag your room photo here"}
                </p>
                <p className="text-[11px] text-stone-light">
                  or click to browse &middot; JPG, PNG up to 10MB
                </p>
              </div>
            </div>

            {/* Demo shortcut */}
            <button
              onClick={() => setUploaded(true)}
              className="mt-8 text-[11px] tracking-[0.15em] uppercase text-forest/60 hover:text-forest transition-colors underline underline-offset-4 decoration-forest/20"
            >
              Try with a demo room
            </button>
          </div>
        </main>
      </>
    );
  }

  // Studio state (after upload)
  return (
    <>
      <Navigation />
      <main className="min-h-screen pt-16">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-8 py-8">
          {/* Header */}
          <div className="flex items-center justify-between mb-8">
            <div>
              <p className="text-[11px] tracking-[0.3em] uppercase text-gold mb-1">
                Design Studio
              </p>
              <h1 className="font-serif text-charcoal text-2xl font-light">
                Your Living Room
              </h1>
            </div>
            <button
              onClick={() => setUploaded(false)}
              className="flex items-center gap-2 text-[11px] tracking-[0.15em] uppercase text-stone hover:text-forest transition-colors"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              New Room
            </button>
          </div>

          {/* Main layout */}
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_380px] gap-8">
            {/* Left: Room + Products */}
            <div className="space-y-8">
              {/* Room preview */}
              <div className="relative aspect-[16/10] bg-cream overflow-hidden">
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-center">
                    <ImageIcon
                      className="w-12 h-12 text-stone-light/40 mx-auto mb-3"
                      strokeWidth={1}
                    />
                    <p className="text-sm text-stone-light">
                      Room preview
                    </p>
                    <p className="text-[11px] text-stone-light/60 mt-1">
                      Your uploaded photo will appear here
                    </p>
                  </div>
                </div>
              </div>

              {/* Generate button */}
              <button className="w-full py-4 bg-forest text-cream text-[13px] tracking-[0.2em] uppercase hover:bg-forest-light transition-colors flex items-center justify-center gap-3 group">
                <Sparkles
                  className="w-4 h-4 group-hover:rotate-12 transition-transform"
                  strokeWidth={1.5}
                />
                Generate Visualization
              </button>

              {/* Recommended products */}
              <div>
                <p className="text-[11px] tracking-[0.3em] uppercase text-gold mb-6">
                  Curated for Your Space
                </p>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-6">
                  {recommendedProducts.map(({ product, reason }) => (
                    <ProductCard
                      key={product.id}
                      product={product}
                      reason={reason}
                    />
                  ))}
                </div>
              </div>
            </div>

            {/* Right: AI Conversation */}
            <div className="bg-cream/40 border border-cream-dark flex flex-col h-[calc(100vh-8rem)] lg:sticky lg:top-24">
              {/* Chat header */}
              <div className="px-5 py-4 border-b border-cream-dark">
                <div className="flex items-center gap-2">
                  <div className="w-6 h-6 bg-forest flex items-center justify-center">
                    <span className="font-serif text-cream text-[10px] italic">
                      SA
                    </span>
                  </div>
                  <p className="text-[11px] tracking-[0.15em] uppercase text-charcoal-light">
                    AI Design Assistant
                  </p>
                </div>
              </div>

              {/* Messages */}
              <div className="flex-1 overflow-y-auto px-5 py-6 space-y-5">
                {mockMessages.map((msg, i) => (
                  <div
                    key={i}
                    className={`${
                      msg.role === "ai" ? "" : "flex justify-end"
                    }`}
                  >
                    <div
                      className={`max-w-[90%] ${
                        msg.role === "ai"
                          ? "bg-warm-white border border-cream-dark"
                          : "bg-forest text-cream"
                      } px-4 py-3`}
                    >
                      {msg.role === "ai" && (
                        <p className="text-[10px] tracking-[0.2em] uppercase text-gold mb-2">
                          Style Architect
                        </p>
                      )}
                      <p
                        className={`text-sm leading-relaxed ${
                          msg.role === "ai" ? "text-charcoal" : "text-cream"
                        }`}
                      >
                        {msg.content}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Input */}
              <div className="px-5 py-4 border-t border-cream-dark">
                <div className="flex items-center gap-3">
                  <input
                    type="text"
                    value={userMessage}
                    onChange={(e) => setUserMessage(e.target.value)}
                    placeholder="Describe your vision..."
                    className="flex-1 bg-transparent text-sm text-charcoal placeholder:text-stone-light focus:outline-none"
                  />
                  <button className="w-8 h-8 flex items-center justify-center bg-forest hover:bg-forest-light transition-colors">
                    <Send className="w-3.5 h-3.5 text-cream" strokeWidth={1.5} />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
