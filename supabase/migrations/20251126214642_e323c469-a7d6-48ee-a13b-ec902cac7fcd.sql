-- Enable realtime for mood_logs and questionnaire_results tables
ALTER PUBLICATION supabase_realtime ADD TABLE public.mood_logs;
ALTER PUBLICATION supabase_realtime ADD TABLE public.questionnaire_results;