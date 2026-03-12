import { Palmtree, Clock, CalendarCheck, TrendingUp } from "lucide-react";
import { SummaryCard } from "./SummaryCard";

const stats = [
  { icon: Palmtree, title: "Vacaciones", value: "12 días", subtitle: "Disponibles", iconColor: "text-success" },
  { icon: Clock, title: "Horas extra", value: "8.5 hrs", subtitle: "Este mes", iconColor: "text-primary" },
  { icon: CalendarCheck, title: "Asistencia", value: "98%", subtitle: "Este mes", iconColor: "text-success" },
  { icon: TrendingUp, title: "Puntualidad", value: "95%", subtitle: "Este mes", iconColor: "text-accent" },
];

export function QuickStats() {
  return (
    <div className="grid grid-cols-2 gap-3">
      {stats.map((stat, index) => (
        <SummaryCard key={stat.title} icon={stat.icon} title={stat.title} value={stat.value} subtitle={stat.subtitle} iconColor={stat.iconColor} delay={0.1 * index} />
      ))}
    </div>
  );
}
