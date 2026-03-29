import { createClient } from "@supabase/supabase-js";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import CatalogueClient from "./catalogue-client";
import type { Product } from "@/lib/types";

async function getProducts(): Promise<Product[]> {
  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );

  const { data, error } = await supabase
    .from("products")
    .select("*")
    .order("brand", { ascending: true });

  if (error) {
    console.error("Failed to fetch products:", error);
    return [];
  }

  return data as Product[];
}

export const revalidate = 60; // revalidate every 60s

export default async function CataloguePage() {
  const products = await getProducts();

  return (
    <>
      <Navigation />
      <main className="min-h-screen pt-16">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-8 py-8">
          <CatalogueClient products={products} />
        </div>
      </main>
      <Footer />
    </>
  );
}
