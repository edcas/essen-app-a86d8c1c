import { FileText, Upload, CheckCircle2, Clock, AlertTriangle, Camera } from "lucide-react";

const documents = [
  { name: "INE / Identificación oficial", status: "uploaded", date: "15 Ene 2026" },
  { name: "Comprobante de domicilio", status: "uploaded", date: "15 Ene 2026" },
  { name: "CURP", status: "pending", date: null },
  { name: "RFC / Constancia de situación fiscal", status: "pending", date: null },
  { name: "Acta de nacimiento", status: "uploaded", date: "20 Ene 2026" },
  { name: "Comprobante de estudios", status: "expired", date: "Venció 10 Feb 2026" },
];

const statusConfig = {
  uploaded: { icon: CheckCircle2, label: "Cargado", className: "text-success bg-success/10" },
  pending: { icon: Clock, label: "Pendiente", className: "text-warning bg-warning/10" },
  expired: { icon: AlertTriangle, label: "Vencido", className: "text-destructive bg-destructive/10" },
};

const DocumentsScreen = () => {
  const uploaded = documents.filter(d => d.status === "uploaded").length;

  return (
    <div className="px-5 py-4 space-y-5 animate-fade-in">
      {/* Progress */}
      <div className="bg-card rounded-2xl p-4 border border-border">
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-sm font-bold">Progreso de documentos</h3>
          <span className="text-xs font-semibold text-primary">{uploaded}/{documents.length}</span>
        </div>
        <div className="w-full h-2.5 bg-secondary rounded-full overflow-hidden">
          <div
            className="h-full bg-primary rounded-full transition-all duration-500"
            style={{ width: `${(uploaded / documents.length) * 100}%` }}
          />
        </div>
        <p className="text-xs text-muted-foreground mt-2">
          Faltan {documents.length - uploaded} documentos por cargar
        </p>
      </div>

      {/* Upload button */}
      <button className="w-full flex items-center justify-center gap-2 bg-primary text-primary-foreground rounded-xl py-3.5 font-semibold text-sm hover:opacity-90 transition-opacity">
        <Camera className="w-4 h-4" />
        Subir documento (Foto o PDF)
      </button>

      {/* Document list */}
      <section>
        <h3 className="text-sm font-bold text-foreground mb-3">Documentos requeridos</h3>
        <div className="space-y-2.5">
          {documents.map((doc, i) => {
            const config = statusConfig[doc.status as keyof typeof statusConfig];
            return (
              <div
                key={i}
                className="flex items-center gap-3 bg-card rounded-xl p-3.5 border border-border"
              >
                <div className="w-10 h-10 rounded-xl bg-secondary flex items-center justify-center">
                  <FileText className="w-5 h-5 text-muted-foreground" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium truncate">{doc.name}</p>
                  <p className="text-xs text-muted-foreground">{doc.date || "Sin cargar"}</p>
                </div>
                <div className={`flex items-center gap-1 px-2 py-1 rounded-full text-xs font-semibold ${config.className}`}>
                  <config.icon className="w-3 h-3" />
                  {config.label}
                </div>
              </div>
            );
          })}
        </div>
      </section>
    </div>
  );
};

export default DocumentsScreen;
