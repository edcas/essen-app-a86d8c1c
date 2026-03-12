import { motion } from "framer-motion";
import { MapPin, X, AlertTriangle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { createPortal } from "react-dom";

interface OutOfRangeOverlayProps {
  distance: number | null;
  onClose: () => void;
}

export function OutOfRangeOverlay({ distance, onClose }: OutOfRangeOverlayProps) {
  return createPortal(
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-[60] flex items-center justify-center bg-black/50 px-6" onClick={onClose}>
      <motion.div initial={{ scale: 0.9, y: 20 }} animate={{ scale: 1, y: 0 }} exit={{ scale: 0.9, y: 20 }} onClick={(e) => e.stopPropagation()} className="relative bg-card rounded-2xl border border-border p-6 w-full max-w-sm shadow-lg">
        <button onClick={onClose} className="absolute top-4 right-4 text-muted-foreground hover:text-foreground transition-colors"><X className="w-5 h-5" /></button>
        <div className="flex justify-center mb-4">
          <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: "spring", stiffness: 300, delay: 0.1 }} className="w-14 h-14 rounded-full bg-warning/10 flex items-center justify-center">
            <AlertTriangle className="w-7 h-7 text-warning" />
          </motion.div>
        </div>
        <h2 className="text-lg font-bold text-foreground text-center mb-1">Fuera de rango</h2>
        <p className="text-sm text-muted-foreground text-center mb-5">No te encuentras dentro de la zona permitida para registrar tu asistencia.</p>
        <div className="relative w-full aspect-square max-w-[200px] mx-auto mb-5">
          <svg viewBox="0 0 220 220" className="w-full h-full">
            {[44, 88, 132, 176].map((pos) => (<g key={pos}><line x1={pos} y1="0" x2={pos} y2="220" stroke="hsl(var(--primary))" strokeWidth="0.5" opacity="0.2" /><line x1="0" y1={pos} x2="220" y2={pos} stroke="hsl(var(--primary))" strokeWidth="0.5" opacity="0.2" /></g>))}
            <circle cx="110" cy="110" r="50" fill="hsl(var(--success) / 0.08)" stroke="hsl(var(--success))" strokeWidth="1.5" strokeDasharray="4 3" />
            <circle cx="110" cy="110" r="6" fill="hsl(var(--success))" />
            <circle cx="110" cy="110" r="10" fill="none" stroke="hsl(var(--success))" strokeWidth="1" opacity="0.4" />
            <motion.g initial={{ opacity: 0, scale: 0 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.3 }}>
              <circle cx="170" cy="55" r="4" fill="hsl(var(--destructive))" />
              <circle cx="170" cy="55" r="8" fill="none" stroke="hsl(var(--destructive))" strokeWidth="1" opacity="0.5"><animate attributeName="r" values="8;16" dur="1.5s" repeatCount="indefinite" /><animate attributeName="opacity" values="0.5;0" dur="1.5s" repeatCount="indefinite" /></circle>
            </motion.g>
            <line x1="170" y1="55" x2="110" y2="110" stroke="hsl(var(--destructive))" strokeWidth="1" strokeDasharray="4 3" opacity="0.4" />
          </svg>
          <div className="absolute bottom-0 left-1/2 -translate-x-1/2 flex items-center gap-4 text-[10px] text-muted-foreground">
            <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-success inline-block" />Oficina</span>
            <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-destructive inline-block" />Tú</span>
          </div>
        </div>
        {distance && (
          <div className="flex items-center justify-center gap-2 mb-5 px-4 py-2.5 bg-destructive/5 rounded-xl">
            <MapPin className="w-4 h-4 text-destructive" />
            <span className="text-sm font-semibold text-destructive">Estás a {distance >= 1000 ? `${(distance / 1000).toFixed(1)} km` : `${distance} m`} de la oficina</span>
          </div>
        )}
        <Button onClick={onClose} className="w-full" variant="outline">Entendido</Button>
      </motion.div>
    </motion.div>,
    document.body
  );
}
