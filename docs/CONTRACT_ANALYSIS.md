# Style Architect - Contract Analysis

Analysis of contracts between SPG REIT (Rimante) and 1MAN-AI LTD.

## 1. General Terms

Three documents, two engagements with the same company (1MAN-AI LTD, also signing as APOLLEX LTD on one doc - note inconsistency):

| Phase | Cost | What |
|-------|------|------|
| Planning & Research | €2,000 (paid upfront) | Technical specification document |
| PoC Development | €20,000 (50/50 split) | Working prototype |
| **Infra (ongoing)** | **~€1,300-1,650/mo** | **Not in dev budget** |

The contract structure is decent for a small agency deal. Fixed price, clear deliverables, acceptance criteria with KPIs.

## 2. Code Access - The Key Issue

**Great news for Rimante.** The PoC proposal is explicit:

> **Section 4.3:** "All code and assets created during the PoC remain **client's property**. **Private Git repository with client access will be provided.**"

This is contractually unambiguous. They **must** provide Git repo access. Unlike the first planning contract (where IP transfers "upon full payment"), the PoC contract states the code IS the client's property, and repo access is a deliverable.

**The dev company's position that they won't provide access until full payment directly contradicts their own contract.** She's already paid €10,000 upfront for the PoC. The contract doesn't say "access after final payment" - it says access will be provided, period.

**Recommendation:** Send them a polite email quoting Section 4.3 verbatim and request access immediately. If they resist, that's a breach of contract, not a negotiation.

## 3. How Well Is It Specced?

**Surprisingly well for a €20k PoC.** The addendum especially adds good detail.

### Strengths
- Clear "removed from scope" list (avoids scope creep arguments)
- Concrete KPIs with numeric targets (75% realism, ≤15s generation, etc.)
- Defined tech stack (Neo4j, SDXL, PostHog, Metabase)
- Client vs agency responsibilities split
- Infrastructure costs separated from dev budget

### Weaknesses / Gaps
- **No milestone payments tied to deliverables** - it's just 50/50, not "pay X when DB is ready, Y when AI works." This means she can't withhold partial payment for partial non-delivery
- **KPIs are subjective** - "≥70% user-rated relevance" and "≥75% realism match" - who rates? How many raters? What's the methodology? This is effectively unenforceable
- **"100 test sessions" is the client's responsibility** - but analytics acceptance requires those sessions. If she doesn't generate traffic, they can claim they couldn't demonstrate analytics
- **No penalty for late delivery** - 12 weeks from when? The contract is dated Oct 2025, so it should have been done ~Jan 2026. It's now March 2026. Are they late?
- **Frontend is explicitly excluded** ("no full UI/UX") but the mockups she showed us are full UI. There's a mismatch between her vision and what's contracted

## 4. Red Flags

### Company Name Inconsistency
- Service agreement signed by **1MAN-AI LTD** (UK company, Reg. 16525486)
- Annex 1 signed by **APOLLEX LTD** (different company name)
- Both use the same contact person (Mindaugas Mažeika) based in Kaunas, Lithuania
- A UK shell company with a Lithuanian operator is a common pattern for... flexibility. Not necessarily bad, but worth noting

### Timeline Concern
- PoC signed Oct 14, 2025, 12-week timeline = delivery ~Jan 2026
- It's now March 2026. **Are they 2+ months late?** Need to ask Rimante the actual status

### Overengineered Infrastructure for a PoC
The ~€1,300-1,650/month infrastructure costs seem high for what's needed:
- Neo4j Aura Professional at €400/mo for 500 items? Free tier would work
- PostHog free tier handles 1M events/month
- This looks like padding for recurring revenue or genuine overengineering

### Dummy Data vs Real Data
- Contract says 500 dummy SKUs. Real data is client's responsibility
- But the whole point is to demo to manufacturers with THEIR products. Dummy data demos are much less convincing
- Need to clarify: is there real data loaded or is it all fake?

### Signer Mismatch
- Service agreement: client signs as SPG REIT, which makes sense
- PoC proposal: e-signed by **Žilvinas Skardžius** (not Rimante) on behalf of SPG REIT
- Who is Žilvinas? Co-founder? Director? This affects who has decision-making authority

## 5. Key Questions for the Meeting

1. **"Has the first €10k been paid? Has any additional payment been made?"**
2. **"What's the current delivery status? The 12 weeks ended ~January."**
3. **"Have you seen a deployed version? Can you log in to anything?"**
4. **"Quote Section 4.3 - have you asked them for Git access citing this clause?"**
5. **"Who is building the frontend? The PoC explicitly excludes UI/UX."**
6. **"Who is APOLLEX LTD and why are they signing alongside 1MAN-AI?"**
7. **"Who is Žilvinas Skardžius who e-signed the PoC?"**
8. **"Is any real product data loaded, or is it all dummy/fake?"**
9. **"What's the monthly infrastructure spend so far?"**
