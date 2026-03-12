import { motion } from "framer-motion";
import { ArrowLeft, CreditCard, Building2, Lock, AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useNavigate } from "react-router-dom";

const bankData = { banco: "BBVA México", clabe: "012180001234567890", numeroCuenta: "1234567890", tipoCuenta: "Débito", beneficiario: "Carlos Mendoza García" };

export default function DatosBancarios() {
  const navigate = useNavigate();
  const maskNumber = (num: string, visibleDigits = 4) => num.length <= visibleDigits ? num : "*".repeat(num.length - visibleDigits) + num.slice(-visibleDigits);

  return (
    <div className="px-5 py-4 animate-fade-in">
      <div className="flex items-center gap-3 mb-6"><Button variant="ghost" size="icon" onClick={() => navigate("/perfil")} className="shrink-0"><ArrowLeft className="w-5 h-5" /></Button><h1 className="text-xl font-extrabold text-foreground">Datos bancarios</h1></div>
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="bg-info/10 border border-info/30 rounded-lg p-4 mb-6 flex gap-3">
        <AlertCircle className="w-5 h-5 text-info shrink-0 mt-0.5" /><div className="text-sm text-foreground"><p className="font-bold mb-1">Información protegida</p><p className="text-muted-foreground">Los datos bancarios solo pueden ser modificados por Recursos Humanos.</p></div>
      </motion.div>
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="bg-card rounded-xl border border-border p-4 mb-6">
        <div className="flex items-center gap-2 mb-4"><CreditCard className="w-4 h-4 text-primary" /><h2 className="font-bold text-foreground">Cuenta de Nómina</h2><Lock className="w-3 h-3 text-muted-foreground ml-auto" /></div>
        <div className="space-y-4">
          <div><Label className="text-muted-foreground text-xs">Banco</Label><div className="flex items-center gap-2 mt-1"><Building2 className="w-4 h-4 text-muted-foreground" /><Input value={bankData.banco} disabled className="bg-muted/50 text-muted-foreground" /></div></div>
          <div><Label className="text-muted-foreground text-xs">CLABE Interbancaria</Label><Input value={maskNumber(bankData.clabe)} disabled className="bg-muted/50 text-muted-foreground font-mono" /></div>
          <div><Label className="text-muted-foreground text-xs">Número de Cuenta</Label><Input value={maskNumber(bankData.numeroCuenta)} disabled className="bg-muted/50 text-muted-foreground font-mono" /></div>
          <div><Label className="text-muted-foreground text-xs">Tipo de Cuenta</Label><Input value={bankData.tipoCuenta} disabled className="bg-muted/50 text-muted-foreground" /></div>
          <div><Label className="text-muted-foreground text-xs">Beneficiario</Label><Input value={bankData.beneficiario} disabled className="bg-muted/50 text-muted-foreground" /></div>
        </div>
      </motion.div>
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}><Button variant="outline" className="w-full" onClick={() => navigate("/ayuda")}>Solicitar cambio de datos bancarios</Button></motion.div>
    </div>
  );
}
