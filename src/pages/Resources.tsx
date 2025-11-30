import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Brain, Heart, Lightbulb, Users, BookOpen, Phone } from "lucide-react";
import BottomNav from "@/components/BottomNav";
import { useTranslation } from "react-i18next";

const Resources = () => {
  const { t } = useTranslation();

  const resourceCategories = [
    {
      icon: Brain,
      title: t('resources.category1Title'),
      description: t('resources.category1Description'),
      color: "text-primary",
      whoLink: "https://www.who.int/news-room/fact-sheets/detail/mental-disorders",
      articles: [
        t('resources.category1Article1'),
        t('resources.category1Article2'),
        t('resources.category1Article3')
      ]
    },
    {
      icon: Heart,
      title: t('resources.category2Title'),
      description: t('resources.category2Description'),
      color: "text-accent",
      whoLink: "https://www.who.int/news-room/fact-sheets/detail/mental-health-strengthening-our-response",
      articles: [
        t('resources.category2Article1'),
        t('resources.category2Article2'),
        t('resources.category2Article3')
      ]
    },
    {
      icon: Lightbulb,
      title: t('resources.category3Title'),
      description: t('resources.category3Description'),
      color: "text-secondary",
      whoLink: "https://www.who.int/health-topics/mental-health",
      articles: [
        t('resources.category3Article1'),
        t('resources.category3Article2'),
        t('resources.category3Article3')
      ]
    },
    {
      icon: Users,
      title: t('resources.category4Title'),
      description: t('resources.category4Description'),
      color: "text-primary",
      whoLink: "https://www.who.int/campaigns/world-mental-health-day",
      articles: [
        t('resources.category4Article1'),
        t('resources.category4Article2'),
        t('resources.category4Article3')
      ]
    }
  ];

  const emergencyResources = [
    {
      name: t('resources.emergencyLine1Name'),
      number: t('resources.emergencyLine1Number'),
      description: t('resources.emergencyLine1Description')
    },
    {
      name: t('resources.emergencyLine2Name'),
      number: t('resources.emergencyLine2Number'),
      description: t('resources.emergencyLine2Description')
    }
  ];

  return (
    <div className="min-h-screen bg-background pb-20">
      <div className="bg-gradient-to-br from-primary/10 via-secondary/10 to-calm px-6 pt-12 pb-8 mb-6">
        <div className="max-w-2xl mx-auto">
          <h1 className="text-3xl font-bold text-foreground mb-2">{t('resources.title')}</h1>
          <p className="text-lg text-muted-foreground">
            {t('resources.subtitle')}
          </p>
        </div>
      </div>
      
      <div className="container mx-auto max-w-2xl px-6">

        {/* Emergency Resources */}
        <Card className="p-6 mb-12 bg-accent/10 border-accent/30">
          <div className="flex items-start gap-4">
            <Phone className="w-6 h-6 text-accent flex-shrink-0 mt-1" />
            <div className="flex-1">
              <h2 className="text-xl font-semibold text-foreground mb-3">{t('resources.inCrisis')}</h2>
              <div className="space-y-3">
                {emergencyResources.map((resource, index) => (
                  <div key={index} className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
                    <div className="flex-1">
                      <p className="font-medium text-foreground">{resource.name}</p>
                      <p className="text-sm text-muted-foreground">{resource.description}</p>
                    </div>
                    <Button variant="outline" className="rounded-full shrink-0 w-fit">
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
                    <a 
                      href={category.whoLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-xl font-semibold text-foreground mb-2 hover:text-primary transition-colors inline-block"
                    >
                      {category.title}
                    </a>
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
            <a 
              href="https://www.who.int/health-topics/mental-health"
              target="_blank"
              rel="noopener noreferrer"
              className="text-2xl font-semibold text-foreground hover:text-primary transition-colors"
            >
              {t('resources.furtherReading')}
            </a>
          </div>
          <p className="text-muted-foreground mb-6">
            {t('resources.furtherReadingDescription')}
          </p>
          <Button 
            onClick={() => window.open('https://www.who.int/health-topics/mental-health', '_blank')}
            className="rounded-full"
          >
            {t('resources.browseLibrary')}
          </Button>
        </Card>
      </div>

      {/* Bottom Navigation */}
      <BottomNav />
    </div>
  );
};

export default Resources;
