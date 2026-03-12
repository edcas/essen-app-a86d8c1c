import { motion } from "framer-motion";
import { MapPin, Clock, Building2, ChevronRight } from "lucide-react";
import { Link } from "react-router-dom";

interface WorkStatusProps {
  isCheckedIn: boolean;
  checkinTime: string | null;
}

export function WorkStatus({ isCheckedIn, checkinTime }: WorkStatusProps) {
  return (
    <motion.div initial={{ opacity: 0, scale: 0.98 }} animate={{ opacity: 1, scale: 1 }} className="bg-card rounded-xl p-4 border border-border">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className={`w-2.5 h-2.5 rounded-full ${isCheckedIn ? "bg-success animate-pulse" : "bg-muted-foreground/40"}`} />
          <div>
            <p className="font-semibold text-foreground text-sm">{isCheckedIn ? "Trabajando" : "Fuera de turno"}</p>
            <p className="text-xs text-muted-foreground">{isCheckedIn && checkinTime ? `Desde las ${checkinTime}` : "Sin registro de entrada"}</p>
          </div>
        </div>
        <span className={`text-xs font-semibold px-2.5 py-0.5 rounded-full ${isCheckedIn ? "bg-success/10 text-success" : "bg-secondary text-muted-foreground"}`}>
          {isCheckedIn ? "Activo" : "Inactivo"}
        </span>
      </div>

      <div className="mt-4 pt-4 border-t border-border flex items-center justify-between text-xs">
        <div className="flex items-center gap-2 text-muted-foreground"><Clock className="w-3.5 h-3.5" /><span>9:00 - 18:00</span></div>
        <div className="flex items-center gap-2 text-muted-foreground"><Building2 className="w-3.5 h-3.5" /><span>Tecnología</span></div>
        {isCheckedIn && <div className="flex items-center gap-2 text-muted-foreground"><MapPin className="w-3.5 h-3.5" /><span>Oficina Central</span></div>}
      </div>
      
      <Link to="/mis-turnos" className="mt-3 pt-3 border-t border-border block group">
        <p className="text-xs text-primary font-semibold flex items-center gap-1 group-hover:underline">
          Ver mis turnos <ChevronRight className="w-3 h-3 group-hover:translate-x-0.5 transition-transform" />
        </p>
      </Link>
    </motion.div>
  );
}
