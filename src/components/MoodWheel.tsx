import { Card } from "@/components/ui/card";

interface MoodData {
  mood: number;
  focus: number;
  anxiety: number;
  depression: number;
}

const MoodWheel = () => {
  // Sample data - scores out of 100
  const data: MoodData = {
    mood: 75,
    focus: 60,
    anxiety: 35,
    depression: 25,
  };

  const metrics = [
    { label: "Mood", value: data.mood, color: "stroke-primary", size: 280 },
    { label: "Focus", value: data.focus, color: "stroke-secondary", size: 220 },
    { label: "Anxiety", value: data.anxiety, color: "stroke-accent", size: 160 },
    { label: "Depression", value: data.depression, color: "stroke-wellness", size: 100 },
  ];

  const getCircleProgress = (value: number, circumference: number) => {
    return circumference - (value / 100) * circumference;
  };

  return (
    <Card className="p-8 border-border/50 flex flex-col items-center">
      <h3 className="text-lg font-semibold text-foreground mb-6">Your Wellness Snapshot</h3>
      
      <div className="relative w-[300px] h-[300px] flex items-center justify-center">
        <svg className="absolute inset-0 w-full h-full -rotate-90">
          {metrics.map((metric, index) => {
            const radius = metric.size / 2;
            const circumference = 2 * Math.PI * radius;
            const strokeDashoffset = getCircleProgress(metric.value, circumference);
            
            return (
              <g key={index}>
                {/* Background circle */}
                <circle
                  cx="150"
                  cy="150"
                  r={radius}
                  className="fill-none stroke-muted/20"
                  strokeWidth="20"
                />
                {/* Progress circle */}
                <circle
                  cx="150"
                  cy="150"
                  r={radius}
                  className={`fill-none ${metric.color} transition-all duration-1000 ease-out animate-fade-in`}
                  strokeWidth="20"
                  strokeLinecap="round"
                  strokeDasharray={circumference}
                  strokeDashoffset={strokeDashoffset}
                  style={{
                    animationDelay: `${index * 150}ms`,
                  }}
                />
              </g>
            );
          })}
        </svg>

        {/* Center content */}
        <div className="text-center z-10">
          <p className="text-4xl font-bold text-primary">{data.mood}</p>
          <p className="text-sm text-muted-foreground">Overall</p>
        </div>
      </div>

      {/* Legend */}
      <div className="grid grid-cols-2 gap-4 mt-6 w-full">
        {metrics.map((metric, index) => (
          <div key={index} className="flex items-center gap-2">
            <div className={`w-3 h-3 rounded-full ${metric.color.replace('stroke-', 'bg-')}`} />
            <div className="flex-1">
              <p className="text-xs font-medium text-foreground">{metric.label}</p>
              <p className="text-xs text-muted-foreground">{metric.value}%</p>
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
};

export default MoodWheel;
