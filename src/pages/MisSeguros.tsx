import { motion } from "framer-motion";
import { Download } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";

const insurancePolicies = [
  { id: "1", name: "Seguro de Gastos Médicos Mayores", startDate: "01/01/2024", endDate: "31/12/2025" },
  { id: "2", name: "Seguro de Vida Grupal", startDate: "01/01/2024", endDate: "31/12/2025" },
  { id: "3", name: "Seguro de Auto Flotilla", startDate: "15/06/2024", endDate: "15/06/2025" },
];

export default function MisSeguros() {
  const { toast } = useToast();
  return (
    <div className="px-5 py-4 space-y-4 animate-fade-in">
      <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }}><h1 className="text-xl font-extrabold text-foreground">Mis Seguros</h1><p className="text-sm text-muted-foreground mt-1">Consulta tus pólizas vigentes</p></motion.div>
      <div className="space-y-3">
        {insurancePolicies.map((policy, index) => (
          <motion.div key={policy.id} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 + index * 0.05 }} className="bg-card rounded-xl border border-border p-4">
            <div className="flex items-start justify-between gap-3">
              <div className="flex-1 min-w-0"><h3 className="font-bold text-foreground text-sm">{policy.name}</h3><div className="flex items-center gap-4 mt-2 text-xs text-muted-foreground"><span>Inicio: {policy.startDate}</span><span>Fin: {policy.endDate}</span></div></div>
              <Button variant="outline" size="icon" className="h-9 w-9 flex-shrink-0" onClick={() => toast({ title: "Descargando PDF", description: `Póliza: ${policy.name}` })}><Download className="w-4 h-4" /></Button>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
