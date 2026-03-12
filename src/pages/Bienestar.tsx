import { motion } from "framer-motion";
import { Heart, Brain, Wallet, Ticket, QrCode } from "lucide-react";
import EssenLogo from "@/components/EssenLogo";

const membershipData = { plan: "Membresía Premium", status: "Activa", holder: "Carlos Mendoza", policyNumber: "9982-1102" };

const benefitCategories = [
  { icon: Heart, label: "Médico Ya", description: "Consultas médicas", bg: "bg-primary" },
  { icon: Brain, label: "Apoyo Mental", description: "Bienestar emocional", bg: "bg-accent" },
  { icon: Wallet, label: "Mi Dinero", description: "Finanzas personales", bg: "bg-primary" },
  { icon: Ticket, label: "Cupones", description: "Descuentos exclusivos", bg: "bg-accent" },
];

export default function Bienestar() {
  return (
    <div className="px-5 py-4 animate-fade-in">
      <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="gradient-primary rounded-2xl p-5 mb-4 text-primary-foreground relative overflow-hidden shadow-lg">
        <div className="absolute top-4 right-4 opacity-20"><QrCode className="w-12 h-12" /></div>
        <div className="relative z-10">
          <p className="text-xs text-primary-foreground/60 uppercase tracking-wider mb-1">ESSEN Wellbeing</p>
          <h2 className="text-xl font-extrabold mb-2">{membershipData.plan}</h2>
          <span className="inline-block text-xs font-semibold px-2.5 py-0.5 rounded-full bg-accent text-foreground">{membershipData.status}</span>
          <div className="mt-4 flex justify-between items-end">
            <div><p className="text-xs text-primary-foreground/60 uppercase tracking-wider">Titular</p><p className="font-bold">{membershipData.holder}</p></div>
            <div className="text-right"><p className="text-xs text-primary-foreground/60 uppercase tracking-wider">Póliza</p><p className="font-mono font-bold">{membershipData.policyNumber}</p></div>
          </div>
        </div>
      </motion.div>

      <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.1 }} className="text-center text-sm text-muted-foreground mb-6">Muestra esta tarjeta para acceder a tus beneficios</motion.p>

      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="grid grid-cols-2 gap-3">
        {benefitCategories.map((benefit, index) => (
          <motion.button key={benefit.label} initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.1 * index }} whileTap={{ scale: 0.98 }} className="bg-card rounded-xl border border-border p-5 hover:shadow-md transition-all flex flex-col items-center text-center">
            <div className={`w-12 h-12 rounded-full ${benefit.bg} flex items-center justify-center mb-3`}><benefit.icon className="w-6 h-6 text-primary-foreground" /></div>
            <span className="font-bold text-foreground text-sm">{benefit.label}</span>
            <span className="text-xs text-muted-foreground mt-0.5">{benefit.description}</span>
          </motion.button>
        ))}
      </motion.div>

      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }} className="mt-6 bg-card rounded-xl p-4 border border-border">
        <p className="text-sm text-foreground font-bold mb-1">¿Necesitas ayuda?</p>
        <p className="text-xs text-muted-foreground">Contacta a tu representante de RH o llama a la línea de bienestar 800-123-4567</p>
      </motion.div>
    </div>
  );
}
