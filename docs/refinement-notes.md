# Refinement Notes — BodyMap AI

Initial review of the product prompt with a monetization lens. These are observations and questions, not decisions — flag what resonates.

## What's strong

- **Clear wedge.** The combination "navigable 3D atlas + secure imaging upload + AI segmentation + personalized overlay" is genuinely uncrowded. BioDigital/Visible Body don't do uploads. Report-readers don't do 3D. That's a real gap.
- **Two-portal framing.** Patient vs. clinician is the right axis — they have different willingness-to-pay and different distribution channels.
- **Phase 1 scope is honest.** Stubbing DICOM/segmentation but keeping the architecture real is the right call for a weekend. Most teams either over-promise or build a throwaway demo.
- **Privacy posture is front-and-center.** HIPAA/GDPR mention up front matters for credibility with both clinicians and investors.

## Risks & open questions

### Regulatory (the big one)
- The instant you map a real patient's pathology onto a 3D model and call it their finding, you are arguably making a **diagnostic claim**. In the US that can pull you into FDA SaMD (Software as a Medical Device) territory. The "educational only" disclaimer helps but isn't a force field.
- Safer initial framing: **"anatomy education + scan visualization"** — not "AI tells you what's wrong with you." Position the AI as explaining concepts, with the user/clinician interpreting their own scan. This is also a more defensible moat: you're a teaching tool, not a diagnostic.
- HIPAA: serverless de-identification is doable but you'll need a BAA with Anthropic (they offer one on enterprise tier) before any real PHI touches the API. Worth confirming early — it shapes pricing and architecture.

### Monetization paths to pressure-test
1. **B2C patient ($) — freemium.** Free atlas browsing, paywall on scan upload + personalized explanation. Risk: patient willingness-to-pay for one-off explanations is historically weak.
2. **B2B clinician ($$$) — per-seat SaaS.** "Explain findings to your patients in 30 seconds." This is the strongest near-term revenue path. Specialists (ortho, ophtho, neuro) already pay for patient-education tools. $50–150/provider/month is realistic.
3. **B2B2C health systems / telehealth ($$$$) — embedded.** Whitelabel into a telehealth platform's post-visit flow. Long sales cycle but huge ACV.
4. **Med-ed / training ($$).** Med schools, PA/NP programs, nursing. Less regulated, easier sale, smaller checks.

Recommendation: build Phase 1 as B2C-shaped (the demo is the marketing), but the **revenue motion is clinician SaaS**. Land with individual specialists first.

### Scope concerns for the weekend
- **15 regions × multiple pathologies × 2 modes** of hand-curated `bodyRegions.js` data is a lot of writing for one weekend. Consider: seed 5 regions with full data, generate the rest from Claude at build time and review, or generate on-demand and cache.
- The primitive 3D body will look very obviously like primitives. That's fine for an architecture demo but be ready for "this looks like a stick figure" feedback. Plan to swap in even a free Sketchfab CC model for any public demo.
- Model ID `claude-sonnet-4-20250514` in the spec — current production Sonnet for new builds is `claude-sonnet-4-6`. Suggest updating the function to use the latest before deploy.

### Things missing from the spec worth adding
- **Cost model.** Each Claude call is ~$0.01–0.03. At 1000 explanations/day = ~$300–900/mo. Cache aggressively by `(regionId, pathologyId, mode)` — most explanations are deterministic and don't need fresh generation per user.
- **Analytics.** Even Phase 1 should track: regions clicked, mode toggled, upload started/completed, explanation generated. PostHog free tier is enough.
- **Feedback loop.** Tiny "was this helpful?" thumbs in the InsightPanel. This is your eval data later.
- **Onboarding.** First-time visitors don't know to click the body. A 10-second guided tour or a pulsing hint on the heart would lift activation a lot.

## Suggested adjustments before building

1. **Reframe the product copy** away from "AI tells you what's in your scan" toward "Understand any part of your body, with AI." The scan upload becomes a power feature, not the headline. Lower regulatory risk, broader audience.
2. **Cache layer in the Netlify Function.** Key on `(regionId, pathologyId, mode)`. Use Netlify Blobs or Upstash Redis. Cost discipline from day one.
3. **Update the model** to `claude-sonnet-4-6` before deploy.
4. **Add a "Was this helpful?" widget** to every explanation. Free eval data.
5. **Pick one specialty for the demo body** — e.g., MSK (knee, shoulder, spine, hip). A demo that goes deep on one specialty is more compelling than one that's shallow across nine.

## Decisions — LOCKED

- **Framing:** anatomy education + scan visualization. AI explains concepts; the user/clinician interprets their scan. Lowers FDA SaMD risk; expands TAM.
- **Primary monetization:** B2B clinician SaaS. Land with individual specialists; expand to groups/health systems later.
- **Phase 1 demo specialty:** **Orthopedics** as primary (knee, shoulder, spine, hip). Neurology is a stretch goal — visually compelling but anatomy + pathology curation is heavier.
- **Caching:** in-memory/blob cache on `(regionId, pathologyId, mode)` for now. Defer Redis until traffic justifies it.
- **Cost exploration:** investigate local deployment + small language model (SLM) for the explanation tier as a cost-control path. Claude API stays the default for quality; SLM becomes a fallback or free-tier engine. Candidates to evaluate: Llama 3.1 8B, Phi-3, Qwen 2.5 7B via Ollama or llama.cpp. Decision criteria: medical-content quality at temp=0, latency under 3s on a modest GPU, JSON-mode reliability.

## Implications for the build

- **Copy pass:** strip "personalized pathology overlay" / "AI tells you what's in your scan" from headline language. Replace with "Understand your anatomy. Visualize your scan. Explain it to your patients in 30 seconds."
- **Phase 1 region list shrinks:** knee, shoulder, hip, lumbar spine, cervical spine, rotator cuff, ACL/meniscus, hand/wrist — ~8 ortho regions seeded deeply beats 15 shallow.
- **Clinician portal becomes the hero.** Patient portal exists for the demo / consumer marketing surface, but the polished flow is clinician → "explain this to my patient" → branded export.
- **Scan upload focus:** MSK MRI and X-ray (knee, shoulder, spine). Narrower segmentation problem when we get to Phase 2.
- **SLM track:** add a `lib/llm/` abstraction so the explanation provider is swappable (Claude API ↔ local Ollama endpoint). Keep prompts identical; only the transport changes.
