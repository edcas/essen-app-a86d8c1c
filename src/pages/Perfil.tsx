import { useState, useRef, useCallback } from "react";
import { motion } from "framer-motion";
import { User, Mail, Phone, Briefcase, Calendar, ChevronRight, CreditCard, HelpCircle, LogOut, Edit3, Users, Camera, Upload, X, Shield, EyeOff } from "lucide-react";
import { useSettings } from "@/hooks/use-settings";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { useNavigate } from "react-router-dom";
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { useToast } from "@/hooks/use-toast";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";

const MAX_FILE_SIZE = 5 * 1024 * 1024;
const ALLOWED_TYPES = ["image/jpeg", "image/png"];

const userProfile = { name: "Carlos Mendoza", position: "Desarrollador Senior", department: "Tecnología", email: "carlos.mendoza@empresa.com", phone: "+52 55 1234 5678", startDate: "15 marzo 2022", employeeId: "EMP-2022-0315" };

const menuItems = [
  { section: "Mi información", items: [
    { icon: User, label: "Datos personales", path: "/datos-personales" },
    { icon: CreditCard, label: "Datos bancarios", path: "/datos-bancarios" },
    { icon: Shield, label: "Mis seguros", path: "/mis-seguros" },
  ]},
  { section: "Empresa", items: [
    { icon: Users, label: "Directorio de la empresa", path: "/directorio" },
  ]},
];

