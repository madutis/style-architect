"use client";

import { useState, useMemo } from "react";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import ProductCard from "@/components/ProductCard";
import { products, categories, styles, designFeels } from "@/data/products";
import { SlidersHorizontal, X } from "lucide-react";

export default function CataloguePage() {
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
      if (
        selectedCategories.length &&
        !selectedCategories.includes(p.category)
      )
        return false;
      if (
        selectedStyles.length &&
        !p.styles.some((s) => selectedStyles.includes(s))
      )
        return false;
      if (
        selectedFeels.length &&
        !p.designFeel.some((f) => selectedFeels.includes(f))
      )
        return false;
      return true;
    });
  }, [selectedCategories, selectedStyles, selectedFeels]);

  const activeFilterCount =
    selectedCategories.length + selectedStyles.length + selectedFeels.length;

  const clearAll = () => {
    setSelectedCategories([]);
    setSelectedStyles([]);
    setSelectedFeels([]);
  };

  return (
    <>
      <Navigation />
      <main className="min-h-screen pt-16">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-8 py-8">
          {/* Header */}
          <div className="flex items-end justify-between mb-12">
            <div>
              <p className="text-[11px] tracking-[0.3em] uppercase text-gold mb-2">
                Collection
              </p>
              <h1 className="font-serif text-charcoal text-4xl sm:text-5xl font-light">
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
                  {/* Categories */}
                  <FilterGroup
                    title="Category"
                    options={categories as unknown as string[]}
                    selected={selectedCategories}
                    onToggle={(v) =>
                      toggleFilter(v, selectedCategories, setSelectedCategories)
                    }
                  />

                  {/* Styles */}
                  <FilterGroup
                    title="Design Direction"
                    options={styles as unknown as string[]}
                    selected={selectedStyles}
                    onToggle={(v) =>
                      toggleFilter(v, selectedStyles, setSelectedStyles)
                    }
                  />

                  {/* Design Feel */}
                  <FilterGroup
                    title="Design Feel"
                    options={designFeels as unknown as string[]}
                    selected={selectedFeels}
                    onToggle={(v) =>
                      toggleFilter(v, selectedFeels, setSelectedFeels)
                    }
                  />
                </div>
              </aside>
            )}

            {/* Product grid */}
            <div className="flex-1">
              {/* Active filters as pills */}
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
                            setSelectedCategories((c) =>
                              c.filter((v) => v !== filter)
                            );
                            setSelectedStyles((s) =>
                              s.filter((v) => v !== filter)
                            );
                            setSelectedFeels((f) =>
                              f.filter((v) => v !== filter)
                            );
                          }}
                        >
                          <X className="w-3 h-3" />
                        </button>
                      </span>
                    )
                  )}
                </div>
              )}

              {/* Results count */}
              <p className="text-[11px] text-stone-light mb-6">
                {filtered.length} piece{filtered.length !== 1 ? "s" : ""}
              </p>

              {/* Grid */}
              <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-6 gap-y-12">
                {filtered.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>

              {filtered.length === 0 && (
                <div className="text-center py-24">
                  <p className="font-serif text-charcoal text-xl font-light mb-2">
                    No pieces match your criteria
                  </p>
                  <p className="text-sm text-stone">
                    Try adjusting your filters to explore more of our collection.
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}

function FilterGroup({
  title,
  options,
  selected,
  onToggle,
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
