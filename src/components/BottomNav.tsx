import { BookOpen, Heart, Clipboard } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import { Card } from "@/components/ui/card";

const BottomNav = () => {
  const location = useLocation();
  
  const navItems = [
    { icon: BookOpen, label: "Learn", link: "/resources" },
    { icon: Heart, label: "Reflect", link: "/journal" },
    { icon: Clipboard, label: "Check-in", link: "/mood" },
  ];

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-card border-t border-border px-6 py-4">
      <div className="max-w-2xl mx-auto grid grid-cols-3 gap-3">
        {navItems.map((item, index) => {
          const Icon = item.icon;
          const isActive = location.pathname === item.link;
          return (
            <Link key={index} to={item.link}>
              <Card 
                className={`p-4 flex flex-col items-center gap-2 hover:shadow-[var(--shadow-soft)] transition-all border-border/50 ${
                  isActive 
                    ? "bg-calm text-calm-foreground" 
                    : "bg-calm/60 text-calm-foreground"
                }`}
              >
                <Icon className="w-6 h-6" />
                <span className="text-xs font-medium text-center">{item.label}</span>
              </Card>
            </Link>
          );
        })}
      </div>
    </div>
  );
};

export default BottomNav;
