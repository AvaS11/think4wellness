import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Brain, Heart, Lightbulb, Users, BookOpen, Phone, ExternalLink } from "lucide-react";
import BottomNav from "@/components/BottomNav";
import { useTranslation } from "react-i18next";

const Resources = () => {
  const { t } = useTranslation();

  const resourceCategories = [
    {
      icon: Brain,
      title: t('resources.category1Title'),
      description: t('resources.category1Description'),
      color: "text-foreground",
      articles: [
        { text: t('resources.category1Article1'), url: "https://www.who.int/news-room/fact-sheets/detail/anxiety-disorders" },
        { text: t('resources.category1Article2'), url: "https://www.who.int/news-room/fact-sheets/detail/depression" },
        { text: t('resources.category1Article3'), url: "https://www.who.int/news-room/questions-and-answers/item/stress" }
      ]
    },
    {
      icon: Heart,
      title: t('resources.category2Title'),
      description: t('resources.category2Description'),
      color: "text-foreground",
      articles: [
        { text: t('resources.category2Article1'), url: "https://www.who.int/health-topics/self-care#tab=tab_1" },
        { text: t('resources.category2Article2'), url: "https://www.cdc.gov/sleep/about/index.html" },
        { text: t('resources.category2Article3'), url: "https://www.who.int/news-room/fact-sheets/detail/healthy-diet" }
      ]
    },
    {
      icon: Lightbulb,
      title: t('resources.category3Title'),
      description: t('resources.category3Description'),
      color: "text-foreground",
      articles: [
        { text: t('resources.category3Article1'), url: "https://health.clevelandclinic.org/grounding-techniques" },
        { text: t('resources.category3Article2'), url: "https://www.ncbi.nlm.nih.gov/books/NBK513238/" },
        { text: t('resources.category3Article3'), url: "https://cogbtherapy.com/cbt-blog/cognitive-defusion-techniques-and-exercises" }
      ]
    },
    {
      icon: Users,
      title: t('resources.category4Title'),
      description: t('resources.category4Description'),
      color: "text-foreground",
      articles: [
        { text: t('resources.category4Article1'), url: "https://www.who.int/about/communications/principles" },
        { text: t('resources.category4Article2'), url: "https://www.mayoclinichealthsystem.org/hometown-health/speaking-of-health/setting-boundaries-for-well-being" },
        { text: t('resources.category4Article3'), url: "https://www.mayoclinic.org/healthy-lifestyle/stress-management/in-depth/support-groups/art-20044655" }
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
                    <a
                      key={articleIndex}
                      href={article.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-between w-full text-left px-4 py-2 rounded-lg hover:bg-calm transition-colors text-sm text-foreground group"
                    >
                      <span>{article.text}</span>
                      <ExternalLink className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity text-muted-foreground" />
                    </a>
                  ))}
                </div>
              </Card>
            );
          })}
        </div>

      </div>

      {/* Bottom Navigation */}
      <BottomNav />
    </div>
  );
};

export default Resources;
