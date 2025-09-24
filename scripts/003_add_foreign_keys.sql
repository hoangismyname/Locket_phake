-- Add foreign key constraints to establish proper relationships

-- Add foreign key constraint from posts to profiles
ALTER TABLE posts 
ADD CONSTRAINT posts_user_id_fkey 
FOREIGN KEY (user_id) REFERENCES profiles(id) ON DELETE CASCADE;

-- Add foreign key constraint from likes to profiles  
ALTER TABLE likes 
ADD CONSTRAINT likes_user_id_fkey 
FOREIGN KEY (user_id) REFERENCES profiles(id) ON DELETE CASCADE;

-- Add foreign key constraint from likes to posts
ALTER TABLE likes 
ADD CONSTRAINT likes_post_id_fkey 
FOREIGN KEY (post_id) REFERENCES posts(id) ON DELETE CASCADE;

-- Add foreign key constraint from comments to profiles
ALTER TABLE comments 
ADD CONSTRAINT comments_user_id_fkey 
FOREIGN KEY (user_id) REFERENCES profiles(id) ON DELETE CASCADE;

-- Add foreign key constraint from comments to posts
ALTER TABLE comments 
ADD CONSTRAINT comments_post_id_fkey 
FOREIGN KEY (post_id) REFERENCES posts(id) ON DELETE CASCADE;

-- Add foreign key constraint from follows to profiles (follower)
ALTER TABLE follows 
ADD CONSTRAINT follows_follower_id_fkey 
FOREIGN KEY (follower_id) REFERENCES profiles(id) ON DELETE CASCADE;

-- Add foreign key constraint from follows to profiles (following)
ALTER TABLE follows 
ADD CONSTRAINT follows_following_id_fkey 
FOREIGN KEY (following_id) REFERENCES profiles(id) ON DELETE CASCADE;
