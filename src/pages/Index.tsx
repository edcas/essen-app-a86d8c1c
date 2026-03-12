import { useState, useCallback, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import AppHeader from "@/components/AppHeader";
import HomeScreen from "@/components/screens/HomeScreen";
import DocumentsScreen from "@/components/screens/DocumentsScreen";
import EvaluationsScreen from "@/components/screens/EvaluationsScreen";
import SocialScreen from "@/components/screens/SocialScreen";
import TrainingScreen from "@/components/screens/TrainingScreen";
import SplashAnimation from "@/components/SplashAnimation";
import Perfil from "@/pages/Perfil";

const Index = () => {
  const [searchParams] = useSearchParams();
  const tabParam = searchParams.get("tab") || "home";
  const [activeTab, setActiveTab] = useState(tabParam);
  const [showSplash, setShowSplash] = useState(true);

  useEffect(() => {
    setActiveTab(tabParam);
    if (tabParam === "home") {
      setShowSplash(true);
    }
  }, [tabParam]);

  const tabTitles: Record<string, string> = {
    home: "Essen",
    documents: "Documentos",
    evaluations: "Evaluaciones",
    social: "Social",
    training: "Capacitación",
    profile: "Mi Perfil",
  };

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
    </div>
  );
};

export default Index;
