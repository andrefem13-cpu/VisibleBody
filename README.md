# BodyMap AI

Interactive 3D anatomy atlas with AI-powered explanations. Phase 1: orthopedics-first, scan upload stubbed-but-wired, swappable LLM provider (Claude API ↔ local Ollama).

- Spec: [`docs/bodymap-ai-spec.md`](docs/bodymap-ai-spec.md)
- Refinement notes & locked decisions: [`docs/refinement-notes.md`](docs/refinement-notes.md)

## Run locally

```bash
npm install
cp .env.example .env
# edit .env: add ANTHROPIC_API_KEY (or set LLM_PROVIDER=ollama)
npx netlify dev          # serves Vite + Functions on http://localhost:8888
```

`netlify dev` is required for the `/api/explain` function. Plain `npm run dev` will only serve the frontend; explanations will 404.

## Local SLM track (cost / privacy exploration)

```bash
# install Ollama: https://ollama.com
ollama pull llama3.1:8b
ollama serve

# in .env:
LLM_PROVIDER=ollama
OLLAMA_MODEL=llama3.1:8b
```

Same prompt schema; only the transport changes. Compare quality at temp=0 against Claude before committing to either as default.

## Deploy

Netlify auto-detects `netlify.toml`. Set `ANTHROPIC_API_KEY` in Netlify → Site → Environment Variables. Never commit it.

## Phase 1 scope

Real: 3D body, region click → Claude explanation, patient/clinician portals, scan upload UX with animated de-id, body overlay state, search, disclaimer, mobile layout, Netlify Function key protection, in-memory response cache.

Stubbed: DICOM parsing, segmentation, PHI removal (UI is real, processing is mocked).

## Branch

`claude/review-product-idea-bqcc4`
