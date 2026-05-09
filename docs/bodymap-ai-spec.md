# BodyMap AI — Product Prompt + Weekend Build Handoff

---

## PART 1: REFINED PRODUCT PROMPT
*Use this for pitches, Midjourney mockups, co-founder convos, or feeding into any AI generator.*

---

**BodyMap AI** is the "Google Maps of the human body" — an interactive, AI-powered 3D anatomy atlas that explains what's happening inside you using your own medical imaging.

Users navigate a photorealistic, rotatable human body, click any organ or structure, and instantly receive an AI-generated explanation: what healthy looks like, what common disease looks like, and — if they've uploaded their own scan — what *their* body shows, directly overlaid on the map.

**The core loop:**
1. Click (or search) any body region
2. AI generates a split-panel: normal anatomy vs. common pathology, in plain language or clinical depth
3. Optionally: upload a real scan (MRI/CT/X-ray) → AI de-identifies, segments, and maps *your* pathology onto the same 3D model
4. Share an anonymized view with your doctor — or use it as a doctor to explain a finding to your patient in real time

**Two portals, one body:**
- **Patient Portal** — colorful, welcoming, plain-language explanations, AR overlay mode, "My Scans" personal history
- **Clinician Portal** — dark professional theme, measurement tools, bulk review, exportable de-identified reports, EHR integration hooks

**Coverage:** Every major specialty — neurology, cardiology, orthopedics, ophthalmology, oncology, endocrinology, pulmonology, GI, derm — 100+ conditions from cells to whole-organ level.

**Privacy architecture:** Automatic HIPAA/GDPR-compliant de-identification on upload. Ephemeral processing. User-controlled deletion. Clear AI disclaimer on every view.

**Why it doesn't exist yet:** BioDigital and Visible Body have beautiful pre-built 3D models. AI report readers like ReadYourLab exist. Nothing combines the full navigable 3D atlas + secure patient imaging upload + AI segmentation + personalized pathology overlay in one product.

**Stack vision:** React + React Three Fiber (3D), Claude API (AI explanations), TotalSegmentator / MedSAM (DICOM segmentation), MONAI (medical imaging AI), Netlify / Vercel (deploy).

---

## PART 2: WEEKEND BUILD HANDOFF
*For Codex, Claude Code, or any AI coding agent. This is a foundation build — real architecture, real AI, DICOM stubbed-but-wired.*

---

### MISSION STATEMENT FOR THE BUILD

Build a working React web application called **BodyMap AI**. The goal is a real, deployable foundation — not a mockup. By the end of this build:

- A user can navigate a 3D human body, click regions, and get real Claude-powered explanations
- A user can upload a medical image and see a simulated (stubbed) de-identification + segmentation flow with pathology overlay on the body
- A clinician can toggle to professional mode for deeper content
- The app is deployed on Netlify with API key protection via serverless function

DICOM processing is **architecturally correct but stubbed** — the UI, data flow, and component contracts are all real. Dropping in TotalSegmentator or MedSAM later is a backend swap, not a rebuild.

---

### TECH STACK — DECISIONS MADE, DO NOT DEVIATE

| Layer | Choice | Why |
|---|---|---|
| Framework | React + Vite | Speed, Andre's existing comfort zone |
| 3D | React Three Fiber + @react-three/drei | Best React 3D DX; Three.js underneath |
| Styling | Tailwind CSS + CSS variables | Utility + design token control |
| Animation | Framer Motion | Portal transitions, panel reveals |
| AI | Claude claude-sonnet-4-20250514 via Netlify Function | API key never exposed to client |
| Upload | react-dropzone | Simple, proven |
| Deploy | Netlify | Andre is connected; Functions handle secrets |
| Icons | lucide-react | Clean, consistent |

---

### PHASE 1 BUILD SCOPE (This Weekend)

