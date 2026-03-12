import { Outlet } from "react-router-dom";

const MobileShell = () => {
  return (
    <div className="min-h-screen bg-background max-w-lg mx-auto relative">
      <Outlet />
    </div>
  );
};

export default MobileShell;
