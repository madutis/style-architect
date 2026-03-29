"use client";

import { useState, useMemo } from "react";
import ProductCard from "@/components/ProductCard";
import type { Product } from "@/lib/types";
import { SlidersHorizontal, X } from "lucide-react";

const CATEGORIES = ["Furniture", "Lighting", "Decor"];
const STYLES = [
  "Modern", "Scandinavian", "Minimal", "Classic", "Industrial",
  "Sculptural", "Organic", "Geometric", "Retro Modern",
];
const FEELS = [
  "Calm", "Warm", "Bold", "Elegant", "Minimal",
  "Natural", "Soft", "Sculptural", "Expressive",
];

export default function CatalogueClient({ products }: { products: Product[] }) {
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [selectedStyles, setSelectedStyles] = useState<string[]>([]);
  const [selectedFeels, setSelectedFeels] = useState<string[]>([]);
  const [showFilters, setShowFilters] = useState(true);

  const toggleFilter = (
    value: string,
    selected: string[],
    setter: (v: string[]) => void
  ) => {
    setter(
      selected.includes(value)
        ? selected.filter((v) => v !== value)
        : [...selected, value]
    );
  };

  const filtered = useMemo(() => {
    return products.filter((p) => {
      if (selectedCategories.length && !selectedCategories.includes(p.category))
        return false;
      if (selectedStyles.length && !p.styles.some((s) => selectedStyles.includes(s)))
        return false;
      if (selectedFeels.length && !p.design_feel.some((f) => selectedFeels.includes(f)))
        return false;
      return true;
    });
  }, [products, selectedCategories, selectedStyles, selectedFeels]);

  const activeFilterCount =
    selectedCategories.length + selectedStyles.length + selectedFeels.length;

  const clearAll = () => {
    setSelectedCategories([]);
    setSelectedStyles([]);
    setSelectedFeels([]);
  };

  return (
    <>
      {/* Header */}
      <div className="flex items-end justify-between mb-12">
        <div>
          <p className="text-[11px] tracking-[0.3em] uppercase text-gold mb-2">
            Collection
          </p>
          <h1 className="font-serif text-charcoal text-4xl sm:text-5xl font-normal">
            Catalogue
          </h1>
        </div>
        <div className="flex items-center gap-4">
          {activeFilterCount > 0 && (
            <button
              onClick={clearAll}
              className="text-[11px] tracking-[0.15em] uppercase text-stone hover:text-forest transition-colors flex items-center gap-1.5"
            >
              <X className="w-3 h-3" />
              Clear ({activeFilterCount})
            </button>
          )}
          <button
            onClick={() => setShowFilters(!showFilters)}
            className="flex items-center gap-2 text-[11px] tracking-[0.15em] uppercase text-charcoal-light hover:text-forest transition-colors"
          >
            <SlidersHorizontal className="w-3.5 h-3.5" strokeWidth={1.5} />
            {showFilters ? "Hide Filters" : "Show Filters"}
          </button>
        </div>
      </div>

      <div className="flex gap-12">
        {/* Filters sidebar */}
        {showFilters && (
          <aside className="w-56 shrink-0 hidden md:block">
            <div className="sticky top-24 space-y-10">
              <FilterGroup
                title="Category"
                options={CATEGORIES}
                selected={selectedCategories}
                onToggle={(v) => toggleFilter(v, selectedCategories, setSelectedCategories)}
              />
              <FilterGroup
                title="Design Direction"
                options={STYLES}
                selected={selectedStyles}
                onToggle={(v) => toggleFilter(v, selectedStyles, setSelectedStyles)}
              />
              <FilterGroup
                title="Design Feel"
                options={FEELS}
                selected={selectedFeels}
                onToggle={(v) => toggleFilter(v, selectedFeels, setSelectedFeels)}
              />
            </div>
          </aside>
        )}

        {/* Product grid */}
        <div className="flex-1">
          {activeFilterCount > 0 && (
            <div className="flex flex-wrap gap-2 mb-8">
              {[...selectedCategories, ...selectedStyles, ...selectedFeels].map(
                (filter) => (
                  <span
                    key={filter}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-forest/5 text-forest text-[11px] tracking-wider"
                  >
                    {filter}
                    <button
                      onClick={() => {
                        setSelectedCategories((c) => c.filter((v) => v !== filter));
                        setSelectedStyles((s) => s.filter((v) => v !== filter));
                        setSelectedFeels((f) => f.filter((v) => v !== filter));
                      }}
                    >
                      <X className="w-3 h-3" />
                    </button>
                  </span>
                )
              )}
            </div>
          )}

          <p className="text-[11px] text-stone-light mb-6">
            {filtered.length} piece{filtered.length !== 1 ? "s" : ""}
          </p>

          <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-6 gap-y-12">
            {filtered.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>

          {filtered.length === 0 && (
            <div className="text-center py-24">
              <p className="font-serif text-charcoal text-xl font-normal mb-2">
                No pieces match your criteria
              </p>
              <p className="text-sm text-stone">
                Try adjusting your filters to explore more of our collection.
              </p>
            </div>
          )}
        </div>
      </div>
    </>
  );
}

function FilterGroup({
  title, options, selected, onToggle,
}: {
  title: string;
  options: string[];
  selected: string[];
  onToggle: (value: string) => void;
}) {
  return (
    <div>
      <p className="text-[11px] tracking-[0.25em] uppercase text-stone mb-4">
        {title}
      </p>
      <div className="space-y-2">
        {options.map((option) => {
          const isActive = selected.includes(option);
          return (
            <button
              key={option}
              onClick={() => onToggle(option)}
              className={`block w-full text-left text-sm py-1 transition-colors ${
                isActive
                  ? "text-forest font-medium"
                  : "text-charcoal-light hover:text-charcoal"
              }`}
            >
              {option}
            </button>
          );
        })}
      </div>
    </div>
  );
}
