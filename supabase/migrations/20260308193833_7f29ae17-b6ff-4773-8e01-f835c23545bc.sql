
-- Create profile storage bucket (public)
INSERT INTO storage.buckets (id, name, public)
VALUES ('profile', 'profile', true);

-- Allow public read access
CREATE POLICY "Public read access"
ON storage.objects FOR SELECT
TO public
USING (bucket_id = 'profile');

-- Allow anyone to upload (no auth required for this portfolio)
CREATE POLICY "Allow uploads"
ON storage.objects FOR INSERT
TO public
WITH CHECK (bucket_id = 'profile');

-- Allow anyone to update
CREATE POLICY "Allow updates"
ON storage.objects FOR UPDATE
TO public
USING (bucket_id = 'profile')
WITH CHECK (bucket_id = 'profile');

-- Allow anyone to delete
CREATE POLICY "Allow deletes"
ON storage.objects FOR DELETE
TO public
USING (bucket_id = 'profile');
