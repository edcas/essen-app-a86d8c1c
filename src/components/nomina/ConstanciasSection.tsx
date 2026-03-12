import { useState } from "react";
import { motion } from "framer-motion";
import { Home, Plane, Banknote, Building2, Shield, FileText, ChevronRight, Lock, Eye, Share2, Download, X, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { ScrollArea } from "@/components/ui/scroll-area";
import { toast } from "sonner";

interface DocumentTemplate {
  id: string; name: string; description: string; icon: React.ElementType; iconColor: string; iconBg: string; hasFinancialData: boolean; hasRecipientField: boolean;
}

const templates: DocumentTemplate[] = [
  { id: "infonavit", name: "Carta Infonavit", description: "Constancia de empleo para trámites de vivienda", icon: Home, iconColor: "text-orange-600", iconBg: "bg-orange-100", hasFinancialData: false, hasRecipientField: true },
  { id: "visa", name: "Carta para Visa", description: "Constancia de trabajo para trámites migratorios", icon: Plane, iconColor: "text-blue-600", iconBg: "bg-blue-100", hasFinancialData: true, hasRecipientField: true },
  { id: "sueldo", name: "Carta de Sueldo", description: "Comprobante de ingresos mensuales", icon: Banknote, iconColor: "text-green-600", iconBg: "bg-green-100", hasFinancialData: true, hasRecipientField: true },
  { id: "laboral", name: "Constancia Laboral", description: "Comprobante de relación laboral vigente", icon: Building2, iconColor: "text-purple-600", iconBg: "bg-purple-100", hasFinancialData: false, hasRecipientField: true },
  { id: "imss", name: "Carta IMSS", description: "Constancia de afiliación al seguro social", icon: Shield, iconColor: "text-red-600", iconBg: "bg-red-100", hasFinancialData: false, hasRecipientField: false },
  { id: "general", name: "Constancia General", description: "Carta personalizable de empleo", icon: FileText, iconColor: "text-slate-600", iconBg: "bg-slate-100", hasFinancialData: true, hasRecipientField: true },
];

const employeeData = { name: "Juan Carlos Rodríguez García", position: "Desarrollador Senior", department: "Tecnología", startDate: "15 de marzo de 2022", salary: 45000, company: "ESSEN Corp S.A. de C.V.", companyAddress: "Av. Reforma 500, Col. Juárez, CDMX" };

export function ConstanciasSection() {
  const [selectedTemplate, setSelectedTemplate] = useState<DocumentTemplate | null>(null);
  const [configSheetOpen, setConfigSheetOpen] = useState(false);
  const [previewSheetOpen, setPreviewSheetOpen] = useState(false);
  const [allConstanciasOpen, setAllConstanciasOpen] = useState(false);
  const [recipient, setRecipient] = useState("A quien corresponda");
  const [includeSalary, setIncludeSalary] = useState(false);

  const handleTemplateClick = (template: DocumentTemplate) => { setSelectedTemplate(template); setRecipient("A quien corresponda"); setIncludeSalary(template.hasFinancialData); setAllConstanciasOpen(false); setConfigSheetOpen(true); };
  const handleGenerateDocument = () => { setConfigSheetOpen(false); setPreviewSheetOpen(true); };
  const handleDownload = () => { toast.success("Descargando PDF..."); };
  const currentDate = new Date().toLocaleDateString("es-MX", { day: "numeric", month: "long", year: "numeric" });
  const visibleTemplates = templates.slice(0, 3);

  return (
    <>
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }} className="mt-6">
        <div className="flex items-center justify-between mb-3">
          <h2 className="text-sm font-bold text-foreground">Constancias</h2>
          <Button variant="ghost" size="sm" className="text-primary text-sm h-auto p-0" onClick={() => setAllConstanciasOpen(true)}>Ver todo<ChevronRight className="w-4 h-4 ml-1" /></Button>
        </div>
        <div className="bg-card rounded-xl border border-border divide-y divide-border">
          {visibleTemplates.map((template, index) => {
            const Icon = template.icon;
            return (
              <motion.button key={template.id} initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.05 * index }} onClick={() => handleTemplateClick(template)} className="w-full flex items-center gap-3 p-3 text-left hover:bg-secondary/50 transition-colors first:rounded-t-xl last:rounded-b-xl">
                <div className={`w-10 h-10 rounded-xl ${template.iconBg} flex items-center justify-center flex-shrink-0`}><Icon className={`w-5 h-5 ${template.iconColor}`} /></div>
                <div className="flex-1 min-w-0"><h3 className="font-semibold text-foreground text-sm">{template.name}</h3><p className="text-xs text-muted-foreground truncate">{template.description}</p></div>
                <ChevronRight className="w-4 h-4 text-muted-foreground flex-shrink-0" />
              </motion.button>
            );
          })}
        </div>
      </motion.div>

      <Sheet open={allConstanciasOpen} onOpenChange={setAllConstanciasOpen}>
        <SheetContent side="bottom" className="h-auto max-h-[85vh] rounded-t-2xl px-4">
          <SheetHeader className="pb-4"><SheetTitle>Todas las constancias</SheetTitle></SheetHeader>
          <ScrollArea className="max-h-[60vh]">
            <div className="bg-card rounded-xl border border-border divide-y divide-border">
              {templates.map((template) => { const Icon = template.icon; return (
                <button key={template.id} onClick={() => handleTemplateClick(template)} className="w-full flex items-center gap-3 p-3 text-left hover:bg-secondary/50 transition-colors first:rounded-t-xl last:rounded-b-xl">
                  <div className={`w-10 h-10 rounded-xl ${template.iconBg} flex items-center justify-center flex-shrink-0`}><Icon className={`w-5 h-5 ${template.iconColor}`} /></div>
                  <div className="flex-1 min-w-0"><h3 className="font-semibold text-foreground text-sm">{template.name}</h3><p className="text-xs text-muted-foreground">{template.description}</p></div>
                  <ChevronRight className="w-4 h-4 text-muted-foreground flex-shrink-0" />
                </button>
              ); })}
            </div>
          </ScrollArea>
        </SheetContent>
      </Sheet>

      <Sheet open={configSheetOpen} onOpenChange={setConfigSheetOpen}>
        <SheetContent side="bottom" className="h-auto max-h-[85vh] rounded-t-2xl px-4">
          <SheetHeader className="pb-4">
            <SheetTitle className="flex items-center gap-3">
              {selectedTemplate && (<><div className={`w-10 h-10 rounded-xl ${selectedTemplate.iconBg} flex items-center justify-center`}><selectedTemplate.icon className={`w-5 h-5 ${selectedTemplate.iconColor}`} /></div><div className="text-left"><span className="block">{selectedTemplate.name}</span><span className="text-sm font-normal text-muted-foreground">Configura tu documento</span></div></>)}
            </SheetTitle>
          </SheetHeader>
          <div className="space-y-6 pb-6">
            {selectedTemplate?.hasRecipientField && (<div className="space-y-2"><Label htmlFor="recipient" className="text-sm font-medium">¿A quién va dirigida esta carta?</Label><Input id="recipient" value={recipient} onChange={(e) => setRecipient(e.target.value)} placeholder="A quien corresponda" className="text-base" /><p className="text-xs text-muted-foreground">Por ejemplo: "Embajada de Estados Unidos"</p></div>)}
            {selectedTemplate?.hasFinancialData && (<div className="bg-secondary/50 rounded-xl p-4 border border-border"><div className="flex items-center justify-between"><div className="flex items-center gap-3"><div className="w-9 h-9 rounded-lg bg-warning/10 flex items-center justify-center"><Banknote className="w-4 h-4 text-warning" /></div><div><p className="font-semibold text-foreground text-sm">Incluir sueldo mensual</p><p className="text-xs text-muted-foreground">${employeeData.salary.toLocaleString("es-MX")} MXN</p></div></div><Switch checked={includeSalary} onCheckedChange={setIncludeSalary} /></div>{includeSalary && (<motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} className="mt-3 pt-3 border-t border-border"><div className="flex items-center gap-2 text-warning bg-warning/5 rounded-lg px-3 py-2"><Lock className="w-3.5 h-3.5" /><span className="text-xs">Este documento contendrá datos financieros sensibles</span></div></motion.div>)}</div>)}
            <Button onClick={handleGenerateDocument} className="w-full gap-2" size="lg"><Eye className="w-4 h-4" />Generar y previsualizar</Button>
          </div>
        </SheetContent>
      </Sheet>

      <Sheet open={previewSheetOpen} onOpenChange={setPreviewSheetOpen}>
        <SheetContent side="bottom" className="h-[90vh] rounded-t-2xl px-0">
          <SheetHeader className="px-4 pb-4 border-b border-border">
            <div className="flex items-center justify-between"><SheetTitle className="text-base">Vista previa del documento</SheetTitle><Button variant="ghost" size="icon" onClick={() => setPreviewSheetOpen(false)}><X className="w-5 h-5" /></Button></div>
          </SheetHeader>
          <ScrollArea className="h-[calc(90vh-180px)]">
            <div className="px-4 py-6">
              <div className="bg-card rounded-lg border border-border shadow-lg p-6 min-h-[500px]">
                <div className="text-center border-b border-border pb-4 mb-6"><h1 className="text-lg font-bold text-foreground">{employeeData.company}</h1><p className="text-xs text-muted-foreground">{employeeData.companyAddress}</p></div>
                <div className="text-center mb-8"><h2 className="text-base font-bold text-foreground uppercase tracking-wide">{selectedTemplate?.name}</h2></div>
                <div className="space-y-4 text-sm text-muted-foreground leading-relaxed">
                  <p className="font-semibold text-foreground">{recipient}:</p>
                  <p>Por medio de la presente, hacemos constar que <strong className="text-foreground">{employeeData.name}</strong> se encuentra laborando en nuestra empresa desde el <strong className="text-foreground">{employeeData.startDate}</strong>, desempeñándose como <strong className="text-foreground">{employeeData.position}</strong> en el departamento de <strong className="text-foreground">{employeeData.department}</strong>.</p>
                  {includeSalary && <p>Actualmente percibe un salario mensual bruto de <strong className="text-foreground">${employeeData.salary.toLocaleString("es-MX")} MXN</strong>.</p>}
                  <p>Se extiende la presente constancia a petición del interesado.</p>
                </div>
                <div className="mt-12 space-y-8"><p className="text-sm text-muted-foreground">Ciudad de México, a {currentDate}.</p><div className="text-center"><div className="border-b border-border w-48 mx-auto mb-2"></div><p className="text-sm font-semibold text-foreground">Recursos Humanos</p><p className="text-xs text-muted-foreground">{employeeData.company}</p></div></div>
                <div className="mt-8 flex items-center justify-center gap-2 text-success text-xs"><CheckCircle2 className="w-4 h-4" /><span>Documento verificado digitalmente</span></div>
              </div>
            </div>
          </ScrollArea>
          <div className="absolute bottom-0 left-0 right-0 p-4 bg-background border-t border-border">
            <div className="flex gap-3">
              <Button variant="outline" className="flex-1 gap-2" onClick={() => toast.success("Documento listo para compartir")}><Share2 className="w-4 h-4" />Compartir</Button>
              <Button className="flex-1 gap-2" onClick={handleDownload}><Download className="w-4 h-4" />Descargar PDF</Button>
            </div>
          </div>
        </SheetContent>
      </Sheet>
    </>
  );
}
