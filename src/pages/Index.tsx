import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Bell, Clock, Smartphone, Settings, TrendingUp, LogOut } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import MoodWheel from "@/components/MoodWheel";
import PhoneDependenceBar from "@/components/PhoneDependenceBar";
import MissingDataPrompts from "@/components/MissingDataPrompts";
import { useAuth } from "@/hooks/useAuth";
import BottomNav from "@/components/BottomNav";
import { supabase } from "@/integrations/supabase/client";
import { useTranslation } from "react-i18next";

const Index = () => {
  const [userName, setUserName] = useState("User");
  const { user, loading, signOut } = useAuth();
  const navigate = useNavigate();
  const { t, i18n } = useTranslation();
  const [preferences, setPreferences] = useState<any>(null);

  useEffect(() => {
    if (!loading && !user) {
      navigate("/");
    }
  }, [user, loading, navigate]);

  useEffect(() => {
    if (!user) return;

    const fetchUserData = async () => {
      // Fetch preferences
      const { data: prefsData } = await supabase
        .from('user_preferences')
        .select('*')
        .eq('user_id', user.id)
        .maybeSingle();

      const prefs = prefsData || {
        language: 'en',
        mood_tracker_enabled: true,
        focus_tracker_enabled: true,
        anxiety_tracker_enabled: true,
        depression_tracker_enabled: true,
        phone_dependence_tracker_enabled: true
      };
      
      setPreferences(prefs);
      if (prefsData?.language) {
        i18n.changeLanguage(prefsData.language);
      }

      // Fetch display name from profiles
      const { data: profileData } = await supabase
        .from('profiles')
        .select('display_name')
        .eq('user_id', user.id)
        .maybeSingle();

      if (profileData?.display_name) {
        setUserName(profileData.display_name);
      } else {
        // Fallback to email username
        const emailUsername = user.email?.split('@')[0] || 'User';
        setUserName(emailUsername);
      }
    };

    fetchUserData();
  }, [user, i18n]);

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <p className="text-foreground">{t('common.loading')}</p>
      </div>
    );
  }

  if (!user) {
    return null;
  }


  return (
    <div className="min-h-screen bg-background pb-20">
      {/* Header */}
      <div className="bg-gradient-to-br from-primary/10 via-secondary/10 to-calm px-6 pt-12 pb-8 mb-6">
        <div className="max-w-2xl mx-auto relative">
          <Link to="/settings">
            <Button
              variant="ghost"
              size="icon"
              className="absolute -top-6 right-0"
            >
              <Settings className="w-5 h-5" />
            </Button>
          </Link>
          <h1 className="text-3xl font-bold text-foreground mb-2">
            {t('home.hello', { name: userName })}
          </h1>
          <p className="text-lg text-muted-foreground">{t('home.howAreYouFeeling')}</p>
        </div>
      </div>

      {/* Stats Section */}
      <div className="px-4 pt-6 max-w-2xl mx-auto">
        <div className="grid grid-cols-3 gap-2 mb-8">
          <Link to="/analytics/notifications" className="flex">
            <Card className="w-full aspect-square flex flex-col items-center justify-center gap-1.5 border-border/50 bg-card hover:shadow-[var(--shadow-soft)] transition-all cursor-pointer p-3">
              <Bell className="w-5 h-5 text-primary flex-shrink-0" />
              <p className="text-xl font-bold text-foreground leading-none">47</p>
              <p className="text-[10px] text-muted-foreground text-center leading-tight">{t('home.notifications')}</p>
            </Card>
          </Link>
          
          <Link to="/analytics/screen-time" className="flex">
            <Card className="w-full aspect-square flex flex-col items-center justify-center gap-1.5 border-border/50 bg-card hover:shadow-[var(--shadow-soft)] transition-all cursor-pointer p-3">
              <Clock className="w-5 h-5 text-secondary flex-shrink-0" />
              <p className="text-xl font-bold text-foreground leading-none">4h 23m</p>
              <p className="text-[10px] text-muted-foreground text-center leading-tight">{t('home.screenTime')}</p>
            </Card>
          </Link>
          
          <Link to="/analytics/pickups" className="flex">
            <Card className="w-full aspect-square flex flex-col items-center justify-center gap-1.5 border-border/50 bg-card hover:shadow-[var(--shadow-soft)] transition-all cursor-pointer p-3">
              <Smartphone className="w-5 h-5 text-accent flex-shrink-0" />
              <p className="text-xl font-bold text-foreground leading-none">89</p>
              <p className="text-[10px] text-muted-foreground text-center leading-tight">{t('home.pickups')}</p>
            </Card>
          </Link>
        </div>

        <div className="mb-6">
          <MoodWheel />
        </div>

        {user && preferences && (
          <>
            <div className="mb-6">
              <PhoneDependenceBar 
                userId={user.id} 
                enabled={preferences.phone_dependence_tracker_enabled ?? true}
              />
            </div>

            <div className="mb-8">
              <MissingDataPrompts 
                userId={user.id}
                preferences={{
                  mood_tracker_enabled: preferences.mood_tracker_enabled ?? true,
                  focus_tracker_enabled: preferences.focus_tracker_enabled ?? true,
                  anxiety_tracker_enabled: preferences.anxiety_tracker_enabled ?? true,
                  depression_tracker_enabled: preferences.depression_tracker_enabled ?? true
                }}
              />
            </div>
          </>
        )}


        {/* Your Work Section */}
        <div>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-semibold text-foreground flex items-center gap-2">
              <TrendingUp className="w-5 h-5 text-secondary" />
              {t('home.yourWork')}
            </h2>
            <Button variant="ghost" size="sm">{t('common.viewAll')}</Button>
          </div>
          <div className="space-y-3">
            <Card className="p-5 border-border/50 hover:shadow-[var(--shadow-soft)] transition-all">
              <div className="flex items-center justify-between mb-3">
                <h3 className="font-semibold text-foreground">{t('home.dailyMoodTracking')}</h3>
                <span className="text-sm font-medium text-primary">7 {t('home.days')}</span>
              </div>
              <div className="w-full bg-calm rounded-full h-2 mb-2">
                <div className="bg-primary rounded-full h-2" style={{ width: '70%' }}></div>
              </div>
              <p className="text-xs text-muted-foreground">{t('home.keepGoing')}</p>
            </Card>
            
            <Card className="p-5 border-border/50 hover:shadow-[var(--shadow-soft)] transition-all">
              <div className="flex items-center justify-between mb-3">
                <h3 className="font-semibold text-foreground">{t('home.journalEntries')}</h3>
                <span className="text-sm font-medium text-secondary">3 {t('home.thisWeek')}</span>
              </div>
              <div className="w-full bg-calm rounded-full h-2 mb-2">
                <div className="bg-secondary rounded-full h-2" style={{ width: '43%' }}></div>
              </div>
              <p className="text-xs text-muted-foreground">{t('home.goalEntriesPerWeek')}</p>
            </Card>

            <Card className="p-5 border-border/50 hover:shadow-[var(--shadow-soft)] transition-all">
              <div className="flex items-center justify-between mb-3">
                <h3 className="font-semibold text-foreground">{t('home.breathingExercises')}</h3>
                <span className="text-sm font-medium text-accent">5 {t('home.completed')}</span>
              </div>
              <div className="w-full bg-calm rounded-full h-2 mb-2">
                <div className="bg-accent rounded-full h-2" style={{ width: '50%' }}></div>
              </div>
              <p className="text-xs text-muted-foreground">{t('home.goalExercisesPerWeek')}</p>
            </Card>
          </div>
        </div>
      </div>

      {/* Bottom Navigation */}
      <BottomNav />
    </div>
  );
};

export default Index;
