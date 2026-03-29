import { createClient } from "@supabase/supabase-js";
import { readFileSync } from "fs";
import { config } from "dotenv";
config({ path: ".env.local" });

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

// Scraped images + manual fixes for the 3 that failed
const imageMap = {
  "Lato LN9 Side Table": "https://media.fds.fi/product_image/153AndTradition_iso_TH.jpg",
  "Mags Sofa 3-Seater": "https://cdn.connox.com/m/100107/159796/media/hay/mags-sofa/Kombination-1/Hay-Mags-Sofa-3-Sitzer-Kombination-1-grau-Hallingdal-130.webp",
  "IC Lights T1 High": "https://media.fds.fi/product_image/5_Flos_20_th.png",
  "Flowerpot VP3 Table Lamp": "https://media.fds.fi/product_image/175AndTradition_iso_TH.jpg",
  "Restore Round Basket": "https://media.fds.fi/product_image/Restore_round_grey_WB_medium_150.jpg",
  "CH07 Shell Chair": "https://media.fds.fi/product_image/CH07_owobrl_front_1.jpg",
  "Obi Vase": "https://cdn.connox.com/m/100106/292920/media/normann-copenhagen/Geo-Vase/Normann-Copenhagen-Geo-Vase-schwarz.webp",
  "Arco Floor Lamp": "https://media.fds.fi/product_image/2Flos_Arco_iso_TH.jpg",
  "Offset Sofa 3-Seater": "https://media.fds.fi/product_image/MN9854001_VS.jpg",
  "Tribeca Pendant": "https://cdn.connox.com/m/100106/262428/media/menu/Beleuchtung-2/Menu-Tribeca-Franklin-Pendelleuchte-schwarz.webp",
  "Stacked Shelving System": "https://cdn.connox.com/m/100106/142011/media/muuto/stacked/weiss/Stacked-weiss-regal.webp",
  "Parentesi Pendant": "https://media.fds.fi/product_image/parentesi-suspension-castiglioni-manzu-flos-F5400009-product-still-life-big-1.jpg",
  "Soft Side Table": "https://cdn.connox.com/m/100106/568620/media/muuto/Soft-Beistelltisch/Muuto-Soft-Beistelltisch-Eiche-off-white-Doppel-1zu1.webp",
  "Outline Daybed": "https://media.fds.fi/product_image/1021Muuto_20_TH.jpg",
  "Arum Table Lamp": "https://media.fds.fi/product_image/3_ferm_living_20_TH.png",
  "Eave Modular Sofa": "https://cdn.connox.com/m/100106/303708/media/menu/Juli-2021/Menu-Eave-86-3-Sitzer-Sofa-Boucle-beige-front.webp",
  "AJ Wall Lamp": "https://media.fds.fi/product_image/10LouisPoulsen_AK.jpg",
  "Kubus Bowl": "https://cdn.connox.com/m/100106/256590/media/by-lassen/Kubus/by-Lassen-Kubus-Bowl-large-schwarz.webp",
};

async function update() {
  for (const [name, imageUrl] of Object.entries(imageMap)) {
    const { data, error } = await supabase
      .from("products")
      .update({ image_url: imageUrl })
      .eq("name", name)
      .select("name");

    if (error) {
      console.error(`Failed to update ${name}:`, error.message);
    } else if (data.length === 0) {
      console.warn(`No match found for: ${name}`);
    } else {
      console.log(`Updated: ${name}`);
    }
  }
  console.log("\nDone! All product images updated.");
}

update();