#### Build Real
- Full app shell, routing, portal toggle
- 3D body viewer (React Three Fiber) with clickable body regions using primitive geometries + labeled hotspots
- Claude API integration: click region → real AI explanation in patient/clinician voice
- Insight panel: split-screen normal vs. pathology description, progressive reveal
- Upload flow: drag-and-drop → animated de-identification progress → stubbed segmentation → overlay state on body
- Search bar with autocomplete from body region list
- Netlify Function wrapping Claude API (protects key)
- Netlify deploy config
- Disclaimer banner (persistent, dismissible once per session)
- Mobile-responsive layout

#### Stub (Architecturally Real, Data Fake)
- DICOM parsing — accept file, validate extension, stub the parse result with realistic mock data
- AI segmentation — simulate processing delay + return mock segmentation regions
- PHI de-identification — UI shows real progress steps, but uses mock confirmation
- AR overlay — placeholder component with correct prop contract

#### Do NOT Build Yet (Phase 2+)
- Real DICOM/NIfTI parsing (dcmjs, cornerstone.js)
- Real segmentation (TotalSegmentator API call)
- Auth / user accounts
- "My Scans" persistent storage
- EHR integration
- Sharing / export

---

### FILE STRUCTURE

```
bodymap-ai/
├── public/
│   ├── models/                    # GLTF models (placeholder; add real anatomy GLTF here)
│   └── favicon.svg
├── src/
│   ├── components/
│   │   ├── BodyViewer/
│   │   │   ├── BodyViewer.jsx     # R3F Canvas wrapper, camera controls
│   │   │   ├── BodyMesh.jsx       # 3D primitives representing body regions, click handlers
│   │   │   ├── RegionHotspot.jsx  # Html overlay (drei Html) — labeled dot per region
│   │   │   └── ScanOverlay.jsx    # Glowing overlay mesh shown after scan upload
│   │   ├── InsightPanel/
│   │   │   ├── InsightPanel.jsx   # Right-side panel, mounts when region selected
│   │   │   ├── SplitView.jsx      # Normal vs Pathology cards
│   │   │   ├── PortalContent.jsx  # Renders patient vs clinician content
│   │   │   └── LoadingSkeleton.jsx
│   │   ├── UploadFlow/
│   │   │   ├── UploadModal.jsx    # Full-screen upload modal
│   │   │   ├── DropZone.jsx       # react-dropzone zone
│   │   │   ├── DeidentifySteps.jsx # Animated step progress: Received → Scanning PHI → Removed → Ready
│   │   │   └── SegmentationProgress.jsx # "Analyzing your scan..." animated progress
│   │   ├── SearchBar.jsx          # Fuzzy search over BODY_REGIONS, fires selectRegion
│   │   ├── PortalToggle.jsx       # Patient / Clinician pill toggle
│   │   ├── Header.jsx
│   │   ├── DisclaimerBanner.jsx
│   │   └── MobileNav.jsx
│   ├── hooks/
│   │   ├── useBodyMapAI.js        # Calls /api/explain, manages loading/error/response state
│   │   └── useUploadFlow.js       # Upload state machine: idle → uploading → deidentifying → segmenting → complete
│   ├── data/
│   │   ├── bodyRegions.js         # Full region dataset (see schema below)
│   │   └── mockScanResults.js     # Stubbed segmentation results per region
│   ├── lib/
│   │   ├── prompts.js             # System prompts for patient + clinician modes
│   │   └── utils.js
│   ├── App.jsx
│   ├── main.jsx
│   └── index.css                  # Tailwind directives + CSS custom properties
├── netlify/
│   └── functions/
│       └── explain.js             # Netlify serverless function — calls Claude API
├── netlify.toml
├── vite.config.js                 # Proxy /api → /.netlify/functions in dev
└── package.json
```

---

### DATA SCHEMA: bodyRegions.js

