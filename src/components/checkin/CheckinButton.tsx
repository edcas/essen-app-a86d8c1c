import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { LogIn, LogOut, Check, MapPin, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useGeolocation } from "@/hooks/use-geolocation";
import { OutOfRangeOverlay } from "./OutOfRangeOverlay";

interface CheckinButtonProps {
  isCheckedIn: boolean;
  onCheckin: () => void;
  onCheckout: () => void;
}

export function CheckinButton({ isCheckedIn, onCheckin, onCheckout }: CheckinButtonProps) {
  const [showSuccess, setShowSuccess] = useState(false);
  const [lastAction, setLastAction] = useState<"in" | "out" | null>(null);
  const [showOutOfRange, setShowOutOfRange] = useState(false);
  const [simulateFail, setSimulateFail] = useState(false);
  const { status, distance } = useGeolocation();

  const isLoading = status === "loading";

  const handleClick = async () => {
    if (isLoading) return;
    if (simulateFail) { setShowOutOfRange(true); return; }
    if (isCheckedIn) { onCheckout(); setLastAction("out"); }
    else { onCheckin(); setLastAction("in"); }
    setShowSuccess(true);
    setTimeout(() => setShowSuccess(false), 2000);
  };

  return (
    <>
      <AnimatePresence>
        {showOutOfRange && <OutOfRangeOverlay distance={distance ?? 4200} onClose={() => setShowOutOfRange(false)} />}
      </AnimatePresence>

      <AnimatePresence>
        {showSuccess && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className={cn("fixed inset-0 z-50 flex items-center justify-center", lastAction === "in" ? "bg-success" : "gradient-primary")}>
            <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} exit={{ scale: 0 }} transition={{ type: "spring", stiffness: 200, damping: 15 }} className="text-center text-primary-foreground">
              <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ delay: 0.1, type: "spring", stiffness: 300 }} className="w-28 h-28 rounded-full bg-primary-foreground/20 flex items-center justify-center mx-auto mb-6">
                <Check className="w-14 h-14" strokeWidth={3} />
              </motion.div>
              <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="text-3xl font-extrabold mb-2">
                {lastAction === "in" ? "¡Entrada registrada!" : "¡Salida registrada!"}
              </motion.h1>
              <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} className="text-xl opacity-90">
                {new Date().toLocaleTimeString("es-MX", { hour: "2-digit", minute: "2-digit" })}
              </motion.p>
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.4 }} className="flex items-center justify-center gap-2 mt-4 opacity-75">
                <MapPin className="w-4 h-4" /><span className="text-sm">Oficina Central</span>
              </motion.div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="relative">
        <div className="absolute inset-0 flex items-center justify-center">
          <span className={cn("absolute w-28 h-28 rounded-full animate-ping opacity-10", isCheckedIn ? "bg-primary" : "bg-success")} />
        </div>
        <div className="absolute inset-0 flex items-center justify-center">
          <span className={cn("absolute w-24 h-24 rounded-full opacity-20", isCheckedIn ? "bg-primary" : "bg-success")} />
        </div>
        <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.9 }}>
          <Button onClick={handleClick} disabled={isLoading} className={cn("relative z-10 w-24 h-24 rounded-full shadow-lg", isCheckedIn ? "bg-primary hover:bg-primary/90" : "bg-success hover:bg-success/90")}>
            {isLoading ? <Loader2 className="!w-10 !h-10 animate-spin" /> : isCheckedIn ? <LogOut className="!w-10 !h-10" /> : <LogIn className="!w-10 !h-10" />}
          </Button>
        </motion.div>
      </div>

      <button onClick={() => setSimulateFail(!simulateFail)} className={cn("mt-6 px-3 py-1.5 rounded-full text-xs font-medium transition-all border", simulateFail ? "bg-destructive/10 text-destructive border-destructive/20" : "bg-secondary text-muted-foreground border-border hover:bg-secondary/80")}>
        {simulateFail ? "⚠ Simular fallo activo" : "Simular fallo"}
      </button>
    </>
  );
}
