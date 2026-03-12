

## Plan: Integrar Beepayroll App en ESSEN App

### Contexto

El proyecto actual **ESSEN** tiene 5 tabs: Inicio, Documentos, Evaluaciones, Social, Capacitación.

El proyecto **[Beepayroll App](/projects/15cec1c7-8286-4209-ac37-c73fbae5a661)** tiene 14 páginas con rutas independientes: Check-in/Asistencia, Nómina, Avisos, Perfil, Bienestar, Turnos, Directorio, Vacaciones, Datos personales/bancarios, Seguros, Solicitudes, Ayuda.

### Estrategia recomendada

La forma mas rapida es **copiar los componentes y páginas de Beepayroll al proyecto ESSEN**, adaptando la navegacion y el design system.

### Cambios principales

1. **Copiar ~25 archivos** del proyecto Beepayroll:
   - 14 páginas (`Asistencia`, `Nomina`, `Avisos`, `Perfil`, `Bienestar`, `MisTurnos`, `Directorio`, `Vacaciones`, `DatosPersonales`, `DatosBancarios`, `MisSeguros`, `NuevaSolicitud`, `Ayuda`, `AvisoDetalle`)
   - 12 componentes (`dashboard/*`, `checkin/*`, `nomina/*`, `layout/AppLayout`)

2. **Adaptar design system**: Reemplazar colores Beepayroll (`#1854d1` azul, Inter font) por el tema ESSEN (purple `#763df2`, Nunito Sans). Ajustar clases como `card-glass`, `bg-gradient-brand` para usar las variables CSS de ESSEN.

3. **Unificar navegacion**: Expandir el `BottomNav` actual de 5 tabs. Las páginas de Beepayroll se accederán como sub-páginas desde el Home (Quick Actions) y desde el Perfil, manteniendo la estructura de tabs de ESSEN.

4. **Registrar rutas** en `App.tsx`: Agregar las 14 rutas nuevas del Beepayroll.

5. **Integrar el HomeScreen**: Combinar el dashboard de check-in de Beepayroll (reloj, botón de entrada/salida, stats) con el HomeScreen actual de ESSEN (pendientes, avisos).

### Resultado esperado

Una sola app con la marca ESSEN que incluya:
- Check-in/asistencia, nómina, turnos, vacaciones (de Beepayroll)
- Documentos, evaluaciones, social, capacitación (de ESSEN actual)
- Perfil unificado con datos personales, bancarios, seguros

