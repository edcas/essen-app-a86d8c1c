import { Bell, User } from "lucide-react";

interface AppHeaderProps {
  title?: string;
  userName?: string;
}

const AppHeader = ({ title = "ESSEN", userName = "Carlos M." }: AppHeaderProps) => {
  return (
    <header className="sticky top-0 z-40 bg-card/80 backdrop-blur-lg border-b border-border">
      <div className="flex items-center justify-between px-5 py-3 max-w-lg mx-auto">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-full bg-primary flex items-center justify-center">
            <span className="text-primary-foreground font-bold text-sm">E</span>
          </div>
          <div>
            <h1 className="text-base font-bold tracking-tight">{title}</h1>
            <p className="text-xs text-muted-foreground">Hola, {userName}</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <button className="w-9 h-9 rounded-full bg-secondary flex items-center justify-center relative">
            <Bell className="w-4 h-4 text-foreground" />
            <span className="absolute -top-0.5 -right-0.5 w-4 h-4 bg-primary rounded-full text-[9px] text-primary-foreground font-bold flex items-center justify-center">
              3
            </span>
          </button>
          <button className="w-9 h-9 rounded-full bg-secondary flex items-center justify-center">
            <User className="w-4 h-4 text-foreground" />
          </button>
        </div>
      </div>
    </header>
  );
};

export default AppHeader;
