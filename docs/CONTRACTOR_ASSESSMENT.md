# Style Architect - Contractor Assessment
## Review of 1MAN-AI LTD Engagement

**Prepared for:** Rimantė (Style Architect)
**Prepared by:** Darius
**Date:** 2026-03-29

---

## Executive Summary

Rimantė signed two contracts with 1MAN-AI LTD (UK company, operated by Mindaugas Mažeika from Kaunas, Lithuania) for a total of €22,000:
- €2,000 for a Planning & Research technical specification (Aug 2025)
- €20,000 for a Proof of Concept build (Oct 2025, 50/50 payment split)

The PoC was contracted for 12 weeks (~delivery Jan 2026). As of March 2026, the status is unclear and the contractor is refusing to provide code repository access despite the contract explicitly requiring it.

---

## 1. What Was Contracted

### Phase 1: Technical Specification (€2,000)
- Paid upfront in full
- Deliverable: technical spec document covering feature scope, market research, architecture, roadmap, budget, and risk assessment
- Deadline: Aug 12, 2025

### Phase 2: PoC Development (€20,000)
- Payment: €10,000 upfront + €10,000 after handover
- 12-week timeline from Oct 14, 2025
- B2C deliverables: image upload, AI classification, conversational recommendations, basic visualization (SDXL), demo cart
- B2B deliverables: Neo4j graph DB (500 SKUs), event tracking (PostHog/Segment), analytics dashboard (Metabase/Superset), demo manufacturer report
- Infrastructure costs NOT included (~€1,300-1,650/month on top)

---

## 2. Risk Assessment

### HIGH RISK: Code Access Refusal

The contractor is refusing to provide access to the codebase until full payment. This directly contradicts their own contract:

> **PoC Proposal, Section 4.3:** "All code and assets created during the PoC remain **client's property**. **Private Git repository with client access will be provided.**"

This clause does NOT condition access on full payment. The code is the client's property from creation, not upon final payment. The contractor's position is legally indefensible under their own terms.

**Recommendation:** Send a formal written request citing Section 4.3, requesting Git repository access within 5 business days. If refused, this constitutes a breach of contract and should be escalated to legal counsel.

**Why this matters:** Without code access, it is impossible to verify:
- Whether the contracted deliverables have actually been built
- Code quality and maintainability
- Whether the AI components are real implementations or placeholders
- Security and GDPR compliance
- Whether the architecture can support future development

### HIGH RISK: Timeline Overrun

- Contract signed: October 14, 2025
- Contracted duration: 12 weeks
- Expected delivery: ~January 2026
- Current date: March 29, 2026
- **Status: at least 2 months overdue** (unless timeline was formally extended in writing)

Per **Section 7.2** of the service agreement: "The timeline may be extended only upon mutual **written** agreement, with justified reasons provided by the requesting Party."

**Question for Rimantė:** Was there a written timeline extension? If not, the contractor is in breach.

### MEDIUM RISK: Acceptance Criteria Are Subjective

The KPIs in the Addendum sound concrete but are practically unenforceable:

| KPI | Issue |
|-----|-------|
| "≥75% realism match" | Who judges? How many judges? What's the methodology? |
| "≥70% user-rated relevance" | Same - no defined evaluation process |
| "≥80% user-rated clarity" | Same |
| "≥3 meaningful findings" (analytics) | What counts as "meaningful"? |
| "≥95% successful runs" | Over what time period? What counts as a "run"? |

Without a defined acceptance testing protocol, these KPIs become negotiation points rather than objective criteria.

### MEDIUM RISK: Infrastructure Cost Overengineering

The contracted infrastructure stack costs ~€1,300-1,650/month for a PoC serving 100 test sessions:

| Service | Contracted Cost | Realistic Alternative | Savings |
|---------|----------------|----------------------|---------|
| Neo4j Aura Professional | ~€400/mo | PostgreSQL + pgvector (Supabase free tier) | €400/mo |
| PostHog/Segment | ~€200-300/mo | PostHog free tier (1M events/mo) | €200-300/mo |
| Metabase Cloud | ~€100/mo | PostHog dashboards or simple admin page | €100/mo |
| Object storage | ~€50-100/mo | Supabase storage (free tier) | €50-100/mo |
| CDN | ~€50/mo | Vercel/Cloudflare (free) | €50/mo |
| GPU inference (SDXL) | ~€500-700/mo | FLUX Pro via FAL.AI (pay-per-image, ~€50-100/mo at PoC traffic) | €400-600/mo |
| **Total** | **€1,300-1,650/mo** | **~€50-200/mo** | **€1,100-1,450/mo** |

