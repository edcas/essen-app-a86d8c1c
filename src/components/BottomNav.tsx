import { Home, FileText, ClipboardCheck, MessageCircle, GraduationCap } from "lucide-react";

interface BottomNavProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
}

const tabs = [
  { id: "documents", label: "Docs", icon: FileText, isMain: false },
  { id: "evaluations", label: "Evaluar", icon: ClipboardCheck, isMain: false },
  { id: "home", label: "Inicio", icon: Home, isMain: true },
  { id: "social", label: "Social", icon: MessageCircle, isMain: false },
  { id: "training", label: "Cursos", icon: GraduationCap, isMain: false },
];

const BottomNav = ({ activeTab, onTabChange }: BottomNavProps) => {
  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-card border-t border-border safe-bottom z-50">
      <div className="flex items-center justify-around h-16 max-w-lg mx-auto">
        {tabs.map((tab) => {
          const isActive = activeTab === tab.id;

          if (tab.isMain) {
            return (
              <button
                key={tab.id}
                onClick={() => onTabChange(tab.id)}
                className="flex flex-col items-center -mt-5"
              >
                <div
                  className={`w-14 h-14 rounded-full flex items-center justify-center shadow-lg transition-all duration-200 ${
                    isActive
                      ? "bg-primary scale-110"
                      : "bg-primary/80 hover:bg-primary"
                  }`}
                >
                  <tab.icon className="w-6 h-6 text-primary-foreground stroke-[2.5]" />
                </div>
                <span className={`text-[10px] font-extrabold mt-0.5 ${isActive ? "text-primary" : "text-muted-foreground"}`}>
                  {tab.label}
                </span>
              </button>
            );
          }

          return (
            <button
              key={tab.id}
              onClick={() => onTabChange(tab.id)}
              className={`flex flex-col items-center gap-0.5 px-2 py-2 rounded-xl transition-all duration-200 ${
                isActive
                  ? "text-primary scale-105"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              <tab.icon className={`w-5 h-5 ${isActive ? "stroke-[2.5]" : "stroke-[1.8]"}`} />
              <span className={`text-[10px] font-medium ${isActive ? "font-extrabold" : ""}`}>
                {tab.label}
              </span>
              {isActive && (
                <div className="w-1 h-1 rounded-full bg-primary mt-0.5" />
              )}
            </button>
          );
        })}
      </div>
    </nav>
  );
};

export default BottomNav;
