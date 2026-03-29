# Style Architect - Alternative PoC Specification
## A Lean, Modern Approach

**Prepared for:** Rimantė (Style Architect)
**Prepared by:** Darius
**Date:** 2026-03-29

---

## 1. Philosophy

This PoC is designed to prove one thing: **can AI turn a room photo + user preferences into a convincing, purchasable interior design solution?**

Everything else (analytics dashboards, manufacturer reports, graph databases) is secondary. If the core experience doesn't work, nothing else matters. If it does work, everything else is straightforward to add.

**Principle: build the magic first, add the plumbing later.**

---

## 2. What This PoC Demonstrates

A user can:
1. **Upload a photo** of their room
2. **Describe what they want** (style, mood, budget) in natural language
3. **Get AI-curated product recommendations** from real European brands with explanations ("why this product fits your space")
4. **See a visualization** of the recommended products in their actual room
5. **Iterate** ("I don't like the sofa, show me something warmer") and get updated recommendations
6. **Save their selection** as a project with a shareable link

A manufacturer/brand can:
7. **See a demo dashboard** showing which of their products were recommended, in what contexts, and how often users selected vs rejected them

---

## 3. What This PoC Does NOT Include

- User accounts / authentication (use shareable links instead)
- Payment / checkout / cart
- Supplier self-service portal
- Mobile app
- Multi-language support
- Designer vs Owner modes (single user mode)
- Product data entry tools (we load data via CSV/script)

---

## 4. Tech Stack

### Frontend
| Component | Tool | Rationale |
|-----------|------|-----------|
| Framework | **Next.js 15 (App Router)** | Fast, SEO-friendly, great image handling, server components for AI calls |
| Styling | **Tailwind CSS** | Rapid UI development matching Rimantė's wireframe aesthetic |
| Hosting | **Vercel** | Free tier, instant deploys, edge functions |

### Backend & Data
| Component | Tool | Rationale |
|-----------|------|-----------|
| Database | **Supabase (PostgreSQL + pgvector)** | One platform: DB, auth (when needed), file storage, vector search. Free tier for PoC |
| Product search | **pgvector embeddings** | Semantic similarity search ("find products with a warm Scandinavian feel") without Neo4j overhead |
| File storage | **Supabase Storage** | Room photos, product images. Free tier = 1GB |

### AI Layer
| Component | Tool | Rationale |
|-----------|------|-----------|
| Room analysis | **Claude Vision API** | Upload photo → extract style, colors, proportions, room type, lighting conditions. Best-in-class image understanding |
| Product matching | **Claude API** | Given room analysis + user preferences + product catalog, recommend bundles with explanations. Supports multi-turn conversation for iterations |
| Embeddings | **Voyage AI / OpenAI Embeddings** | Generate product embeddings for vector similarity search |
| Visualization | **FLUX Pro via FAL.AI** | State-of-the-art photorealistic image generation. Superior to SDXL for interior scenes. ~$0.04/image |

### Analytics & Tracking
| Component | Tool | Rationale |
|-----------|------|-----------|
| Event tracking | **PostHog (free tier)** | 1M events/month free. Track views, selections, rejections |
| Manufacturer dashboard | **Custom admin page** | Simple Next.js page with charts (recharts). No Metabase needed for PoC |

---

## 5. Product Data Model

Simple, flat, extensible:

```sql
products (
  id              uuid PRIMARY KEY,
  name            text NOT NULL,
  brand           text NOT NULL,
  brand_country   text,           -- "Lithuania", "Denmark", etc.
  category        text NOT NULL,  -- "furniture", "lighting", "decor", etc.
  subcategory     text,           -- "sofa", "pendant", "vase", etc.
  price_eur       decimal,
  materials       text[],         -- ["wood", "leather", "metal"]
  styles          text[],         -- ["scandinavian", "modern", "minimal"]
  colors          text[],         -- ["warm white", "natural oak", "black"]
  design_feel     text[],         -- ["calm", "bold", "elegant"]
  values          text[],         -- ["sustainability", "craftsmanship"]
  room_types      text[],         -- ["living room", "bedroom"]
  description     text,
  image_url       text,
  embedding       vector(1536),   -- for semantic similarity search
  created_at      timestamptz DEFAULT now()
)
```

No graph database. Relationships are handled by:
- Shared attributes (two products with `style: scandinavian` pair naturally)
- AI reasoning (Claude decides what pairs well based on attributes + context)
- Vector similarity (pgvector finds visually/stylistically similar products)

**Initial data: 100-200 real products from 10-15 European brands.** Real data > dummy data for a convincing demo.

---

## 6. Core User Flow (Detailed)

### Step 1: Upload & Analyze
```
User uploads room photo
    → Claude Vision analyzes:
        - Room type (living room, bedroom, etc.)
        - Current style indicators
        - Lighting conditions (natural, warm, cool)
        - Color palette
        - Proportions / scale references
        - What furniture is already present
    → System stores analysis as structured JSON
    → User sees: "I see a bright living room with high ceilings,
       natural light, and a minimalist base. What style are you going for?"
```

### Step 2: Conversational Preferences
```
User: "I want something warm and Scandinavian, budget around €5000"
    → Claude reads: room analysis + user input + product catalog
    → Generates: 3 product bundles (4-6 products each)
    → Each product has: "why it fits" explanation
    → Each bundle has: "why these work together" explanation
    → User sees: product cards with images, prices, explanations
```

