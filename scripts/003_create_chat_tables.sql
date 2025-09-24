-- Create conversations table
CREATE TABLE IF NOT EXISTS public.conversations (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create conversation participants table
CREATE TABLE IF NOT EXISTS public.conversation_participants (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  conversation_id UUID NOT NULL REFERENCES public.conversations(id) ON DELETE CASCADE,
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  joined_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(conversation_id, user_id)
);

-- Create messages table
CREATE TABLE IF NOT EXISTS public.messages (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  conversation_id UUID NOT NULL REFERENCES public.conversations(id) ON DELETE CASCADE,
  sender_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  content TEXT NOT NULL,
  message_type TEXT DEFAULT 'text' CHECK (message_type IN ('text', 'image')),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable Row Level Security
ALTER TABLE public.conversations ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.conversation_participants ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.messages ENABLE ROW LEVEL SECURITY;

-- Conversations policies
CREATE POLICY "Users can view conversations they participate in" ON public.conversations FOR SELECT 
USING (
  EXISTS (
    SELECT 1 FROM public.conversation_participants 
    WHERE conversation_id = conversations.id AND user_id = auth.uid()
  )
);

CREATE POLICY "Users can create conversations" ON public.conversations FOR INSERT 
WITH CHECK (true);

-- Conversation participants policies
CREATE POLICY "Users can view participants of their conversations" ON public.conversation_participants FOR SELECT 
USING (
  EXISTS (
    SELECT 1 FROM public.conversation_participants cp2 
    WHERE cp2.conversation_id = conversation_participants.conversation_id AND cp2.user_id = auth.uid()
  )
);

CREATE POLICY "Users can add participants to conversations" ON public.conversation_participants FOR INSERT 
WITH CHECK (true);

-- Messages policies
CREATE POLICY "Users can view messages in their conversations" ON public.messages FOR SELECT 
USING (
  EXISTS (
    SELECT 1 FROM public.conversation_participants 
    WHERE conversation_id = messages.conversation_id AND user_id = auth.uid()
  )
);

CREATE POLICY "Users can send messages to their conversations" ON public.messages FOR INSERT 
WITH CHECK (
  auth.uid() = sender_id AND
  EXISTS (
    SELECT 1 FROM public.conversation_participants 
    WHERE conversation_id = messages.conversation_id AND user_id = auth.uid()
  )
);

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_conversation_participants_user_id ON public.conversation_participants(user_id);
CREATE INDEX IF NOT EXISTS idx_conversation_participants_conversation_id ON public.conversation_participants(conversation_id);
CREATE INDEX IF NOT EXISTS idx_messages_conversation_id ON public.messages(conversation_id);
CREATE INDEX IF NOT EXISTS idx_messages_created_at ON public.messages(created_at);
