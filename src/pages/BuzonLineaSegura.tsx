import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ChevronLeft,
  ShieldCheck,
  AlertTriangle,
  Upload,
  Send,
  Loader2,
  Copy,
  Check,
  Eye,
  EyeOff,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

const categories = [
  { value: "violencia", label: "Violencia laboral / Acoso" },
  { value: "condiciones", label: "Condiciones peligrosas en el entorno" },
  { value: "jornadas", label: "Incumplimiento de jornadas/horarios" },
  { value: "sugerencias", label: "Sugerencias de mejora organizacional" },
];

const urgencyLevels = [
  { value: "bajo", label: "Bajo", color: "bg-success/15 text-success border-success/30" },
  { value: "medio", label: "Medio", color: "bg-warning/15 text-warning-foreground border-warning/30" },
  { value: "alto", label: "Alto", color: "bg-destructive/15 text-destructive border-destructive/30" },
];

function generateFolio() {
  const chars = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";
  let folio = "LS-";
  for (let i = 0; i < 8; i++) folio += chars[Math.floor(Math.random() * chars.length)];
  return folio;
}

export default function BuzonLineaSegura() {
  const navigate = useNavigate();
  const [isAnonymous, setIsAnonymous] = useState(true);
  const [category, setCategory] = useState("");
  const [description, setDescription] = useState("");
  const [urgency, setUrgency] = useState("");
  const [files, setFiles] = useState<File[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [folio, setFolio] = useState("");
  const [folioCopied, setFolioCopied] = useState(false);

  // Folio lookup
  const [lookupMode, setLookupMode] = useState(false);
  const [lookupFolio, setLookupFolio] = useState("");

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const newFiles = Array.from(e.target.files).slice(0, 5 - files.length);
      setFiles((prev) => [...prev, ...newFiles].slice(0, 5));
    }
  };

  const removeFile = (idx: number) => setFiles((prev) => prev.filter((_, i) => i !== idx));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!category || !description.trim() || !urgency) {
      toast.error("Completa todos los campos obligatorios");
      return;
    }
    setIsSubmitting(true);
    await new Promise((r) => setTimeout(r, 2000));
    const newFolio = generateFolio();
    setFolio(newFolio);
    setSubmitted(true);
    setIsSubmitting(false);
  };

  const copyFolio = () => {
    navigator.clipboard.writeText(folio);
    setFolioCopied(true);
    toast.success("Folio copiado al portapapeles");
    setTimeout(() => setFolioCopied(false), 2000);
  };

  const handleLookup = () => {
    if (!lookupFolio.trim()) {
      toast.error("Ingresa un folio válido");
      return;
    }
    // Mock response
    toast.info(`Folio ${lookupFolio}: En Revisión`, {
      description: "Tu reporte está siendo atendido por el comité.",
    });
  };

  if (submitted) {
    return (
      <div className="px-5 py-4 animate-fade-in">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="flex flex-col items-center text-center mt-10 space-y-5"
        >
          <div className="w-20 h-20 rounded-full bg-success/15 flex items-center justify-center">
            <ShieldCheck className="w-10 h-10 text-success" />
          </div>
          <h2 className="text-xl font-extrabold text-foreground">
            Reporte enviado con éxito
          </h2>
          <p className="text-sm text-muted-foreground max-w-xs">
            Tu reporte se mantendrá bajo estricta confidencialidad. Guarda tu
            folio para dar seguimiento.
          </p>

          <div className="bg-card border border-border rounded-2xl p-5 w-full max-w-xs space-y-3">
            <p className="text-xs text-muted-foreground font-semibold uppercase tracking-wider">
              Tu folio de seguimiento
            </p>
            <div className="flex items-center justify-center gap-3">
              <span className="text-2xl font-extrabold tracking-widest text-primary font-mono">
                {folio}
              </span>
              <button
                onClick={copyFolio}
                className="p-2 rounded-lg bg-primary/10 hover:bg-primary/20 transition-colors"
              >
                {folioCopied ? (
                  <Check className="w-4 h-4 text-success" />
                ) : (
                  <Copy className="w-4 h-4 text-primary" />
                )}
              </button>
            </div>
            <p className="text-[11px] text-muted-foreground">
              Usa este folio dentro de la app para consultar el estatus de tu
              reporte sin necesidad de identificarte.
            </p>
          </div>

          <Button
            className="w-full max-w-xs"
            size="lg"
            onClick={() => navigate(-1)}
          >
            Volver
          </Button>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="px-5 py-4 animate-fade-in">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex items-center gap-3 mb-5"
      >
        <Button
          variant="ghost"
          size="icon"
          className="shrink-0"
          onClick={() => navigate(-1)}
        >
          <ChevronLeft className="w-5 h-5" />
        </Button>
        <div>
          <h1 className="text-xl font-extrabold text-foreground">
            Línea Segura
          </h1>
          <p className="text-sm text-muted-foreground">Buzón confidencial</p>
        </div>
      </motion.div>

      {/* Banner */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.05 }}
        className="bg-primary/5 border border-primary/15 rounded-2xl p-4 mb-5"
      >
        <div className="flex items-start gap-3">
          <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
            <ShieldCheck className="w-5 h-5 text-primary" />
          </div>
          <div className="space-y-1">
            <p className="text-sm font-bold text-foreground">
              Espacio seguro y confidencial
            </p>
            <p className="text-xs text-muted-foreground leading-relaxed">
              Reporta situaciones de acoso, condiciones inseguras, violaciones a
              la NOM-035 o cualquier irregularidad laboral. Tu identidad será
              protegida.
            </p>
          </div>
        </div>
      </motion.div>

      {/* Toggle: Lookup mode */}
      <div className="flex gap-2 mb-5">
        <Button
          variant={!lookupMode ? "default" : "outline"}
          size="sm"
          className="flex-1 text-xs"
          onClick={() => setLookupMode(false)}
        >
          Nuevo reporte
        </Button>
        <Button
          variant={lookupMode ? "default" : "outline"}
          size="sm"
          className="flex-1 text-xs"
          onClick={() => setLookupMode(true)}
        >
          Consultar folio
        </Button>
      </div>

      <AnimatePresence mode="wait">
        {lookupMode ? (
          <motion.div
            key="lookup"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="space-y-4"
          >
            <div className="space-y-2">
              <Label htmlFor="folio">Folio de seguimiento</Label>
              <Input
                id="folio"
                placeholder="Ej. LS-A3BX7K2M"
                value={lookupFolio}
                onChange={(e) => setLookupFolio(e.target.value.toUpperCase())}
                className="font-mono tracking-wider"
                maxLength={11}
              />
            </div>
            <Button className="w-full gap-2" size="lg" onClick={handleLookup}>
              <Eye className="w-4 h-4" />
              Consultar estatus
            </Button>
          </motion.div>
        ) : (
          <motion.form
            key="form"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 20 }}
            onSubmit={handleSubmit}
            className="space-y-5"
          >
            {/* Anonymous toggle */}
            <div className="flex items-center justify-between bg-card border border-border rounded-xl p-4">
              <div className="flex items-center gap-3">
                {isAnonymous ? (
                  <EyeOff className="w-5 h-5 text-primary" />
                ) : (
                  <Eye className="w-5 h-5 text-muted-foreground" />
                )}
                <div>
                  <p className="text-sm font-semibold text-foreground">
                    {isAnonymous ? "Reporte anónimo" : "Reporte con identidad"}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    {isAnonymous
                      ? "Tu identidad no será revelada"
                      : "Se incluirá tu nombre en el reporte"}
                  </p>
                </div>
              </div>
              <Switch
                checked={isAnonymous}
                onCheckedChange={setIsAnonymous}
              />
            </div>

            {/* Category */}
            <div className="space-y-2">
              <Label>Categoría de la incidencia *</Label>
              <Select value={category} onValueChange={setCategory}>
                <SelectTrigger>
                  <SelectValue placeholder="Selecciona una categoría" />
                </SelectTrigger>
                <SelectContent>
                  {categories.map((c) => (
                    <SelectItem key={c.value} value={c.value}>
                      {c.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Description */}
            <div className="space-y-2">
              <Label>Descripción del evento *</Label>
              <Textarea
                placeholder="Describe qué sucedió, cuándo y quiénes estuvieron involucrados..."
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="min-h-[130px] resize-none"
                maxLength={2000}
              />
              <p className="text-xs text-muted-foreground text-right">
                {description.length}/2000
              </p>
            </div>

            {/* Urgency */}
            <div className="space-y-2">
              <Label>Nivel de urgencia *</Label>
              <div className="grid grid-cols-3 gap-2">
                {urgencyLevels.map((u) => (
                  <button
                    key={u.value}
                    type="button"
                    onClick={() => setUrgency(u.value)}
                    className={`py-2.5 px-3 rounded-xl text-xs font-bold border-2 transition-all ${
                      urgency === u.value
                        ? u.color
                        : "bg-card border-border text-muted-foreground"
                    }`}
                  >
                    {u.label}
                  </button>
                ))}
              </div>
            </div>

            {/* File upload */}
            <div className="space-y-2">
              <Label>Evidencia (opcional)</Label>
              <label className="flex items-center gap-3 bg-card border-2 border-dashed border-border rounded-xl p-4 cursor-pointer hover:border-primary/30 transition-colors">
                <Upload className="w-5 h-5 text-muted-foreground" />
                <div>
                  <p className="text-sm font-medium text-foreground">
                    Adjuntar archivos
                  </p>
                  <p className="text-xs text-muted-foreground">
                    Fotos, capturas o documentos (máx. 5)
                  </p>
                </div>
                <input
                  type="file"
                  className="hidden"
                  multiple
                  accept="image/*,audio/*,.pdf,.doc,.docx"
                  onChange={handleFileChange}
                />
              </label>
              {files.length > 0 && (
                <div className="space-y-1.5 mt-2">
                  {files.map((f, i) => (
                    <div
                      key={i}
                      className="flex items-center justify-between bg-secondary/50 rounded-lg px-3 py-2"
                    >
                      <span className="text-xs text-foreground truncate max-w-[200px]">
                        {f.name}
                      </span>
                      <button
                        type="button"
                        onClick={() => removeFile(i)}
                        className="text-xs text-destructive font-semibold"
                      >
                        Quitar
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Warning */}
            <div className="flex items-start gap-2 bg-warning/10 rounded-xl p-3 border border-warning/20">
              <AlertTriangle className="w-4 h-4 text-warning-foreground mt-0.5 shrink-0" />
              <p className="text-xs text-foreground">
                Este reporte será atendido por el comité de ética. Toda la
                información será tratada con estricta confidencialidad.
              </p>
            </div>

            {/* Submit */}
            <Button
              type="submit"
              className="w-full gap-2"
              size="lg"
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  Enviando...
                </>
              ) : (
                <>
                  <Send className="w-4 h-4" />
                  Enviar reporte
                </>
              )}
            </Button>
          </motion.form>
        )}
      </AnimatePresence>
    </div>
  );
}
