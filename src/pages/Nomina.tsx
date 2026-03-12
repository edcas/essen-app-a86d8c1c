import { useState } from "react";
import { motion } from "framer-motion";
import { format } from "date-fns";
import { es } from "date-fns/locale";
import { ConstanciasSection } from "@/components/nomina/ConstanciasSection";
import { useSettings } from "@/hooks/use-settings";
import { Download, Eye, ChevronRight, TrendingUp, TrendingDown, HelpCircle, Receipt, CalendarIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { SummaryCard } from "@/components/dashboard/SummaryCard";
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Calendar as CalendarComponent } from "@/components/ui/calendar";
import { cn } from "@/lib/utils";

const payrollData = {
  current: { period: "1-15 Diciembre 2024", netPay: 18750.00, grossPay: 25000.00, deductions: 6250.00, status: "Disponible" },
  breakdown: {
    earnings: [
      { concept: "Sueldo base", amount: 22000.00, description: "Tu salario mensual acordado en tu contrato." },
      { concept: "Bono puntualidad", amount: 1500.00, description: "Premio por llegar a tiempo todos los días." },
      { concept: "Vales de despensa", amount: 1500.00, description: "Beneficio adicional para compras de alimentos." },
    ],
    deductions: [
      { concept: "IMSS", amount: 1200.00, description: "Aportación al Instituto Mexicano del Seguro Social." },
      { concept: "ISR", amount: 4500.00, description: "Impuesto Sobre la Renta." },
      { concept: "Fondo de ahorro", amount: 550.00, description: "Ahorro quincenal que la empresa iguala." },
    ],
  },
  history: [
    { period: "16-30 Nov 2024", amount: 18750.00, status: "Pagado" },
    { period: "1-15 Nov 2024", amount: 18750.00, status: "Pagado" },
    { period: "16-31 Oct 2024", amount: 19250.00, status: "Pagado" },
    { period: "1-15 Oct 2024", amount: 18750.00, status: "Pagado" },
    { period: "16-30 Sep 2024", amount: 18750.00, status: "Pagado" },
  ],
};

