

# Plan: Integrate Supabase for Persistent Admin CRUD

## Current State
- All site data lives in `DataContext.tsx` with `localStorage` + an Express API (`server.js`) as persistence
- The Express server writes to a local JSON file (`data/site-data.json`) — this doesn't work in Lovable's hosted environment (no persistent filesystem)
- Admin edits are lost on deploy/refresh because `localStorage` is per-browser and the Express API isn't running in production

## Solution
Use **Lovable Cloud** (preferred, no external account needed) to create a Supabase backend with a single `site_data` table storing the entire JSON document. The `DataContext` will read/write to Supabase instead of `localStorage`/Express.

## Database Design

Single table approach (the site data is one JSON document):

```sql
CREATE TABLE public.site_data (
  id TEXT PRIMARY KEY DEFAULT 'main',
  data JSONB NOT NULL,
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- Seed with empty object so first GET works
INSERT INTO site_data (id, data) VALUES ('main', '{}');

-- RLS: anyone can read, only authenticated can write
ALTER TABLE public.site_data ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can read site data"
  ON public.site_data FOR SELECT
  USING (true);

CREATE POLICY "Authenticated users can update site data"
  ON public.site_data FOR UPDATE
  TO authenticated
  USING (true);

CREATE POLICY "Authenticated users can insert site data"
  ON public.site_data FOR INSERT
  TO authenticated
  WITH CHECK (true);
```

Since this is a personal portfolio with a simple password-based admin (no user accounts), we'll keep RLS open for SELECT (public site needs to read data) and use the anon key for reads. For writes, we'll use the anon key too (the admin password check remains client-side as per the existing design — the memory confirms this is intentional).

Simplified: **public read, public write** with the admin password gate remaining in the UI. This matches the current Express setup which has no auth either.

## Changes

### 1. Connect to Supabase (Lovable Cloud)
- Enable Supabase integration
- Create `site_data` table via migration

### 2. Update `DataContext.tsx`
- Replace Express `fetch("/api/site-data")` calls with Supabase client queries
- `loadRemote`: `supabase.from('site_data').select('data').eq('id', 'main').single()`
- `persistRemote`: `supabase.from('site_data').upsert({ id: 'main', data: next, updated_at: new Date().toISOString() })`
- Keep `localStorage` as offline fallback/cache (existing behavior)
- Keep `mergeWithDefaults` to handle partial data gracefully

### 3. Remove Express server dependency
- Delete `server.js` (no longer needed — Supabase replaces it)
- Update `package.json` to remove express dependency and any start scripts referencing server.js

### 4. No changes to AdminPage
- All admin editors already call `updatePersonal()`, `updateMetrics()`, etc. from DataContext
- Those functions call `persistRemote()` which will now go to Supabase
- The save flow is identical, just the backend changes

## Data Flow (after)
```text
AdminPage → updateX(data) → DataContext.update()
  → setData(next)           [React state]
  → saveData(next)           [localStorage cache]
  → persistRemote(next)      [Supabase upsert]

LandingPage → useSiteData() → DataContext
  → on mount: loadRemote()   [Supabase select]
  → fallback: localStorage   [if Supabase unavailable]
  → fallback: DEFAULT_DATA   [if nothing stored]
```

## First Step
Before implementing, I need to enable Supabase on this project. Shall I proceed with Lovable Cloud setup?

