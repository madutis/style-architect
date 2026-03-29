"use client";

import type { Product } from "@/lib/types";

interface ProductCardProps {
  product: Product;
  reason?: string;
}

export default function ProductCard({ product, reason }: ProductCardProps) {
  return (
    <div className="group cursor-pointer">
      {/* Image */}
      <div className="relative aspect-square bg-cream overflow-hidden mb-4">
        <div className="absolute inset-0 flex items-center justify-center">
          <img
            src={product.image_url}
            alt={product.name}
            className="w-full h-full object-cover group-hover:scale-[1.03] transition-transform duration-700 ease-out"
          />
        </div>
        {/* Hover overlay */}
        <div className="absolute inset-0 bg-forest/0 group-hover:bg-forest/5 transition-colors duration-500" />
        {/* Quick info on hover */}
        <div className="absolute bottom-0 left-0 right-0 p-4 translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-out">
          <div className="bg-warm-white/95 backdrop-blur-sm p-3">
            <p className="text-[11px] text-charcoal-light leading-relaxed line-clamp-2">
              {product.description}
            </p>
          </div>
        </div>
      </div>

      {/* Info */}
      <div className="space-y-1">
        <div className="flex items-baseline justify-between">
          <p className="text-[11px] tracking-[0.15em] uppercase text-stone">
            {product.brand} / {product.brand_country}
          </p>
        </div>
        <p className="font-serif text-charcoal text-lg font-normal">
          {product.name}
        </p>
        <p className="text-sm text-charcoal-light">
          &euro;{product.price_eur.toLocaleString("de-DE")}
        </p>
      </div>

      {/* AI Reason (if provided) */}
      {reason && (
        <div className="mt-3 pt-3 border-t border-cream-dark">
          <p className="text-[11px] tracking-wide text-forest italic leading-relaxed">
            &ldquo;{reason}&rdquo;
          </p>
        </div>
      )}
    </div>
  );
}
