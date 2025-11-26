import { useEffect, useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Heart, Brain, AlertCircle, Focus } from "lucide-react";

interface MissingDataPromptsProps {
  userId: string;
  preferences: {
    mood_tracker_enabled: boolean;
    focus_tracker_enabled: boolean;
    anxiety_tracker_enabled: boolean;
    depression_tracker_enabled: boolean;
  };
}

interface MissingTracker {
  name: string;
  icon: React.ReactNode;
  type: string;
}

const MissingDataPrompts = ({ userId, preferences }: MissingDataPromptsProps) => {
  const [missingTrackers, setMissingTrackers] = useState<MissingTracker[]>([]);

  useEffect(() => {
    const checkMissingData = async () => {
      const sevenDaysAgo = new Date();
      sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);

      const missing: MissingTracker[] = [];

      // Check mood logs
      if (preferences.mood_tracker_enabled) {
        const { data: moodData } = await supabase
          .from('mood_logs')
          .select('id')
          .eq('user_id', userId)
          .gte('created_at', sevenDaysAgo.toISOString())
          .limit(1)
          .maybeSingle();

        if (!moodData) {
          missing.push({
            name: "Mood",
            icon: <Heart className="w-4 h-4" />,
            type: "mood_logs"
          });
        }
      }

      // Check anxiety questionnaire
      if (preferences.anxiety_tracker_enabled) {
        const { data: anxietyData } = await supabase
          .from('questionnaire_results')
          .select('id')
          .eq('user_id', userId)
          .eq('questionnaire_type', 'anxiety')
          .gte('created_at', sevenDaysAgo.toISOString())
          .limit(1)
          .maybeSingle();

        if (!anxietyData) {
          missing.push({
            name: "Anxiety",
            icon: <AlertCircle className="w-4 h-4" />,
            type: "anxiety"
          });
        }
      }

      // Check depression questionnaire
      if (preferences.depression_tracker_enabled) {
        const { data: depressionData } = await supabase
          .from('questionnaire_results')
          .select('id')
          .eq('user_id', userId)
          .eq('questionnaire_type', 'depression')
          .gte('created_at', sevenDaysAgo.toISOString())
          .limit(1)
          .maybeSingle();

        if (!depressionData) {
          missing.push({
            name: "Depression",
            icon: <Brain className="w-4 h-4" />,
            type: "depression"
          });
        }
      }

      // Check focus questionnaire
      if (preferences.focus_tracker_enabled) {
        const { data: focusData } = await supabase
          .from('questionnaire_results')
          .select('id')
          .eq('user_id', userId)
          .eq('questionnaire_type', 'focus')
          .gte('created_at', sevenDaysAgo.toISOString())
          .limit(1)
          .maybeSingle();

        if (!focusData) {
          missing.push({
            name: "Focus",
            icon: <Focus className="w-4 h-4" />,
            type: "focus"
          });
        }
      }

      setMissingTrackers(missing);
    };

    checkMissingData();
  }, [userId, preferences]);

  if (missingTrackers.length === 0) return null;

  return (
    <Card className="p-4 border-border/50 bg-accent/5">
      <h3 className="font-semibold text-foreground mb-3">Missing Check-ins</h3>
      <div className="space-y-2">
        {missingTrackers.map((tracker) => (
          <div key={tracker.type} className="flex items-center justify-between">
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              {tracker.icon}
              <span>No recent {tracker.name} data</span>
            </div>
            <Link to="/mood">
              <Button size="sm" variant="ghost">
                Check In
              </Button>
            </Link>
          </div>
        ))}
      </div>
    </Card>
  );
};

export default MissingDataPrompts;
