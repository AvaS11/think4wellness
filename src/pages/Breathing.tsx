import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Wind, Play, Pause, RotateCcw } from "lucide-react";

const Breathing = () => {
  const [isActive, setIsActive] = useState(false);
  const [phase, setPhase] = useState<"inhale" | "hold" | "exhale">("inhale");
  const [count, setCount] = useState(4);
  const [cycleCount, setCycleCount] = useState(0);

  const phases = {
    inhale: { duration: 4, label: "Breathe In", color: "from-primary to-primary/50" },
    hold: { duration: 4, label: "Hold", color: "from-secondary to-secondary/50" },
    exhale: { duration: 6, label: "Breathe Out", color: "from-accent to-accent/50" },
  };

  useEffect(() => {
    let interval: NodeJS.Timeout;

    if (isActive && count > 0) {
      interval = setInterval(() => {
        setCount((prev) => prev - 1);
      }, 1000);
    } else if (isActive && count === 0) {
      // Move to next phase
      if (phase === "inhale") {
        setPhase("hold");
        setCount(phases.hold.duration);
      } else if (phase === "hold") {
        setPhase("exhale");
        setCount(phases.exhale.duration);
      } else {
        setPhase("inhale");
        setCount(phases.inhale.duration);
        setCycleCount((prev) => prev + 1);
      }
    }

    return () => clearInterval(interval);
  }, [isActive, count, phase]);

  const handleToggle = () => {
    if (!isActive) {
      setPhase("inhale");
      setCount(phases.inhale.duration);
    }
    setIsActive(!isActive);
  };

  const handleReset = () => {
    setIsActive(false);
    setPhase("inhale");
    setCount(phases.inhale.duration);
    setCycleCount(0);
  };

  return (
    <div className="min-h-screen bg-background pb-20">
      <div className="bg-gradient-to-br from-primary/10 via-secondary/10 to-calm px-6 pt-12 pb-8 mb-6">
        <div className="max-w-2xl mx-auto">
          <h1 className="text-3xl font-bold text-foreground mb-2">Breathing Exercises</h1>
          <p className="text-lg text-muted-foreground">
            Follow the guided breathing to calm your mind
          </p>
        </div>
      </div>
      
      <div className="container mx-auto max-w-2xl px-6">

        <Card className="p-12 text-center border-border/50 mb-6">
          <div className="max-w-md mx-auto space-y-8">
            {/* Breathing Circle */}
            <div className="relative mx-auto">
              <div
                className={`w-64 h-64 rounded-full bg-gradient-to-br ${
                  phases[phase].color
                } mx-auto flex items-center justify-center transition-all duration-1000 ${
                  isActive ? "scale-110 shadow-2xl" : "scale-100"
                }`}
                style={{
                  transform: isActive
                    ? phase === "inhale"
                      ? "scale(1.1)"
                      : phase === "exhale"
                      ? "scale(0.9)"
                      : "scale(1)"
                    : "scale(1)",
                }}
              >
                <div className="text-center">
                  <Wind className="w-12 h-12 mx-auto mb-4 text-foreground" />
                  <p className="text-5xl font-bold text-foreground mb-2">{count}</p>
                  <p className="text-lg font-medium text-foreground">{phases[phase].label}</p>
                </div>
              </div>
            </div>

            {/* Controls */}
            <div className="flex gap-4 justify-center">
              <Button
                onClick={handleToggle}
                size="lg"
                className="rounded-full px-8"
              >
                {isActive ? (
                  <>
                    <Pause className="w-5 h-5 mr-2" />
                    Pause
                  </>
                ) : (
                  <>
                    <Play className="w-5 h-5 mr-2" />
                    Start
                  </>
                )}
              </Button>
              <Button
                onClick={handleReset}
                size="lg"
                variant="outline"
                className="rounded-full px-8"
              >
                <RotateCcw className="w-5 h-5 mr-2" />
                Reset
              </Button>
            </div>

            {/* Stats */}
            <div className="pt-4 border-t border-border">
              <p className="text-sm text-muted-foreground">
                Cycles completed: <span className="font-semibold text-foreground">{cycleCount}</span>
              </p>
            </div>
          </div>
        </Card>

        <Card className="p-6 bg-calm/30 border-border/50 mb-6">
          <h3 className="text-lg font-semibold text-foreground mb-3">Breathing Tips</h3>
          <ul className="space-y-2 text-muted-foreground">
            <li>• Find a quiet, comfortable place to sit or lie down</li>
            <li>• Focus on the movement of your breath</li>
            <li>• Let thoughts pass without judgment</li>
            <li>• Practice for 5-10 minutes daily for best results</li>
          </ul>
        </Card>
      </div>

      {/* Bottom Navigation */}
      <div className="fixed bottom-0 left-0 right-0 bg-card border-t border-border px-6 py-4">
        <div className="max-w-2xl mx-auto flex justify-around">
          <a href="/" className="flex flex-col items-center gap-1 text-muted-foreground hover:text-primary transition-colors">
            <Wind className="w-6 h-6" />
            <span className="text-xs font-medium">Home</span>
          </a>
          <a href="/mood" className="flex flex-col items-center gap-1 text-muted-foreground hover:text-primary transition-colors">
            <Play className="w-6 h-6" />
            <span className="text-xs font-medium">Mood</span>
          </a>
          <a href="/breathing" className="flex flex-col items-center gap-1 text-primary">
            <Wind className="w-6 h-6" />
            <span className="text-xs font-medium">Breathe</span>
          </a>
          <a href="/journal" className="flex flex-col items-center gap-1 text-muted-foreground hover:text-primary transition-colors">
            <RotateCcw className="w-6 h-6" />
            <span className="text-xs font-medium">Journal</span>
          </a>
          <a href="/resources" className="flex flex-col items-center gap-1 text-muted-foreground hover:text-primary transition-colors">
            <Wind className="w-6 h-6" />
            <span className="text-xs font-medium">More</span>
          </a>
        </div>
      </div>
    </div>
  );
};

export default Breathing;
