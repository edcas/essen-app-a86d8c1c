import { motion } from "framer-motion";
import { Megaphone, Calendar, CheckCheck, Clock, ChevronRight, Banknote, PartyPopper, XCircle, AlertTriangle, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

type NotificationType = "announcement" | "reminder" | "payroll" | "request_approved" | "request_rejected" | "incident" | "shift_alert";

interface Notification { id: number; type: NotificationType; title: string; message: string; date: string; read: boolean; icon: typeof Megaphone; color: string; bg: string; action?: { route: string }; }

const notifications: Notification[] = [
  { id: 1, type: "payroll", title: "Recibo de Nómina Disponible", message: "Tu recibo correspondiente a la quincena 01 Nov - 15 Nov está listo para descarga.", date: "Hace 1 hora", read: false, icon: Banknote, color: "text-primary-foreground", bg: "bg-success", action: { route: "/nomina" } },
  { id: 2, type: "request_approved", title: "Solicitud Aprobada", message: "Tu jefe ha aprobado tus vacaciones del 23/12 al 02/01.", date: "Hace 2 horas", read: false, icon: PartyPopper, color: "text-primary-foreground", bg: "bg-success", action: { route: "/vacaciones" } },
  { id: 3, type: "request_rejected", title: "Solicitud Rechazada", message: "Se rechazó el día de Home Office solicitado para el 20/11.", date: "Hace 3 horas", read: false, icon: XCircle, color: "text-primary-foreground", bg: "bg-destructive", action: { route: "/vacaciones" } },
  { id: 4, type: "incident", title: "Incidencia de Asistencia - 18/11", message: "Se detectó un Retardo Mayor ayer. ¿Deseas justificar ahora?", date: "Hace 5 horas", read: false, icon: AlertTriangle, color: "text-primary-foreground", bg: "bg-destructive", action: { route: "/asistencia" } },
  { id: 5, type: "shift_alert", title: "Tu turno comienza pronto", message: "Tu turno comienza en 10 min.", date: "Hace 10 min", read: true, icon: MapPin, color: "text-primary-foreground", bg: "bg-primary", action: { route: "/" } },
  { id: 6, type: "announcement", title: "Cierre de oficinas por festividades", message: "Las oficinas permanecerán cerradas del 23 de diciembre al 2 de enero.", date: "Hace 1 día", read: true, icon: Megaphone, color: "text-primary-foreground", bg: "bg-primary" },
  { id: 7, type: "reminder", title: "Recordatorio: Evaluación de desempeño", message: "Tu evaluación trimestral está programada para el 15 de diciembre.", date: "Hace 3 días", read: true, icon: Calendar, color: "text-primary-foreground", bg: "bg-warning" },
];

const getNotificationEmoji = (type: NotificationType): string => {
  switch (type) { case "payroll": return "💰"; case "request_approved": return "🎉"; case "request_rejected": return "⚠️"; case "incident": return "⏰"; case "shift_alert": return "📍"; default: return ""; }
};

export default function Avisos() {
  const navigate = useNavigate();
  const [filter, setFilter] = useState<"all" | "unread">("all");
  const unreadCount = notifications.filter((n) => !n.read).length;
  const filteredNotifications = filter === "unread" ? notifications.filter((n) => !n.read) : notifications;

  const handleNotificationClick = (notification: Notification) => {
    if (notification.action?.route) navigate(notification.action.route);
    else navigate(`/avisos/${notification.id}`);
  };

  return (
    <div className="px-5 py-4 animate-fade-in">
      <p className="text-sm text-muted-foreground mb-4">Mantente al día con tu equipo</p>
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="flex gap-2 mb-6">
        <Button variant={filter === "all" ? "default" : "outline"} size="sm" onClick={() => setFilter("all")}>Todos</Button>
        <Button variant={filter === "unread" ? "default" : "outline"} size="sm" onClick={() => setFilter("unread")}>Sin leer ({unreadCount})</Button>
      </motion.div>
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="mb-8">
        {filteredNotifications.length === 0 ? (
          <div className="bg-card rounded-xl border border-border p-8 text-center"><CheckCheck className="w-12 h-12 text-success mx-auto mb-4" /><p className="font-bold text-foreground">¡Todo al día!</p><p className="text-sm text-muted-foreground">No tienes notificaciones sin leer</p></div>
        ) : (
          <div className="bg-card rounded-xl border border-border overflow-hidden divide-y divide-border">
            {filteredNotifications.map((notification, index) => {
              const emoji = getNotificationEmoji(notification.type);
              const Icon = notification.icon;
              return (
                <motion.button key={notification.id} initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.05 * index }} whileTap={{ scale: 0.98 }} onClick={() => handleNotificationClick(notification)} className={`p-4 w-full text-left hover:bg-secondary/30 transition-colors ${!notification.read ? "bg-primary/5" : ""}`}>
                  <div className="flex gap-3">
                    <div className={`w-9 h-9 rounded-full ${notification.bg} flex items-center justify-center shrink-0`}>
                      {emoji ? <span className="text-base">{emoji}</span> : <Icon className={`w-4 h-4 ${notification.color}`} />}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between gap-2"><h3 className="font-semibold text-foreground text-sm line-clamp-1">{notification.title}</h3><div className="flex items-center gap-1 shrink-0">{!notification.read && <span className="w-2 h-2 bg-primary rounded-full" />}<ChevronRight className="w-4 h-4 text-muted-foreground" /></div></div>
                      <p className="text-xs text-muted-foreground line-clamp-2 mt-1">{notification.message}</p>
                      <div className="flex items-center gap-2 mt-2"><Clock className="w-3 h-3 text-muted-foreground" /><span className="text-xs text-muted-foreground">{notification.date}</span></div>
                    </div>
                  </div>
                </motion.button>
              );
            })}
          </div>
        )}
      </motion.div>
    </div>
  );
}
