import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from "sonner";
import { ChevronLeft, Settings as SettingsIcon } from "lucide-react";
import BottomNav from "@/components/BottomNav";
import { supabase } from "@/integrations/supabase/client";

interface UserPreferences {
  language: string;
  mood_tracker_enabled: boolean;
  focus_tracker_enabled: boolean;
  anxiety_tracker_enabled: boolean;
  depression_tracker_enabled: boolean;
}

const languages = [
  { code: 'en', name: 'English' },
  { code: 'zh', name: '中文 (Chinese)' },
  { code: 'hi', name: 'हिन्दी (Hindi)' },
  { code: 'es', name: 'Español (Spanish)' },
  { code: 'fr', name: 'Français (French)' },
  { code: 'ar', name: 'العربية (Arabic)' },
  { code: 'bn', name: 'বাংলা (Bengali)' },
  { code: 'pt', name: 'Português (Portuguese)' },
  { code: 'ru', name: 'Русский (Russian)' },
  { code: 'ja', name: '日本語 (Japanese)' }
];

const Settings = () => {
  const navigate = useNavigate();
  const [userId, setUserId] = useState<string | null>(null);
  const [preferences, setPreferences] = useState<UserPreferences>({
    language: 'en',
    mood_tracker_enabled: true,
    focus_tracker_enabled: true,
    anxiety_tracker_enabled: true,
    depression_tracker_enabled: true
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadPreferences = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        toast.error("Please log in to access settings");
        navigate("/auth");
        return;
      }

      setUserId(user.id);

      try {
        const { data, error } = await supabase
          .from('user_preferences')
          .select('*')
          .eq('user_id', user.id)
          .maybeSingle();

        if (error) throw error;

        if (data) {
          setPreferences({
            language: data.language,
            mood_tracker_enabled: data.mood_tracker_enabled,
            focus_tracker_enabled: data.focus_tracker_enabled,
            anxiety_tracker_enabled: data.anxiety_tracker_enabled,
            depression_tracker_enabled: data.depression_tracker_enabled
          });
        }
      } catch (error: any) {
        console.error('Error loading preferences:', error);
      } finally {
        setLoading(false);
      }
    };

    loadPreferences();
  }, [navigate]);

  const updatePreferences = async (updates: Partial<UserPreferences>) => {
    if (!userId) return;

    const newPreferences = { ...preferences, ...updates };
    setPreferences(newPreferences);

    try {
      const { data: existing } = await supabase
        .from('user_preferences')
        .select('id')
        .eq('user_id', userId)
        .maybeSingle();

      if (existing) {
        const { error } = await supabase
          .from('user_preferences')
          .update(newPreferences)
          .eq('user_id', userId);

        if (error) throw error;
      } else {
        const { error } = await supabase
          .from('user_preferences')
          .insert({
            user_id: userId,
            ...newPreferences
          });

        if (error) throw error;
      }

      toast.success("Settings saved");
    } catch (error: any) {
      toast.error(error.message || "Failed to save settings");
      console.error('Error updating preferences:', error);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <p className="text-muted-foreground">Loading settings...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background pb-20">
      <div className="bg-gradient-to-br from-primary/10 via-secondary/10 to-calm px-6 pt-12 pb-8 mb-6">
        <div className="max-w-2xl mx-auto">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => navigate("/home")}
            className="mb-4 -ml-2"
          >
            <ChevronLeft className="w-4 h-4 mr-1" />
            Back
          </Button>
          <div className="flex items-center gap-3 mb-2">
            <SettingsIcon className="w-8 h-8 text-primary" />
            <h1 className="text-3xl font-bold text-foreground">Settings</h1>
          </div>
          <p className="text-lg text-muted-foreground">Customize your experience</p>
        </div>
      </div>

      <div className="container mx-auto max-w-2xl px-6 space-y-6">
        <Card className="border-border/50">
          <CardHeader>
            <CardTitle>Language</CardTitle>
            <CardDescription>Choose your preferred language</CardDescription>
          </CardHeader>
          <CardContent>
            <Select
              value={preferences.language}
              onValueChange={(value) => updatePreferences({ language: value })}
            >
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select language" />
              </SelectTrigger>
              <SelectContent>
                {languages.map((lang) => (
                  <SelectItem key={lang.code} value={lang.code}>
                    {lang.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </CardContent>
        </Card>

        <Card className="border-border/50">
          <CardHeader>
            <CardTitle>Wellness Trackers</CardTitle>
            <CardDescription>
              Enable or disable specific trackers based on what's relevant to you
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label htmlFor="mood-tracker" className="text-base font-medium">
                  Mood Tracker
                </Label>
                <p className="text-sm text-muted-foreground">
                  Track your daily mood levels
                </p>
              </div>
              <Switch
                id="mood-tracker"
                checked={preferences.mood_tracker_enabled}
                onCheckedChange={(checked) =>
                  updatePreferences({ mood_tracker_enabled: checked })
                }
              />
            </div>

            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label htmlFor="focus-tracker" className="text-base font-medium">
                  Focus Tracker
                </Label>
                <p className="text-sm text-muted-foreground">
                  Monitor your attention and concentration
                </p>
              </div>
              <Switch
                id="focus-tracker"
                checked={preferences.focus_tracker_enabled}
                onCheckedChange={(checked) =>
                  updatePreferences({ focus_tracker_enabled: checked })
                }
              />
            </div>

            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label htmlFor="anxiety-tracker" className="text-base font-medium">
                  Anxiety Tracker
                </Label>
                <p className="text-sm text-muted-foreground">
                  Track anxiety levels with GAD-7
                </p>
              </div>
              <Switch
                id="anxiety-tracker"
                checked={preferences.anxiety_tracker_enabled}
                onCheckedChange={(checked) =>
                  updatePreferences({ anxiety_tracker_enabled: checked })
                }
              />
            </div>

            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label htmlFor="depression-tracker" className="text-base font-medium">
                  Depression Tracker
                </Label>
                <p className="text-sm text-muted-foreground">
                  Monitor depression with BDI
                </p>
              </div>
              <Switch
                id="depression-tracker"
                checked={preferences.depression_tracker_enabled}
                onCheckedChange={(checked) =>
                  updatePreferences({ depression_tracker_enabled: checked })
                }
              />
            </div>
          </CardContent>
        </Card>
      </div>

      <BottomNav />
    </div>
  );
};

export default Settings;
