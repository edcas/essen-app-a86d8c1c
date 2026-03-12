import { useState } from "react";
import { motion } from "framer-motion";
import { Calendar, FileEdit, Home, FileText, ChevronRight, Clock, CheckCircle2, XCircle, Receipt } from "lucide-react";
import { Link } from "react-router-dom";
import { cn } from "@/lib/utils";
import { useSettings } from "@/hooks/use-settings";
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { ScrollArea } from "@/components/ui/scroll-area";

const actions = [
  { icon: Calendar, label: "Pedir vacaciones", description: "12 días disponibles", path: "/vacaciones", bg: "bg-primary/10", color: "text-primary" },
  { icon: FileEdit, label: "Corregir asistencia", description: "Justificar falta o retardo", path: "/nueva-solicitud?tipo=correccion-asistencia", bg: "bg-accent/10", color: "text-accent" },
  { icon: Home, label: "Home office", description: "Solicitar trabajo remoto", path: "/nueva-solicitud?tipo=home-office", bg: "bg-primary/10", color: "text-primary" },
  { icon: Receipt, label: "Devolución de viáticos", description: "Solicitar reembolso de gastos", path: "/nueva-solicitud?tipo=devolucion-viaticos", bg: "bg-primary/10", color: "text-primary" },
  { icon: FileText, label: "Constancias", description: "Descargar documentos", path: "/nomina", bg: "bg-accent/10", color: "text-accent" },
];

const container = { hidden: { opacity: 0 }, show: { opacity: 1, transition: { staggerChildren: 0.05 } } };
const item = { hidden: { opacity: 0, x: -10 }, show: { opacity: 1, x: 0 } };

const requestHistory = [
  { id: 1, type: "Vacaciones", date: "10 Feb 2026", status: "approved", detail: "12-16 Feb · 5 días" },
  { id: 2, type: "Home office", date: "5 Feb 2026", status: "approved", detail: "6 Feb · 1 día" },
  { id: 3, type: "Incapacidad", date: "28 Ene 2026", status: "approved", detail: "28-30 Ene · 3 días" },
  { id: 4, type: "Vacaciones", date: "15 Ene 2026", status: "rejected", detail: "20-24 Ene · 5 días" },
  { id: 5, type: "Corrección asistencia", date: "10 Ene 2026", status: "approved", detail: "Olvido de checado" },
  { id: 6, type: "Home office", date: "8 Ene 2026", status: "pending", detail: "9 Ene · 1 día" },
  { id: 7, type: "Falta justificada", date: "20 Dic 2025", status: "approved", detail: "Cita médica" },
  { id: 8, type: "Vacaciones", date: "1 Dic 2025", status: "approved", detail: "23-31 Dic · 7 días" },
];

const statusStyles = {
  approved: { label: "Aprobada", icon: CheckCircle2, color: "text-success", bg: "bg-success/10" },
  rejected: { label: "Rechazada", icon: XCircle, color: "text-destructive", bg: "bg-destructive/10" },
  pending: { label: "Pendiente", icon: Clock, color: "text-warning", bg: "bg-warning/10" },
};

export function QuickActions() {
  const { settings } = useSettings();
  const [historyOpen, setHistoryOpen] = useState(false);
  const visibleActions = settings.hideConstancias ? actions.filter((a) => a.label !== "Constancias") : actions;

  return (
    <div>
      <div className="flex items-center justify-between mb-3">
        <h2 className="text-sm font-bold text-foreground">Solicitudes</h2>
        <button onClick={() => setHistoryOpen(true)} className="text-sm text-primary font-semibold flex items-center gap-1 hover:underline">
          Ver historial <ChevronRight className="w-4 h-4" />
        </button>
      </div>
      <motion.div variants={container} initial="hidden" animate="show" className="bg-card rounded-xl border border-border overflow-hidden divide-y divide-border">
        {visibleActions.map((action) => (
          <motion.div key={action.label} variants={item}>
            <Link to={action.path} className="flex items-center gap-4 p-4 hover:bg-secondary/50 transition-colors group">
              <div className={cn("w-10 h-10 rounded-full flex items-center justify-center shrink-0", action.bg)}>
                <action.icon className={cn("w-5 h-5", action.color)} />
              </div>
              <div className="flex-1 min-w-0">
                <p className="font-semibold text-foreground text-sm">{action.label}</p>
                <p className="text-xs text-muted-foreground truncate">{action.description}</p>
              </div>
              <ChevronRight className="w-5 h-5 text-muted-foreground group-hover:text-foreground group-hover:translate-x-0.5 transition-all" />
            </Link>
          </motion.div>
        ))}
      </motion.div>

      <Sheet open={historyOpen} onOpenChange={setHistoryOpen}>
        <SheetContent side="bottom" className="h-[85vh] rounded-t-2xl px-4">
          <SheetHeader className="pb-4"><SheetTitle>Historial de solicitudes</SheetTitle></SheetHeader>
          <ScrollArea className="h-[calc(85vh-100px)]">
            <div className="space-y-3 pr-4">
              {requestHistory.map((req) => {
                const style = statusStyles[req.status as keyof typeof statusStyles];
                const StatusIcon = style.icon;
                return (
                  <div key={req.id} className="bg-card rounded-xl border border-border p-4">
                    <div className="flex items-center justify-between mb-1">
                      <p className="font-semibold text-foreground text-sm">{req.type}</p>
                      <span className={cn("inline-flex items-center gap-1 text-xs font-medium px-2 py-0.5 rounded-full", style.bg, style.color)}>
                        <StatusIcon className="w-3 h-3" />{style.label}
                      </span>
                    </div>
                    <p className="text-xs text-muted-foreground">{req.detail}</p>
                    <p className="text-xs text-muted-foreground/60 mt-1">{req.date}</p>
                  </div>
                );
              })}
            </div>
          </ScrollArea>
        </SheetContent>
      </Sheet>
    </div>
  );
}
