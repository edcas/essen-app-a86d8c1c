import { useState } from "react";
import { motion } from "framer-motion";
import { ArrowLeft, User, Phone, MapPin, Copy, Check, Plus, Trash2, AlertTriangle, Lock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";

const initialUserData = { nombre: "Carlos", apellidoPaterno: "Mendoza", apellidoMaterno: "García", fechaNacimiento: "15/03/1990", nacionalidad: "Mexicana", genero: "Masculino", rfc: "MEGC900315ABC", curp: "MEGC900315HDFRRL09", nss: "12345678901", telefonoPersonal: "5512345678", correoPersonal: "carlos.personal@gmail.com", correoEmpresarial: "carlos.mendoza@empresa.com", calle: "Av. Insurgentes Sur", numero: "1234", colonia: "Del Valle", municipio: "Benito Juárez", estado: "Ciudad de México", codigoPostal: "03100" };
const initialEmergencyContacts = [{ id: 1, nombre: "María García", parentesco: "Madre", telefono: "5598765432" }, { id: 2, nombre: "Luis Mendoza", parentesco: "Hermano", telefono: "5587654321" }];
const parentescoOptions = ["Madre", "Padre", "Hermano/a", "Cónyuge", "Hijo/a", "Otro"];

export default function DatosPersonales() {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [userData, setUserData] = useState(initialUserData);
  const [emergencyContacts, setEmergencyContacts] = useState(initialEmergencyContacts);
  const [copiedField, setCopiedField] = useState<string | null>(null);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleCopy = (field: string, value: string) => { navigator.clipboard.writeText(value); setCopiedField(field); setTimeout(() => setCopiedField(null), 2000); toast({ title: "Copiado" }); };
  const handleSave = () => { toast({ title: "Datos actualizados" }); };

  return (
    <div className="px-5 py-4 animate-fade-in">
      <div className="flex items-center gap-3 mb-6"><Button variant="ghost" size="icon" onClick={() => navigate("/perfil")} className="shrink-0"><ArrowLeft className="w-5 h-5" /></Button><h1 className="text-xl font-extrabold text-foreground">Datos personales</h1></div>
      
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="bg-card rounded-xl border border-border p-4 mb-6">
        <div className="flex items-center gap-2 mb-4"><Lock className="w-4 h-4 text-muted-foreground" /><h2 className="font-bold text-foreground">Identidad Legal</h2><span className="text-xs text-muted-foreground">(Solo lectura)</span></div>
        <div className="grid grid-cols-2 gap-4 mb-4">
          {[["Nombre", userData.nombre], ["Apellido Paterno", userData.apellidoPaterno], ["Apellido Materno", userData.apellidoMaterno], ["Fecha de Nacimiento", userData.fechaNacimiento]].map(([label, val]) => (<div key={label}><Label className="text-muted-foreground text-xs">{label}</Label><Input value={val} disabled className="bg-muted/50 text-muted-foreground" /></div>))}
        </div>
        <div className="space-y-3">
          {[["RFC", userData.rfc], ["CURP", userData.curp]].map(([label, val]) => (<div key={label}><Label className="text-muted-foreground text-xs">{label}</Label><div className="flex gap-2"><Input value={val} disabled className="bg-muted/50 text-muted-foreground flex-1" /><Button variant="outline" size="icon" onClick={() => handleCopy(label, val)}>{copiedField === label ? <Check className="w-4 h-4 text-success" /> : <Copy className="w-4 h-4" />}</Button></div></div>))}
          <div><Label className="text-muted-foreground text-xs">NSS (IMSS)</Label><Input value={userData.nss} disabled className="bg-muted/50 text-muted-foreground" /></div>
        </div>
      </motion.div>

      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="bg-card rounded-xl border border-border p-4 mb-6">
        <div className="flex items-center gap-2 mb-4"><Phone className="w-4 h-4 text-primary" /><h2 className="font-bold text-foreground">Datos de Contacto</h2></div>
        <div className="space-y-4">
          <div><Label>Teléfono personal</Label><Input value={userData.telefonoPersonal} onChange={(e) => setUserData(p => ({ ...p, telefonoPersonal: e.target.value.replace(/\D/g, "").slice(0, 10) }))} maxLength={10} /></div>
          <div><Label>Correo personal</Label><Input type="email" value={userData.correoPersonal} onChange={(e) => setUserData(p => ({ ...p, correoPersonal: e.target.value }))} /></div>
          <div><Label className="flex items-center gap-2">Correo empresarial <Lock className="w-3 h-3 text-muted-foreground" /></Label><Input value={userData.correoEmpresarial} disabled className="bg-muted/50 text-muted-foreground" /></div>
        </div>
      </motion.div>

      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="bg-card rounded-xl border border-border p-4 mb-6">
        <div className="flex items-center justify-between mb-4"><div className="flex items-center gap-2"><User className="w-4 h-4 text-warning" /><h2 className="font-bold text-foreground">Contactos de Emergencia</h2></div><Button variant="outline" size="sm" onClick={() => setEmergencyContacts(p => [...p, { id: Date.now(), nombre: "", parentesco: "", telefono: "" }])} className="gap-1"><Plus className="w-4 h-4" />Agregar</Button></div>
        <div className="space-y-4">
          {emergencyContacts.map((contact, index) => (
            <div key={contact.id} className="p-3 bg-secondary/30 rounded-lg space-y-3">
              <div className="flex items-center justify-between"><span className="text-sm font-semibold text-muted-foreground">Contacto {index + 1}</span><Button variant="ghost" size="icon" className="h-8 w-8 text-destructive" onClick={() => setEmergencyContacts(p => p.filter(c => c.id !== contact.id))}><Trash2 className="w-4 h-4" /></Button></div>
              <Input placeholder="Nombre completo" value={contact.nombre} onChange={(e) => setEmergencyContacts(p => p.map(c => c.id === contact.id ? { ...c, nombre: e.target.value } : c))} />
              <Select value={contact.parentesco} onValueChange={(v) => setEmergencyContacts(p => p.map(c => c.id === contact.id ? { ...c, parentesco: v } : c))}><SelectTrigger><SelectValue placeholder="Parentesco" /></SelectTrigger><SelectContent>{parentescoOptions.map(o => <SelectItem key={o} value={o}>{o}</SelectItem>)}</SelectContent></Select>
              <Input placeholder="Teléfono (10 dígitos)" value={contact.telefono} onChange={(e) => setEmergencyContacts(p => p.map(c => c.id === contact.id ? { ...c, telefono: e.target.value.replace(/\D/g, "").slice(0, 10) } : c))} maxLength={10} />
            </div>
          ))}
        </div>
      </motion.div>

      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }}><Button className="w-full" onClick={handleSave}>Guardar cambios</Button></motion.div>
    </div>
  );
}
