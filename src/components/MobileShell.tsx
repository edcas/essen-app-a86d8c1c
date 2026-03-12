import { Outlet, useNavigate, useLocation } from "react-router-dom";
import BottomNav from "@/components/BottomNav";

const MobileShell = () => {
  const navigate = useNavigate();
  const location = useLocation();

  // Determine active tab based on current route
  const getActiveTab = () => {
    if (location.pathname === "/") {
      const params = new URLSearchParams(location.search);
      return params.get("tab") || "home";
    }
    return "";
  };

  const handleTabChange = (tab: string) => {
    if (tab === "home") {
      navigate("/?tab=home");
    } else {
      navigate(`/?tab=${tab}`);
    }
  };

  return (
    <div className="min-h-screen bg-background max-w-lg mx-auto relative">
      <Outlet />
      <BottomNav activeTab={getActiveTab()} onTabChange={handleTabChange} />
    </div>
  );
};

export default MobileShell;
