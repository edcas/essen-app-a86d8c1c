import { useState } from "react";
import { motion } from "framer-motion";
import { ChevronLeft, HelpCircle, Send, AlertCircle, FileQuestion, Settings, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

const incidentTypes = [
  { value: "acceso", label: "Problemas de acceso", icon: AlertCircle },
  { value: "nomina", label: "Dudas de nómina", icon: FileQuestion },
  { value: "app", label: "Error en la aplicación", icon: Settings },
  { value: "otro", label: "Otro", icon: HelpCircle },
];

export default function Ayuda() {
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({ type: "", subject: "", description: "" });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.type || !formData.subject || !formData.description) { toast.error("Completa todos los campos"); return; }
    setIsSubmitting(true);
    await new Promise(resolve => setTimeout(resolve, 1500));
    toast.success("Incidencia enviada correctamente", { description: "Te responderemos a la brevedad" });
    setFormData({ type: "", subject: "", description: "" });
    setIsSubmitting(false);
  };

  return (
    <div className="px-5 py-4 animate-fade-in">
      <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="flex items-center gap-3 mb-6">
        <Button variant="ghost" size="icon" className="shrink-0" onClick={() => navigate("/perfil")}><ChevronLeft className="w-5 h-5" /></Button>
        <div><h1 className="text-xl font-extrabold text-foreground">Ayuda y soporte</h1><p className="text-sm text-muted-foreground">¿En qué podemos ayudarte?</p></div>
      </motion.div>
      <motion.form initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} onSubmit={handleSubmit} className="space-y-5">
        <div className="space-y-2"><Label htmlFor="type">Tipo de incidencia</Label><Select value={formData.type} onValueChange={(value) => setFormData({ ...formData, type: value })}><SelectTrigger id="type"><SelectValue placeholder="Selecciona el tipo" /></SelectTrigger><SelectContent>{incidentTypes.map((type) => <SelectItem key={type.value} value={type.value}><div className="flex items-center gap-2"><type.icon className="w-4 h-4 text-muted-foreground" /><span>{type.label}</span></div></SelectItem>)}</SelectContent></Select></div>
        <div className="space-y-2"><Label htmlFor="subject">Asunto</Label><Input id="subject" placeholder="Describe brevemente tu problema" value={formData.subject} onChange={(e) => setFormData({ ...formData, subject: e.target.value })} maxLength={100} /></div>
        <div className="space-y-2"><Label htmlFor="description">Descripción</Label><Textarea id="description" placeholder="Cuéntanos más detalles..." value={formData.description} onChange={(e) => setFormData({ ...formData, description: e.target.value })} className="min-h-[120px] resize-none" maxLength={500} /><p className="text-xs text-muted-foreground text-right">{formData.description.length}/500</p></div>
        <Button type="submit" className="w-full gap-2" size="lg" disabled={isSubmitting}>{isSubmitting ? <><Loader2 className="w-4 h-4 animate-spin" />Enviando...</> : <><Send className="w-4 h-4" />Enviar incidencia</>}</Button>
      </motion.form>
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="mt-8 bg-secondary/50 rounded-xl p-4 border border-border">
        <h3 className="font-bold text-foreground text-sm mb-2">¿Necesitas ayuda urgente?</h3>
        <div className="space-y-2 text-xs"><p className="text-muted-foreground">📧 soporte@empresa.com</p><p className="text-muted-foreground">📞 +52 55 1234 5678 ext. 100</p></div>
      </motion.div>
    </div>
  );
}
