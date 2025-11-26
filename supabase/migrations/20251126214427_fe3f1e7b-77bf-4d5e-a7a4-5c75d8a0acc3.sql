-- Create mood_logs table
CREATE TABLE public.mood_logs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  mood TEXT NOT NULL CHECK (mood IN ('great', 'good', 'okay', 'bad', 'terrible')),
  note TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS on mood_logs
ALTER TABLE public.mood_logs ENABLE ROW LEVEL SECURITY;

-- Create policies for mood_logs
CREATE POLICY "Users can view their own mood logs"
ON public.mood_logs
FOR SELECT
USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own mood logs"
ON public.mood_logs
FOR INSERT
WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own mood logs"
ON public.mood_logs
FOR UPDATE
USING (auth.uid() = user_id);

CREATE POLICY "Users can delete their own mood logs"
ON public.mood_logs
FOR DELETE
USING (auth.uid() = user_id);

-- Create questionnaire_results table
CREATE TABLE public.questionnaire_results (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  questionnaire_type TEXT NOT NULL CHECK (questionnaire_type IN ('anxiety', 'depression', 'focus', 'phone-habits')),
  score INTEGER NOT NULL,
  answers JSONB NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS on questionnaire_results
ALTER TABLE public.questionnaire_results ENABLE ROW LEVEL SECURITY;

-- Create policies for questionnaire_results
CREATE POLICY "Users can view their own questionnaire results"
ON public.questionnaire_results
FOR SELECT
USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own questionnaire results"
ON public.questionnaire_results
FOR INSERT
WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own questionnaire results"
ON public.questionnaire_results
FOR UPDATE
USING (auth.uid() = user_id);

CREATE POLICY "Users can delete their own questionnaire results"
ON public.questionnaire_results
FOR DELETE
USING (auth.uid() = user_id);

-- Create indexes for better query performance
CREATE INDEX idx_mood_logs_user_created ON public.mood_logs(user_id, created_at DESC);
CREATE INDEX idx_questionnaire_results_user_type_created ON public.questionnaire_results(user_id, questionnaire_type, created_at DESC);