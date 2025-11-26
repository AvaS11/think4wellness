import { useEffect, useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Smartphone } from "lucide-react";
import { Link } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { useTranslation } from "react-i18next";

interface PhoneDependenceBarProps {
  userId: string;
  enabled: boolean;
}

const PhoneDependenceBar = ({ userId, enabled }: PhoneDependenceBarProps) => {
  const { t } = useTranslation();
  const [score, setScore] = useState<number | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!enabled) {
      setLoading(false);
      return;
    }

    const fetchPhoneDependenceScore = async () => {
      const sevenDaysAgo = new Date();
      sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);

      const { data, error } = await supabase
        .from('questionnaire_results')
        .select('score, created_at')
        .eq('user_id', userId)
        .eq('questionnaire_type', 'phone_habits')
        .gte('created_at', sevenDaysAgo.toISOString())
        .order('created_at', { ascending: false })
        .limit(1)
        .maybeSingle();

      if (!error && data) {
        // Phone habits questionnaire has 7 questions, max score 21 (assuming 0-3 scale)
        // Convert to percentage
        const percentage = (data.score / 21) * 100;
        setScore(Math.round(percentage));
      } else {
        setScore(null);
      }
      setLoading(false);
    };

    fetchPhoneDependenceScore();

    const channel = supabase
      .channel('phone-dependence-changes')
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'questionnaire_results',
          filter: `user_id=eq.${userId}`,
        },
        () => {
          fetchPhoneDependenceScore();
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [userId, enabled]);

  if (!enabled) return null;
  if (loading) return null;

  if (score === null) {
    return (
      <Card className="p-4 border-border/50 bg-card/50">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Smartphone className="w-5 h-5 text-accent" />
            <div>
              <h3 className="font-semibold text-foreground">{t('phoneDependence.title')}</h3>
              <p className="text-sm text-muted-foreground">{t('phoneDependence.noRecentData')}</p>
            </div>
          </div>
          <Link to="/mood">
            <Button size="sm" variant="secondary">
              {t('common.checkIn')}
            </Button>
          </Link>
        </div>
      </Card>
    );
  }

  const getScoreColor = () => {
    if (score < 30) return "bg-green-500";
    if (score < 60) return "bg-yellow-500";
    return "bg-red-500";
  };

  const getScoreLabel = () => {
    if (score < 30) return t('phoneDependence.low');
    if (score < 60) return t('phoneDependence.moderate');
    return t('phoneDependence.high');
  };

  return (
    <Card className="p-4 border-border/50 bg-card/50">
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-3">
          <Smartphone className="w-5 h-5 text-accent" />
          <div>
            <h3 className="font-semibold text-foreground">{t('phoneDependence.title')}</h3>
            <p className="text-sm text-muted-foreground">{getScoreLabel()} - {score}%</p>
          </div>
        </div>
      </div>
      <div className="w-full bg-calm rounded-full h-3">
        <div
          className={`${getScoreColor()} rounded-full h-3 transition-all duration-500`}
          style={{ width: `${score}%` }}
        />
      </div>
    </Card>
  );
};

export default PhoneDependenceBar;
