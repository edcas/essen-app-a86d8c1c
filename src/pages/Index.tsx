import { useState } from "react";
import AppHeader from "@/components/AppHeader";
import BottomNav from "@/components/BottomNav";
import HomeScreen from "@/components/screens/HomeScreen";
import DocumentsScreen from "@/components/screens/DocumentsScreen";
import EvaluationsScreen from "@/components/screens/EvaluationsScreen";
import SocialScreen from "@/components/screens/SocialScreen";
import TrainingScreen from "@/components/screens/TrainingScreen";

const Index = () => {
  const [activeTab, setActiveTab] = useState("home");

  const tabTitles: Record<string, string> = {
    home: "ESSEN",
    documents: "Documentos",
    evaluations: "Evaluaciones",
    social: "Social",
    training: "Capacitación",
  };

  const renderScreen = () => {
    switch (activeTab) {
      case "home": return <HomeScreen />;
      case "documents": return <DocumentsScreen />;
      case "evaluations": return <EvaluationsScreen />;
      case "social": return <SocialScreen />;
      case "training": return <TrainingScreen />;
      default: return <HomeScreen />;
    }
  };

  return (
    <div className="min-h-screen bg-background max-w-lg mx-auto relative">
      <AppHeader title={tabTitles[activeTab]} />
      <main className="pb-20">
        {renderScreen()}
      </main>
      <BottomNav activeTab={activeTab} onTabChange={setActiveTab} />
    </div>
  );
};

export default Index;
