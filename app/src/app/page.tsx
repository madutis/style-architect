import Link from "next/link";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { brands } from "@/data/products";
import { Camera, Sparkles, Eye, ArrowRight } from "lucide-react";

export default function Home() {
  return (
    <>
      <Navigation />

      {/* ── Hero ──────────────────────────────────────── */}
      <section className="min-h-screen flex flex-col items-center justify-center px-8 pt-16 relative overflow-hidden">
        {/* Subtle gradient background */}
        <div className="absolute inset-0 bg-gradient-to-b from-cream/50 via-warm-white to-warm-white" />

        <div className="relative z-10 text-center max-w-3xl mx-auto">
          {/* Logo mark */}
          <div className="animate-fade-up w-24 h-24 mx-auto mb-12 bg-forest flex items-center justify-center">
            <span className="font-serif text-cream text-4xl font-light italic">
              SA
            </span>
          </div>

          {/* Title */}
          <h1 className="animate-fade-up delay-200 font-serif text-charcoal text-5xl sm:text-7xl font-light mb-6 leading-[0.95]">
            Style Architect
          </h1>

          {/* Tagline */}
          <p className="animate-fade-up delay-300 text-stone text-base sm:text-lg tracking-[0.2em] uppercase font-light mb-4">
            your unique style
          </p>
          <p className="animate-fade-up delay-400 text-stone-light text-sm tracking-[0.3em] uppercase font-light mb-16">
            easy &middot; real &middot; about you
          </p>

          {/* Divider */}
          <div className="animate-line-grow delay-500 h-px bg-gradient-to-r from-transparent via-gold to-transparent w-48 mx-auto mb-16" />

          {/* CTA */}
          <Link
            href="/studio"
            className="animate-fade-up delay-600 inline-flex items-center gap-3 bg-forest text-cream px-10 py-4 text-[13px] tracking-[0.2em] uppercase hover:bg-forest-light transition-colors group"
          >
            Begin Your Journey
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-12 left-1/2 -translate-x-1/2 animate-fade-in delay-800">
          <div className="w-px h-12 bg-gradient-to-b from-transparent to-stone-light mx-auto mb-2" />
          <p className="text-[10px] tracking-[0.3em] uppercase text-stone-light">
            Scroll
          </p>
        </div>
      </section>

      {/* ── Value Proposition ──────────────────────────── */}
      <section className="py-32 px-8">
        <div className="max-w-[1200px] mx-auto">
          <p className="text-[11px] tracking-[0.3em] uppercase text-gold text-center mb-4">
            The Platform
          </p>
          <h2 className="font-serif text-charcoal text-3xl sm:text-4xl font-light text-center mb-20 max-w-xl mx-auto leading-tight">
            Where artificial intelligence meets European design sensibility
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-16 md:gap-8">
            {[
              {
                icon: Sparkles,
                title: "AI-Powered Design",
                text: "Our intelligence layer analyzes your space, understands your aesthetic, and curates products that belong together.",
              },
              {
                icon: Eye,
                title: "European Craftsmanship",
                text: "Every piece in our catalogue comes from Europe\u2019s finest makers. Brands chosen for their commitment to design integrity.",
              },
              {
                icon: Camera,
                title: "Curated for You",
                text: "Not a marketplace. A decision engine. We show you what works for your space, your style, your life.",
              },
            ].map((card, i) => (
              <div key={i} className="text-center group">
                <div className="w-12 h-12 mx-auto mb-6 border border-forest/10 flex items-center justify-center group-hover:border-forest/30 transition-colors">
                  <card.icon className="w-5 h-5 text-forest/60" strokeWidth={1.5} />
                </div>
                <h3 className="font-serif text-charcoal text-xl font-light mb-3">
                  {card.title}
                </h3>
                <p className="text-sm text-stone leading-relaxed max-w-xs mx-auto">
                  {card.text}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Divider ────────────────────────────────────── */}
      <div className="max-w-[1200px] mx-auto px-8">
        <div className="h-px bg-gradient-to-r from-transparent via-cream-dark to-transparent" />
      </div>

      {/* ── How It Works ──────────────────────────────── */}
      <section className="py-32 px-8">
        <div className="max-w-[1200px] mx-auto">
          <p className="text-[11px] tracking-[0.3em] uppercase text-gold text-center mb-4">
            How It Works
          </p>
          <h2 className="font-serif text-charcoal text-3xl sm:text-4xl font-light text-center mb-20 max-w-lg mx-auto leading-tight">
            Three steps from inspiration to realization
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-0">
            {[
              {
                step: "01",
                title: "Upload",
                text: "Photograph your space. Our AI reads the room \u2014 proportions, light, existing character.",
              },
              {
                step: "02",
                title: "Discover",
                text: "Tell us your vision. We\u2019ll match it with products that transform your space with intention.",
              },
              {
                step: "03",
                title: "Visualize",
                text: "See the products in your actual room. Not a render \u2014 a preview of your future space.",
              },
            ].map((step, i) => (
              <div
                key={i}
                className={`py-12 md:py-0 md:px-10 ${
                  i < 2
                    ? "border-b md:border-b-0 md:border-r border-cream-dark"
                    : ""
                }`}
              >
                <p className="font-serif text-gold text-5xl font-light mb-6">
                  {step.step}
                </p>
                <h3 className="font-serif text-charcoal text-2xl font-light mb-3">
                  {step.title}
                </h3>
                <p className="text-sm text-stone leading-relaxed">
                  {step.text}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Featured Brands ───────────────────────────── */}
      <section className="py-20 bg-cream/40">
        <div className="max-w-[1200px] mx-auto px-8">
          <p className="text-[11px] tracking-[0.3em] uppercase text-stone text-center mb-12">
            Featured European Makers
          </p>
          <div className="flex flex-wrap justify-center gap-x-12 gap-y-6">
            {brands.map((brand) => (
              <div
                key={brand.name}
                className="text-center group"
              >
                <p className="font-serif text-charcoal/40 group-hover:text-charcoal text-lg font-light transition-colors">
                  {brand.name}
                </p>
                <p className="text-[10px] tracking-[0.2em] uppercase text-stone-light mt-0.5">
                  {brand.country}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Final CTA ─────────────────────────────────── */}
      <section className="py-32 px-8 text-center">
        <h2 className="font-serif text-charcoal text-3xl sm:text-5xl font-light mb-6 max-w-lg mx-auto leading-tight">
          Ready to design with intention?
        </h2>
        <p className="text-stone text-sm mb-12 max-w-md mx-auto">
          Upload a photo of your space and let our AI guide you to the perfect European design pieces.
        </p>
        <Link
          href="/studio"
          className="inline-flex items-center gap-3 bg-forest text-cream px-10 py-4 text-[13px] tracking-[0.2em] uppercase hover:bg-forest-light transition-colors group"
        >
          Open Design Studio
          <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
        </Link>
      </section>

      <Footer />
    </>
  );
}
