

## Plan: Quitar "Perfil" del BottomNav y acceder desde el header

### Cambios

1. **`src/components/BottomNav.tsx`**: Eliminar el tab "profile" del array `tabs` (queda en 5: Inicio, Docs, Evaluar, Social, Cursos).

2. **`src/components/AppHeader.tsx`**: Recibir un nuevo prop `onProfileClick` y conectar el botón del avatar (User) existente para que al presionarlo cambie al tab "profile". Esto mantiene el acceso a Perfil siempre visible desde el header.

3. **`src/pages/Index.tsx`**: Pasar `onProfileClick={() => setActiveTab("profile")}` al componente `AppHeader`. El case "profile" en `renderScreen` ya existe, solo se conecta el header.

### Resultado
- BottomNav con 5 tabs (best practice)
- Perfil accesible desde el ícono de avatar en el header (esquina superior derecha)

