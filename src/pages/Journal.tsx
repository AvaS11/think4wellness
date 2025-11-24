import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { BookOpen, Save, Plus } from "lucide-react";
import { toast } from "sonner";

const Journal = () => {
  const [title, setTitle] = useState("");
  const [entry, setEntry] = useState("");

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
    <div className="min-h-screen bg-background">
      <div className="container mx-auto max-w-4xl px-6 py-12">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-foreground mb-2">Journal</h1>
          <p className="text-muted-foreground text-lg">
            Express your thoughts and feelings in your private space
          </p>
        </div>

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

        <Card className="p-6 border-border/50">
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
    </div>
  );
};

export default Journal;
