# 📝 Task Manager SPA — React + TypeScript + Zustand + PWA

## 🎯 Descripción

Aplicación completa de gestión de tareas, desarrollada como prueba técnica.  
Incluye funcionalidades avanzadas como drag & drop, filtros, PWA offline, export/import, dark mode, y más.

---

## 🚀 Tecnologías utilizadas

- ⚛️ React 19
- 🛠️ TypeScript estricto
- ⚡ Vite
- 🌊 Zustand (estado global)
- 🔍 React Hook Form + Zod (validación)
- 📦 React Query (opcional, para futuras integraciones API)
- 🎨 Tailwind CSS (design system consistente)
- 🧩 Dnd-kit (drag & drop)
- 📈 Chart.js (dashboard de métricas)
- 🌙 Modo oscuro / claro persistente
- ✅ Testing: Jest + React Testing Library (por agregar)
- ⚙️ Vite PWA plugin (PWA + offline)
- 📁 Zustand persist (localStorage)

---

## 🏛️ Arquitectura

```
src/
├── App.tsx
├── main.tsx
├── features/
│   ├── tasks/
│   │   ├── TaskForm.tsx
│   │   ├── TaskBoard.tsx
│   │   ├── SortableTask.tsx
│   │   ├── FilterBar.tsx
│   │   ├── TaskExportImport.tsx
│   ├── dashboard/
│   │   ├── Dashboard.tsx
│   ├── theme/
│   │   ├── ThemeToggle.tsx
├── store/
│   ├── useTaskStore.ts
│   ├── useFilterStore.ts
│   ├── useThemeStore.ts
├── types/
│   ├── task.ts
└── index.css
```

## 🧩 Features implementadas

✅ Dashboard con métricas (Chart.js)  
✅ CRUD completo de tareas  
✅ Drag & Drop para reordenar  
✅ Filtros avanzados (fecha, prioridad, categoría, estado)  
✅ Modo oscuro / claro con persistencia  
✅ Búsqueda en tiempo real con debounce  
✅ Toast de notificaciones  
✅ Export / Import de tareas (JSON)  
✅ PWA (funciona offline, instalable en desktop/móvil)  
✅ Accesibilidad WCAG 2.1 AA  
✅ Bundle optimization y code splitting (via Vite)

---

## 🔄 Decisiones técnicas

### Estado global: Zustand

- Elegí Zustand por su simplicidad y performance sobre Context o Redux.
- Uso persist para mantener el estado consistente incluso en React 19.

### Drag & drop: Dnd-kit

- Elegí Dnd-kit por su flexibilidad y soporte completo para React 19 concurrent mode.

### Validación: React Hook Form + Zod

- Validación declarativa y tipos automáticos con Zod.

### UI: Tailwind CSS

- Sistema de diseño consistente y optimizado para rendimiento.

### PWA: Vite PWA plugin

- Manejo de manifest + Service Worker (Workbox) + offline-first.

---

## 🚀 Cómo ejecutar

### Desarrollo

```bash
npm install
npm run dev


Build + preview

npm run build
npm run preview
