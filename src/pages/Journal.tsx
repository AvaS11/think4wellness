import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { BookOpen, Save, Plus } from "lucide-react";
import { toast } from "sonner";
import BottomNav from "@/components/BottomNav";
import { useTranslation } from "react-i18next";
import { supabase } from "@/integrations/supabase/client";

const Journal = () => {
  const { t } = useTranslation();
  const [title, setTitle] = useState("");
  const [entry, setEntry] = useState("");
  const [userName, setUserName] = useState("User");

  useEffect(() => {
    const checkUser = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (user) {
        const email = user.email?.split('@')[0] || "User";
        setUserName(email.charAt(0).toUpperCase() + email.slice(1));
      }
    };
    checkUser();
  }, []);

  const handleSave = () => {
    if (!entry.trim()) {
      toast.error(t('journal.saveError'));
      return;
    }
    toast.success(t('journal.saveSuccess'));
    setTitle("");
    setEntry("");
  };

  return (
    <div className="min-h-screen bg-background pb-20">
      <div className="bg-gradient-to-br from-primary/10 via-secondary/10 to-calm px-6 pt-12 pb-8 mb-6">
        <div className="max-w-2xl mx-auto">
          <h1 className="text-3xl font-bold text-foreground mb-2">
            {t('journal.title', { name: userName })}
          </h1>
          <p className="text-lg text-muted-foreground">
            {t('journal.subtitle')}
          </p>
        </div>
      </div>
      
      <div className="container mx-auto max-w-2xl px-6">

        <Card className="p-8 mb-6 border-border/50">
          <div className="space-y-6">
            <div>
              <label htmlFor="title" className="text-sm font-medium text-foreground mb-2 block">
                {t('journal.titleLabel')}
              </label>
              <Input
                id="title"
                placeholder={t('journal.titlePlaceholder')}
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="text-lg"
              />
            </div>

            <div>
              <label htmlFor="entry" className="text-sm font-medium text-foreground mb-2 block">
                {t('journal.entryLabel')}
              </label>
              <Textarea
                id="entry"
                placeholder={t('journal.entryPlaceholder')}
                value={entry}
                onChange={(e) => setEntry(e.target.value)}
                className="min-h-[300px] resize-none text-base leading-relaxed"
              />
            </div>

            <div className="flex gap-3">
              <Button onClick={handleSave} size="lg" className="flex-1 rounded-full">
                <Save className="w-5 h-5 mr-2" />
                {t('journal.saveEntry')}
              </Button>
            </div>
          </div>
        </Card>

        <Card className="p-6 border-border/50 mb-6">
          <div className="flex items-center gap-3 mb-4">
            <BookOpen className="w-5 h-5 text-primary" />
            <h2 className="text-xl font-semibold text-foreground">{t('journal.yourEntries')}</h2>
          </div>
          <p className="text-muted-foreground mb-4">
            {t('journal.entriesDescription')}
          </p>
          <Button variant="outline" className="rounded-full">
            <Plus className="w-4 h-4 mr-2" />
            {t('journal.viewAllEntries')}
          </Button>
        </Card>
      </div>

      {/* Bottom Navigation */}
      <BottomNav />
    </div>
  );
};

export default Journal;
