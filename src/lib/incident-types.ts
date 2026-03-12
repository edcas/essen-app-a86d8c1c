export type DateMode = "single" | "range";
export type DateRestriction = "future" | "past" | "any";

export interface IncidentTypeConfig {
  id: string;
  name: string;
  formTitle: string;
  helpText?: string;
  dateMode: DateMode;
  dateRestriction: DateRestriction;
  fields: {
    amount?: boolean;
    quantity?: boolean;
    time?: boolean;
    fileUpload?: boolean;
  };
  labels?: {
    amount?: string;
    quantity?: string;
    time?: string;
    fileUpload?: string;
    dateStart?: string;
    dateEnd?: string;
    dateSingle?: string;
  };
  icon: string;
  accentColor: string;
}

export const incidentTypes: IncidentTypeConfig[] = [
  { id: "vacaciones", name: "Vacaciones", formTitle: "Solicitar Vacaciones", helpText: "Selecciona el rango de fechas deseado. Tu solicitud será revisada por tu jefe directo en un plazo de 48 horas hábiles.", dateMode: "range", dateRestriction: "future", fields: {}, icon: "Calendar", accentColor: "primary" },
  { id: "correccion-asistencia", name: "Corrección de asistencia", formTitle: "Corregir Asistencia", helpText: "Indica la fecha y hora correcta de tu registro.", dateMode: "single", dateRestriction: "past", fields: { time: true, fileUpload: true }, labels: { time: "Hora correcta de registro" }, icon: "FileEdit", accentColor: "primary" },
  { id: "home-office", name: "Home Office", formTitle: "Solicitar Home Office", helpText: "Solicita trabajo remoto.", dateMode: "range", dateRestriction: "future", fields: {}, icon: "Home", accentColor: "primary" },
  { id: "incapacidad", name: "Incapacidad", formTitle: "Reportar Incapacidad", helpText: "Adjunta el documento del IMSS.", dateMode: "range", dateRestriction: "past", fields: { fileUpload: true }, labels: { fileUpload: "Documento de incapacidad" }, icon: "FileText", accentColor: "destructive" },
  { id: "falta-justificada", name: "Falta justificada", formTitle: "Justificar Falta", helpText: "Describe el motivo de la falta.", dateMode: "single", dateRestriction: "past", fields: { fileUpload: true }, labels: { fileUpload: "Evidencia (opcional)" }, icon: "FileText", accentColor: "warning" },
  { id: "horas-extra", name: "Horas extra", formTitle: "Reportar Horas Extra", helpText: "Indica la fecha y cantidad de horas.", dateMode: "single", dateRestriction: "past", fields: { time: true, fileUpload: true }, labels: { time: "Horas extra trabajadas", fileUpload: "Autorización del supervisor" }, icon: "Clock", accentColor: "primary" },
  { id: "permiso-salida", name: "Permiso de salida", formTitle: "Solicitar Permiso de Salida", helpText: "Indica la fecha y hora de tu permiso.", dateMode: "single", dateRestriction: "future", fields: { time: true }, labels: { time: "Tiempo estimado del permiso" }, icon: "Clock", accentColor: "warning" },
  { id: "reembolso", name: "Reembolso de gastos", formTitle: "Solicitar Reembolso", helpText: "Adjunta los comprobantes fiscales.", dateMode: "single", dateRestriction: "past", fields: { amount: true, fileUpload: true }, labels: { amount: "Monto total a reembolsar", fileUpload: "Comprobantes fiscales" }, icon: "DollarSign", accentColor: "success" },
  { id: "devolucion-viaticos", name: "Devolución de viáticos", formTitle: "Solicitar Devolución de Viáticos", helpText: "Cargue los días y evidencia del gasto.", dateMode: "range", dateRestriction: "past", fields: { amount: true, fileUpload: true }, labels: { amount: "Monto total de viáticos", fileUpload: "Evidencia de gasto y facturas" }, icon: "Receipt", accentColor: "success" },
];

export function getIncidentType(id: string): IncidentTypeConfig | undefined {
  return incidentTypes.find((t) => t.id === id);
}