export default function Nomina() {
  const [showDetails, setShowDetails] = useState(true);
  const [historySheetOpen, setHistorySheetOpen] = useState(false);
  const [deductionsSheetOpen, setDeductionsSheetOpen] = useState(false);
  const [earningsSheetOpen, setEarningsSheetOpen] = useState(false);
  const [startDate, setStartDate] = useState<Date>();
  const [endDate, setEndDate] = useState<Date>();
  const { settings } = useSettings();

  return (
    <div className="px-5 py-4 animate-fade-in">
      <p className="text-sm text-muted-foreground mb-4">Consulta tus recibos y deducciones</p>

      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="grid grid-cols-2 gap-3 mb-6">
        <div onClick={() => setEarningsSheetOpen(true)} className="cursor-pointer"><SummaryCard icon={TrendingUp} title="Total percepciones" value={`$${payrollData.current.grossPay.toLocaleString("es-MX")}`} iconColor="text-success" delay={0.1} /></div>
        <div onClick={() => setDeductionsSheetOpen(true)} className="cursor-pointer"><SummaryCard icon={TrendingDown} title="Total deducciones" value={`$${payrollData.current.deductions.toLocaleString("es-MX")}`} iconColor="text-destructive" delay={0.15} /></div>
      </motion.div>

      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="bg-card rounded-xl border border-border p-5 mb-6">
        <div className="flex items-center justify-between mb-4">
          <div><p className="text-xs text-muted-foreground">Período actual</p><p className="font-semibold text-foreground text-sm">{payrollData.current.period}</p></div>
          <span className="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-success/10 text-success">{payrollData.current.status}</span>
        </div>
        <div className="mb-5"><p className="text-xs text-muted-foreground mb-1">Pago neto</p><div className="flex items-baseline gap-2"><span className="text-3xl font-bold text-primary">${payrollData.current.netPay.toLocaleString("es-MX")}</span><span className="text-sm text-muted-foreground">MXN</span></div></div>
        <div className="flex gap-3">
          <Button variant="outline" className="flex-1 gap-2" onClick={() => setShowDetails(!showDetails)}><Eye className="w-4 h-4" />{showDetails ? "Ocultar" : "Ver detalle"}</Button>
          <Button variant="default" className="flex-1 gap-2"><Download className="w-4 h-4" />Descargar PDF</Button>
        </div>
      </motion.div>

      {showDetails && (
        <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} className="bg-card rounded-xl border border-border p-5 mb-6">
          <h3 className="font-bold text-foreground mb-4 flex items-center gap-2 text-sm"><TrendingUp className="w-4 h-4 text-success" />Percepciones</h3>
          <div className="space-y-3 mb-6">{payrollData.breakdown.earnings.map((item) => (<div key={item.concept} className="flex justify-between text-sm"><span className="text-muted-foreground">{item.concept}</span><span className="font-semibold text-foreground">${item.amount.toLocaleString("es-MX")}</span></div>))}</div>
          <h3 className="font-bold text-foreground mb-4 flex items-center gap-2 text-sm"><TrendingDown className="w-4 h-4 text-destructive" />Deducciones</h3>
          <div className="space-y-3">{payrollData.breakdown.deductions.map((item) => (<div key={item.concept} className="flex justify-between text-sm"><span className="text-muted-foreground">{item.concept}</span><span className="font-semibold text-foreground">-${item.amount.toLocaleString("es-MX")}</span></div>))}</div>
        </motion.div>
      )}

      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}>
        <div className="flex items-center justify-between mb-4"><h2 className="text-sm font-bold text-foreground">Recibos anteriores</h2><button onClick={() => setHistorySheetOpen(true)} className="text-sm text-primary font-semibold flex items-center gap-1 hover:underline">Ver todo<ChevronRight className="w-4 h-4" /></button></div>
        <div className="bg-card rounded-xl border border-border overflow-hidden divide-y divide-border">
          {payrollData.history.slice(0, 5).map((item, index) => (
            <motion.div key={item.period} initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.05 * index }} className="p-4 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-lg bg-secondary flex items-center justify-center"><Receipt className="w-4 h-4 text-primary" /></div>
                <div><p className="font-semibold text-foreground text-sm">{item.period}</p><p className="text-xs text-muted-foreground">{item.status}</p></div>
              </div>
              <div className="flex items-center gap-3"><span className="font-semibold text-foreground text-sm">${item.amount.toLocaleString("es-MX")}</span><button className="p-2 rounded-lg hover:bg-secondary transition-colors"><Download className="w-4 h-4 text-primary" /></button></div>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {!settings.hideConstancias && <ConstanciasSection />}

      <Sheet open={historySheetOpen} onOpenChange={setHistorySheetOpen}>
        <SheetContent side="bottom" className="h-[85vh] rounded-t-2xl px-4">
          <SheetHeader className="pb-2"><SheetTitle>Recibos de nómina</SheetTitle></SheetHeader>
          <div className="flex gap-2 mb-4">
            <Popover><PopoverTrigger asChild><Button variant="outline" className={cn("flex-1 justify-start text-left font-normal text-sm", !startDate && "text-muted-foreground")}><CalendarIcon className="mr-2 h-4 w-4" />{startDate ? format(startDate, "dd MMM", { locale: es }) : "Desde"}</Button></PopoverTrigger><PopoverContent className="w-auto p-0" align="start"><CalendarComponent mode="single" selected={startDate} onSelect={setStartDate} initialFocus className="p-3 pointer-events-auto" /></PopoverContent></Popover>
            <Popover><PopoverTrigger asChild><Button variant="outline" className={cn("flex-1 justify-start text-left font-normal text-sm", !endDate && "text-muted-foreground")}><CalendarIcon className="mr-2 h-4 w-4" />{endDate ? format(endDate, "dd MMM", { locale: es }) : "Hasta"}</Button></PopoverTrigger><PopoverContent className="w-auto p-0" align="end"><CalendarComponent mode="single" selected={endDate} onSelect={setEndDate} initialFocus className="p-3 pointer-events-auto" /></PopoverContent></Popover>
          </div>
          <ScrollArea className="h-[calc(85vh-160px)]">
            <div className="space-y-3 pr-4">
              {payrollData.history.map((item, index) => (
                <div key={index} className="bg-secondary/50 rounded-xl p-4 flex items-center justify-between">
                  <div className="flex items-center gap-3"><div className="w-10 h-10 rounded-lg bg-card border border-border flex items-center justify-center"><Receipt className="w-5 h-5 text-muted-foreground" /></div><div><p className="font-semibold text-foreground">{item.period}</p><p className="text-xs text-muted-foreground">{item.status}</p></div></div>
                  <div className="flex items-center gap-3"><span className="font-bold text-foreground">${item.amount.toLocaleString("es-MX")}</span><button className="p-2 rounded-lg hover:bg-secondary transition-colors"><Download className="w-4 h-4 text-muted-foreground" /></button></div>
                </div>
              ))}
            </div>
          </ScrollArea>
        </SheetContent>
      </Sheet>

      <Sheet open={deductionsSheetOpen} onOpenChange={setDeductionsSheetOpen}>
        <SheetContent side="bottom" className="h-[70vh] rounded-t-2xl px-4">
          <SheetHeader className="pb-4"><SheetTitle className="flex items-center gap-2"><TrendingDown className="w-5 h-5 text-destructive" />Tus deducciones explicadas</SheetTitle></SheetHeader>
          <p className="text-sm text-muted-foreground mb-4">Estas son las retenciones de tu nómina.</p>
          <ScrollArea className="h-[calc(70vh-140px)]">
            <div className="space-y-4 pr-4">
              {payrollData.breakdown.deductions.map((item, index) => (<div key={index} className="bg-secondary/50 rounded-xl p-4 border border-border"><div className="flex items-center justify-between mb-2"><span className="font-bold text-foreground">{item.concept}</span><span className="font-bold text-destructive">-${item.amount.toLocaleString("es-MX")}</span></div><p className="text-sm text-muted-foreground leading-relaxed">{item.description}</p></div>))}
              <div className="bg-primary/5 rounded-xl p-4 border border-primary/20 mt-6"><div className="flex items-center gap-2 mb-2"><HelpCircle className="w-4 h-4 text-primary" /><span className="font-semibold text-foreground text-sm">¿Tienes dudas?</span></div><p className="text-sm text-muted-foreground">Contacta a Recursos Humanos.</p></div>
            </div>
          </ScrollArea>
        </SheetContent>
      </Sheet>

      <Sheet open={earningsSheetOpen} onOpenChange={setEarningsSheetOpen}>
        <SheetContent side="bottom" className="h-[70vh] rounded-t-2xl px-4">
          <SheetHeader className="pb-4"><SheetTitle className="flex items-center gap-2"><TrendingUp className="w-5 h-5 text-success" />Tus percepciones explicadas</SheetTitle></SheetHeader>
          <p className="text-sm text-muted-foreground mb-4">Este es el desglose de todo lo que ganas.</p>
          <ScrollArea className="h-[calc(70vh-140px)]">
            <div className="space-y-4 pr-4">
              {payrollData.breakdown.earnings.map((item, index) => (<div key={index} className="bg-secondary/50 rounded-xl p-4 border border-border"><div className="flex items-center justify-between mb-2"><span className="font-bold text-foreground">{item.concept}</span><span className="font-bold text-success">+${item.amount.toLocaleString("es-MX")}</span></div><p className="text-sm text-muted-foreground leading-relaxed">{item.description}</p></div>))}
              <div className="bg-success/5 rounded-xl p-4 border border-success/20 mt-6"><div className="flex items-center gap-2 mb-2"><HelpCircle className="w-4 h-4 text-success" /><span className="font-semibold text-foreground text-sm">¿Falta algo?</span></div><p className="text-sm text-muted-foreground">Consulta con Recursos Humanos.</p></div>
            </div>
          </ScrollArea>
        </SheetContent>
      </Sheet>
    </div>
  );
}
