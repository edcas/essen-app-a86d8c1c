import { useState, useEffect } from "react";
import { motion } from "framer-motion";

export function TimeDisplay() {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const interval = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(interval);
  }, []);

  const hours = time.getHours().toString().padStart(2, "0");
  const minutes = time.getMinutes().toString().padStart(2, "0");
  const seconds = time.getSeconds().toString().padStart(2, "0");

  const dateStr = time.toLocaleDateString("es-MX", {
    weekday: "long",
    day: "numeric",
    month: "long",
  });

  return (
    <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="text-center">
      <div className="flex items-baseline justify-center gap-1">
        <span className="text-5xl font-bold tracking-tight text-foreground">{hours}</span>
        <span className="text-5xl font-bold text-primary">:</span>
        <span className="text-5xl font-bold tracking-tight text-foreground">{minutes}</span>
        <span className="text-xl font-medium text-muted-foreground ml-2">{seconds}</span>
      </div>
      <p className="text-muted-foreground mt-2 capitalize text-sm">{dateStr}</p>
    </motion.div>
  );
}
