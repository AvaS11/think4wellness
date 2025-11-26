import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { TrendingUp, LogOut, Bell, Clock, Smartphone } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import MoodWheel from "@/components/MoodWheel";
import { useAuth } from "@/hooks/useAuth";
import BottomNav from "@/components/BottomNav";

const Index = () => {
  const [userName] = useState("Alex");
  const { user, loading, signOut } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!loading && !user) {
      navigate("/");
    }
  }, [user, loading, navigate]);

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <p className="text-foreground">Loading...</p>
      </div>
    );
  }

  if (!user) {
    return null;
  }


  return (
    <div className="min-h-screen bg-background pb-20">
      {/* Header */}
      <div className="bg-gradient-to-br from-primary/10 via-secondary/10 to-calm px-6 pt-12 pb-8">
        <div className="max-w-2xl mx-auto">
          <div className="flex justify-between items-start mb-4">
            <div>
              <h1 className="text-3xl font-bold text-foreground mb-2">
                Hello {userName}!
              </h1>
              <p className="text-lg text-muted-foreground">
                What do you want to do today?
              </p>
            </div>
            <Button
              variant="ghost"
              size="icon"
              onClick={signOut}
              title="Sign out"
            >
              <LogOut className="w-5 h-5" />
            </Button>
          </div>
        </div>
      </div>

      {/* Stats Section */}
      <div className="px-4 pt-6 max-w-2xl mx-auto">
        <div className="grid grid-cols-3 gap-2 mb-8">
          <Link to="/analytics/notifications" className="flex">
            <Card className="w-full aspect-square flex flex-col items-center justify-center gap-1.5 border-border/50 bg-card hover:shadow-[var(--shadow-soft)] transition-all cursor-pointer p-3">
              <Bell className="w-5 h-5 text-primary flex-shrink-0" />
              <p className="text-xl font-bold text-foreground leading-none">47</p>
              <p className="text-[10px] text-muted-foreground text-center leading-tight">Notifications</p>
            </Card>
          </Link>
          
          <Link to="/analytics/screen-time" className="flex">
            <Card className="w-full aspect-square flex flex-col items-center justify-center gap-1.5 border-border/50 bg-card hover:shadow-[var(--shadow-soft)] transition-all cursor-pointer p-3">
              <Clock className="w-5 h-5 text-secondary flex-shrink-0" />
              <p className="text-xl font-bold text-foreground leading-none">4h 23m</p>
              <p className="text-[10px] text-muted-foreground text-center leading-tight">Screen Time</p>
            </Card>
          </Link>
          
          <Link to="/analytics/pickups" className="flex">
            <Card className="w-full aspect-square flex flex-col items-center justify-center gap-1.5 border-border/50 bg-card hover:shadow-[var(--shadow-soft)] transition-all cursor-pointer p-3">
              <Smartphone className="w-5 h-5 text-accent flex-shrink-0" />
              <p className="text-xl font-bold text-foreground leading-none">89</p>
              <p className="text-[10px] text-muted-foreground text-center leading-tight">Pickups</p>
            </Card>
          </Link>
        </div>

        <div className="mb-8">
          <MoodWheel />
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
      <BottomNav />
    </div>
  );
};

export default Index;
