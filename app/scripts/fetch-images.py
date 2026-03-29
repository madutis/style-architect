#!/usr/bin/env python3
"""Fetch real product images from brand websites using scrapling."""

import json
import re
from scrapling import Fetcher, StealthyFetcher

# Product URLs to scrape - using Finnish Design Shop and brand sites
PRODUCTS = [
    {"name": "Lato LN9 Side Table", "url": "https://www.finnishdesignshop.com/en-us/product/lato-ln9-coffee-table-white-cream-diva-marble"},
    {"name": "Mags Sofa 3-Seater", "url": "https://www.connox.com/categories/furniture/couches-sofas/hay-mags-sofa-3-seater.html"},
    {"name": "IC Lights T1 High", "url": "https://www.finnishdesignshop.com/en-us/product/ic-t1-table-lamp-high-black"},
    {"name": "Flowerpot VP3 Table Lamp", "url": "https://www.finnishdesignshop.com/en-us/product/flowerpot-vp3-table-lamp-matt-white"},
    {"name": "Restore Round Basket", "url": "https://www.finnishdesignshop.com/en-us/product/restore-round-basket-grey"},
    {"name": "CH07 Shell Chair", "url": "https://www.finnishdesignshop.com/en-us/product/ch07-shell-lounge-chair-oiled-oak-cognac-leather-sif-95"},
    {"name": "Obi Vase", "url": "https://www.normann-copenhagen.com/en/Products/Accessories/Vases"},
    {"name": "Arco Floor Lamp", "url": "https://www.finnishdesignshop.com/en-us/product/arco-floor-lamp"},
    {"name": "Offset Sofa 3-Seater", "url": "https://www.finnishdesignshop.com/en-us/product/offset-3-seater-sofa-with-loose-cover-oat"},
    {"name": "Tribeca Pendant", "url": "https://www.finnishdesignshop.com/en-us/product/tribeca-franklin-pendant-lamp-black"},
    {"name": "Stacked Shelving System", "url": "https://www.connox.com/categories/furniture/shelves/stacked-shelving-system-white.html"},
    {"name": "Parentesi Pendant", "url": "https://www.finnishdesignshop.com/en-us/product/parentesi-floor-lamp-white-dimmable"},
    {"name": "Soft Side Table", "url": "https://www.connox.com/categories/furniture/tables/side-tables/muuto-soft-side-table.html"},
    {"name": "Outline Daybed", "url": "https://www.finnishdesignshop.com/en-us/product/outline-daybed-cognac-leather-black"},
    {"name": "Arum Table Lamp", "url": "https://www.finnishdesignshop.com/en-us/product/arum-table-lamp-cashmere"},
    {"name": "Eave Modular Sofa", "url": "https://www.connox.com/categories/furniture/seating-furniture/sofas/audo-eave-86-sofa.html"},
    {"name": "AJ Wall Lamp", "url": "https://www.finnishdesignshop.com/en-us/product/aj-wall-lamp-polished-stainless-steel"},
    {"name": "Kubus Bowl", "url": "https://www.finnishdesignshop.com/decoration-decorative-objects-platters-bowls-kubus-bowl-large-black-p-6408.html"},
]


def extract_og_image(page):
    """Try to extract og:image meta tag."""
    try:
        og = page.css('meta[property="og:image"]')
        if og:
            return og[0].attrib.get("content", "")
    except:
        pass
    return None


def extract_main_image(page):
    """Try various strategies to find the main product image."""
    # Strategy 1: og:image
    url = extract_og_image(page)
    if url:
        return url

    # Strategy 2: JSON-LD structured data
    try:
        scripts = page.css('script[type="application/ld+json"]')
        for script in scripts:
            try:
                data = json.loads(script.text)
                if isinstance(data, list):
                    data = data[0]
                if "image" in data:
                    img = data["image"]
                    if isinstance(img, list):
                        return img[0] if img else None
                    if isinstance(img, dict):
                        return img.get("url", img.get("contentUrl"))
                    return img
            except:
                continue
    except:
        pass

    # Strategy 3: First large product image
    try:
        imgs = page.css("img")
        for img in imgs:
            src = img.attrib.get("src", "") or img.attrib.get("data-src", "")
            if src and ("product" in src.lower() or "catalog" in src.lower()):
                if not src.startswith("http"):
                    continue
                return src
    except:
        pass

    # Strategy 4: Any reasonably large image
    try:
        imgs = page.css("img")
        for img in imgs:
            src = img.attrib.get("src", "") or img.attrib.get("data-src", "")
            if src and src.startswith("http") and not ("logo" in src.lower() or "icon" in src.lower() or "svg" in src.lower()):
                return src
    except:
        pass

    return None


def main():
    fetcher = StealthyFetcher()
    results = []

    for product in PRODUCTS:
        name = product["name"]
        url = product["url"]
        print(f"Fetching: {name} from {url}")

        try:
            page = fetcher.fetch(url)
            image_url = extract_main_image(page)

            if image_url:
                # Clean up URL
                image_url = image_url.split("?")[0] if "?" in image_url and "token" not in image_url else image_url
                print(f"  Found: {image_url[:80]}...")
                results.append({"name": name, "image_url": image_url})
            else:
                print(f"  No image found")
                results.append({"name": name, "image_url": None})
        except Exception as e:
            print(f"  Error: {e}")
            results.append({"name": name, "image_url": None, "error": str(e)})

    # Output results
    print("\n\n=== RESULTS ===")
    print(json.dumps(results, indent=2))

    # Write to file for the seed script
    with open("scripts/image-urls.json", "w") as f:
        json.dump(results, f, indent=2)
    print(f"\nWrote {len(results)} results to scripts/image-urls.json")


if __name__ == "__main__":
    main()
