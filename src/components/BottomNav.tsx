import { Home, BookOpen, Heart, Menu } from "lucide-react";
import { cn } from "@/lib/utils";
import NavLink from "./NavLink";
import { useTranslation } from "react-i18next";

const BottomNav = () => {
  const { t } = useTranslation();
  
  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-card border-t border-border/50 px-6 py-3 z-50">
      <div className="max-w-2xl mx-auto flex items-center justify-around">
        <NavLink to="/resources" icon={BookOpen} label={t('bottomNav.learn')} />
        <NavLink to="/journal" icon={Heart} label={t('bottomNav.reflect')} />
        <NavLink to="/home" icon={Home} label="" isCenter />
        <NavLink to="/mood" icon={Menu} label={t('bottomNav.checkIn')} />
      </div>
    </nav>
  );
};

export default BottomNav;
