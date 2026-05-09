// Phase 1 region dataset — orthopedics-first.
// Eight ortho regions seeded with 1-2 high-frequency pathologies each.
// Schema is stable; Phase 2 swaps stub fields for real GLTF node names + segmentation labels.

export const BODY_REGIONS = [
  {
    id: 'cervical-spine',
    label: 'Cervical Spine',
    system: 'orthopedics',
    position3D: { x: 0, y: 1.45, z: 0 },
    meshGroup: 'spine',
    commonPathologies: [
      {
        id: 'cervical-disc-herniation',
        name: 'Cervical Disc Herniation',
        icd10: 'M50.20',
        riskFactors: ['Age 30-50', 'Repetitive neck strain', 'Trauma', 'Smoking'],
        treatments: ['NSAIDs', 'Physical therapy', 'Epidural steroid injection', 'ACDF (surgical)'],
      },
    ],
  },
  {
    id: 'lumbar-spine',
    label: 'Lumbar Spine',
    system: 'orthopedics',
    position3D: { x: 0, y: 0.95, z: 0 },
    meshGroup: 'spine',
    commonPathologies: [
      {
        id: 'lumbar-disc-herniation',
        name: 'Lumbar Disc Herniation',
        icd10: 'M51.26',
        riskFactors: ['Heavy lifting', 'Sedentary work', 'Obesity', 'Age 30-50'],
        treatments: ['Activity modification', 'NSAIDs', 'PT', 'Epidural injection', 'Microdiscectomy'],
      },
      {
        id: 'spinal-stenosis',
        name: 'Lumbar Spinal Stenosis',
        icd10: 'M48.06',
        riskFactors: ['Age >60', 'Degenerative disc disease', 'Prior spine surgery'],
        treatments: ['PT', 'NSAIDs', 'Epidural steroid injection', 'Decompressive laminectomy'],
      },
    ],
  },
  {
    id: 'shoulder',
    label: 'Shoulder',
    system: 'orthopedics',
    position3D: { x: 0.36, y: 1.32, z: 0 },
    meshGroup: 'upper-limb',
    commonPathologies: [
      {
        id: 'rotator-cuff-tear',
        name: 'Rotator Cuff Tear',
        icd10: 'M75.10',
        riskFactors: ['Age >40', 'Overhead athletes', 'Repetitive overhead work', 'Trauma'],
        treatments: ['PT', 'NSAIDs', 'Subacromial injection', 'Arthroscopic repair'],
      },
    ],
  },
  {
    id: 'hip',
    label: 'Hip Joint',
    system: 'orthopedics',
    position3D: { x: 0.12, y: 0.85, z: 0 },
    meshGroup: 'lower-limb',
    commonPathologies: [
      {
        id: 'hip-osteoarthritis',
        name: 'Hip Osteoarthritis',
        icd10: 'M16.1',
        riskFactors: ['Age >50', 'Obesity', 'Prior hip injury', 'Developmental dysplasia'],
        treatments: ['Weight loss', 'PT', 'NSAIDs', 'Intra-articular injection', 'THA'],
      },
    ],
  },
  {
    id: 'knee',
    label: 'Knee Joint',
    system: 'orthopedics',
    position3D: { x: 0.12, y: 0.45, z: 0.05 },
    meshGroup: 'lower-limb',
    commonPathologies: [
      {
        id: 'knee-osteoarthritis',
        name: 'Knee Osteoarthritis',
        icd10: 'M17.1',
        riskFactors: ['Age >50', 'Obesity', 'Prior joint injury', 'Female sex'],
        treatments: ['PT', 'NSAIDs', 'Corticosteroid injection', 'Hyaluronic acid', 'TKA'],
      },
      {
        id: 'meniscus-tear',
        name: 'Meniscus Tear',
        icd10: 'S83.20',
        riskFactors: ['Pivoting sports', 'Age-related degeneration', 'Squatting/kneeling work'],
        treatments: ['RICE', 'PT', 'NSAIDs', 'Arthroscopic meniscectomy/repair'],
      },
    ],
  },
  {
    id: 'acl',
    label: 'ACL (Anterior Cruciate Ligament)',
    system: 'orthopedics',
    position3D: { x: 0.12, y: 0.46, z: 0.06 },
    meshGroup: 'lower-limb',
    commonPathologies: [
      {
        id: 'acl-tear',
        name: 'ACL Tear',
        icd10: 'S83.51',
        riskFactors: ['Pivoting sports (soccer, basketball, skiing)', 'Female sex', 'Prior ACL injury'],
        treatments: ['Bracing', 'PT', 'ACL reconstruction (BTB or hamstring graft)'],
      },
    ],
  },
  {
    id: 'wrist',
    label: 'Wrist & Hand',
    system: 'orthopedics',
    position3D: { x: 0.42, y: 0.78, z: 0 },
    meshGroup: 'upper-limb',
    commonPathologies: [
      {
        id: 'carpal-tunnel',
        name: 'Carpal Tunnel Syndrome',
        icd10: 'G56.00',
        riskFactors: ['Repetitive wrist motion', 'Pregnancy', 'Diabetes', 'Hypothyroidism'],
        treatments: ['Wrist splinting', 'NSAIDs', 'Corticosteroid injection', 'Carpal tunnel release'],
      },
    ],
  },
  {
    id: 'ankle',
    label: 'Ankle',
    system: 'orthopedics',
    position3D: { x: 0.12, y: 0.08, z: 0.05 },
    meshGroup: 'lower-limb',
    commonPathologies: [
      {
        id: 'ankle-sprain',
        name: 'Lateral Ankle Sprain',
        icd10: 'S93.40',
        riskFactors: ['Sports', 'Prior ankle sprain', 'Uneven terrain'],
        treatments: ['RICE', 'Bracing', 'PT', 'Surgical reconstruction (chronic instability)'],
      },
    ],
  },
];

export const REGION_BY_ID = Object.fromEntries(BODY_REGIONS.map((r) => [r.id, r]));
