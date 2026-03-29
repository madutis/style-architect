import { createClient } from "@supabase/supabase-js";
import { readFileSync } from "fs";

const supabase = createClient(
  "https://wycuasyjdtlepetupklk.supabase.co",
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Ind5Y3Vhc3lqZHRsZXBldHVwa2xrIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc3NDc1MjM3MCwiZXhwIjoyMDkwMzI4MzcwfQ.sDuzGtnq9OSGdeAFtIq44cVnheK-HSX6mnpC3WWnPL8"
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
