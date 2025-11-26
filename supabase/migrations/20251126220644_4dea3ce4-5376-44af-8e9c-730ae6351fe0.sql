-- Add phone dependence tracker to user preferences
ALTER TABLE user_preferences 
ADD COLUMN phone_dependence_tracker_enabled boolean NOT NULL DEFAULT true;