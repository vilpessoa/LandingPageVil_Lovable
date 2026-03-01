import express from 'express';
import { readFileSync, writeFileSync, mkdirSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));

const PORT = process.env.PORT || 4173;
const DIST_DIR = join(__dirname, './dist');
const DATA_DIR = join(__dirname, './data');
const DATA_FILE = join(DATA_DIR, 'site-data.json');

// Boot: ensure data directory exists
mkdirSync(DATA_DIR, { recursive: true });

const app = express();
app.use(express.json({ limit: '1mb' }));

// ── API ──────────────────────────────────────────────────────────────────────

/**
 * GET /api/site-data
 * Returns persisted JSON or {} on any error / missing file.
 */
app.get('/api/site-data', (_req, res) => {
  try {
    const raw = readFileSync(DATA_FILE, 'utf-8');
    const parsed = JSON.parse(raw);
    res.json(parsed);
  } catch {
    res.status(200).json({});
  }
});

/**
 * PUT /api/site-data
 * Overwrites site-data.json with the full body.
 */
app.put('/api/site-data', (req, res) => {
  const body = req.body;
  if (!body || typeof body !== 'object' || Array.isArray(body)) {
    return res.status(400).json({ ok: false, error: 'invalid_payload' });
  }
  try {
    writeFileSync(DATA_FILE, JSON.stringify(body, null, 2), 'utf-8');
    return res.json({ ok: true });
  } catch {
    return res.status(500).json({ ok: false, error: 'write_failed' });
  }
});

// ── Static SPA ───────────────────────────────────────────────────────────────

app.use(express.static(DIST_DIR));

// SPA fallback — any non-API GET returns index.html
app.get('*', (_req, res) => {
  res.sendFile(join(DIST_DIR, 'index.html'));
});

// ── Start ────────────────────────────────────────────────────────────────────

app.listen(PORT, () => {
  console.log(`Server listening on http://localhost:${PORT}`);
});
