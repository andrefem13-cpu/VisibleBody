// Stubbed segmentation results — Phase 2 replaces with real TotalSegmentator/MedSAM output.
// Keyed by regionId; `default` is the fallback when no region hint is provided.

export const MOCK_SCAN_RESULTS = {
  knee: {
    affectedRegions: [
      {
        regionId: 'knee',
        pathologyId: 'knee-osteoarthritis',
        severity: 'moderate',
        confidence: 0.86,
        description: 'Medial compartment joint space narrowing with subchondral sclerosis. Osteophyte formation at the medial femoral condyle.',
      },
    ],
  },
  shoulder: {
    affectedRegions: [
      {
        regionId: 'shoulder',
        pathologyId: 'rotator-cuff-tear',
        severity: 'moderate',
        confidence: 0.79,
        description: 'Full-thickness tear of the supraspinatus tendon at the footprint, ~1.2 cm retraction.',
      },
    ],
  },
  'lumbar-spine': {
    affectedRegions: [
      {
        regionId: 'lumbar-spine',
        pathologyId: 'lumbar-disc-herniation',
        severity: 'moderate',
        confidence: 0.82,
        description: 'Posterolateral disc protrusion at L4-L5 with mild left lateral recess narrowing.',
      },
    ],
  },
  default: {
    affectedRegions: [
      {
        regionId: 'knee',
        pathologyId: 'knee-osteoarthritis',
        severity: 'mild',
        confidence: 0.71,
        description: 'Mild degenerative changes detected. Region inferred from imaging modality.',
      },
    ],
  },
};
