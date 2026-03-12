import { useState, useCallback } from "react";
import AppHeader from "@/components/AppHeader";
import BottomNav from "@/components/BottomNav";
import HomeScreen from "@/components/screens/HomeScreen";
import DocumentsScreen from "@/components/screens/DocumentsScreen";
import EvaluationsScreen from "@/components/screens/EvaluationsScreen";
import SocialScreen from "@/components/screens/SocialScreen";
import TrainingScreen from "@/components/screens/TrainingScreen";
import SplashAnimation from "@/components/SplashAnimation";
import Perfil from "@/pages/Perfil";

const Index = () => {
  const [activeTab, setActiveTab] = useState("home");
  const [showSplash, setShowSplash] = useState(true);

  const tabTitles: Record<string, string> = {
    home: "Essen",
    documents: "Documentos",
    evaluations: "Evaluaciones",
    social: "Social",
    training: "Capacitación",
    profile: "Mi Perfil",
  };

  const handleTabChange = useCallback((tab: string) => {
    if (tab === "home") {
      setShowSplash(true);
    }
    setActiveTab(tab);
  }, []);

  const renderScreen = () => {
    switch (activeTab) {
      case "home": return <HomeScreen />;
      case "documents": return <DocumentsScreen />;
      case "evaluations": return <EvaluationsScreen />;
      case "social": return <SocialScreen />;
      case "training": return <TrainingScreen />;
      case "profile": return <Perfil />;
      default: return <HomeScreen />;
    }
  };

  return (
    <div className="min-h-screen bg-background relative">
      <SplashAnimation show={showSplash} onComplete={() => setShowSplash(false)} />
      <AppHeader title={tabTitles[activeTab]} onProfileClick={() => setActiveTab("profile")} />
      <main className="pb-20">
        {renderScreen()}
      </main>
      <BottomNav activeTab={activeTab} onTabChange={handleTabChange} />
    </div>
  );
};

export default Index;