```javascript
// Every clickable region follows this contract
export const BODY_REGIONS = [
  {
    id: "retina",
    label: "Retina",
    system: "ophthalmology",
    position3D: { x: 0.08, y: 1.62, z: 0.12 },  // R3F world coords on body mesh
    meshGroup: "head",
    commonPathologies: [
      {
        id: "diabetic-retinopathy",
        name: "Diabetic Retinopathy",
        icd10: "E11.3",
        patientSummary: "Damage to the tiny blood vessels in the back of your eye caused by high blood sugar over time.",
        clinicianSummary: "Non-proliferative/proliferative DR — microaneurysms, intraretinal hemorrhages, neovascularization. Classified by ETDRS scale.",
        riskFactors: ["Type 1/2 diabetes", "Poor glycemic control", "Hypertension", "Duration of diabetes"],
        treatments: ["Anti-VEGF injections", "Laser photocoagulation", "Vitrectomy (advanced)"],
        progressionStages: ["Mild NPDR", "Moderate NPDR", "Severe NPDR", "PDR"],
        normalDescription: "Uniform retinal vasculature, sharp optic disc margins, no hemorrhages or exudates.",
        pathologyDescription: "Dot and blot hemorrhages, hard exudates, cotton wool spots, neovascularization at disc or elsewhere.",
      },
    ]
  },
  {
    id: "knee",
    label: "Knee Joint",
    system: "orthopedics",
    position3D: { x: 0.1, y: 0.52, z: 0.05 },
    meshGroup: "lower-limb",
    commonPathologies: [
      {
        id: "osteoarthritis",
        name: "Osteoarthritis",
        icd10: "M17.1",
        patientSummary: "Wearing down of the smooth cartilage that cushions your knee, causing pain and stiffness.",
        clinicianSummary: "Tricompartmental or focal cartilage loss, subchondral sclerosis, osteophyte formation, joint space narrowing. Kellgren-Lawrence grading I-IV.",
        riskFactors: ["Age >50", "Obesity", "Prior joint injury", "Female sex"],
        treatments: ["PT/exercise", "NSAIDs", "Intra-articular corticosteroids", "Hyaluronic acid", "TKA"],
        progressionStages: ["Grade I (doubtful)", "Grade II (minimal)", "Grade III (moderate)", "Grade IV (severe)"],
        normalDescription: "Full joint space, smooth femoral and tibial articular surfaces, intact menisci.",
        pathologyDescription: "Narrowed joint space, subchondral sclerosis, osteophyte formation at joint margins, possible loose bodies.",
      }
    ]
  },
  // Minimum 15 regions at launch:
  // brain, heart, lungs, liver, kidney, spine, shoulder, hip, knee, retina,
  // skin, thyroid, colon, prostate/uterus, coronary arteries
]
```

---

### BODY VIEWER: 3D APPROACH

**Phase 1 implementation** — use primitive R3F geometries arranged anatomically. This is intentional: it demonstrates the architecture cleanly, is fully interactive, and can be swapped for a real GLTF without touching any other component.

```jsx
// BodyMesh.jsx — Phase 1 primitive body
// Each region is a clickable mesh. On click: fires onRegionSelect(regionId)
// Hovered: emissive glow. Selected: persistent highlight.

// Body primitives (approximate anatomical positions in world units):
// Head: SphereGeometry at y=1.7
// Torso: BoxGeometry/CylinderGeometry at y=1.1, scaled appropriately
// Upper arms: CylinderGeometry at x=±0.35, y=1.2
// Forearms: CylinderGeometry at x=±0.35, y=0.85
// Thighs: CylinderGeometry at x=±0.12, y=0.55
// Calves: CylinderGeometry at x=±0.12, y=0.2
// Specific organs: smaller spheres/geometries at correct position3D from bodyRegions data

// TODO Phase 2: Replace with real GLTF
// import { useGLTF } from '@react-three/drei'
// const { nodes, materials } = useGLTF('/models/human-anatomy.glb')
// Each named node maps to a region ID from BODY_REGIONS
```

Camera setup: `OrbitControls` with polar angle limits (no upside down). Initial camera at z=3, y=0.9 (full body view). On region select: smooth camera tween toward that region's position3D.

---

### CLAUDE API INTEGRATION

#### Netlify Function: `netlify/functions/explain.js`

