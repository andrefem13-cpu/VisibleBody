// LLM provider abstraction.
// Default: Anthropic API. Swappable: local Ollama endpoint for SLM evaluation.
// Toggle via env: LLM_PROVIDER = "anthropic" | "ollama"

const Anthropic = require('@anthropic-ai/sdk');
const { PATIENT_SYSTEM_PROMPT, CLINICIAN_SYSTEM_PROMPT, buildUserMessage } = require('./_prompts.cjs');
const { REGION_BY_ID } = require('./_regions.cjs');

const ANTHROPIC_MODEL = 'claude-sonnet-4-5';

const cache = new Map();
const cacheKey = (regionId, pathologyId, mode) => `${regionId}::${pathologyId || 'default'}::${mode}`;

async function callAnthropic({ systemPrompt, userMessage }) {
  const client = new Anthropic.default({ apiKey: process.env.ANTHROPIC_API_KEY });
  const response = await client.messages.create({
    model: ANTHROPIC_MODEL,
    max_tokens: 1200,
    system: systemPrompt,
    messages: [{ role: 'user', content: userMessage }],
  });
  return response.content[0].text;
}

async function callOllama({ systemPrompt, userMessage }) {
  const url = process.env.OLLAMA_URL || 'http://localhost:11434/api/chat';
  const model = process.env.OLLAMA_MODEL || 'llama3.1:8b';
  const r = await fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      model,
      stream: false,
      format: 'json',
      messages: [
        { role: 'system', content: systemPrompt },
        { role: 'user', content: userMessage },
      ],
      options: { temperature: 0 },
    }),
  });
  const data = await r.json();
  return data.message?.content || '';
}

function parseJSON(text) {
  const cleaned = text.replace(/```json|```/g, '').trim();
  return JSON.parse(cleaned);
}

exports.handler = async (event) => {
  if (event.httpMethod !== 'POST') {
    return { statusCode: 405, body: 'Method Not Allowed' };
  }

  let payload;
  try {
    payload = JSON.parse(event.body || '{}');
  } catch {
    return { statusCode: 400, body: 'Invalid JSON' };
  }

  const { regionId, pathologyId, mode = 'patient', hasUpload = false, uploadContext } = payload;
  if (!regionId) return { statusCode: 400, body: 'regionId required' };

  const region = REGION_BY_ID[regionId];
  if (!region) return { statusCode: 404, body: `Unknown region: ${regionId}` };

  const pathology = pathologyId
    ? region.commonPathologies.find((p) => p.id === pathologyId)
    : region.commonPathologies[0];

  // Cache only stable (no scan context) responses.
  const key = cacheKey(regionId, pathology?.id, mode);
  if (!hasUpload && cache.has(key)) {
    return {
      statusCode: 200,
      headers: { 'Content-Type': 'application/json', 'X-Cache': 'HIT' },
      body: JSON.stringify(cache.get(key)),
    };
  }

  const systemPrompt = mode === 'clinician' ? CLINICIAN_SYSTEM_PROMPT : PATIENT_SYSTEM_PROMPT;
  const userMessage = buildUserMessage({
    regionLabel: region.label,
    pathologyName: pathology?.name,
    hasUpload,
    uploadContext,
  });

  const provider = process.env.LLM_PROVIDER === 'ollama' ? 'ollama' : 'anthropic';

  try {
    const raw = provider === 'ollama'
      ? await callOllama({ systemPrompt, userMessage })
      : await callAnthropic({ systemPrompt, userMessage });

    const parsed = parseJSON(raw);
    if (!hasUpload) cache.set(key, parsed);

    return {
      statusCode: 200,
      headers: { 'Content-Type': 'application/json', 'X-Cache': 'MISS', 'X-Provider': provider },
      body: JSON.stringify(parsed),
    };
  } catch (err) {
    console.error('explain error:', err);
    return {
      statusCode: 500,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ error: 'Failed to generate explanation', detail: String(err.message || err) }),
    };
  }
};
