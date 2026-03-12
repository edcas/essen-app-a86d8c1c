import { useState } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { Sun, Moon, Coffee, CheckCircle2, ArrowLeft } from "lucide-react";
import { cn } from "@/lib/utils";
import { WorkStatus } from "@/components/dashboard/WorkStatus";
import { Badge } from "@/components/ui/badge";

const weekSchedule = [
  { dayShort: "LUN", date: 12, isToday: true, shifts: [{ shiftName: "TURNO MATUTINO A", startTime: "06:00", endTime: "14:00", isNight: false }] },
  { dayShort: "MAR", date: 13, shifts: [{ shiftName: "TURNO MATUTINO A", startTime: "06:00", endTime: "14:00", isNight: false }] },
  { dayShort: "MIÉ", date: 14, shifts: [{ shiftName: "TURNO MATUTINO A", startTime: "06:00", endTime: "14:00", isNight: false }, { shiftName: "TURNO NOCTURNO", startTime: "22:00", endTime: "06:00", isNight: true, isExtra: true, extraLabel: "COBERTURA", crossesMidnight: true }] },
  { dayShort: "JUE", date: 15, shifts: [{ shiftName: "TURNO MATUTINO A", startTime: "06:00", endTime: "14:00", isNight: false }] },
  { dayShort: "VIE", date: 16, isPermit: true, permitLabel: "Falta Justificada", shifts: [] },
  { dayShort: "SÁB", date: 17, isRest: true, shifts: [] },
  { dayShort: "DOM", date: 18, isRest: true, shifts: [] },
];

function ShiftRow({ shift }: { shift: any }) {
  return (
    <div className="flex items-start gap-3">
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2 flex-wrap mb-0.5">
          <span className="text-xs font-bold text-muted-foreground uppercase">{shift.shiftName}</span>
          {shift.isExtra && <span className="text-[10px] px-1.5 py-0 rounded-full bg-success/10 text-success font-semibold">{shift.extraLabel || "EXTRA"}</span>}
        </div>
        <p className="text-lg font-extrabold text-foreground">{shift.startTime}<span className="text-muted-foreground font-normal mx-1">→</span>{shift.endTime}{shift.crossesMidnight && <span className="text-xs font-semibold text-warning ml-1.5">(+1)</span>}</p>
      </div>
      <div className={cn("w-9 h-9 rounded-full flex items-center justify-center shrink-0 mt-1", shift.isNight ? "bg-secondary" : "bg-warning/10")}>
        {shift.isNight ? <Moon className="w-4 h-4 text-muted-foreground" /> : <Sun className="w-4 h-4 text-warning" />}
      </div>
    </div>
  );
}

export default function MisTurnos() {
  const navigate = useNavigate();
  return (
    <div className="px-5 py-4 animate-fade-in">
      <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="mb-4 flex items-center gap-3">
        <button onClick={() => navigate(-1)} className="w-8 h-8 rounded-full bg-card border border-border flex items-center justify-center hover:bg-secondary transition-colors"><ArrowLeft className="w-4 h-4 text-foreground" /></button>
        <h1 className="text-xl font-extrabold text-foreground">Tus Turnos</h1>
      </motion.div>
      <div className="mb-4"><WorkStatus isCheckedIn={false} checkinTime={null} /></div>
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.15 }}>
        <h2 className="text-xs font-bold text-muted-foreground uppercase tracking-wider mb-3">Esta Semana</h2>
        <div className="space-y-3">
          {weekSchedule.map((day, i) => (
            <motion.div key={day.date} initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.05 * i }} className={cn("bg-card rounded-xl border border-border p-4", day.isToday && "ring-2 ring-primary/30", day.isPermit && "border-success/30 bg-success/5")}>
              <div className="flex gap-4">
                <div className={cn("flex flex-col items-center justify-center w-12 h-14 rounded-lg shrink-0", day.isToday ? "bg-primary text-primary-foreground" : day.isRest ? "bg-muted" : day.isPermit ? "bg-success/15" : "bg-primary/10")}>
                  <span className={cn("text-xs font-medium", day.isToday ? "text-primary-foreground/80" : day.isPermit ? "text-success" : "text-muted-foreground")}>{day.dayShort}</span>
                  <span className={cn("text-xl font-extrabold", day.isToday ? "text-primary-foreground" : day.isRest ? "text-muted-foreground" : day.isPermit ? "text-success" : "text-primary")}>{day.date}</span>
                </div>
                <div className="flex-1 min-w-0">
                  {day.isPermit ? <div className="flex items-center h-14"><span className="text-sm font-bold text-success uppercase">Permiso Aprobado</span></div>
                  : day.isRest ? <div className="flex items-center gap-2 h-14 text-muted-foreground"><Coffee className="w-4 h-4" /><span className="text-sm">Descanso</span></div>
                  : day.shifts.length === 1 ? <ShiftRow shift={day.shifts[0]} />
                  : <div className="space-y-3">{day.shifts.map((shift, si) => (<div key={si}>{si > 0 && <div className="border-t border-dashed border-border mb-3" />}<ShiftRow shift={shift} /></div>))}</div>}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </div>
  );
}
