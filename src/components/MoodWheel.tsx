import { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { supabase } from "@/integrations/supabase/client";

interface MoodData {
  mood: number;
  focus: number;
  anxiety: number;
  depression: number;
}

const MoodWheel = () => {
  const [data, setData] = useState<MoodData>({
    mood: 50,
    focus: 50,
    anxiety: 50,
    depression: 50,
  });

  useEffect(() => {
    const fetchWellnessData = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;

      try {
        // Fetch mood data from last 7 days
        const sevenDaysAgo = new Date();
        sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);

        const { data: moodLogs } = await supabase
          .from('mood_logs')
          .select('mood')
          .eq('user_id', user.id)
          .gte('created_at', sevenDaysAgo.toISOString())
          .order('created_at', { ascending: false });

        // Fetch latest questionnaire results
        const { data: anxietyResults } = await supabase
          .from('questionnaire_results')
          .select('score')
          .eq('user_id', user.id)
          .eq('questionnaire_type', 'anxiety')
          .order('created_at', { ascending: false })
          .limit(1)
          .maybeSingle();

        const { data: depressionResults } = await supabase
          .from('questionnaire_results')
          .select('score')
          .eq('user_id', user.id)
          .eq('questionnaire_type', 'depression')
          .order('created_at', { ascending: false })
          .limit(1)
          .maybeSingle();

        const { data: focusResults } = await supabase
          .from('questionnaire_results')
          .select('score')
          .eq('user_id', user.id)
          .eq('questionnaire_type', 'focus')
          .order('created_at', { ascending: false })
          .limit(1)
          .maybeSingle();

        // Calculate mood score (convert mood strings to numbers)
        let moodScore = 50;
        if (moodLogs && moodLogs.length > 0) {
          const moodValues = { great: 100, good: 75, okay: 50, bad: 25, terrible: 10 };
          const avgMood = moodLogs.reduce((sum, log) => sum + (moodValues[log.mood as keyof typeof moodValues] || 50), 0) / moodLogs.length;
          moodScore = Math.round(avgMood);
        }

        // Convert questionnaire scores to percentages (lower is better for anxiety/depression)
        // GAD-7 max: 21, BDI max: 21, ASRS max: 28
        const anxietyScore = anxietyResults ? Math.max(0, 100 - Math.round((anxietyResults.score / 21) * 100)) : 50;
        const depressionScore = depressionResults ? Math.max(0, 100 - Math.round((depressionResults.score / 21) * 100)) : 50;
        const focusScore = focusResults ? Math.round((focusResults.score / 28) * 100) : 50;

        setData({
          mood: moodScore,
          focus: focusScore,
          anxiety: anxietyScore,
          depression: depressionScore,
        });
      } catch (error) {
        console.error('Error fetching wellness data:', error);
      }
    };

    fetchWellnessData();

    // Subscribe to real-time updates
    const moodChannel = supabase
      .channel('wellness-updates')
      .on('postgres_changes', { event: '*', schema: 'public', table: 'mood_logs' }, () => {
        fetchWellnessData();
      })
      .on('postgres_changes', { event: '*', schema: 'public', table: 'questionnaire_results' }, () => {
        fetchWellnessData();
      })
      .subscribe();

    return () => {
      supabase.removeChannel(moodChannel);
    };
  }, []);

  const metrics = [
    { label: "Mood", value: data.mood, color: "stroke-primary", size: 280 },
    { label: "Focus", value: data.focus, color: "stroke-secondary", size: 220 },
    { label: "Anxiety", value: data.anxiety, color: "stroke-accent", size: 160 },
    { label: "Depression", value: data.depression, color: "stroke-wellness", size: 100 },
  ];

  const getCircleProgress = (value: number, circumference: number) => {
    return circumference - (value / 100) * circumference;
  };

  return (
    <Card className="p-8 border-border/50 flex flex-col items-center">
      <h3 className="text-lg font-semibold text-foreground mb-6">Your Wellness Snapshot</h3>
      
      <div className="relative w-[300px] h-[300px] flex items-center justify-center">
        <svg className="absolute inset-0 w-full h-full -rotate-90">
          {metrics.map((metric, index) => {
            const radius = metric.size / 2;
            const circumference = 2 * Math.PI * radius;
            const strokeDashoffset = getCircleProgress(metric.value, circumference);
            
            return (
              <g key={index}>
                {/* Background circle */}
                <circle
                  cx="150"
                  cy="150"
                  r={radius}
                  className="fill-none stroke-muted/20"
                  strokeWidth="20"
                />
                {/* Progress circle */}
                <circle
                  cx="150"
                  cy="150"
                  r={radius}
                  className={`fill-none ${metric.color} transition-all duration-1000 ease-out animate-fade-in`}
                  strokeWidth="20"
                  strokeLinecap="round"
                  strokeDasharray={circumference}
                  strokeDashoffset={strokeDashoffset}
                  style={{
                    animationDelay: `${index * 150}ms`,
                  }}
                />
              </g>
            );
          })}
        </svg>

        {/* Center content */}
        <div className="text-center z-10">
          <p className="text-4xl font-bold text-primary">{data.mood}</p>
          <p className="text-sm text-muted-foreground">Overall</p>
        </div>
      </div>

      {/* Legend */}
      <div className="grid grid-cols-2 gap-4 mt-6 w-full">
        {metrics.map((metric, index) => (
          <div key={index} className="flex items-center gap-2">
            <div className={`w-3 h-3 rounded-full ${metric.color.replace('stroke-', 'bg-')}`} />
            <div className="flex-1">
              <p className="text-xs font-medium text-foreground">{metric.label}</p>
              <p className="text-xs text-muted-foreground">{metric.value}%</p>
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
};

export default MoodWheel;
