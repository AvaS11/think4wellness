import { useState } from "react";
import { Smile, Meh, Frown, Angry, Heart, Calendar } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";

const Mood = () => {
  const [selectedMood, setSelectedMood] = useState<string | null>(null);
  const [note, setNote] = useState("");

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
    <div className="min-h-screen bg-background">
      <div className="container mx-auto max-w-4xl px-6 py-12">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-foreground mb-2">Mood Tracker</h1>
          <p className="text-muted-foreground text-lg">How are you feeling today?</p>
        </div>

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

        <Card className="p-6 border-border/50">
          <div className="flex items-center gap-3 mb-4">
            <Calendar className="w-5 h-5 text-primary" />
            <h2 className="text-xl font-semibold text-foreground">Your Mood History</h2>
          </div>
          <p className="text-muted-foreground">
            Start logging your moods to see patterns and insights over time.
          </p>
        </Card>
      </div>
    </div>
  );
};

export default Mood;
