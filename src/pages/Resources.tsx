import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Brain, Heart, Lightbulb, Users, BookOpen, Phone } from "lucide-react";
import BottomNav from "@/components/BottomNav";

const Resources = () => {
  const resourceCategories = [
    {
      icon: Brain,
      title: "Understanding Mental Health",
      description: "Learn about common mental health conditions and their symptoms",
      color: "text-primary",
      articles: [
        "What is anxiety?",
        "Recognizing depression",
        "Managing stress effectively"
      ]
    },
    {
      icon: Heart,
      title: "Self-Care Practices",
      description: "Daily habits and techniques to support your wellbeing",
      color: "text-accent",
      articles: [
        "Building a self-care routine",
        "The importance of sleep",
        "Mindful eating habits"
      ]
    },
    {
      icon: Lightbulb,
      title: "Coping Strategies",
      description: "Practical tools for managing difficult emotions",
      color: "text-secondary",
      articles: [
        "Grounding techniques",
        "Progressive muscle relaxation",
        "Thought challenging exercises"
      ]
    },
    {
      icon: Users,
      title: "Building Connections",
      description: "The role of relationships in mental wellness",
      color: "text-primary",
      articles: [
        "Communicating your needs",
        "Setting healthy boundaries",
        "Finding support groups"
      ]
    }
  ];

  const emergencyResources = [
    {
      name: "National Suicide Prevention Lifeline",
      number: "988",
      description: "24/7 crisis support"
    },
    {
      name: "Crisis Text Line",
      number: "Text HOME to 741741",
      description: "Free 24/7 text support"
    }
  ];

  return (
    <div className="min-h-screen bg-background pb-20">
      <div className="bg-gradient-to-br from-primary/10 via-secondary/10 to-calm px-6 pt-12 pb-8 mb-6">
        <div className="max-w-2xl mx-auto">
          <h1 className="text-3xl font-bold text-foreground mb-2">Wellness Resources</h1>
          <p className="text-lg text-muted-foreground">
            Tools to support your mental health journey
          </p>
        </div>
      </div>
      
      <div className="container mx-auto max-w-2xl px-6">

        {/* Emergency Resources */}
        <Card className="p-6 mb-12 bg-accent/10 border-accent/30">
          <div className="flex items-start gap-4">
            <Phone className="w-6 h-6 text-accent flex-shrink-0 mt-1" />
            <div className="flex-1">
              <h2 className="text-xl font-semibold text-foreground mb-3">In Crisis?</h2>
              <div className="space-y-3">
                {emergencyResources.map((resource, index) => (
                  <div key={index} className="flex items-center justify-between">
                    <div>
                      <p className="font-medium text-foreground">{resource.name}</p>
                      <p className="text-sm text-muted-foreground">{resource.description}</p>
                    </div>
                    <Button variant="outline" className="rounded-full">
                      {resource.number}
                    </Button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </Card>

        {/* Resource Categories */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
          {resourceCategories.map((category, index) => {
            const Icon = category.icon;
            return (
              <Card key={index} className="p-6 border-border/50 hover:shadow-[var(--shadow-soft)] transition-all">
                <div className="flex items-start gap-4 mb-4">
                  <div className="p-3 bg-calm rounded-xl">
                    <Icon className={`w-6 h-6 ${category.color}`} />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl font-semibold text-foreground mb-2">
                      {category.title}
                    </h3>
                    <p className="text-muted-foreground text-sm">
                      {category.description}
                    </p>
                  </div>
                </div>
                <div className="space-y-2 pl-16">
                  {category.articles.map((article, articleIndex) => (
                    <button
                      key={articleIndex}
                      className="block w-full text-left px-4 py-2 rounded-lg hover:bg-calm transition-colors text-sm text-foreground"
                    >
                      {article}
                    </button>
                  ))}
                </div>
              </Card>
            );
          })}
        </div>

        {/* Additional Resources */}
        <Card className="p-8 border-border/50 bg-wellness/30 mb-6">
          <div className="flex items-center gap-3 mb-4">
            <BookOpen className="w-6 h-6 text-secondary" />
            <h2 className="text-2xl font-semibold text-foreground">Further Reading</h2>
          </div>
          <p className="text-muted-foreground mb-6">
            Explore recommended books, podcasts, and articles to deepen your understanding of mental wellness.
          </p>
          <Button className="rounded-full">Browse Library</Button>
        </Card>
      </div>

      {/* Bottom Navigation */}
      <BottomNav />
    </div>
  );
};

export default Resources;
