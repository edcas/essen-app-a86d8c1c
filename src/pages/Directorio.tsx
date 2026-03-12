import { useState, useMemo } from "react";
import { motion } from "framer-motion";
import { Search, Phone, Mail, ChevronLeft, User, Briefcase } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useNavigate } from "react-router-dom";

const employees = [
  { id: "1", name: "Ana García López", position: "Gerente de RRHH", area: "Recursos Humanos", phone: "+52 55 1234 5678", email: "ana.garcia@empresa.com", initials: "AG" },
  { id: "2", name: "Roberto Martínez", position: "Director de Tecnología", area: "Tecnología", phone: "+52 55 2345 6789", email: "roberto.martinez@empresa.com", initials: "RM" },
  { id: "3", name: "María Fernández", position: "Analista Financiero", area: "Finanzas", phone: "+52 55 3456 7890", email: "maria.fernandez@empresa.com", initials: "MF" },
  { id: "4", name: "Luis Hernández", position: "Desarrollador Senior", area: "Tecnología", phone: "+52 55 4567 8901", email: "luis.hernandez@empresa.com", initials: "LH" },
  { id: "5", name: "Patricia Ramírez", position: "Coordinadora de Marketing", area: "Marketing", phone: "+52 55 5678 9012", email: "patricia.ramirez@empresa.com", initials: "PR" },
];

const areas = ["Todos", "Recursos Humanos", "Tecnología", "Finanzas", "Marketing"];

export default function Directorio() {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedArea, setSelectedArea] = useState("Todos");

  const filteredEmployees = useMemo(() => employees.filter((e) => {
    const matchesSearch = e.name.toLowerCase().includes(searchQuery.toLowerCase()) || e.position.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesArea = selectedArea === "Todos" || e.area === selectedArea;
    return matchesSearch && matchesArea;
  }), [searchQuery, selectedArea]);

  return (
    <div className="px-5 py-4 animate-fade-in">
      <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="flex items-center gap-3 mb-6">
        <Button variant="ghost" size="icon" className="shrink-0" onClick={() => navigate("/perfil")}><ChevronLeft className="w-5 h-5" /></Button>
        <div><h1 className="text-xl font-extrabold text-foreground">Directorio</h1><p className="text-sm text-muted-foreground">{employees.length} colaboradores</p></div>
      </motion.div>
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="relative mb-4">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
        <Input placeholder="Buscar por nombre o puesto..." value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} className="pl-10" />
      </motion.div>
      <div className="flex gap-2 overflow-x-auto pb-2 mb-6">
        {areas.map((area) => (<Button key={area} variant={selectedArea === area ? "default" : "outline"} size="sm" onClick={() => setSelectedArea(area)} className="shrink-0 text-xs">{area}</Button>))}
      </div>
      <div className="space-y-3">
        {filteredEmployees.length === 0 ? <div className="text-center py-12"><User className="w-12 h-12 text-muted-foreground/50 mx-auto mb-3" /><p className="text-muted-foreground">No se encontraron colaboradores</p></div>
        : filteredEmployees.map((employee, index) => (
          <motion.div key={employee.id} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.05 * index }} className="bg-card rounded-xl border border-border p-4">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-full gradient-primary flex items-center justify-center text-primary-foreground font-bold text-sm shrink-0">{employee.initials}</div>
              <div className="flex-1 min-w-0">
                <h3 className="font-bold text-foreground text-sm mb-0.5">{employee.name}</h3>
                <div className="flex items-center gap-1.5 text-muted-foreground text-xs mb-2"><Briefcase className="w-3 h-3" /><span>{employee.position}</span></div>
                <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-primary/10 text-primary">{employee.area}</span>
                <div className="mt-3 pt-3 border-t border-border space-y-2">
                  <a href={`tel:${employee.phone}`} className="flex items-center gap-2 text-xs text-muted-foreground hover:text-primary transition-colors"><Phone className="w-3.5 h-3.5" /><span>{employee.phone}</span></a>
                  <a href={`mailto:${employee.email}`} className="flex items-center gap-2 text-xs text-muted-foreground hover:text-primary transition-colors"><Mail className="w-3.5 h-3.5" /><span className="truncate">{employee.email}</span></a>
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
