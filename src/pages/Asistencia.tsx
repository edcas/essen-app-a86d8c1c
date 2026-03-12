import { useState } from "react";
import { motion } from "framer-motion";
import { format } from "date-fns";
import { es } from "date-fns/locale";
import { CheckCircle2, XCircle, Clock, AlertCircle, ChevronRight, Calendar, CalendarIcon, Edit3 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { SummaryCard } from "@/components/dashboard/SummaryCard";
import { TeamEventsCard } from "@/components/dashboard/TeamEventsCard";
import { HolidaysSection } from "@/components/dashboard/HolidaysSection";
import { Link, useNavigate } from "react-router-dom";
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Calendar as CalendarComponent } from "@/components/ui/calendar";
import { cn } from "@/lib/utils";

const attendanceData = [
  { date: "Hoy", fullDate: "2 de diciembre", status: "on-time", checkIn: "08:55", checkOut: null, hours: "En curso" },
  { date: "Ayer", fullDate: "1 de diciembre", status: "on-time", checkIn: "08:58", checkOut: "18:05", hours: "9h 07m" },
  { date: "Viernes", fullDate: "29 de noviembre", status: "late", checkIn: "09:15", checkOut: "18:30", hours: "9h 15m" },
  { date: "Jueves", fullDate: "28 de noviembre", status: "on-time", checkIn: "08:45", checkOut: "18:00", hours: "9h 15m" },
  { date: "Miércoles", fullDate: "27 de noviembre", status: "absent", checkIn: null, checkOut: null, hours: "—", reason: "Día festivo" },
];

const statusConfig = {
  "on-time": { icon: CheckCircle2, label: "A tiempo", color: "text-success" },
  late: { icon: Clock, label: "Retardo", color: "text-warning" },
  absent: { icon: XCircle, label: "Sin registro", color: "text-muted-foreground" },
  missing: { icon: AlertCircle, label: "Falta", color: "text-destructive" },
};

export default function Asistencia() {
  const navigate = useNavigate();
  const [historySheetOpen, setHistorySheetOpen] = useState(false);
  const [startDate, setStartDate] = useState<Date>();
  const [endDate, setEndDate] = useState<Date>();

  return (
    <div className="px-5 py-4 animate-fade-in">
      <p className="text-sm text-muted-foreground mb-4">Bitácora de registros</p>

      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="grid grid-cols-3 gap-3 mb-6">
        <SummaryCard icon={CheckCircle2} title="A tiempo" value="22" iconColor="text-success" delay={0.1} />
        <SummaryCard icon={Clock} title="Retardos" value="3" iconColor="text-warning" delay={0.15} />
        <SummaryCard icon={XCircle} title="Faltas" value="1" iconColor="text-destructive" delay={0.2} />
      </motion.div>

      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="flex gap-3 mb-6">
        <Button variant="outline" className="flex-1 gap-2" asChild><Link to="/mis-turnos"><Calendar className="w-4 h-4" />Ver calendario</Link></Button>
        <Button variant="default" className="flex-1 gap-2" onClick={() => navigate("/nueva-solicitud?tipo=correccion-asistencia")}><Edit3 className="w-4 h-4" />Crear Corrección</Button>
      </motion.div>

      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-sm font-bold text-foreground">Historial reciente</h2>
          <button onClick={() => setHistorySheetOpen(true)} className="text-sm text-primary font-semibold flex items-center gap-1 hover:underline">Ver todo<ChevronRight className="w-4 h-4" /></button>
        </div>
        <div className="bg-card rounded-xl border border-border overflow-hidden divide-y divide-border">
          {attendanceData.map((day, index) => {
            const config = statusConfig[day.status as keyof typeof statusConfig];
            const StatusIcon = config.icon;
            return (
              <motion.div key={day.fullDate} initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.05 * index }} className="p-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-lg bg-secondary flex items-center justify-center"><StatusIcon className={`w-4 h-4 ${config.color}`} /></div>
                    <div><p className="font-semibold text-foreground text-sm">{day.date}</p><p className="text-xs text-muted-foreground">{day.fullDate}</p></div>
                  </div>
                  <div className="text-right"><p className="text-sm text-foreground">{day.checkIn || "—"} → {day.checkOut || "—"}</p><p className="text-xs text-muted-foreground">{day.hours}</p></div>
                </div>
                {day.reason && <p className="mt-2 text-xs text-muted-foreground pl-12">{day.reason}</p>}
                {day.status === "late" && <button className="mt-3 flex items-center gap-1 text-xs text-primary hover:underline pl-12">Justificar retardo<ChevronRight className="w-3 h-3" /></button>}
              </motion.div>
            );
          })}
        </div>
      </motion.div>

      <div className="mt-6"><TeamEventsCard /></div>
      <div className="mt-6"><HolidaysSection /></div>

      <Sheet open={historySheetOpen} onOpenChange={setHistorySheetOpen}>
        <SheetContent side="bottom" className="h-[85vh] rounded-t-2xl px-4">
          <SheetHeader className="pb-2"><SheetTitle>Historial de asistencia</SheetTitle></SheetHeader>
          <div className="flex gap-2 mb-4">
            <Popover><PopoverTrigger asChild><Button variant="outline" className={cn("flex-1 justify-start text-left font-normal text-sm", !startDate && "text-muted-foreground")}><CalendarIcon className="mr-2 h-4 w-4" />{startDate ? format(startDate, "dd MMM", { locale: es }) : "Desde"}</Button></PopoverTrigger><PopoverContent className="w-auto p-0" align="start"><CalendarComponent mode="single" selected={startDate} onSelect={setStartDate} initialFocus className="p-3 pointer-events-auto" /></PopoverContent></Popover>
            <Popover><PopoverTrigger asChild><Button variant="outline" className={cn("flex-1 justify-start text-left font-normal text-sm", !endDate && "text-muted-foreground")}><CalendarIcon className="mr-2 h-4 w-4" />{endDate ? format(endDate, "dd MMM", { locale: es }) : "Hasta"}</Button></PopoverTrigger><PopoverContent className="w-auto p-0" align="end"><CalendarComponent mode="single" selected={endDate} onSelect={setEndDate} initialFocus className="p-3 pointer-events-auto" /></PopoverContent></Popover>
          </div>
          <ScrollArea className="h-[calc(85vh-160px)]">
            <div className="space-y-3 pr-4">
              {attendanceData.map((day, index) => {
                const config = statusConfig[day.status as keyof typeof statusConfig];
                const StatusIcon = config.icon;
                return (
                  <div key={index} className="bg-secondary/50 rounded-xl p-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-lg bg-card border border-border flex items-center justify-center"><StatusIcon className={`w-5 h-5 ${config.color}`} /></div>
                        <div><p className="font-semibold text-foreground">{day.date}</p><p className="text-xs text-muted-foreground">{day.fullDate}</p></div>
                      </div>
                      <div className="text-right"><p className="text-sm font-semibold text-foreground">{day.checkIn || "—"} → {day.checkOut || "—"}</p><p className="text-xs text-muted-foreground">{day.hours}</p></div>
                    </div>
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
