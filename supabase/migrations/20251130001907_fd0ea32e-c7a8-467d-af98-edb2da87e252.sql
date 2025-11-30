-- Add font_size column to user_preferences table
ALTER TABLE public.user_preferences 
ADD COLUMN font_size TEXT NOT NULL DEFAULT 'medium';

-- Add check constraint to ensure valid font sizes
ALTER TABLE public.user_preferences
ADD CONSTRAINT valid_font_size CHECK (font_size IN ('small', 'medium', 'large', 'extraLarge'));