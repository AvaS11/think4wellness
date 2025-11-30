-- Add contrast_mode column to user_preferences table
ALTER TABLE public.user_preferences 
ADD COLUMN contrast_mode TEXT NOT NULL DEFAULT 'normal';

-- Add check constraint for valid contrast modes
ALTER TABLE public.user_preferences
ADD CONSTRAINT valid_contrast_mode CHECK (contrast_mode IN ('normal', 'high', 'extraHigh'));