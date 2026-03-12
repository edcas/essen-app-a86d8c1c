import { useState } from "react";
import { motion } from "framer-motion";
import { Cake, Award, ChevronRight } from "lucide-react";
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const birthdaysData = {
  count: 26,
  people: [
    { name: "María García", date: "Hoy", avatar: "https://i.pravatar.cc/100?img=1", department: "Marketing" },
    { name: "Carlos López", date: "5 Dic", avatar: "https://i.pravatar.cc/100?img=2", department: "Ventas" },
    { name: "Ana Martínez", date: "8 Dic", avatar: "https://i.pravatar.cc/100?img=3", department: "RH" },
    { name: "Pedro Sánchez", date: "10 Dic", avatar: "https://i.pravatar.cc/100?img=4", department: "IT" },
  ],
};

const anniversariesData = {
  count: 13,
  people: [
    { name: "Roberto Díaz", date: "3 Dic", avatar: "https://i.pravatar.cc/100?img=5", years: 5, department: "Ventas" },
    { name: "Carmen Ruiz", date: "7 Dic", avatar: "https://i.pravatar.cc/100?img=6", years: 3, department: "RH" },
    { name: "Fernando Vega", date: "11 Dic", avatar: "https://i.pravatar.cc/100?img=7", years: 10, department: "IT" },
  ],
};

export function TeamEventsCard() {
  const [sheetOpen, setSheetOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("birthdays");

  return (
    <>
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}>
        <button onClick={() => setSheetOpen(true)} className="w-full bg-card rounded-xl border border-border p-3 hover:bg-secondary/30 transition-colors">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-2">
              <Cake className="w-3.5 h-3.5 text-pink-500" />
              <span className="text-xs font-semibold text-foreground">Cumpleaños y aniversarios</span>
            </div>
            <ChevronRight className="w-3.5 h-3.5 text-muted-foreground" />
          </div>
          <div className="flex items-center gap-3">
            <div className="flex items-center">
              <div className="flex -space-x-2">
                {birthdaysData.people.slice(0, 3).map((p) => (
                  <Avatar key={p.name} className="h-7 w-7 border-2 border-card">
                    <AvatarImage src={p.avatar} alt={p.name} />
                    <AvatarFallback className="bg-pink-500 text-primary-foreground text-[10px]">{p.name.split(" ").map(n => n[0]).join("")}</AvatarFallback>
                  </Avatar>
                ))}
              </div>
              <span className="text-[10px] text-muted-foreground ml-2">🎂 {birthdaysData.count}</span>
            </div>
            <div className="h-4 w-px bg-border" />
            <div className="flex items-center">
              <div className="flex -space-x-2">
                {anniversariesData.people.slice(0, 3).map((p) => (
                  <Avatar key={p.name} className="h-7 w-7 border-2 border-card">
                    <AvatarImage src={p.avatar} alt={p.name} />
                    <AvatarFallback className="bg-primary text-primary-foreground text-[10px]">{p.name.split(" ").map(n => n[0]).join("")}</AvatarFallback>
                  </Avatar>
                ))}
              </div>
              <span className="text-[10px] text-muted-foreground ml-2">🏆 {anniversariesData.count}</span>
            </div>
          </div>
        </button>
      </motion.div>

      <Sheet open={sheetOpen} onOpenChange={setSheetOpen}>
        <SheetContent side="bottom" className="h-[70vh] rounded-t-2xl px-4">
          <SheetHeader className="pb-2"><SheetTitle>Eventos del mes</SheetTitle></SheetHeader>
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid w-full grid-cols-2 mb-4">
              <TabsTrigger value="birthdays" className="flex items-center gap-2"><Cake className="w-4 h-4" />Cumpleaños ({birthdaysData.count})</TabsTrigger>
              <TabsTrigger value="anniversaries" className="flex items-center gap-2"><Award className="w-4 h-4" />Aniversarios ({anniversariesData.count})</TabsTrigger>
            </TabsList>
            <TabsContent value="birthdays" className="mt-0">
              <ScrollArea className="h-[calc(70vh-140px)]">
                <div className="space-y-3 pr-4">
                  {birthdaysData.people.map((person, index) => (
                    <div key={index} className="flex items-center gap-3 p-3 bg-secondary/30 rounded-xl">
                      <Avatar className="h-12 w-12"><AvatarImage src={person.avatar} alt={person.name} /><AvatarFallback>{person.name.charAt(0)}</AvatarFallback></Avatar>
                      <div className="flex-1 min-w-0"><p className="font-semibold text-foreground truncate">{person.name}</p><p className="text-xs text-muted-foreground">{person.department}</p></div>
                      <div className="text-right"><p className="text-sm font-medium text-pink-500">{person.date}</p><p className="text-xs text-muted-foreground">🎂</p></div>
                    </div>
                  ))}
                </div>
              </ScrollArea>
            </TabsContent>
            <TabsContent value="anniversaries" className="mt-0">
              <ScrollArea className="h-[calc(70vh-140px)]">
                <div className="space-y-3 pr-4">
                  {anniversariesData.people.map((person, index) => (
                    <div key={index} className="flex items-center gap-3 p-3 bg-secondary/30 rounded-xl">
                      <Avatar className="h-12 w-12"><AvatarImage src={person.avatar} alt={person.name} /><AvatarFallback>{person.name.charAt(0)}</AvatarFallback></Avatar>
                      <div className="flex-1 min-w-0"><p className="font-semibold text-foreground truncate">{person.name}</p><p className="text-xs text-muted-foreground">{person.department}</p></div>
                      <div className="text-right"><p className="text-sm font-medium text-primary">{person.date}</p><p className="text-xs text-muted-foreground">{person.years} {person.years === 1 ? 'año' : 'años'}</p></div>
                    </div>
                  ))}
                </div>
              </ScrollArea>
            </TabsContent>
          </Tabs>
        </SheetContent>
      </Sheet>
    </>
  );
}
