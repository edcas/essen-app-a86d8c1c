import { motion } from "framer-motion";
import { ArrowLeft, Megaphone, Clock, Building2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate, useParams } from "react-router-dom";

const avisoGenerico = {
  id: 1, type: "announcement", title: "Actualización del Reglamento Interno de Trabajo", subtitle: "Cambios importantes en políticas de asistencia",
  date: "4 de diciembre, 2024", time: "10:30 AM", author: "Recursos Humanos", department: "Dirección General",
  icon: Megaphone, color: "text-primary", bg: "bg-primary/10",
  content: `Estimados colaboradores,\n\nLes informamos que a partir del 1 de enero de 2025, entrarán en vigor las siguientes modificaciones al Reglamento Interno de Trabajo:\n\n**1. Política de Asistencia**\n- El horario de tolerancia se reduce de 15 a 10 minutos.\n- Se implementará bonificación por puntualidad perfecta mensual.\n\n**2. Trabajo Remoto**\n- Se amplía a 2 días por semana para puestos elegibles.\n\n**3. Vacaciones**\n- Solicitar con mínimo 15 días de anticipación.\n\nAtentamente,\n**Dirección de Recursos Humanos**`,
  attachments: [{ name: "Reglamento_Interno_2025.pdf", size: "2.4 MB" }, { name: "Política_Trabajo_Remoto.pdf", size: "856 KB" }],
};

export default function AvisoDetalle() {
  const navigate = useNavigate();
  const { id } = useParams();
  const aviso = avisoGenerico;
  const Icon = aviso.icon;

  return (
    <div className="px-5 py-4 animate-fade-in">
      <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="flex items-center gap-3 mb-6">
        <Button variant="ghost" size="icon" className="shrink-0" onClick={() => navigate("/avisos")}><ArrowLeft className="w-5 h-5" /></Button>
        <span className="text-sm text-muted-foreground">Volver a notificaciones</span>
      </motion.div>

      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="bg-card rounded-xl border border-border overflow-hidden">
        <div className="p-4 border-b border-border">
          <div className="flex items-start gap-3 mb-3">
            <div className={`w-10 h-10 rounded-lg ${aviso.bg} flex items-center justify-center shrink-0`}><Icon className={`w-5 h-5 ${aviso.color}`} /></div>
            <div className="flex-1"><span className="text-xs font-bold text-primary uppercase tracking-wide">Comunicado Oficial</span><h1 className="text-lg font-bold text-foreground mt-1 leading-tight">{aviso.title}</h1>{aviso.subtitle && <p className="text-sm text-muted-foreground mt-1">{aviso.subtitle}</p>}</div>
          </div>
          <div className="flex flex-wrap items-center gap-4 text-xs text-muted-foreground mt-4">
            <div className="flex items-center gap-1.5"><Clock className="w-3.5 h-3.5" /><span>{aviso.date} • {aviso.time}</span></div>
            <div className="flex items-center gap-1.5"><Building2 className="w-3.5 h-3.5" /><span>{aviso.author}</span></div>
          </div>
        </div>
        <div className="p-4">
          <div className="prose prose-sm max-w-none text-foreground">
            {aviso.content.split('\n').map((paragraph, index) => {
              if (paragraph.startsWith('**') && paragraph.endsWith('**')) return <h3 key={index} className="font-bold text-foreground mt-4 mb-2 text-sm">{paragraph.replace(/\*\*/g, '')}</h3>;
              if (paragraph.startsWith('- ')) return <p key={index} className="text-sm text-muted-foreground ml-4 mb-1">• {paragraph.substring(2)}</p>;
              if (paragraph.trim() === '') return <br key={index} />;
              return <p key={index} className="text-sm text-muted-foreground mb-2">{paragraph.split('**').map((part, i) => i % 2 === 1 ? <strong key={i} className="text-foreground">{part}</strong> : part)}</p>;
            })}
          </div>
        </div>
        {aviso.attachments?.length > 0 && (
          <div className="p-4 border-t border-border bg-secondary/30">
            <p className="text-xs font-bold text-muted-foreground mb-3">Archivos adjuntos ({aviso.attachments.length})</p>
            <div className="space-y-2">
              {aviso.attachments.map((file, index) => (
                <motion.button key={index} whileTap={{ scale: 0.98 }} className="w-full flex items-center gap-3 p-3 bg-card rounded-lg border border-border hover:bg-secondary/50 transition-colors text-left">
                  <div className="w-8 h-8 rounded bg-destructive/10 flex items-center justify-center"><span className="text-xs font-bold text-destructive">PDF</span></div>
                  <div className="flex-1 min-w-0"><p className="text-sm font-semibold text-foreground truncate">{file.name}</p><p className="text-xs text-muted-foreground">{file.size}</p></div>
                </motion.button>
              ))}
            </div>
          </div>
        )}
      </motion.div>
    </div>
  );
}
