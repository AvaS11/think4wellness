import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { BookOpen, Save, Plus } from "lucide-react";
import { toast } from "sonner";
import BottomNav from "@/components/BottomNav";

const Journal = () => {
  const [title, setTitle] = useState("");
  const [entry, setEntry] = useState("");
  const [userName] = useState("Alex");

  const handleSave = () => {
    if (!entry.trim()) {
      toast.error("Please write something before saving");
      return;
    }
    toast.success("Journal entry saved!");
    setTitle("");
    setEntry("");
  };

  return (
    <div className="min-h-screen bg-background pb-20">
      <div className="bg-gradient-to-br from-primary/10 via-secondary/10 to-calm px-6 pt-12 pb-8 mb-6">
        <div className="max-w-2xl mx-auto">
          <h1 className="text-3xl font-bold text-foreground mb-2">
            Hello {userName}!
          </h1>
          <p className="text-lg text-muted-foreground">
            Express your thoughts and feelings
          </p>
        </div>
      </div>
      
      <div className="container mx-auto max-w-2xl px-6">

        <Card className="p-8 mb-6 border-border/50">
          <div className="space-y-6">
            <div>
              <label htmlFor="title" className="text-sm font-medium text-foreground mb-2 block">
                Title (optional)
              </label>
              <Input
                id="title"
                placeholder="Give your entry a title..."
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="text-lg"
              />
            </div>

            <div>
              <label htmlFor="entry" className="text-sm font-medium text-foreground mb-2 block">
                Your thoughts
              </label>
              <Textarea
                id="entry"
                placeholder="Write freely about your day, feelings, or anything on your mind..."
                value={entry}
                onChange={(e) => setEntry(e.target.value)}
                className="min-h-[300px] resize-none text-base leading-relaxed"
              />
            </div>

            <div className="flex gap-3">
              <Button onClick={handleSave} size="lg" className="flex-1 rounded-full">
                <Save className="w-5 h-5 mr-2" />
                Save Entry
              </Button>
            </div>
          </div>
        </Card>

        <Card className="p-6 border-border/50 mb-6">
          <div className="flex items-center gap-3 mb-4">
            <BookOpen className="w-5 h-5 text-primary" />
            <h2 className="text-xl font-semibold text-foreground">Your Journal Entries</h2>
          </div>
          <p className="text-muted-foreground mb-4">
            Your journal entries will appear here. Start writing to see your collection grow.
          </p>
          <Button variant="outline" className="rounded-full">
            <Plus className="w-4 h-4 mr-2" />
            View All Entries
          </Button>
        </Card>
      </div>

      {/* Bottom Navigation */}
      <BottomNav />
    </div>
  );
};

export default Journal;
