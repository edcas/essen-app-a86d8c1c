import { useState, useRef, useMemo } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { motion } from "framer-motion";
import { format, differenceInCalendarDays } from "date-fns";
import { es } from "date-fns/locale";
import { ArrowLeft, CalendarIcon, Upload, X, Info, Clock, DollarSign, Hash, CalendarDays, AlertTriangle } from "lucide-react";
import { Drawer, DrawerClose, DrawerContent, DrawerDescription, DrawerFooter, DrawerHeader, DrawerTitle, DrawerTrigger } from "@/components/ui/drawer";
import { cn } from "@/lib/utils";
import { incidentTypes, getIncidentType, type IncidentTypeConfig } from "@/lib/incident-types";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";

export default function NuevaSolicitud() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { toast } = useToast();
  const preselectedType = searchParams.get("tipo");
  const [selectedTypeId, setSelectedTypeId] = useState<string>(preselectedType || "");
  const config = useMemo(() => getIncidentType(selectedTypeId), [selectedTypeId]);
  const [dateStart, setDateStart] = useState<Date | undefined>();
  const [dateEnd, setDateEnd] = useState<Date | undefined>();
  const [timeHours, setTimeHours] = useState("");
  const [timeMinutes, setTimeMinutes] = useState("");
  const [amount, setAmount] = useState("");
  const [quantity, setQuantity] = useState("");
  const [comments, setComments] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [dragOver, setDragOver] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const isVacaciones = selectedTypeId === "vacaciones";
  const requestedDays = useMemo(() => isVacaciones && dateStart && dateEnd ? differenceInCalendarDays(dateEnd, dateStart) + 1 : 0, [isVacaciones, dateStart, dateEnd]);
  
  const getDisabledDays = (restriction: IncidentTypeConfig["dateRestriction"]) => {
    const today = new Date(); today.setHours(0, 0, 0, 0);
    if (restriction === "future") return (date: Date) => date < today;
    if (restriction === "past") { const tomorrow = new Date(today); tomorrow.setDate(tomorrow.getDate() + 1); return (date: Date) => date >= tomorrow; }
    return undefined;
  };

  const isValid = useMemo(() => {
    if (!config || !dateStart) return false;
    if (config.dateMode === "range" && !dateEnd) return false;
    if (config.fields.amount && !amount) return false;
    if (config.fields.time && (!timeHours || !timeMinutes)) return false;
    if (config.fields.fileUpload && !file) return false;
    return true;
  }, [config, dateStart, dateEnd, amount, timeHours, timeMinutes, file]);

  const handleSubmit = async () => {
    if (!isValid || !config) return;
    setSubmitting(true);
    await new Promise((r) => setTimeout(r, 1500));
    setSubmitting(false);
    toast({ title: "Solicitud enviada", description: `Tu solicitud de "${config.name}" ha sido enviada.` });
    navigate("/");
  };

  const handleTypeChange = (id: string) => { setSelectedTypeId(id); setDateStart(undefined); setDateEnd(undefined); setTimeHours(""); setTimeMinutes(""); setAmount(""); setQuantity(""); setComments(""); setFile(null); };

  return (
    <div className="px-5 py-4 pb-8 animate-fade-in">
      <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="flex items-center gap-3 mb-5">
        <button onClick={() => navigate(-1)} className="w-9 h-9 rounded-full flex items-center justify-center hover:bg-secondary transition-colors"><ArrowLeft className="w-5 h-5 text-foreground" /></button>
        <h1 className="text-lg font-bold text-foreground">{config ? config.formTitle : "Nueva Solicitud"}</h1>
      </motion.div>

      {!preselectedType && (
        <div className="mb-5"><Label className="text-sm font-semibold text-foreground mb-2 block">Tipo de solicitud</Label>
          <Select value={selectedTypeId} onValueChange={handleTypeChange}><SelectTrigger className="w-full"><SelectValue placeholder="Selecciona un tipo de incidencia" /></SelectTrigger><SelectContent>{incidentTypes.map((t) => <SelectItem key={t.id} value={t.id}>{t.name}</SelectItem>)}</SelectContent></Select>
        </div>
      )}

      {config && (
        <motion.div key={config.id} initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} className="space-y-5">
          {config.helpText && <div className="flex gap-3 p-3.5 rounded-xl bg-primary/5 border border-primary/10"><Info className="w-5 h-5 text-primary shrink-0 mt-0.5" /><p className="text-sm text-muted-foreground leading-relaxed">{config.helpText}</p></div>}

          <div className={cn("grid gap-4", config.dateMode === "range" ? "grid-cols-2" : "grid-cols-1")}>
            <div><Label className="text-sm font-semibold text-foreground mb-2 block">{config.dateMode === "range" ? (config.labels?.dateStart || "Fecha inicio") : (config.labels?.dateSingle || "Fecha")}</Label>
              <Popover><PopoverTrigger asChild><Button variant="outline" className={cn("w-full justify-start text-left font-normal", !dateStart && "text-muted-foreground")}><CalendarIcon className="mr-2 h-4 w-4" />{dateStart ? format(dateStart, "d MMM yyyy", { locale: es }) : "Seleccionar"}</Button></PopoverTrigger><PopoverContent className="w-auto p-0" align="start"><Calendar mode="single" selected={dateStart} onSelect={setDateStart} disabled={getDisabledDays(config.dateRestriction)} initialFocus className="p-3 pointer-events-auto" /></PopoverContent></Popover>
            </div>
            {config.dateMode === "range" && (
              <div><Label className="text-sm font-semibold text-foreground mb-2 block">{config.labels?.dateEnd || "Fecha fin"}</Label>
                <Popover><PopoverTrigger asChild><Button variant="outline" className={cn("w-full justify-start text-left font-normal", !dateEnd && "text-muted-foreground")}><CalendarIcon className="mr-2 h-4 w-4" />{dateEnd ? format(dateEnd, "d MMM yyyy", { locale: es }) : "Seleccionar"}</Button></PopoverTrigger><PopoverContent className="w-auto p-0" align="start"><Calendar mode="single" selected={dateEnd} onSelect={setDateEnd} disabled={(date) => { const base = getDisabledDays(config.dateRestriction); if (base && base(date)) return true; if (dateStart && date < dateStart) return true; return false; }} initialFocus className="p-3 pointer-events-auto" /></PopoverContent></Popover>
              </div>
            )}
          </div>

          {isVacaciones && dateStart && dateEnd && <div className="flex items-center gap-2 p-3 rounded-xl bg-primary/5 border border-primary/10"><CalendarDays className="w-4 h-4 text-primary" /><p className="text-sm text-foreground">Estás solicitando <span className="font-bold text-primary">{requestedDays} día{requestedDays !== 1 ? "s" : ""}</span></p></div>}

          {config.fields.time && (
            <div><Label className="text-sm font-semibold text-foreground mb-2 block"><Clock className="w-4 h-4 inline mr-1.5 -mt-0.5" />{config.labels?.time || "Tiempo"}</Label>
              <div className="flex items-center gap-2">
                <Select value={timeHours} onValueChange={setTimeHours}><SelectTrigger className="w-24"><SelectValue placeholder="HH" /></SelectTrigger><SelectContent>{Array.from({ length: 24 }, (_, i) => <SelectItem key={i} value={String(i).padStart(2, "0")}>{String(i).padStart(2, "0")}</SelectItem>)}</SelectContent></Select>
                <span className="text-foreground font-bold">:</span>
                <Select value={timeMinutes} onValueChange={setTimeMinutes}><SelectTrigger className="w-24"><SelectValue placeholder="MM" /></SelectTrigger><SelectContent>{[0, 5, 10, 15, 20, 25, 30, 35, 40, 45, 50, 55].map(m => <SelectItem key={m} value={String(m).padStart(2, "0")}>{String(m).padStart(2, "0")}</SelectItem>)}</SelectContent></Select>
                <span className="text-sm text-muted-foreground">hrs</span>
              </div>
            </div>
          )}

          {config.fields.amount && (
            <div><Label className="text-sm font-semibold text-foreground mb-2 block"><DollarSign className="w-4 h-4 inline mr-1.5 -mt-0.5" />{config.labels?.amount || "Monto"}</Label><div className="relative"><span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground text-sm">$</span><Input type="number" min="0" step="0.01" placeholder="0.00" className="pl-7" value={amount} onChange={(e) => setAmount(e.target.value)} /></div></div>
          )}

          {config.fields.fileUpload && (
            <div><Label className="text-sm font-semibold text-foreground mb-2 block"><Upload className="w-4 h-4 inline mr-1.5 -mt-0.5" />{config.labels?.fileUpload || "Adjuntar archivo"}</Label>
              {file ? (
                <div className="flex items-center gap-3 p-3 rounded-xl bg-card border border-border"><div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center"><Upload className="w-5 h-5 text-primary" /></div><div className="flex-1 min-w-0"><p className="text-sm font-semibold text-foreground truncate">{file.name}</p><p className="text-xs text-muted-foreground">{(file.size / 1024).toFixed(1)} KB</p></div><button onClick={() => setFile(null)} className="w-8 h-8 rounded-full flex items-center justify-center hover:bg-destructive/10"><X className="w-4 h-4 text-destructive" /></button></div>
              ) : (
                <div onClick={() => fileInputRef.current?.click()} className={cn("border-2 border-dashed rounded-xl p-6 text-center cursor-pointer transition-colors", dragOver ? "border-primary bg-primary/5" : "border-border hover:border-primary/40")}>
                  <Upload className="w-8 h-8 text-muted-foreground mx-auto mb-2" /><p className="text-sm text-muted-foreground">Arrastra un archivo o <span className="text-primary font-semibold">selecciona</span></p><p className="text-xs text-muted-foreground mt-1">PDF, JPG, PNG · Máx 10 MB</p>
                  <input ref={fileInputRef} type="file" accept=".pdf,.jpg,.jpeg,.png" className="hidden" onChange={(e) => { const f = e.target.files?.[0]; if (f) setFile(f); }} />
                </div>
              )}
            </div>
          )}

          <div><Label className="text-sm font-semibold text-foreground mb-2 block">Comentarios</Label><Textarea placeholder="Agrega información adicional (opcional)" className="min-h-[100px] resize-none" maxLength={500} value={comments} onChange={(e) => setComments(e.target.value)} /><p className="text-xs text-muted-foreground text-right mt-1">{comments.length}/500</p></div>

          <Drawer open={showConfirm} onOpenChange={setShowConfirm}>
            <DrawerTrigger asChild><Button className="w-full" size="lg" disabled={!isValid || submitting}>{submitting ? "Enviando..." : "Enviar solicitud"}</Button></DrawerTrigger>
            <DrawerContent><DrawerHeader className="text-center"><div className="mx-auto w-12 h-12 rounded-full bg-warning/10 flex items-center justify-center mb-2"><AlertTriangle className="w-6 h-6 text-warning" /></div><DrawerTitle>¿La información es correcta?</DrawerTitle><DrawerDescription>Una vez enviada no se podrá modificar.</DrawerDescription></DrawerHeader><DrawerFooter><Button onClick={handleSubmit} className="w-full" size="lg">Confirmar y enviar</Button><DrawerClose asChild><Button variant="outline" className="w-full" size="lg">Revisar</Button></DrawerClose></DrawerFooter></DrawerContent>
          </Drawer>
        </motion.div>
      )}
    </div>
  );
}