### Step 3: Iterate
```
User: "I like bundle 2 but the sofa is too dark"
    → Claude remembers context
    → Searches for alternative sofas (lighter, same style)
    → Regenerates bundle with swap + updated explanation
    → User sees: updated bundle with highlighted change
```

### Step 4: Visualize
```
User clicks "Generate visualization"
    → System sends to FLUX Pro:
        - Original room photo
        - Selected products with descriptions
        - Style/mood parameters from conversation
    → FLUX generates room visualization with products
    → User sees: their room with recommended products placed in context
```

### Step 5: Save & Share
```
User clicks "Save project"
    → System generates unique shareable URL
    → Project page shows: room photo, visualization, product list with prices, total budget
    → Shareable with friends, partner, designer
```

---

## 7. Manufacturer Dashboard (Simple)

A password-protected admin page showing:

1. **Product Performance Table**
   - Product name, brand, times recommended, times selected, times rejected
   - Selection rate (selected / recommended)

2. **Style/Context Distribution**
   - Bar chart: which styles your products are recommended for
   - Bar chart: which room types your products appear in

3. **Co-occurrence** (simple)
   - "Products most often selected alongside yours"
   - Table format, not heatmap

4. **Exportable as CSV** for manufacturer presentations

Data source: PostHog events, queried directly. No separate analytics infrastructure.

---

## 8. Timeline

| Week | Deliverable | Demo-able? |
|------|-------------|------------|
| **1** | Product data pipeline (CSV import, embeddings), DB schema, basic UI shell | Catalog browsing works |
| **2** | Photo upload + Claude Vision analysis, conversational AI recommendations | Core AI flow works end-to-end |
| **3** | Product matching refinement, iteration flow ("swap this product"), UI polish | Full recommendation flow |
| **4** | FLUX visualization integration, save/share projects | Complete user flow |
| **5** | Manufacturer dashboard, PostHog tracking, data collection | Analytics visible |
| **6** | Polish, testing, edge cases, demo preparation | **PoC complete** |

**Key difference from original spec:** Something demo-able exists from week 2, not week 10.

---

## 9. Monthly Costs

| Service | Tier | Monthly Cost |
|---------|------|-------------|
| Supabase | Free (or Pro at $25 if needed) | €0-25 |
| Vercel | Free (Hobby) | €0 |
| Claude API | Pay-per-use (~100 sessions/mo) | €50-100 |
| FLUX Pro / FAL.AI | Pay-per-image (~200 images/mo) | €8-16 |
| Voyage AI embeddings | Pay-per-use | €5-10 |
| PostHog | Free tier | €0 |
| Domain | .eu or .com | €1-2 |
| **Total** | | **€65-155/month** |

Compare to original contractor's infrastructure: **€1,300-1,650/month**

---

## 10. What Rimantė Needs to Provide

1. **Product data** for 100-200 real products:
   - Brand name, product name, price
   - Category, materials, style tags
   - High-quality product photos
   - This can be a spreadsheet/CSV

2. **5-10 room photos** for testing and demo

3. **3-5 "golden path" examples**: "for THIS room and THIS preference, the ideal recommendation would be THESE products because..." — this trains the AI behavior

4. **Brand relationships**: which 10-15 brands are available and willing to have their products featured in the demo?

5. **Feedback during build**: weekly 30-min review sessions to ensure the AI recommendations match her interior design expertise

---

## 11. What Success Looks Like

At the end of 6 weeks, Rimantė can:

- [ ] Open a URL and show it to a manufacturer or investor
- [ ] Upload any room photo and get relevant product recommendations within seconds
- [ ] Have a natural conversation about preferences and see recommendations adapt
- [ ] Generate a visualization of products in the actual room
- [ ] Show a manufacturer dashboard with product performance data
- [ ] Share a project link with someone who can see the full recommendation

**The demo should make someone say: "When can I use this for my apartment?"**

---

## 12. What Comes After the PoC

If the PoC validates the concept, the natural next steps are:

1. **User accounts & authentication** (Supabase Auth, 1-2 days)
2. **Expanded product catalog** (500+ products, more brands)
3. **Designer mode** (designers create projects for clients)
4. **Improved visualization** (multiple angles, product swapping in visualization)
5. **Real cart/checkout** (Stripe integration)
6. **Supplier self-service** (brands manage their own products)

Each of these is a 1-2 week increment built on the PoC foundation. The architecture supports all of them without rewriting.

---

## 13. Why This Approach vs The Original Contract

| Aspect | Original (1MAN-AI) | This Proposal |
|--------|-------------------|---------------|
| Core focus | Backend infrastructure + analytics | User experience + AI quality |
| Database | Neo4j (€400/mo) | PostgreSQL + pgvector (€0-25/mo) |
| Visualization | SDXL (outdated) | FLUX Pro (state-of-art, March 2026) |
| Analytics | Metabase + PostHog paid tiers | PostHog free + custom dashboard |
| Monthly infra | €1,300-1,650 | €65-155 |
| Timeline | 12 weeks (currently 2+ months late) | 6 weeks |
| First demo-able version | Week 10 | Week 2 |
| Frontend | "Not included" | Included (based on Rimantė's wireframes) |
| Product data | 500 dummy SKUs | 100-200 real products |
| AI model approach | Custom pipeline (vision + semantic + matching + generative) | Claude API (one model handles analysis + matching + conversation) + FLUX (visualization) |
