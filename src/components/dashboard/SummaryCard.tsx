import { motion } from "framer-motion";
import { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

interface SummaryCardProps {
  icon: LucideIcon;
  title: string;
  value: string;
  subtitle?: string;
  iconColor?: string;
  delay?: number;
}

export function SummaryCard({ icon: Icon, title, value, subtitle, iconColor = "text-primary", delay = 0 }: SummaryCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay, duration: 0.3 }}
      className="bg-card rounded-xl p-5 border border-border relative overflow-hidden group hover:shadow-md transition-shadow"
    >
      <div className="relative z-10">
        <p className="text-sm text-muted-foreground mb-1">{title}</p>
        <p className="text-2xl font-bold text-foreground">{value}</p>
        {subtitle && <p className="text-xs text-muted-foreground mt-1">{subtitle}</p>}
      </div>
      <Icon className={cn("absolute right-3 top-1/2 -translate-y-1/2 w-14 h-14 opacity-10 transition-opacity group-hover:opacity-15", iconColor)} strokeWidth={1.5} />
    </motion.div>
  );
}
