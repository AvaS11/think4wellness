import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Smile, Meh, Frown, Angry, Heart, Calendar, Brain, Activity, Smartphone } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import BottomNav from "@/components/BottomNav";

const Mood = () => {
  const navigate = useNavigate();
  const [selectedMood, setSelectedMood] = useState<string | null>(null);
  const [note, setNote] = useState("");
  const [userName] = useState("Alex");

  const moods = [
    { id: "great", icon: Smile, label: "Great", color: "text-secondary hover:bg-secondary/10" },
    { id: "good", icon: Heart, label: "Good", color: "text-primary hover:bg-primary/10" },
    { id: "okay", icon: Meh, label: "Okay", color: "text-muted-foreground hover:bg-muted" },
    { id: "bad", icon: Frown, label: "Not Great", color: "text-accent hover:bg-accent/10" },
    { id: "terrible", icon: Angry, label: "Difficult", color: "text-destructive hover:bg-destructive/10" },
  ];

  const handleSubmit = () => {
    if (!selectedMood) {
      toast.error("Please select a mood");
      return;
    }
    toast.success("Mood logged successfully!");
    setSelectedMood(null);
    setNote("");
  };

  return (
    <div className="min-h-screen bg-background pb-20">
      <div className="bg-gradient-to-br from-primary/10 via-secondary/10 to-calm px-6 pt-12 pb-8 mb-6">
        <div className="max-w-2xl mx-auto">
          <h1 className="text-3xl font-bold text-foreground mb-2">
            Hello {userName}!
          </h1>
          <p className="text-lg text-muted-foreground">How are you feeling today?</p>
        </div>
      </div>
      
      <div className="container mx-auto max-w-2xl px-6">

        <Card className="p-8 mb-6 border-border/50">
          <div className="space-y-8">
            <div>
              <label className="text-sm font-medium text-foreground mb-4 block">
                Select your mood
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
                      <p className="text-sm font-medium text-foreground">{mood.label}</p>
                    </button>
                  );
                })}
              </div>
            </div>

            <div>
              <label htmlFor="note" className="text-sm font-medium text-foreground mb-2 block">
                Add a note (optional)
              </label>
              <Textarea
                id="note"
                placeholder="What's on your mind today?"
                value={note}
                onChange={(e) => setNote(e.target.value)}
                className="min-h-[120px] resize-none"
              />
            </div>

            <Button onClick={handleSubmit} size="lg" className="w-full rounded-full">
              Log Mood
            </Button>
          </div>
        </Card>

        <Card className="p-6 border-border/50 mb-6">
          <div className="flex items-center gap-3 mb-4">
            <Calendar className="w-5 h-5 text-primary" />
            <h2 className="text-xl font-semibold text-foreground">Your Mood History</h2>
          </div>
          <p className="text-muted-foreground">
            Start logging your moods to see patterns and insights over time.
          </p>
        </Card>

        <div className="mb-6">
          <h2 className="text-xl font-semibold text-foreground mb-4">Mental Health Check-ins</h2>
          <div className="grid grid-cols-2 gap-3">
            <Card
              onClick={() => navigate("/questionnaire/anxiety")}
              className="p-4 border-border/50 hover:shadow-[var(--shadow-soft)] transition-all cursor-pointer"
            >
              <div className="flex flex-col items-center gap-2">
                <Heart className="w-6 h-6 text-primary" />
                <p className="text-sm font-medium text-foreground text-center">Anxiety Check-in</p>
                <p className="text-xs text-muted-foreground text-center">GAD-7</p>
              </div>
            </Card>

            <Card
              onClick={() => navigate("/questionnaire/depression")}
              className="p-4 border-border/50 hover:shadow-[var(--shadow-soft)] transition-all cursor-pointer"
            >
              <div className="flex flex-col items-center gap-2">
                <Brain className="w-6 h-6 text-secondary" />
                <p className="text-sm font-medium text-foreground text-center">Depression Check-in</p>
                <p className="text-xs text-muted-foreground text-center">BDI</p>
              </div>
            </Card>

            <Card
              onClick={() => navigate("/questionnaire/focus")}
              className="p-4 border-border/50 hover:shadow-[var(--shadow-soft)] transition-all cursor-pointer"
            >
              <div className="flex flex-col items-center gap-2">
                <Activity className="w-6 h-6 text-accent" />
                <p className="text-sm font-medium text-foreground text-center">Focus Check-in</p>
                <p className="text-xs text-muted-foreground text-center">ASRS</p>
              </div>
            </Card>

            <Card
              onClick={() => navigate("/questionnaire/phone-habits")}
              className="p-4 border-border/50 hover:shadow-[var(--shadow-soft)] transition-all cursor-pointer"
            >
              <div className="flex flex-col items-center gap-2">
                <Smartphone className="w-6 h-6 text-foreground" />
                <p className="text-sm font-medium text-foreground text-center">Phone Habits</p>
                <p className="text-xs text-muted-foreground text-center">Usage Check-in</p>
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
