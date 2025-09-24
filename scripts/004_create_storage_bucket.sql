-- Create storage bucket for posts
INSERT INTO storage.buckets (id, name, public) VALUES ('posts', 'posts', true);

-- Set up RLS policies for the posts bucket
CREATE POLICY "Users can upload their own images" ON storage.objects
  FOR INSERT WITH CHECK (bucket_id = 'posts' AND auth.uid()::text = (storage.foldername(name))[1]);

CREATE POLICY "Images are publicly accessible" ON storage.objects
  FOR SELECT USING (bucket_id = 'posts');

CREATE POLICY "Users can delete their own images" ON storage.objects
  FOR DELETE USING (bucket_id = 'posts' AND auth.uid()::text = (storage.foldername(name))[1]);
