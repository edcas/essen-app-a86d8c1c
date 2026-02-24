import { ClipboardCheck, Clock, ChevronRight, Lock } from "lucide-react";

const evaluations = [
  {
    title: "Evaluación de Desempeño 360°",
    type: "360°",
    deadline: "28 Feb 2026",
    daysLeft: 4,
    status: "pending",
    questions: 25,
  },
  {
    title: "NOM-035 Factores de Riesgo",
    type: "NOM-035",
    deadline: "15 Mar 2026",
    daysLeft: 19,
    status: "pending",
    questions: 72,
  },
  {
    title: "Clima Organizacional Q1",
    type: "Encuesta",
    deadline: "10 Feb 2026",
    daysLeft: 0,
    status: "completed",
    questions: 30,
  },
  {
    title: "Evaluación de Competencias",
    type: "90°",
    deadline: "5 Ene 2026",
    daysLeft: 0,
    status: "expired",
    questions: 15,
  },
];

const EvaluationsScreen = () => {
  const pending = evaluations.filter(e => e.status === "pending").length;

  return (
    <div className="px-5 py-4 space-y-5 animate-fade-in">
      {/* Summary */}
      <div className="gradient-primary rounded-2xl p-5 text-primary-foreground">
        <h2 className="text-lg font-extrabold">Evaluaciones</h2>
        <p className="text-sm opacity-90 mt-1">
          Tienes {pending} evaluación{pending !== 1 ? "es" : ""} pendiente{pending !== 1 ? "s" : ""}
        </p>
      </div>

      {/* Notice */}
      <div className="flex items-start gap-2 bg-primary/5 rounded-xl p-3 border border-primary/15">
        <Lock className="w-4 h-4 text-primary mt-0.5 shrink-0" />
        <p className="text-xs text-foreground">
          Los resultados de las evaluaciones son confidenciales y solo visibles para el administrador.
        </p>
      </div>

      {/* List */}
      <div className="space-y-2.5">
        {evaluations.map((ev, i) => (
          <button
            key={i}
            className={`w-full text-left flex items-center gap-3 bg-card rounded-xl p-4 border transition-all ${
              ev.status === "pending"
                ? "border-primary/30 hover:border-primary/60"
                : "border-border opacity-70"
            }`}
          >
            <div className={`w-11 h-11 rounded-xl flex items-center justify-center ${
              ev.status === "pending" ? "bg-primary/10" : "bg-secondary"
            }`}>
              <ClipboardCheck className={`w-5 h-5 ${
                ev.status === "pending" ? "text-primary" : "text-muted-foreground"
              }`} />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-semibold truncate">{ev.title}</p>
              <div className="flex items-center gap-2 mt-1">
                <span className="text-[10px] font-bold bg-primary/10 text-primary px-2 py-0.5 rounded-full">
                  {ev.type}
                </span>
                <span className="text-xs text-muted-foreground">{ev.questions} preguntas</span>
              </div>
              <div className="flex items-center gap-1 mt-1.5">
                <Clock className="w-3 h-3 text-muted-foreground" />
                <span className={`text-xs ${
                  ev.status === "pending" && ev.daysLeft <= 5 ? "text-destructive font-semibold" : "text-muted-foreground"
                }`}>
                  {ev.status === "completed" ? "Completada" : ev.status === "expired" ? "Plazo vencido" : `${ev.daysLeft} días restantes`}
                </span>
              </div>
            </div>
            {ev.status === "pending" && <ChevronRight className="w-4 h-4 text-muted-foreground" />}
          </button>
        ))}
      </div>
    </div>
  );
};

export default EvaluationsScreen;
