import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";

interface MobileLayoutProps {
  children: React.ReactNode;
  title: string;
  showBack?: boolean;
}

const MobileLayout = ({ children, title, showBack = true }: MobileLayoutProps) => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-background max-w-lg mx-auto relative">
      <header className="sticky top-0 z-40 bg-card/80 backdrop-blur-lg border-b border-border">
        <div className="flex items-center gap-3 px-5 py-3">
          {showBack && (
            <button
              onClick={() => navigate(-1)}
              className="w-9 h-9 rounded-full bg-secondary flex items-center justify-center"
            >
              <ArrowLeft className="w-4 h-4 text-foreground" />
            </button>
          )}
          <h1 className="text-base font-extrabold tracking-tight">{title}</h1>
        </div>
      </header>
      <main className="pb-6">
        {children}
      </main>
    </div>
  );
};

export default MobileLayout;
