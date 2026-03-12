import { motion } from "framer-motion";

const holidays = [
  { month: "Feb", day: "05", name: "Constitución" },
  { month: "Mar", day: "17", name: "Natalicio Benito Juárez" },
  { month: "Abr", day: "17", name: "Jueves Santo" },
  { month: "Abr", day: "18", name: "Viernes Santo" },
  { month: "May", day: "01", name: "Día del Trabajo" },
  { month: "Sep", day: "16", name: "Independencia" },
  { month: "Nov", day: "18", name: "Revolución" },
  { month: "Dic", day: "25", name: "Navidad" },
  { month: "Dic", day: "31", name: "Año Nuevo" },
];

export function HolidaysSection() {
  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }}>
      <h2 className="text-sm font-bold text-foreground mb-3">Próximos feriados</h2>
      <div className="flex gap-2 overflow-x-auto pb-2 -mx-4 px-4 scrollbar-hide">
        {holidays.map((holiday, index) => (
          <div key={index} className="bg-card rounded-xl border border-border p-3 text-center min-w-[72px] flex-shrink-0">
            <p className="text-xs text-muted-foreground mb-1">{holiday.month}</p>
            <p className="text-xl font-bold text-foreground">{holiday.day}</p>
          </div>
        ))}
      </div>
    </motion.div>
  );
}
