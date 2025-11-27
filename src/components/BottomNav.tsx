import { Home, BookOpen, Heart, Menu } from "lucide-react";
import { cn } from "@/lib/utils";
import { NavLink } from "./NavLink";
import { useTranslation } from "react-i18next";

const BottomNav = () => {
  const { t } = useTranslation();
  
  const navItems = [
    { to: "/resources", icon: BookOpen, label: t('bottomNav.learn'), isCenter: false },
    { to: "/journal", icon: Heart, label: t('bottomNav.reflect'), isCenter: false },
    { to: "/home", icon: Home, label: "", isCenter: true },
    { to: "/mood", icon: Menu, label: t('bottomNav.checkIn'), isCenter: false },
  ];
  
  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-card border-t border-border/50 px-6 py-3 z-50">
      <div className="max-w-2xl mx-auto flex items-center justify-around">
        {navItems.map(({ to, icon: Icon, label, isCenter }) => (
          <NavLink
            key={to}
            to={to}
            className={cn(
              "flex flex-col items-center gap-1 transition-colors",
              isCenter && "scale-110"
            )}
            activeClassName="text-primary"
          >
            <Icon className="h-6 w-6" />
            {label && <span className="text-xs">{label}</span>}
          </NavLink>
        ))}
      </div>
    </nav>
  );
};

export default BottomNav;
