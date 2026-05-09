import { useCallback, useState } from 'react';

export function useBodyMapAI() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const explain = useCallback(async ({ regionId, pathologyId, mode, hasUpload = false, uploadContext }) => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch('/api/explain', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ regionId, pathologyId, mode, hasUpload, uploadContext }),
      });
      if (!res.ok) {
        const detail = await res.text();
        throw new Error(`Explain failed (${res.status}): ${detail}`);
      }
      const json = await res.json();
      setData(json);
      return json;
    } catch (e) {
      setError(e);
      throw e;
    } finally {
      setLoading(false);
    }
  }, []);

  const reset = useCallback(() => {
    setData(null);
    setError(null);
  }, []);

  return { data, loading, error, explain, reset };
}
