"use client";

import { useState, useCallback, useRef } from "react";
import Navigation from "@/components/Navigation";
import ProductCard from "@/components/ProductCard";
import type { Product } from "@/lib/types";
import {
  Upload,
  Camera,
  Sparkles,
  Send,
  ImageIcon,
  RotateCcw,
  Loader2,
} from "lucide-react";

interface Message {
  role: "ai" | "user";
  content: string;
}

interface Recommendation {
  product: Product;
  reason: string;
}

export default function StudioPage() {
  const [uploaded, setUploaded] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [imageBase64, setImageBase64] = useState<string | null>(null);
  const [roomAnalysis, setRoomAnalysis] = useState<Record<string, unknown> | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [recommendations, setRecommendations] = useState<Recommendation[]>([]);
  const [userMessage, setUserMessage] = useState("");
  const [analyzing, setAnalyzing] = useState(false);
  const [recommending, setRecommending] = useState(false);
  const [visualizing, setVisualizing] = useState(false);
  const [visualizationUrl, setVisualizationUrl] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const chatEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    setTimeout(() => chatEndRef.current?.scrollIntoView({ behavior: "smooth" }), 100);
  };

  const processFile = useCallback((file: File) => {
    const reader = new FileReader();
    reader.onload = async (e) => {
      const base64 = e.target?.result as string;
      setImagePreview(base64);
      setImageBase64(base64);
      setUploaded(true);
      setAnalyzing(true);
      setMessages([{ role: "ai", content: "Analyzing your space..." }]);

      try {
        const res = await fetch("/api/analyze", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ image: base64 }),
        });
        const analysis = await res.json();
        setRoomAnalysis(analysis);

        const summary = analysis.summary || "I can see your space. What style are you going for?";
        setMessages([{ role: "ai", content: summary }]);
      } catch {
        setMessages([{
          role: "ai",
          content: "I can see your room. Tell me about the style you're looking for and your budget, and I'll curate the perfect pieces.",
        }]);
      } finally {
        setAnalyzing(false);
      }
    };
    reader.readAsDataURL(file);
  }, []);

  const handleDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault();
      setIsDragging(false);
      const file = e.dataTransfer.files[0];
      if (file?.type.startsWith("image/")) processFile(file);
    },
    [processFile]
  );

  const handleFileSelect = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0];
      if (file) processFile(file);
    },
    [processFile]
  );

  const handleSend = async () => {
    if (!userMessage.trim() || recommending) return;

    const newMessages: Message[] = [...messages, { role: "user", content: userMessage }];
    setMessages(newMessages);
    setUserMessage("");
    setRecommending(true);
    scrollToBottom();

    try {
      const res = await fetch("/api/recommend", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          roomAnalysis,
          userMessage,
          conversationHistory: newMessages,
        }),
      });
      const data = await res.json();

      setMessages([...newMessages, { role: "ai", content: data.message || "Here are my recommendations:" }]);
      if (data.recommendations?.length) {
        setRecommendations(data.recommendations);
      }
    } catch {
      setMessages([...newMessages, { role: "ai", content: "Something went wrong. Could you try again?" }]);
    } finally {
      setRecommending(false);
      scrollToBottom();
    }
  };

  const handleVisualize = async () => {
    if (visualizing || !recommendations.length) return;
    setVisualizing(true);

    try {
      const res = await fetch("/api/visualize", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          roomDescription: roomAnalysis
            ? `${(roomAnalysis as Record<string, string>).room_type} with ${(roomAnalysis as Record<string, string>).lighting}, ${(roomAnalysis as Record<string, string>).mood} atmosphere`
            : "modern living room",
          products: recommendations.map((r) => ({
            name: r.product.name,
            brand: r.product.brand,
            description: r.product.description,
          })),
          style: roomAnalysis
            ? (roomAnalysis as Record<string, string[]>).style_indicators?.join(", ")
            : "Scandinavian modern",
        }),
      });
      const data = await res.json();
      if (data.image_url) {
        setVisualizationUrl(data.image_url);
      }
    } catch {
      // silently fail for PoC
    } finally {
      setVisualizing(false);
    }
  };

  const handleReset = () => {
    setUploaded(false);
    setImagePreview(null);
    setImageBase64(null);
    setRoomAnalysis(null);
    setMessages([]);
    setRecommendations([]);
    setVisualizationUrl(null);
  };

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
            <h1 className="font-serif text-charcoal text-4xl sm:text-5xl font-normal mb-4 leading-tight">
              Show us your space
            </h1>
            <p className="text-stone text-sm mb-12 max-w-md mx-auto">
              Upload a photograph of the room you want to transform. Our AI will
              analyze the space and guide you to the perfect pieces.
            </p>

            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              className="hidden"
              onChange={handleFileSelect}
            />

            <div
              onDrop={handleDrop}
              onDragOver={(e) => { e.preventDefault(); setIsDragging(true); }}
              onDragLeave={() => setIsDragging(false)}
              onClick={() => fileInputRef.current?.click()}
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
                  {isDragging ? "Release to upload" : "Drag your room photo here"}
                </p>
                <p className="text-[11px] text-stone-light">
                  or click to browse &middot; JPG, PNG up to 10MB
                </p>
              </div>
            </div>
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
              <h1 className="font-serif text-charcoal text-2xl font-normal">
                {roomAnalysis ? String((roomAnalysis as Record<string, string>).room_type || "Your Room").replace(/^\w/, c => c.toUpperCase()) : "Your Room"}
              </h1>
            </div>
            <button
              onClick={handleReset}
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
                {visualizationUrl ? (
                  <img
                    src={visualizationUrl}
                    alt="AI visualization"
                    className="w-full h-full object-cover"
                  />
                ) : imagePreview ? (
                  <img
                    src={imagePreview}
                    alt="Your room"
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="absolute inset-0 flex items-center justify-center">
                    <ImageIcon className="w-12 h-12 text-stone-light/40" strokeWidth={1} />
                  </div>
                )}
                {visualizationUrl && (
                  <div className="absolute top-4 left-4 bg-forest/90 text-cream px-3 py-1.5 text-[10px] tracking-[0.2em] uppercase">
                    AI Visualization
                  </div>
                )}
              </div>

              {/* Generate button */}
              <button
                onClick={handleVisualize}
                disabled={visualizing || !recommendations.length}
                className="w-full py-4 bg-forest text-cream text-[13px] tracking-[0.2em] uppercase hover:bg-forest-light transition-colors flex items-center justify-center gap-3 group disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {visualizing ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    Generating Visualization...
                  </>
                ) : (
                  <>
                    <Sparkles className="w-4 h-4 group-hover:rotate-12 transition-transform" strokeWidth={1.5} />
                    {recommendations.length ? "Generate Visualization" : "Get recommendations first"}
                  </>
                )}
              </button>

              {/* Recommended products */}
              {recommendations.length > 0 && (
                <div>
                  <p className="text-[11px] tracking-[0.3em] uppercase text-gold mb-6">
                    Curated for Your Space
                  </p>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-6">
                    {recommendations.map(({ product, reason }) => (
                      <ProductCard
                        key={product.id}
                        product={product}
                        reason={reason}
                      />
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Right: AI Conversation */}
            <div className="bg-cream/40 border border-cream-dark flex flex-col h-[calc(100vh-8rem)] lg:sticky lg:top-24">
              {/* Chat header */}
              <div className="px-5 py-4 border-b border-cream-dark">
                <div className="flex items-center gap-2">
                  <div className="w-6 h-6 bg-forest flex items-center justify-center">
                    <span className="font-serif text-cream text-[10px] italic">SA</span>
                  </div>
                  <p className="text-[11px] tracking-[0.15em] uppercase text-charcoal-light">
                    AI Design Assistant
                  </p>
                  {(analyzing || recommending) && (
                    <Loader2 className="w-3 h-3 animate-spin text-gold ml-auto" />
                  )}
                </div>
              </div>

              {/* Messages */}
              <div className="flex-1 overflow-y-auto px-5 py-6 space-y-5">
                {messages.map((msg, i) => (
                  <div key={i} className={msg.role === "ai" ? "" : "flex justify-end"}>
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
                      <p className={`text-sm leading-relaxed ${msg.role === "ai" ? "text-charcoal" : "text-cream"}`}>
                        {msg.content}
                      </p>
                    </div>
                  </div>
                ))}
                {recommending && (
                  <div className="bg-warm-white border border-cream-dark px-4 py-3">
                    <p className="text-[10px] tracking-[0.2em] uppercase text-gold mb-2">Style Architect</p>
                    <div className="flex items-center gap-2">
                      <Loader2 className="w-3 h-3 animate-spin text-stone" />
                      <p className="text-sm text-stone italic">Curating recommendations...</p>
                    </div>
                  </div>
                )}
                <div ref={chatEndRef} />
              </div>

              {/* Input */}
              <div className="px-5 py-4 border-t border-cream-dark">
                <form
                  onSubmit={(e) => { e.preventDefault(); handleSend(); }}
                  className="flex items-center gap-3"
                >
                  <input
                    type="text"
                    value={userMessage}
                    onChange={(e) => setUserMessage(e.target.value)}
                    placeholder={analyzing ? "Analyzing your room..." : "Describe your vision..."}
                    disabled={analyzing}
                    className="flex-1 bg-transparent text-sm text-charcoal placeholder:text-stone-light focus:outline-none disabled:opacity-50"
                  />
                  <button
                    type="submit"
                    disabled={!userMessage.trim() || analyzing || recommending}
                    className="w-8 h-8 flex items-center justify-center bg-forest hover:bg-forest-light transition-colors disabled:opacity-30"
                  >
                    <Send className="w-3.5 h-3.5 text-cream" strokeWidth={1.5} />
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
