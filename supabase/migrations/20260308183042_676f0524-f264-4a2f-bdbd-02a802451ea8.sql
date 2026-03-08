
-- Create site_data table for portfolio content management
CREATE TABLE public.site_data (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  section TEXT NOT NULL UNIQUE,
  content JSONB NOT NULL DEFAULT '{}'::jsonb,
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.site_data ENABLE ROW LEVEL SECURITY;

-- Public read access (portfolio is public)
CREATE POLICY "Anyone can read site data"
  ON public.site_data
  FOR SELECT
  TO anon, authenticated
  USING (true);

-- Allow all writes for now (admin uses client-side password gate)
CREATE POLICY "Allow all inserts"
  ON public.site_data
  FOR INSERT
  TO anon, authenticated
  WITH CHECK (true);

CREATE POLICY "Allow all updates"
  ON public.site_data
  FOR UPDATE
  TO anon, authenticated
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Allow all deletes"
  ON public.site_data
  FOR DELETE
  TO anon, authenticated
  USING (true);
