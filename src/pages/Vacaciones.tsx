import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { Palmtree, Calendar, AlertTriangle, Check, Clock, X, Info } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { format } from "date-fns";
import { es } from "date-fns/locale";
import { cn } from "@/lib/utils";

const vacationBalance = { available: 11.0, accumulated: 14.0, expired: 1.0, taken: 2.0 };
const vacationHistory = [
  { id: 1, startDate: new Date(2024, 11, 20), endDate: new Date(2024, 11, 27), days: 5.0, type: "Legales", status: "pending" as const },
  { id: 2, startDate: new Date(2024, 7, 12), endDate: new Date(2024, 7, 16), days: 4.0, type: "Legales", status: "approved" as const },
  { id: 3, startDate: new Date(2024, 3, 1), endDate: new Date(2024, 3, 5), days: 4.0, type: "Legales", status: "approved" as const },
  { id: 4, startDate: new Date(2024, 1, 14), endDate: new Date(2024, 1, 16), days: 2.0, type: "Legales", status: "rejected" as const },
];
const statusConfig = {
  approved: { label: "Aprobada", icon: Check, className: "bg-success/10 text-success border-success/20" },
  pending: { label: "Pendiente", icon: Clock, className: "bg-warning/10 text-warning border-warning/20" },
  rejected: { label: "Rechazada", icon: X, className: "bg-destructive/10 text-destructive border-destructive/20" },
};

export default function Vacaciones() {
  const navigate = useNavigate();
  return (
    <div className="px-5 py-4 space-y-6 animate-fade-in">
      <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }}>
        <Card className="bg-success/5 border-success/20 p-6">
          <div className="flex items-center justify-between">
            <div><p className="text-sm text-muted-foreground mb-1">Saldo disponible</p><div className="flex items-baseline gap-2"><span className="text-5xl font-extrabold text-success">{vacationBalance.available}</span><span className="text-lg text-muted-foreground">días</span></div></div>
            <div className="w-16 h-16 rounded-full bg-success/20 flex items-center justify-center"><Palmtree className="w-8 h-8 text-success" /></div>
          </div>
          <div className="mt-4 p-3 bg-success/10 rounded-lg border border-success/20 flex items-center gap-2"><Info className="w-4 h-4 text-success flex-shrink-0" /><p className="text-sm text-success font-semibold">Tienes {vacationBalance.available} días disponibles</p></div>
        </Card>
      </motion.div>
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="grid grid-cols-3 gap-3">
        <Card className="p-4 text-center border-info/20 bg-info/5"><p className="text-2xl font-extrabold text-info">{vacationBalance.accumulated}</p><p className="text-xs text-muted-foreground mt-1">Acumuladas</p></Card>
        <Card className={cn("p-4 text-center", vacationBalance.expired > 0 ? "border-destructive/20 bg-destructive/5" : "border-border")}><div className="flex items-center justify-center gap-1"><p className={cn("text-2xl font-extrabold", vacationBalance.expired > 0 ? "text-destructive" : "text-muted-foreground")}>{vacationBalance.expired}</p>{vacationBalance.expired > 0 && <AlertTriangle className="w-4 h-4 text-destructive" />}</div><p className="text-xs text-muted-foreground mt-1">Vencidas</p></Card>
        <Card className="p-4 text-center border-warning/20 bg-warning/5"><p className="text-2xl font-extrabold text-warning">{vacationBalance.taken}</p><p className="text-xs text-muted-foreground mt-1">Tomadas</p></Card>
      </motion.div>
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}><Button className="w-full gap-2" size="lg" onClick={() => navigate("/nueva-solicitud?tipo=vacaciones")}><Calendar className="w-5 h-5" />Pedir vacaciones</Button></motion.div>
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}>
        <h2 className="text-xs font-bold text-muted-foreground uppercase tracking-wider mb-3">Historial de solicitudes</h2>
        <div className="space-y-3">
          {vacationHistory.sort((a, b) => b.startDate.getTime() - a.startDate.getTime()).map((request) => {
            const config = statusConfig[request.status]; const StatusIcon = config.icon;
            return (<Card key={request.id} className="p-4"><div className="flex items-start justify-between"><div className="space-y-1"><div className="flex items-center gap-2"><Calendar className="w-4 h-4 text-muted-foreground" /><span className="text-sm font-semibold text-foreground">{format(request.startDate, "d MMM", { locale: es })} - {format(request.endDate, "d MMM yyyy", { locale: es })}</span></div><div className="flex items-center gap-3 text-xs text-muted-foreground"><span>{request.days} días</span><span>•</span><span>{request.type}</span></div></div><span className={cn("inline-flex items-center gap-1 text-xs font-semibold px-2 py-0.5 rounded-full border", config.className)}><StatusIcon className="w-3 h-3" />{config.label}</span></div></Card>);
          })}
        </div>
      </motion.div>
    </div>
  );
}
