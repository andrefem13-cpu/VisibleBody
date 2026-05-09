---
tags: [project, bodymap-ai, healthtech, side-project]
created: 2026-05-09
status: active
---

# BodyMap AI

> Interactive 3D anatomy atlas with AI-powered explanations + (Phase 2) personal scan visualization. Ortho-first. B2B clinician SaaS wedge.

## One-liner
"Understand any part of your body, with AI. Explain any finding to your patient in 30 seconds."

## Locked decisions
- **Framing:** anatomy education + scan visualization (not diagnostic). Sidesteps FDA SaMD risk.
- **Revenue:** B2B clinician SaaS, individual specialists first ($50–150/provider/mo), expand to groups → health systems.
- **Demo specialty:** Orthopedics (knee, shoulder, hip, lumbar/cervical spine, ACL, wrist, ankle). Neuro = stretch.
- **Cache:** simple in-memory keyed on `(regionId, pathologyId, mode)`. Redis later.
- **Cost track:** swappable LLM provider — Claude API default, local Ollama (Llama 3.1 8B / Phi-3 / Qwen 2.5 7B) for SLM evaluation.

## Why it doesn't exist
- BioDigital / Visible Body: pre-built 3D, no AI, no uploads.
- Report-readers (ReadYourLab et al.): text only, no spatial context.
- Gap: navigable 3D + AI explanations + (Phase 2) personal scan overlay in one product.

## Wedge / GTM
1. Free public demo (the body) → marketing surface.
2. Clinician sign-up → "explain this to my patient" branded export.
3. Land specialists 1-by-1 on social + ortho conferences. Expand horizontally per-specialty.

## Risks
- **Regulatory.** Calling it "your finding" trips SaMD. Education framing is the firewall.
- **Quality.** Hallucinated medical content = lawsuit risk. Curate seed data, cache, eval against guidelines, ship "report issue" widget.
- **3D realism.** Phase 1 primitives are obviously primitives. Need a CC GLTF before any clinician demo.
- **Scan privacy.** BAA with Anthropic before any real PHI hits the API. De-id must be real (Phase 2), not just animated.

## Phase 1 scope
- Vite + R3F + Tailwind + Framer Motion
- Netlify Function wraps Claude API; key never in client
- 8 ortho regions seeded; 3D primitive body with hotspots
- Patient/Clinician portal toggle (different prompt schemas)
- Upload flow: animated de-id steps + mock segmentation + amber pulse overlay on body
- Mobile responsive; persistent disclaimer

## Phase 2 backlog
- Real GLTF anatomy model (NIH 3D Print Exchange / Sketchfab CC)
- Real DICOM parsing (dcmjs + cornerstone.js)
- Real segmentation (TotalSegmentator Docker / MedSAM API)
- Auth + "My Scans" (Clerk)
- Branded PDF export for clinicians (the actual paid feature)
- AR overlay (WebXR)
- FHIR R4 export hooks for EHR integration

## Cost model
- Claude Sonnet 4.5: ~$0.01–0.03/explanation. 1000/day ≈ $300–900/mo.
- Cache stable `(region, pathology, mode)` triples — most explanations are deterministic.
- SLM fallback for free tier or aggressive cost optimization.

## Repo
- GitHub: `andrefem13-cpu/visiblebody`
- Branch: `claude/review-product-idea-bqcc4`

## Next experiments
1. Stand up locally, hit Claude with all 8 ortho regions × 2 modes, sanity-check output quality.
2. Spike Ollama provider — same prompts, llama3.1:8b, eval JSON adherence and clinical accuracy at temp=0.
3. Find a CC GLTF anatomy model — swap into BodyMesh.jsx behind feature flag.
4. Curate 8 ortho regions with deeper pathology data (current schema is light).
5. Build the branded export flow — that's the actual paid feature for clinicians.

## Open questions
- BAA with Anthropic — what tier, what cost?
- Ortho-first beachhead specialty: which sub-specialty has highest willingness-to-pay? (Sports med? Spine surgery?)
- Pricing: per-seat vs. per-export vs. flat-rate practice license?
- Distribution: direct outbound to specialists, or partnership with PT clinic chain / radiology group?
