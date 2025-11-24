import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Heart, BookOpen, Video, Calendar, Clipboard, Smile, TrendingUp } from "lucide-react";
import { Link } from "react-router-dom";

const Index = () => {
  const [userName] = useState("Alex");

  const activities = [
    { icon: BookOpen, label: "Learn", color: "bg-calm/60 text-calm-foreground", link: "/resources" },
    { icon: Video, label: "Watch", color: "bg-calm/60 text-calm-foreground", link: "/resources" },
    { icon: BookOpen, label: "Journal", color: "bg-calm/60 text-calm-foreground", link: "/journal" },
    { icon: Smile, label: "Feelings", color: "bg-calm/60 text-calm-foreground", link: "/mood" },
    { icon: Heart, label: "Reflect", color: "bg-calm/60 text-calm-foreground", link: "/journal" },
    { icon: Clipboard, label: "Check-in", color: "bg-calm/60 text-calm-foreground", link: "/mood" },
  ];

  return (
    <div className="min-h-screen bg-background pb-20">
      {/* Header */}
      <div className="bg-gradient-to-br from-primary/10 via-secondary/10 to-calm px-6 pt-12 pb-8">
        <div className="max-w-2xl mx-auto">
          <h1 className="text-3xl font-bold text-foreground mb-2">
            Hello {userName}!
          </h1>
          <p className="text-lg text-muted-foreground">
            What do you want to do today?
          </p>
        </div>
      </div>

      {/* Activities Grid */}
      <div className="px-6 pt-6 max-w-2xl mx-auto">
        <div className="grid grid-cols-3 gap-4 mb-8">
          {activities.map((activity, index) => {
            const Icon = activity.icon;
            return (
              <Link key={index} to={activity.link}>
                <Card className={`p-6 flex flex-col items-center gap-3 hover:shadow-[var(--shadow-soft)] transition-all hover:-translate-y-1 border-border/50 ${activity.color}`}>
                  <Icon className="w-8 h-8" />
                  <span className="text-sm font-medium text-center">{activity.label}</span>
                </Card>
              </Link>
            );
          })}
        </div>


        {/* Your Work Section */}
        <div>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-semibold text-foreground flex items-center gap-2">
              <TrendingUp className="w-5 h-5 text-secondary" />
              Your Work
            </h2>
            <Button variant="ghost" size="sm">View All</Button>
          </div>
          <div className="space-y-3">
            <Card className="p-5 border-border/50 hover:shadow-[var(--shadow-soft)] transition-all">
              <div className="flex items-center justify-between mb-3">
                <h3 className="font-semibold text-foreground">Daily Mood Tracking</h3>
                <span className="text-sm font-medium text-primary">7 days</span>
              </div>
              <div className="w-full bg-calm rounded-full h-2 mb-2">
                <div className="bg-primary rounded-full h-2" style={{ width: '70%' }}></div>
              </div>
              <p className="text-xs text-muted-foreground">Keep going! You're doing great</p>
            </Card>
            
            <Card className="p-5 border-border/50 hover:shadow-[var(--shadow-soft)] transition-all">
              <div className="flex items-center justify-between mb-3">
                <h3 className="font-semibold text-foreground">Journal Entries</h3>
                <span className="text-sm font-medium text-secondary">3 this week</span>
              </div>
              <div className="w-full bg-calm rounded-full h-2 mb-2">
                <div className="bg-secondary rounded-full h-2" style={{ width: '43%' }}></div>
              </div>
              <p className="text-xs text-muted-foreground">Goal: 7 entries per week</p>
            </Card>

            <Card className="p-5 border-border/50 hover:shadow-[var(--shadow-soft)] transition-all">
              <div className="flex items-center justify-between mb-3">
                <h3 className="font-semibold text-foreground">Breathing Exercises</h3>
                <span className="text-sm font-medium text-accent">5 completed</span>
              </div>
              <div className="w-full bg-calm rounded-full h-2 mb-2">
                <div className="bg-accent rounded-full h-2" style={{ width: '50%' }}></div>
              </div>
              <p className="text-xs text-muted-foreground">Goal: 10 per week</p>
            </Card>
          </div>
        </div>
      </div>

      {/* Bottom Navigation */}
      <div className="fixed bottom-0 left-0 right-0 bg-card border-t border-border px-6 py-4">
        <div className="max-w-2xl mx-auto grid grid-cols-3 gap-3">
          {activities.map((activity, index) => {
            const Icon = activity.icon;
            return (
              <Link key={index} to={activity.link}>
                <Card className={`p-4 flex flex-col items-center gap-2 hover:shadow-[var(--shadow-soft)] transition-all border-border/50 ${activity.color}`}>
                  <Icon className="w-6 h-6" />
                  <span className="text-xs font-medium text-center">{activity.label}</span>
                </Card>
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Index;
