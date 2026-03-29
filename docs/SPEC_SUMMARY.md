# Style Architect - POC Specification Summary

Extracted from contracts between SPG REIT (client) and 1MAN-AI LTD / APOLLEX LTD (provider).

## Contract Timeline

| Document | Date | Value | Status |
|----------|------|-------|--------|
| Service Agreement (Planning & Research) | 2025-08-05 | €2,000 | Signed, for tech spec document |
| Commercial Proposal (PoC) | 2025-10-14 | €20,000 | Signed (e-signatures: Žilvinas Skardžius & Mindaugas Mažeika) |
| Addendum No.1 (Backend Quality) | 2025-10-14 | €0 (within PoC budget) | Signed alongside proposal |

**Total contracted value: €22,000**
**Payment structure (PoC): 50% upfront (€10,000) + 50% after handover (€10,000)**

## POC Scope - What Should Be Delivered

### B2C (User-Facing)
1. **Image upload + AI classification** - style, proportions, lighting analysis
2. **Conversational AI recommendations** - LLM-based (not scripted), 3+ conversational steps, short explanations of "why recommended"
3. **Basic visualization** - Stable Diffusion XL, single render, real-photo overlay/inpainting (ControlNet or equivalent), ≤15s generation time
4. **Demo shopping cart** - list of selected product IDs, NO payment

### B2B (Manufacturer-Facing)
1. **Graph database** - Neo4j with 500 SKUs, 15-20 brands, 6 categories, 6-8 personas
2. **Event tracking** - PostHog/Segment for product views, rejections, iterations, selections
3. **Analytics dashboard** (Metabase/Superset) with 3 modules:
   - Co-occurrence heatmap (products selected together)
   - Persona/style distribution per brand
   - Funnel analysis (iterations until final selection)
4. **Demo manufacturer report** based on initial PoC usage

### AI Assistant ("Vedlys") Specifics
- LLM-based, 3+ conversational steps, NOT scripted templates
- 2-3 predefined persona modes (simplified, not full graph DB personas)
- Reads photo metadata (style, lighting, proportions)
- Each recommendation includes factual reason from dataset fields
- At least 3 bundle suggestions with explanations, 2-3 alternatives per slot

### Visualization Pipeline Specifics
- 2-phase: (1) catalog-style options displayed, (2) after confirmation, final visualization ≤15s
- Real photo context via overlay/inpainting (ControlNet or equivalent)
- Scale reference using at least one reference dimension
- Automatic light/color normalization before generation

### Hybrid Graph + Vector
- Basic vector re-rank layer (style/palette similarity) for hybrid search
- Extendable to full vector DB in future phases

## Explicitly Removed from POC Scope
- Full marketplace (checkout, payments, returns)
- Supplier portal (order management, SLA dashboards)
- Advanced visualization (multi-angle renders, 3D models, Nano Banana)
- Large-scale product DB (>1,000 SKUs, >40 brands)
- Persona modifiers (families with children, pets)
- Full UI/UX design or visual branding

## Acceptance Criteria / KPIs

| Area | Target |
|------|--------|
| Visualization realism | ≥75% realism match |
| Generation time | ≤15s |
| AI recommendation relevance | ≥70% user-rated |
| Explanation clarity | ≥80% user-rated |
| System stability | ≥95% successful runs |
| Analytics insights | ≥3 meaningful findings |
| Operational cost | ≤€5 per session |
| Response time (recommendations) | P95 ≤10s |
| Demo availability | ~99% uptime last 2 weeks before presentation |
| GDPR | EU-hosted, no PII in logs |
| Security | Basic OIDC login, simple RBAC (admin/viewer) |
| Test traffic | ≥100 sessions (client responsible for generating) |

## Infrastructure (NOT included in €20k, billed separately)
- Neo4j Aura Professional (~€400/mo)
- PostHog/Segment (~€200-300/mo)
- Metabase Cloud (~€100/mo)
- Object storage (~€50-100/mo)
- CDN (~€50/mo)
- GPU inference / Stable Diffusion XL (~€500-700/mo)
- **Total: ~€1,300-1,650/month**

## Timeline
- Weeks 1-2: Product schema + database setup (500 SKUs)
- Weeks 3-6: AI prototype (recommendations + basic visualization)
- Weeks 7-9: Event tracking + analytics dashboard
- Weeks 10-12: Testing, QA, final presentation
- **Total: ~12 weeks (2.5 months)**

## IP & Handover Terms
- All code and assets = client's property
- Private Git repo with client access to be provided
- Deliverables include: deployment instructions, architecture diagram, data model docs
- Knowledge transfer: 4-8h training session
- 2-week bugfix grace period after delivery

## Client Responsibilities
- Supply real product data (brands/SKUs) in CSV/API format if real data needed
- Generate minimum test traffic (≥100 sessions)

## Key Contract Provisions
- Lithuanian law governs
- IP transfers to client upon full payment (planning doc) / all PoC code is client property (PoC proposal)
- Contact person: Mindaugas Mažeika (hello@1man.ai, +370 676 36731, Kaunas)
- Planning spec: up to 3 rounds of corrections included
- Implementation feasibility guaranteed by provider within stated budget
