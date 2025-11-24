import { Brain, Heart, BookOpen, Activity, Sparkles, TrendingUp } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Link } from "react-router-dom";

const Index = () => {
  const features = [
    {
      icon: Heart,
      title: "Mood Tracker",
      description: "Track your daily emotions and identify patterns over time",
      color: "text-accent",
      link: "/mood"
    },
    {
      icon: Activity,
      title: "Breathing Exercises",
      description: "Guided breathing techniques to help you relax and center yourself",
      color: "text-primary",
      link: "/breathing"
    },
    {
      icon: BookOpen,
      title: "Journal",
      description: "Express your thoughts and feelings in a safe, private space",
      color: "text-secondary",
      link: "/journal"
    },
    {
      icon: Brain,
      title: "Wellness Resources",
      description: "Explore curated tips and techniques for mental wellbeing",
      color: "text-primary",
      link: "/resources"
    }
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-primary/10 via-secondary/10 to-calm px-6 py-20 md:py-32">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center space-y-6">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-card/50 backdrop-blur-sm rounded-full border border-border/50 mb-4">
              <Sparkles className="w-4 h-4 text-accent" />
              <span className="text-sm font-medium text-foreground">Your mental wellness journey starts here</span>
            </div>
            <h1 className="text-4xl md:text-6xl font-bold text-foreground leading-tight">
              Take Care of Your
              <span className="block bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent mt-2">
                Mental Wellness
              </span>
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto">
              A compassionate space to track your mood, practice mindfulness, and nurture your mental health every day.
            </p>
            <div className="flex flex-wrap gap-4 justify-center pt-4">
              <Button size="lg" className="rounded-full shadow-[var(--shadow-soft)] hover:shadow-lg transition-all">
                Get Started
              </Button>
              <Button size="lg" variant="outline" className="rounded-full">
                Learn More
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="px-6 py-20 bg-background">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Tools for Your Wellbeing
            </h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              Everything you need to support your mental health journey in one place
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <Link key={index} to={feature.link}>
                  <Card className="p-8 hover:shadow-[var(--shadow-soft)] transition-all duration-300 hover:-translate-y-1 cursor-pointer border-border/50 h-full">
                    <div className="flex items-start gap-4">
                      <div className="p-3 bg-calm rounded-2xl">
                        <Icon className={`w-6 h-6 ${feature.color}`} />
                      </div>
                      <div className="flex-1">
                        <h3 className="text-xl font-semibold text-foreground mb-2">
                          {feature.title}
                        </h3>
                        <p className="text-muted-foreground">
                          {feature.description}
                        </p>
                      </div>
                    </div>
                  </Card>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="px-6 py-20 bg-calm/30">
        <div className="container mx-auto max-w-6xl">
          <Card className="p-8 md:p-12 border-border/50">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
              <div className="space-y-2">
                <div className="flex items-center justify-center gap-2">
                  <TrendingUp className="w-6 h-6 text-primary" />
                  <p className="text-3xl md:text-4xl font-bold text-foreground">85%</p>
                </div>
                <p className="text-muted-foreground">Users report improved mood</p>
              </div>
              <div className="space-y-2">
                <div className="flex items-center justify-center gap-2">
                  <Heart className="w-6 h-6 text-accent" />
                  <p className="text-3xl md:text-4xl font-bold text-foreground">10k+</p>
                </div>
                <p className="text-muted-foreground">Daily active users</p>
              </div>
              <div className="space-y-2">
                <div className="flex items-center justify-center gap-2">
                  <Sparkles className="w-6 h-6 text-secondary" />
                  <p className="text-3xl md:text-4xl font-bold text-foreground">4.8★</p>
                </div>
                <p className="text-muted-foreground">Average user rating</p>
              </div>
            </div>
          </Card>
        </div>
      </section>

      {/* CTA Section */}
      <section className="px-6 py-20 bg-gradient-to-br from-primary/10 to-secondary/10">
        <div className="container mx-auto max-w-4xl text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Ready to Start Your Journey?
          </h2>
          <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
            Join thousands of others who are taking control of their mental wellness
          </p>
          <Button size="lg" className="rounded-full shadow-[var(--shadow-soft)] hover:shadow-lg transition-all">
            Begin Today
          </Button>
        </div>
      </section>
    </div>
  );
};

export default Index;
