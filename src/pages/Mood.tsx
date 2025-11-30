import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Smile, Meh, Frown, Angry, Heart, Calendar, Brain, Activity, Smartphone } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import BottomNav from "@/components/BottomNav";
import { supabase } from "@/integrations/supabase/client";
import { useTranslation } from "react-i18next";

const Mood = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [selectedMood, setSelectedMood] = useState<string | null>(null);
  const [note, setNote] = useState("");
  const [userName, setUserName] = useState("User");
  const [userId, setUserId] = useState<string | null>(null);

  useEffect(() => {
    const checkUser = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (user) {
        setUserId(user.id);
        // Try to get display name from user metadata, fall back to email username
        const displayName = user.user_metadata?.full_name || user.user_metadata?.name;
        if (displayName) {
          setUserName(displayName);
        } else {
          const email = user.email?.split('@')[0];
          if (email) {
            setUserName(email.charAt(0).toUpperCase() + email.slice(1));
          }
        }
      }
    };
    checkUser();
  }, []);

  const moods = [
    { id: "great", icon: Smile, labelKey: "mood.great", color: "text-secondary hover:bg-secondary/10" },
    { id: "good", icon: Heart, labelKey: "mood.good", color: "text-primary hover:bg-primary/10" },
    { id: "okay", icon: Meh, labelKey: "mood.okay", color: "text-muted-foreground hover:bg-muted" },
    { id: "bad", icon: Frown, labelKey: "mood.notGreat", color: "text-accent hover:bg-accent/10" },
    { id: "terrible", icon: Angry, labelKey: "mood.difficult", color: "text-destructive hover:bg-destructive/10" },
  ];

  const handleSubmit = async () => {
    if (!selectedMood) {
      toast.error(t('mood.selectMood'));
      return;
    }

    if (!userId) {
      toast.error(t('mood.loginToSaveMood'));
      navigate("/auth");
      return;
    }

    try {
      const { error } = await supabase
        .from('mood_logs')
        .insert({
          user_id: userId,
          mood: selectedMood,
          note: note || null
        });

      if (error) throw error;

      toast.success(t('mood.moodLoggedSuccess'));
      setSelectedMood(null);
      setNote("");
    } catch (error: any) {
      toast.error(error.message || t('mood.failedToLogMood'));
    }
  };

  return (
    <div className="min-h-screen bg-background pb-20">
      <div className="bg-gradient-to-br from-primary/10 via-secondary/10 to-calm px-6 pt-12 pb-8 mb-6">
        <div className="max-w-2xl mx-auto">
          <h1 className="text-3xl font-bold text-foreground mb-2">
            {t('home.hello', { name: userName })}
          </h1>
          <p className="text-lg text-muted-foreground">{t('mood.title')}</p>
        </div>
      </div>
      
      <div className="container mx-auto max-w-2xl px-6">

        <Card className="p-8 mb-6 border-border/50">
          <div className="space-y-8">
            <div>
              <label className="text-sm font-medium text-foreground mb-4 block">
                {t('mood.selectYourMood')}
              </label>
              <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
                {moods.map((mood) => {
                  const Icon = mood.icon;
                  return (
                    <button
                      key={mood.id}
                      onClick={() => setSelectedMood(mood.id)}
                      className={`p-6 rounded-2xl border-2 transition-all ${
                        selectedMood === mood.id
                          ? "border-primary bg-primary/5 scale-105"
                          : "border-border hover:border-primary/50"
                      }`}
                    >
                      <Icon className={`w-12 h-12 mx-auto mb-2 ${mood.color}`} />
                      <p className="text-sm font-medium text-foreground">{t(mood.labelKey)}</p>
                    </button>
                  );
                })}
              </div>
            </div>

            <div>
              <label htmlFor="note" className="text-sm font-medium text-foreground mb-2 block">
                {t('mood.addNote')}
              </label>
              <Textarea
                id="note"
                placeholder={t('mood.whatsOnYourMind')}
                value={note}
                onChange={(e) => setNote(e.target.value)}
                className="min-h-[120px] resize-none"
              />
            </div>

            <Button onClick={handleSubmit} size="lg" className="w-full rounded-full">
              {t('mood.logMood')}
            </Button>
          </div>
        </Card>

        <Card className="p-6 border-border/50 mb-6">
          <div className="flex items-center gap-3 mb-4">
            <Calendar className="w-5 h-5 text-primary" />
            <h2 className="text-xl font-semibold text-foreground">{t('mood.yourMoodHistory')}</h2>
          </div>
          <p className="text-muted-foreground">
            {t('mood.startLogging')}
          </p>
        </Card>

        <div className="mb-6">
          <h2 className="text-xl font-semibold text-foreground mb-4">{t('mood.mentalHealthCheckins')}</h2>
          <div className="grid grid-cols-2 gap-3">
            <Card
              onClick={() => navigate("/questionnaire/anxiety")}
              className="p-4 border-border/50 hover:shadow-[var(--shadow-soft)] transition-all cursor-pointer"
            >
              <div className="flex flex-col items-center gap-2">
                <Heart className="w-6 h-6 text-primary" />
                <p className="text-sm font-medium text-foreground text-center">{t('mood.anxietyQuestionnaire')}</p>
                <p className="text-xs text-muted-foreground text-center">{t('mood.anxietyDescription')}</p>
              </div>
            </Card>

            <Card
              onClick={() => navigate("/questionnaire/depression")}
              className="p-4 border-border/50 hover:shadow-[var(--shadow-soft)] transition-all cursor-pointer"
            >
              <div className="flex flex-col items-center gap-2">
                <Brain className="w-6 h-6 text-secondary" />
                <p className="text-sm font-medium text-foreground text-center">{t('mood.depressionQuestionnaire')}</p>
                <p className="text-xs text-muted-foreground text-center">{t('mood.depressionDescription')}</p>
              </div>
            </Card>

            <Card
              onClick={() => navigate("/questionnaire/focus")}
              className="p-4 border-border/50 hover:shadow-[var(--shadow-soft)] transition-all cursor-pointer"
            >
              <div className="flex flex-col items-center gap-2">
                <Activity className="w-6 h-6 text-accent" />
                <p className="text-sm font-medium text-foreground text-center">{t('mood.focusQuestionnaire')}</p>
                <p className="text-xs text-muted-foreground text-center">{t('mood.focusDescription')}</p>
              </div>
            </Card>

            <Card
              onClick={() => navigate("/questionnaire/phone-habits")}
              className="p-4 border-border/50 hover:shadow-[var(--shadow-soft)] transition-all cursor-pointer"
            >
              <div className="flex flex-col items-center gap-2">
                <Smartphone className="w-6 h-6 text-foreground" />
                <p className="text-sm font-medium text-foreground text-center">{t('mood.phoneHabitsQuestionnaire')}</p>
                <p className="text-xs text-muted-foreground text-center">{t('mood.phoneHabitsDescription')}</p>
              </div>
            </Card>
          </div>
        </div>
      </div>

      {/* Bottom Navigation */}
      <BottomNav />
    </div>
  );
};

export default Mood;