export default function Perfil() {
  const navigate = useNavigate();
  const { toast } = useToast();
  const { settings, updateSetting } = useSettings();
  const [isPhotoSheetOpen, setIsPhotoSheetOpen] = useState(false);
  const [profileImage, setProfileImage] = useState<string | null>(null);
  const [previewImage, setPreviewImage] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const cameraInputRef = useRef<HTMLInputElement>(null);

  const validateFile = (file: File): boolean => {
    if (!ALLOWED_TYPES.includes(file.type)) { toast({ title: "Formato no válido", description: "Solo JPG o PNG.", variant: "destructive" }); return false; }
    if (file.size > MAX_FILE_SIZE) { toast({ title: "Archivo muy grande", description: "Máximo 5MB.", variant: "destructive" }); return false; }
    return true;
  };

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file && validateFile(file)) { const reader = new FileReader(); reader.onload = (e) => setPreviewImage(e.target?.result as string); reader.readAsDataURL(file); }
    event.target.value = "";
  };

  const handleSavePhoto = () => { if (previewImage) { setProfileImage(previewImage); setPreviewImage(null); setIsPhotoSheetOpen(false); toast({ title: "Foto actualizada" }); } };
  const handleCancelPreview = () => setPreviewImage(null);
  const handleRemovePhoto = () => { setProfileImage(null); setPreviewImage(null); setIsPhotoSheetOpen(false); toast({ title: "Foto eliminada" }); };

  return (
    <div className="px-5 py-4 animate-fade-in">
      <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-8">
        <div className="relative inline-block">
          <Avatar className="w-20 h-20 mx-auto mb-4 border-2 border-border">
            {profileImage ? <AvatarImage src={profileImage} alt={userProfile.name} /> : <AvatarFallback className="bg-primary text-primary-foreground text-2xl font-bold">CM</AvatarFallback>}
          </Avatar>
          <button onClick={() => setIsPhotoSheetOpen(true)} className="absolute bottom-3 right-0 w-7 h-7 rounded-full bg-card border border-border flex items-center justify-center hover:bg-secondary transition-colors"><Edit3 className="w-3.5 h-3.5 text-foreground" /></button>
        </div>
        <h1 className="text-xl font-extrabold text-foreground">{userProfile.name}</h1>
        <p className="text-sm text-muted-foreground">{userProfile.position}</p>
        <span className="inline-block mt-2 text-xs font-semibold px-2.5 py-0.5 rounded-full bg-accent/10 text-accent">{userProfile.department}</span>
      </motion.div>

      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="bg-card rounded-xl border border-border p-4 mb-6">
        <div className="grid grid-cols-2 gap-4">
          <div className="flex items-center gap-3"><div className="w-9 h-9 rounded-full bg-primary flex items-center justify-center"><Mail className="w-4 h-4 text-primary-foreground" /></div><div className="min-w-0"><p className="text-xs text-muted-foreground">Email</p><p className="text-sm font-semibold text-foreground truncate">{userProfile.email.split("@")[0]}</p></div></div>
          <div className="flex items-center gap-3"><div className="w-9 h-9 rounded-full bg-success flex items-center justify-center"><Phone className="w-4 h-4 text-primary-foreground" /></div><div className="min-w-0"><p className="text-xs text-muted-foreground">Teléfono</p><p className="text-sm font-semibold text-foreground truncate">{userProfile.phone}</p></div></div>
          <div className="flex items-center gap-3"><div className="w-9 h-9 rounded-full bg-warning flex items-center justify-center"><Briefcase className="w-4 h-4 text-foreground" /></div><div className="min-w-0"><p className="text-xs text-muted-foreground">Puesto</p><p className="text-sm font-semibold text-foreground truncate">{userProfile.position}</p></div></div>
          <div className="flex items-center gap-3"><div className="w-9 h-9 rounded-full bg-accent flex items-center justify-center"><Calendar className="w-4 h-4 text-foreground" /></div><div className="min-w-0"><p className="text-xs text-muted-foreground">Antigüedad</p><p className="text-sm font-semibold text-foreground truncate">2 años 9 meses</p></div></div>
        </div>
      </motion.div>

      {menuItems.map((section, sectionIndex) => {
        const filtered = section.items.filter((item) => {
          if (item.label === "Mis seguros" && settings.hideSeguros) return false;
          if (item.label === "Directorio de la empresa" && settings.hideDirectorio) return false;
          return true;
        });
        if (filtered.length === 0) return null;
        return (
          <motion.div key={section.section} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15 + sectionIndex * 0.1 }} className="mb-6">
            <h2 className="text-xs font-bold text-muted-foreground uppercase tracking-wider mb-3 px-1">{section.section}</h2>
            <div className="bg-card rounded-xl border border-border overflow-hidden divide-y divide-border">
              {filtered.map((item) => (
                <button key={item.label} onClick={() => navigate(item.path)} className="w-full flex items-center justify-between p-4 hover:bg-secondary/30 transition-colors">
                  <div className="flex items-center gap-3"><item.icon className="w-4 h-4 text-primary" /><span className="font-semibold text-foreground text-sm">{item.label}</span></div>
                  <ChevronRight className="w-4 h-4 text-muted-foreground" />
                </button>
              ))}
            </div>
          </motion.div>
        );
      })}

      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.35 }} className="mb-6">
        <h2 className="text-xs font-bold text-muted-foreground uppercase tracking-wider mb-3 px-1">Configuración</h2>
        <div className="bg-card rounded-xl border border-border overflow-hidden divide-y divide-border">
          <button onClick={() => navigate("/ayuda")} className="w-full flex items-center justify-between p-4 hover:bg-secondary/30 transition-colors"><div className="flex items-center gap-3"><HelpCircle className="w-4 h-4 text-primary" /><span className="font-semibold text-foreground text-sm">Ayuda y soporte</span></div><ChevronRight className="w-4 h-4 text-muted-foreground" /></button>
        </div>
      </motion.div>

      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }} className="mt-8">
        <Button variant="outline" className="w-full gap-2 text-destructive hover:text-destructive hover:bg-destructive/10 hover:border-destructive/30"><LogOut className="w-4 h-4" />Cerrar sesión</Button>
      </motion.div>

      <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }} className="text-center text-xs text-muted-foreground mt-6">ESSEN Wellbeing V1.0.0</motion.p>

      <Sheet open={isPhotoSheetOpen} onOpenChange={setIsPhotoSheetOpen}>
        <SheetContent side="bottom" className="rounded-t-2xl">
          <SheetHeader className="mb-4"><SheetTitle>Foto de perfil</SheetTitle></SheetHeader>
          <div className="flex flex-col items-center gap-6">
            <div className="relative">
              <Avatar className="w-32 h-32">{previewImage ? <AvatarImage src={previewImage} alt="Preview" /> : profileImage ? <AvatarImage src={profileImage} alt={userProfile.name} /> : <AvatarFallback className="bg-primary text-primary-foreground text-4xl font-bold">CM</AvatarFallback>}</Avatar>
              {previewImage && <button onClick={handleCancelPreview} className="absolute -top-2 -right-2 w-8 h-8 rounded-full bg-destructive text-destructive-foreground flex items-center justify-center shadow-lg"><X className="w-4 h-4" /></button>}
            </div>
            {previewImage ? (
              <div className="flex gap-3 w-full"><Button variant="outline" className="flex-1" onClick={handleCancelPreview}>Cancelar</Button><Button className="flex-1" onClick={handleSavePhoto}>Guardar foto</Button></div>
            ) : (
              <div className="flex flex-col gap-3 w-full">
                <input ref={fileInputRef} type="file" accept="image/jpeg,image/png" className="hidden" onChange={handleFileSelect} />
                <input ref={cameraInputRef} type="file" accept="image/jpeg,image/png" capture="user" className="hidden" onChange={handleFileSelect} />
                <Button variant="outline" className="w-full gap-2" onClick={() => cameraInputRef.current?.click()}><Camera className="w-4 h-4" />Tomar foto</Button>
                <Button variant="outline" className="w-full gap-2" onClick={() => fileInputRef.current?.click()}><Upload className="w-4 h-4" />Subir desde galería</Button>
                {profileImage && <Button variant="ghost" className="w-full text-destructive hover:text-destructive hover:bg-destructive/10" onClick={handleRemovePhoto}>Eliminar foto actual</Button>}
                <p className="text-xs text-muted-foreground text-center mt-2">Formatos: JPG, PNG • Tamaño máximo: 5MB</p>
              </div>
            )}
          </div>
        </SheetContent>
      </Sheet>
    </div>
  );
}
