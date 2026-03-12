import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import MobileShell from "@/components/MobileShell";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import Asistencia from "./pages/Asistencia";
import Nomina from "./pages/Nomina";
import Avisos from "./pages/Avisos";
import AvisoDetalle from "./pages/AvisoDetalle";
import Perfil from "./pages/Perfil";
import Bienestar from "./pages/Bienestar";
import MisTurnos from "./pages/MisTurnos";
import Directorio from "./pages/Directorio";
import Vacaciones from "./pages/Vacaciones";
import DatosPersonales from "./pages/DatosPersonales";
import DatosBancarios from "./pages/DatosBancarios";
import MisSeguros from "./pages/MisSeguros";
import NuevaSolicitud from "./pages/NuevaSolicitud";
import Ayuda from "./pages/Ayuda";
import BuzonLineaSegura from "./pages/BuzonLineaSegura";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route element={<MobileShell />}>
            <Route path="/" element={<Index />} />
            <Route path="/asistencia" element={<Asistencia />} />
            <Route path="/nomina" element={<Nomina />} />
            <Route path="/avisos" element={<Avisos />} />
            <Route path="/avisos/:id" element={<AvisoDetalle />} />
            <Route path="/perfil" element={<Perfil />} />
            <Route path="/bienestar" element={<Bienestar />} />
            <Route path="/mis-turnos" element={<MisTurnos />} />
            <Route path="/directorio" element={<Directorio />} />
            <Route path="/vacaciones" element={<Vacaciones />} />
            <Route path="/datos-personales" element={<DatosPersonales />} />
            <Route path="/datos-bancarios" element={<DatosBancarios />} />
            <Route path="/mis-seguros" element={<MisSeguros />} />
            <Route path="/nueva-solicitud" element={<NuevaSolicitud />} />
            <Route path="/ayuda" element={<Ayuda />} />
            <Route path="/buzon-linea-segura" element={<BuzonLineaSegura />} />
          </Route>
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