```javascript
// Called by client as POST /api/explain
// Body: { regionId, pathologyId, mode: "patient" | "clinician", hasUpload: boolean, uploadContext?: string }
// Returns: { explanation, normalVsPathology, keyPoints, redFlags? }

const Anthropic = require("@anthropic-ai/sdk");

exports.handler = async (event) => {
  const { regionId, pathologyId, mode, hasUpload, uploadContext } = JSON.parse(event.body);

  const client = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY });

  const systemPrompt = mode === "clinician" ? CLINICIAN_SYSTEM_PROMPT : PATIENT_SYSTEM_PROMPT;

  const userMessage = buildUserMessage({ regionId, pathologyId, hasUpload, uploadContext });

  const response = await client.messages.create({
    model: "claude-sonnet-4-20250514",
    max_tokens: 1000,
    system: systemPrompt,
    messages: [{ role: "user", content: userMessage }],
  });

  // Parse structured JSON from Claude response
  const content = response.content[0].text;
  const parsed = JSON.parse(content.replace(/```json|```/g, "").trim());

  return {
    statusCode: 200,
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(parsed),
  };
};
```

#### Prompts: `src/lib/prompts.js`

```javascript
export const PATIENT_SYSTEM_PROMPT = `
You are BodyMap AI — an empathetic medical educator helping patients understand their anatomy and health conditions.

ALWAYS respond with valid JSON only. No markdown, no preamble. Schema:
{
  "regionName": string,
  "pathologyName": string,
  "headline": string,
  "normalExplanation": string,
  "pathologyExplanation": string,
  "keyPoints": string[],
  "commonSymptoms": string[],
  "whenToSeekHelp": string,
  "hopefulNote": string,
  "disclaimer": "This is for educational purposes only. Always consult your doctor."
}

Tone: warm, clear, empowering. Never alarm unnecessarily. Use analogies patients can visualize.
If the user has uploaded a scan, personalize the explanation to their specific finding (context provided).
`;

export const CLINICIAN_SYSTEM_PROMPT = `
You are BodyMap AI in Clinician Mode — a clinical reference assistant for healthcare professionals.

ALWAYS respond with valid JSON only. No markdown, no preamble. Schema:
{
  "regionName": string,
  "pathologyName": string,
  "icd10": string,
  "headline": string,
  "normalExplanation": string,
  "pathologyExplanation": string,
  "keyPoints": string[],
  "diagnosticCriteria": string[],
  "treatmentOptions": string[],
  "redFlags": string[],
  "differentialDiagnosis": string[],
  "references": string[]
}

Tone: precise, efficient, evidence-based. Assume clinical training. This is a decision-support reference, not a diagnostic tool.
`;
```

---

### UPLOAD FLOW STATE MACHINE

```javascript
// useUploadFlow.js
// States: idle → uploading → deidentifying → segmenting → complete → error

const DEIDENTIFY_STEPS = [
  { id: "receive", label: "File received securely", duration: 800 },
  { id: "scan", label: "Scanning for identifying information", duration: 1200 },
  { id: "remove", label: "Removing patient identifiers (PHI)", duration: 1000 },
  { id: "verify", label: "Verification complete", duration: 600 },
  { id: "ready", label: "Your scan is ready for analysis", duration: 400 },
];

// Mock segmentation contract — Phase 2 swaps in TotalSegmentator
async function runSegmentation(file, regionHint) {
  await delay(2800);
  return MOCK_SCAN_RESULTS[regionHint] ?? MOCK_SCAN_RESULTS.default;
}
```

---

### DESIGN SYSTEM

**Aesthetic Direction:** Medical precision meets consumer warmth. Dark background (deep navy `#0a0f1e`), luminous teal/cyan accents (`#00d4c8`) for interactive elements, warm amber (`#f5a623`) for pathology highlights. Body model glows soft blue-white. Scan overlays pulse warm amber. **DM Sans** body, **Space Mono** for data/codes.

```css
:root {
  --bg-primary: #0a0f1e;
  --bg-secondary: #111827;
  --bg-panel: #0d1526;
  --bg-panel-border: #1e2d45;
  --accent-teal: #00d4c8;
  --accent-teal-dim: #00d4c820;
  --accent-amber: #f5a623;
  --accent-amber-dim: #f5a62320;
  --text-primary: #f0f4ff;
  --text-secondary: #8b9abb;
  --text-muted: #4a5568;
  --body-glow: #4db8ff;
  --pathology-glow: #f5a623;
  --normal-glow: #00d4c8;
  --portal-patient: #00d4c8;
  --portal-clinician: #7c6af7;
}
```