The infrastructure choices appear designed for a production-scale system, not a PoC with 500 products and 100 test sessions.

### MEDIUM RISK: Frontend Gap

The PoC contract explicitly states: "The PoC does not include full UI/UX design or visual branding."

However, Rimantė's vision (per her wireframes and the Manus AI deck) includes a complete, polished interface with:
- Full catalogue browsing with multi-dimensional filtering
- Design Studio with photo upload, product shelves, visualization
- User profiles (Owner/Designer modes)
- Orders management

**There is a significant gap between what is contracted (backend + minimal demo UI) and what Rimantė expects (a complete platform).** This misalignment needs to be addressed regardless of whether the current contractor continues.

### LOW RISK: Company Structure

- Service agreement signed by **1MAN-AI LTD** (UK, Reg. 16525486)
- Annex 1 of the planning contract signed by **APOLLEX LTD** (different company)
- Same contact person (Mindaugas Mažeika) operating from Kaunas, Lithuania
- UK shell company with Lithuanian operations is legal but worth noting

This is a common setup for Eastern European dev shops. Not inherently problematic, but means enforcement of UK company obligations may require cross-border legal action.

---

## 3. Cost Analysis

### Total Spend (Contracted)

| Item | Cost | Status |
|------|------|--------|
| Planning & Research spec | €2,000 | Paid, presumably delivered |
| PoC upfront payment | €10,000 | Paid |
| PoC final payment | €10,000 | Not yet paid |
| Infrastructure (~3 months) | ~€4,000-5,000 | Unclear if running |
| **Total committed** | **~€26,000-27,000** | |

### Value Assessment

For €22,000 in development fees, the deliverables should include:
- A working AI recommendation system
- Image analysis and visualization pipeline
- Product database with 500 SKUs
- Analytics dashboard
- Full documentation and deployment instructions
- Knowledge transfer (4-8h training)
- 2-week bugfix grace period

**At €20,000 for 12 weeks of PoC development, this is ~€1,670/week.** For a small agency, this is a reasonable rate IF the deliverables are met. The problem isn't the price - it's the execution (timeline overrun, access refusal).

---

## 4. Recommendations

### Immediate Actions

1. **Send formal request for Git access** citing Section 4.3. CC the SPG REIT legal contact. Set a 5 business day deadline.

2. **Request a status update** with specific deliverables checklist:
   - Is the Neo4j database set up with 500 SKUs?
   - Is the AI recommendation system functional?
   - Is the visualization pipeline working?
   - Is event tracking implemented?
   - Is the analytics dashboard operational?
   - Is there a deployed staging environment?

3. **Clarify timeline:** Was a written extension agreed? If not, document the delay.

### Before Making Final Payment

4. **Independent technical audit** of the codebase (requires Git access per point 1)
5. **Functional testing** against the acceptance criteria in the Addendum
6. **Verify infrastructure setup** - are the contracted services actually provisioned?
7. **Review deployment documentation** - can the system be deployed independently?

### Strategic Considerations

8. **Do not pay the remaining €10,000** until code access is provided and an independent review is completed. The contract supports this position.

9. **Consider whether to continue with this contractor** or build independently. Key factors:
   - How much has actually been built?
   - Is the code quality sufficient to build upon?
   - Is the relationship salvageable for ongoing collaboration?

10. **Regardless of contractor decision**, Rimantė needs to establish her own infrastructure accounts (cloud hosting, domain, etc.) so she owns the deployment, not just the code.

---

## 5. Key Contract Clauses to Reference

| Clause | Section | Use When |
|--------|---------|----------|
| Code is client's property | PoC 4.3 | Demanding repo access |
| Git repo access promised | PoC 4.3 | Demanding repo access |
| Timeline extension requires written agreement | Service 7.2 | Discussing delays |
| IP belongs to client | Service 3.1, PoC 4.3 | Any IP dispute |
| Provider guarantees feasibility within budget | Service 6.1 | If costs escalate |
| Unforeseen issues must be discussed before work | Service 6.2 | If they claim unexpected complexity |
| Lithuanian law governs | Service 8.1 | If escalation needed |
| Corrections up to 3 times at no cost | Service 5.4 | Planning spec issues |
