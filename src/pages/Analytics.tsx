import { useParams, useNavigate } from "react-router-dom";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Bell, Clock, Smartphone } from "lucide-react";
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, ResponsiveContainer } from "recharts";
import BottomNav from "@/components/BottomNav";

const Analytics = () => {
  const { type } = useParams<{ type: string }>();
  const navigate = useNavigate();

  const getConfig = () => {
    switch (type) {
      case "notifications":
        return {
          title: "Notifications",
          icon: Bell,
          color: "hsl(var(--primary))",
          dataKey: "count",
        };
      case "screen-time":
        return {
          title: "Screen Time",
          icon: Clock,
          color: "hsl(var(--secondary))",
          dataKey: "minutes",
        };
      case "pickups":
        return {
          title: "Phone Pickups",
          icon: Smartphone,
          color: "hsl(var(--accent))",
          dataKey: "count",
        };
      default:
        return {
          title: "Analytics",
          icon: Bell,
          color: "hsl(var(--primary))",
          dataKey: "count",
        };
    }
  };

  const config = getConfig();
  const Icon = config.icon;

  // Example data for today (hourly)
  const todayData = [
    { time: "12am", count: 2, minutes: 15 },
    { time: "3am", count: 0, minutes: 0 },
    { time: "6am", count: 8, minutes: 45 },
    { time: "9am", count: 15, minutes: 82 },
    { time: "12pm", count: 22, minutes: 95 },
    { time: "3pm", count: 18, minutes: 68 },
    { time: "6pm", count: 25, minutes: 105 },
    { time: "9pm", count: 12, minutes: 48 },
  ];

  // Example data for this week (daily)
  const weekData = [
    { day: "Mon", count: 45, minutes: 245 },
    { day: "Tue", count: 52, minutes: 278 },
    { day: "Wed", count: 38, minutes: 195 },
    { day: "Thu", count: 61, minutes: 312 },
    { day: "Fri", count: 47, minutes: 263 },
    { day: "Sat", count: 35, minutes: 185 },
    { day: "Sun", count: 28, minutes: 142 },
  ];

  const chartConfig = {
    [config.dataKey]: {
      label: config.title,
      color: config.color,
    },
  };

  return (
    <div className="min-h-screen bg-background pb-24">
      {/* Header */}
      <div className="bg-gradient-to-br from-primary/10 via-secondary/10 to-calm px-6 pt-12 pb-8">
        <div className="max-w-2xl mx-auto">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => navigate("/home")}
            className="mb-4"
          >
            <ArrowLeft className="w-5 h-5" />
          </Button>
          <div className="flex items-center gap-3 mb-2">
            <Icon className="w-8 h-8" style={{ color: config.color }} />
            <h1 className="text-3xl font-bold text-foreground">{config.title}</h1>
          </div>
          <p className="text-lg text-muted-foreground">Track your patterns over time</p>
        </div>
      </div>

      {/* Charts */}
      <div className="px-6 pt-6 max-w-2xl mx-auto space-y-6">
        {/* Today's Chart */}
        <Card className="p-6 border-border/50 bg-card">
          <h2 className="text-xl font-semibold text-foreground mb-4">Today</h2>
          <ChartContainer config={chartConfig} className="h-[250px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={todayData}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                <XAxis 
                  dataKey="time" 
                  stroke="hsl(var(--muted-foreground))"
                  fontSize={12}
                />
                <YAxis 
                  stroke="hsl(var(--muted-foreground))"
                  fontSize={12}
                />
                <ChartTooltip content={<ChartTooltipContent />} />
                <Line
                  type="monotone"
                  dataKey={config.dataKey}
                  stroke={config.color}
                  strokeWidth={2}
                  dot={{ fill: config.color, r: 4 }}
                  activeDot={{ r: 6 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </ChartContainer>
        </Card>

        {/* This Week's Chart */}
        <Card className="p-6 border-border/50 bg-card">
          <h2 className="text-xl font-semibold text-foreground mb-4">This Week</h2>
          <ChartContainer config={chartConfig} className="h-[250px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={weekData}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                <XAxis 
                  dataKey="day" 
                  stroke="hsl(var(--muted-foreground))"
                  fontSize={12}
                />
                <YAxis 
                  stroke="hsl(var(--muted-foreground))"
                  fontSize={12}
                />
                <ChartTooltip content={<ChartTooltipContent />} />
                <Line
                  type="monotone"
                  dataKey={config.dataKey}
                  stroke={config.color}
                  strokeWidth={2}
                  dot={{ fill: config.color, r: 4 }}
                  activeDot={{ r: 6 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </ChartContainer>
        </Card>
      </div>
      
      {/* Bottom Navigation */}
      <BottomNav />
    </div>
  );
};

export default Analytics;
