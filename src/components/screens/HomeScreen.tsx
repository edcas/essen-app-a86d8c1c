import { FileText, ClipboardCheck, GraduationCap, AlertCircle, ChevronRight, Clock } from "lucide-react";
import EssenLogo from "../EssenLogo";

const HomeScreen = () => {
  const pendingItems = [
    { icon: FileText, label: "Documentos pendientes", count: 3, color: "bg-primary/10 text-primary" },
    { icon: ClipboardCheck, label: "Evaluaciones por contestar", count: 1, color: "bg-accent/15 text-accent-foreground" },
    { icon: GraduationCap, label: "Cursos por completar", count: 3, color: "bg-info/10 text-info" },
  ];

  const notices = [
    { title: "Nuevo beneficio dental", time: "Hace 2h", urgent: false },
    { title: "Actualización de política de vacaciones", time: "Hace 1d", urgent: true },
  ];

  return (
    <div className="px-5 py-4 space-y-6 animate-fade-in">
      {/* Welcome banner - brand gradient */}
      <div className="gradient-primary rounded-2xl p-5 text-primary-foreground relative overflow-hidden">
        <div className="absolute top-2 right-2 opacity-10">
          <EssenLogo size={80} variant="white" />
        </div>
        <p className="text-sm font-semibold opacity-90">Wellbeing Corporativo</p>
        <h2 className="text-xl font-extrabold mt-1">¡Buen día, Carlos!</h2>
        <p className="text-sm opacity-90 mt-1">Tienes 6 pendientes por atender hoy.</p>
        <div className="flex gap-2 mt-4">
          <span className="bg-primary-foreground/20 text-primary-foreground text-xs font-semibold px-3 py-1.5 rounded-full">
            3 docs
          </span>
          <span className="bg-primary-foreground/20 text-primary-foreground text-xs font-semibold px-3 py-1.5 rounded-full">
            1 evaluación
          </span>
          <span className="bg-primary-foreground/20 text-primary-foreground text-xs font-semibold px-3 py-1.5 rounded-full">
            2 cursos
          </span>
        </div>
      </div>

      {/* Pending items */}
      <section>
        <h3 className="text-sm font-bold text-foreground mb-3">Pendientes</h3>
        <div className="space-y-2.5">
          {pendingItems.map((item, i) => (
            <button
              key={i}
              className="w-full flex items-center gap-3 bg-card rounded-xl p-3.5 border border-border hover:border-primary/30 transition-all"
            >
              <div className={`w-10 h-10 rounded-xl ${item.color} flex items-center justify-center`}>
                <item.icon className="w-5 h-5" />
              </div>
              <div className="flex-1 text-left">
                <p className="text-sm font-semibold">{item.label}</p>
                <p className="text-xs text-muted-foreground">{item.count} pendiente{item.count > 1 ? "s" : ""}</p>
              </div>
              <div className="flex items-center gap-2">
                <span className="bg-primary/10 text-primary text-xs font-bold w-6 h-6 rounded-full flex items-center justify-center">
                  {item.count}
                </span>
                <ChevronRight className="w-4 h-4 text-muted-foreground" />
              </div>
            </button>
          ))}
        </div>
      </section>

      {/* Recent Notices */}
      <section>
        <h3 className="text-sm font-bold text-foreground mb-3">Avisos recientes</h3>
        <div className="space-y-2.5">
          {notices.map((notice, i) => (
            <div key={i} className="flex items-start gap-3 bg-card rounded-xl p-3.5 border border-border">
              <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${notice.urgent ? "bg-destructive/10" : "bg-info/10"}`}>
                <AlertCircle className={`w-4 h-4 ${notice.urgent ? "text-destructive" : "text-info"}`} />
              </div>
              <div className="flex-1">
                <p className="text-sm font-medium">{notice.title}</p>
                <div className="flex items-center gap-1 mt-1">
                  <Clock className="w-3 h-3 text-muted-foreground" />
                  <span className="text-xs text-muted-foreground">{notice.time}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default HomeScreen;
