import { Play, CheckCircle2, Lock, Clock, ChevronRight, Award } from "lucide-react";

const courses = [
  {
    title: "Inducción General ESSEN",
    progress: 100,
    modules: 5,
    completed: 5,
    status: "completed",
    duration: "2h 30min",
  },
  {
    title: "Seguridad e Higiene en el Trabajo",
    progress: 60,
    modules: 8,
    completed: 5,
    status: "in_progress",
    duration: "4h 15min",
  },
  {
    title: "Cultura y Valores Organizacionales",
    progress: 0,
    modules: 4,
    completed: 0,
    status: "locked",
    duration: "1h 45min",
  },
  {
    title: "Liderazgo y Comunicación Efectiva",
    progress: 0,
    modules: 6,
    completed: 0,
    status: "locked",
    duration: "3h 00min",
  },
];

const TrainingScreen = () => {
  const totalProgress = Math.round(courses.reduce((sum, c) => sum + c.progress, 0) / courses.length);

  return (
    <div className="px-5 py-4 space-y-5 animate-fade-in">
      {/* Overall progress */}
      <div className="bg-card rounded-2xl p-4 border border-border">
        <div className="flex items-center justify-between mb-1">
          <h3 className="text-sm font-bold">Mi ruta de capacitación</h3>
          <div className="flex items-center gap-1">
            <Award className="w-4 h-4 text-primary" />
            <span className="text-xs font-bold text-primary">{totalProgress}%</span>
          </div>
        </div>
        <div className="w-full h-3 bg-secondary rounded-full overflow-hidden mt-3">
          <div
            className="h-full gradient-primary rounded-full transition-all duration-700"
            style={{ width: `${totalProgress}%` }}
          />
        </div>
        <p className="text-xs text-muted-foreground mt-2">
          {courses.filter(c => c.status === "completed").length} de {courses.length} cursos completados
        </p>
      </div>

      {/* Course list */}
      <section>
        <h3 className="text-sm font-bold text-foreground mb-3">Cursos asignados</h3>
        <div className="space-y-2.5">
          {courses.map((course, i) => (
            <button
              key={i}
              className={`w-full text-left flex items-center gap-3 bg-card rounded-xl p-4 border transition-all ${
                course.status === "in_progress"
                  ? "border-primary/30 hover:border-primary/60"
                  : "border-border"
              } ${course.status === "locked" ? "opacity-60" : ""}`}
            >
              <div className={`w-11 h-11 rounded-xl flex items-center justify-center ${
                course.status === "completed" ? "bg-success/10" :
                course.status === "in_progress" ? "bg-primary/10" :
                "bg-secondary"
              }`}>
                {course.status === "completed" ? (
                  <CheckCircle2 className="w-5 h-5 text-success" />
                ) : course.status === "locked" ? (
                  <Lock className="w-5 h-5 text-muted-foreground" />
                ) : (
                  <Play className="w-5 h-5 text-primary" />
                )}
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-semibold truncate">{course.title}</p>
                <div className="flex items-center gap-2 mt-1">
                  <Clock className="w-3 h-3 text-muted-foreground" />
                  <span className="text-xs text-muted-foreground">{course.duration}</span>
                  <span className="text-xs text-muted-foreground">· {course.completed}/{course.modules} módulos</span>
                </div>
                {course.status === "in_progress" && (
                  <div className="w-full h-1.5 bg-secondary rounded-full overflow-hidden mt-2">
                    <div
                      className="h-full bg-primary rounded-full"
                      style={{ width: `${course.progress}%` }}
                    />
                  </div>
                )}
              </div>
              {course.status !== "locked" && <ChevronRight className="w-4 h-4 text-muted-foreground shrink-0" />}
            </button>
          ))}
        </div>
      </section>

      {/* History link */}
      <button className="w-full text-center text-sm text-primary font-semibold py-3">
        Ver historial de capacitación →
      </button>
    </div>
  );
};

export default TrainingScreen;
