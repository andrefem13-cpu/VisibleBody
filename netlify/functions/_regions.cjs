// Server-side mirror of src/data/bodyRegions.js — keep in sync.
// Only the fields the function needs (id, label, pathology id/name).

const BODY_REGIONS = [
  { id: 'cervical-spine', label: 'Cervical Spine', commonPathologies: [{ id: 'cervical-disc-herniation', name: 'Cervical Disc Herniation' }] },
  { id: 'lumbar-spine', label: 'Lumbar Spine', commonPathologies: [
    { id: 'lumbar-disc-herniation', name: 'Lumbar Disc Herniation' },
    { id: 'spinal-stenosis', name: 'Lumbar Spinal Stenosis' },
  ]},
  { id: 'shoulder', label: 'Shoulder', commonPathologies: [{ id: 'rotator-cuff-tear', name: 'Rotator Cuff Tear' }] },
  { id: 'hip', label: 'Hip Joint', commonPathologies: [{ id: 'hip-osteoarthritis', name: 'Hip Osteoarthritis' }] },
  { id: 'knee', label: 'Knee Joint', commonPathologies: [
    { id: 'knee-osteoarthritis', name: 'Knee Osteoarthritis' },
    { id: 'meniscus-tear', name: 'Meniscus Tear' },
  ]},
  { id: 'acl', label: 'ACL', commonPathologies: [{ id: 'acl-tear', name: 'ACL Tear' }] },
  { id: 'wrist', label: 'Wrist & Hand', commonPathologies: [{ id: 'carpal-tunnel', name: 'Carpal Tunnel Syndrome' }] },
  { id: 'ankle', label: 'Ankle', commonPathologies: [{ id: 'ankle-sprain', name: 'Lateral Ankle Sprain' }] },
];

const REGION_BY_ID = Object.fromEntries(BODY_REGIONS.map((r) => [r.id, r]));

module.exports = { BODY_REGIONS, REGION_BY_ID };
