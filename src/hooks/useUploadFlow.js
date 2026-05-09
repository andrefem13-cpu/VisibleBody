import { useCallback, useState } from 'react';
import { delay } from '../lib/utils.js';
import { MOCK_SCAN_RESULTS } from '../data/mockScanResults.js';

export const DEIDENTIFY_STEPS = [
  { id: 'receive', label: 'File received securely', duration: 800 },
  { id: 'scan', label: 'Scanning for identifying information', duration: 1200 },
  { id: 'remove', label: 'Removing patient identifiers (PHI)', duration: 1000 },
  { id: 'verify', label: 'Verification complete', duration: 600 },
  { id: 'ready', label: 'Your scan is ready for analysis', duration: 400 },
];

const VALID_EXTENSIONS = ['.dcm', '.nii', '.gz', '.jpg', '.jpeg', '.png'];

function validateFile(file) {
  const name = file.name.toLowerCase();
  return VALID_EXTENSIONS.some((ext) => name.endsWith(ext));
}

// Phase 2 swap point: replace mock with real segmentation backend (TotalSegmentator/MedSAM).
async function runSegmentation(file, regionHint) {
  await delay(2800);
  return MOCK_SCAN_RESULTS[regionHint] ?? MOCK_SCAN_RESULTS.default;
}

export function useUploadFlow({ onComplete } = {}) {
  const [state, setState] = useState('idle'); // idle | uploading | deidentifying | segmenting | complete | error
  const [completedSteps, setCompletedSteps] = useState([]);
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);

  const start = useCallback(async (file, regionHint) => {
    setError(null);
    setResult(null);
    setCompletedSteps([]);

    if (!validateFile(file)) {
      setState('error');
      setError(new Error('Unsupported file type. Use DICOM (.dcm), NIfTI (.nii/.nii.gz), or standard image formats.'));
      return;
    }

    setState('uploading');
    await delay(400);

    setState('deidentifying');
    for (const step of DEIDENTIFY_STEPS) {
      await delay(step.duration);
      setCompletedSteps((prev) => [...prev, step.id]);
    }

    setState('segmenting');
    try {
      const seg = await runSegmentation(file, regionHint);
      setResult(seg);
      setState('complete');
      onComplete?.(seg);
    } catch (e) {
      setError(e);
      setState('error');
    }
  }, [onComplete]);

  const reset = useCallback(() => {
    setState('idle');
    setCompletedSteps([]);
    setResult(null);
    setError(null);
  }, []);

  return { state, completedSteps, result, error, start, reset };
}
