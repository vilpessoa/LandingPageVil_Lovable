import express from "express";
import fs from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const PORT = Number(process.env.PORT || 4173);
const DATA_DIR = path.join(__dirname, "data");
const DATA_FILE = path.join(DATA_DIR, "site-data.json");
const DIST_DIR = path.join(__dirname, "dist");

const app = express();
app.use(express.json({ limit: "1mb" }));

async function ensureDataDir() {
  await fs.mkdir(DATA_DIR, { recursive: true });
}

app.get("/api/site-data", async (_req, res) => {
  try {
    const raw = await fs.readFile(DATA_FILE, "utf8");
    res.json(JSON.parse(raw));
  } catch {
    res.json({});
  }
});

app.put("/api/site-data", async (req, res) => {
  try {
    if (!req.body || typeof req.body !== "object") {
      return res.status(400).json({ ok: false, error: "invalid_payload" });
    }
    await ensureDataDir();
    await fs.writeFile(DATA_FILE, JSON.stringify(req.body, null, 2));
    return res.json({ ok: true });
  } catch {
    return res.status(500).json({ ok: false, error: "write_failed" });
  }
});

app.use(express.static(DIST_DIR));
app.get("*", (_req, res) => {
  res.sendFile(path.join(DIST_DIR, "index.html"));
});

app.listen(PORT, async () => {
  await ensureDataDir();
  console.log(`Server listening on http://localhost:${PORT}`);
});
