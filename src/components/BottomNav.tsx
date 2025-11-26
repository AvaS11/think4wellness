import { BookOpen, Heart, Clipboard, Home } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import { Card } from "@/components/ui/card";

const BottomNav = () => {
  const location = useLocation();
  
  const navItems = [
    { icon: Home, label: "Home", link: "/home" },
    { icon: BookOpen, label: "Learn", link: "/resources" },
    { icon: Heart, label: "Reflect", link: "/journal" },
    { icon: Clipboard, label: "Check-in", link: "/mood" },
  ];

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-card border-t border-border px-4 py-3">
      <div className="max-w-2xl mx-auto grid grid-cols-4 gap-2">
        {navItems.map((item, index) => {
          const Icon = item.icon;
          const isActive = location.pathname === item.link;
          return (
            <Link key={index} to={item.link} className="flex">
              <Card 
                className={`w-full aspect-square flex flex-col items-center justify-center gap-1.5 hover:shadow-[var(--shadow-soft)] transition-all border-border/50 ${
                  isActive 
                    ? "bg-calm text-calm-foreground" 
                    : "bg-calm/60 text-calm-foreground"
                }`}
              >
                <Icon className="w-5 h-5 flex-shrink-0" />
                <span className="text-[10px] font-medium text-center leading-tight">{item.label}</span>
              </Card>
            </Link>
          );
        })}
      </div>
    </div>
  );
};

export default BottomNav;