**Layout:** Full-viewport canvas left (70%), slide-in panel right (30%). Mobile: stacked — body viewer top (50vh), panel scrollable below.

---

### NETLIFY CONFIG

```toml
[build]
  command = "npm run build"
  publish = "dist"
  functions = "netlify/functions"

[dev]
  command = "npm run dev"
  port = 5173
  targetPort = 5173

[[redirects]]
  from = "/api/*"
  to = "/.netlify/functions/:splat"
  status = 200
```

```javascript
// vite.config.js — proxy /api in local dev
export default {
  server: {
    proxy: {
      '/api': {
        target: 'http://localhost:8888/.netlify/functions',
        rewrite: (path) => path.replace(/^\/api/, ''),
      }
    }
  }
}
```

**Env var:** `ANTHROPIC_API_KEY` set in Netlify dashboard. Never in client code.

---

### PACKAGE.JSON DEPENDENCIES

```json
{
  "dependencies": {
    "@anthropic-ai/sdk": "^0.40.0",
    "@react-three/drei": "^9.x",
    "@react-three/fiber": "^8.x",
    "framer-motion": "^11.x",
    "lucide-react": "^0.383.0",
    "react": "^18.x",
    "react-dom": "^18.x",
    "react-dropzone": "^14.x",
    "three": "^0.165.x"
  },
  "devDependencies": {
    "@vitejs/plugin-react": "^4.x",
    "autoprefixer": "^10.x",
    "netlify-cli": "^17.x",
    "postcss": "^8.x",
    "tailwindcss": "^3.x",
    "vite": "^5.x"
  }
}
```

---

### BUILD ORDER

1. Scaffold — Vite React app, deps, Tailwind, CSS vars
2. Data layer — `bodyRegions.js` (15+ regions), `mockScanResults.js`, `prompts.js`
3. Netlify Function — `explain.js`, `netlify.toml`, vite proxy
4. `useBodyMapAI` hook
5. `useUploadFlow` hook
6. BodyViewer (R3F)
7. InsightPanel
8. PortalToggle + SearchBar
9. UploadFlow modal
10. DisclaimerBanner
11. App.jsx wiring
12. Polish — animations, mobile, skeletons
13. Deploy — `netlify deploy --prod`

---

### PHASE 2 ROADMAP

| Feature | What's Needed | Effort |
|---|---|---|
| Real GLTF anatomy | License/CC model from NIH 3D Print Exchange or Sketchfab | 1d |
| Real DICOM parsing | `dcmjs` + `cornerstone.js` | 2-3d |
| Real segmentation | TotalSegmentator Docker or MedSAM API | 3-5d |
| Auth + My Scans | Clerk or Netlify Identity | 2-3d |
| AR overlay | WebXR API | 3-4d |
| EHR hooks | FHIR R4 ImagingStudy export | 5+d |
| Voice narration | Web Speech / ElevenLabs | 1d |

---

### KEY CONSTRAINTS

- **Never** put `ANTHROPIC_API_KEY` in any client-side file
- **All** Claude responses parsed as JSON with try/catch fallback
- **Every** medical content view renders the disclaimer
- 3D body must work on mobile (`touch-action: none`, OrbitControls touch enabled)
- Upload modal must show: *"Your file is processed securely and never stored without your consent."*
- Clinician mode content gated by portal toggle — never mixed in patient mode

---

### SUCCESS CRITERIA — PHASE 1

- [ ] App loads, 3D body renders, controls work desktop + mobile
- [ ] Click region → InsightPanel with real Claude content
- [ ] Patient/Clinician toggle changes tone + depth
- [ ] Search finds and selects regions
- [ ] Upload modal: file → animated de-id → overlay on body
- [ ] Netlify function proxies Claude — key not in client bundle
- [ ] Deployed and reachable via Netlify URL
- [ ] Disclaimer always visible
