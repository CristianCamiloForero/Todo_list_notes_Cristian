# 🎨 Guía de Diseño

## Paleta de Colores

### Colores Principales
- **Fondo principal**: `bg-gradient-to-br from-slate-50 to-slate-100`
- **Botón primario**: `bg-blue-600` / `hover:bg-blue-700`
- **Texto principal**: `text-slate-800`
- **Texto secundario**: `text-slate-600`

### Estados de Notas
- **Completada**: 
  - Badge: `bg-green-100 text-green-800`
  - Icono: ✓
- **Pendiente**: 
  - Badge: `bg-yellow-100 text-yellow-800`
  - Icono: ○

### Acciones
- **Editar**: `bg-blue-50 hover:bg-blue-100 text-blue-700`
- **Eliminar**: `bg-red-50 hover:bg-red-100 text-red-700`

## Tipografía

- **Títulos principales**: `text-4xl font-bold`
- **Títulos de notas**: `text-xl font-bold`
- **Texto normal**: `text-base`
- **Texto pequeño**: `text-xs` o `text-sm`

## Espaciado y Layout

### Contenedor Principal
```css
max-w-6xl mx-auto px-4 py-8
```

### Grid de Notas
```css
grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6
```
- **Móvil**: 1 columna
- **Tablet**: 2 columnas
- **Desktop**: 3 columnas

### Tarjetas
```css
rounded-xl shadow-md hover:shadow-xl p-6
```

## Componentes y Sus Estilos

### NotaCard
- **Contenedor**: Fondo blanco, bordes redondeados, sombra
- **Hover**: Sombra aumenta, se eleva ligeramente
- **Estados visuales**: Badge de color según estado
- **Botones**: Dos botones (editar/eliminar) con colores distintivos

### NotaForm
- **Contenedor**: Fondo blanco, bordes redondeados
- **Inputs**: Bordes sutiles, focus con anillo azul
- **Textarea**: 6 filas, redimensionable
- **Checkbox**: Estilo custom con colores del tema

### FilterButtons
- **Activo**: Fondo azul, texto blanco, sombra, escala aumentada
- **Inactivo**: Fondo blanco, texto gris, sombra sutil
- **Hover**: Fondo gris claro

### Header
- **Título**: Grande, negrita, con emoji 📝
- **Subtítulo**: Texto gris, descripción breve
- **Botón nueva nota**: Destacado, esquina superior derecha

## Animaciones

### Fade In
```javascript
keyframes: {
  fadeIn: {
    '0%': { opacity: '0', transform: 'translateY(-10px)' },
    '100%': { opacity: '1', transform: 'translateY(0)' },
  },
}
```
Usado en: Aparición del formulario

### Hover Effects
- **Tarjetas**: `transform hover:-translate-y-1`
- **Botones**: `transition-all hover:shadow-xl hover:scale-105`

### Loading Spinner
```css
animate-spin rounded-full h-12 w-12 border-4 border-blue-600 border-t-transparent
```

## Breakpoints Responsivos

```javascript
// Tailwind defaults
sm: '640px'   // Tablet pequeña
md: '768px'   // Tablet
lg: '1024px'  // Desktop
xl: '1280px'  // Desktop grande
```

## Iconos y Emojis

### En el UI
- 📝 - Logo/título de la app
- ✓ - Notas completadas
- ○ - Notas pendientes
- ✏️ - Editar
- 🗑️ - Eliminar
- + - Nueva nota
- ✕ - Cerrar
- 📋 - Todas las notas
- 📭 - Sin notas (estado vacío)
- ✨ - Nueva nota (formulario)
- 💾 - Guardar

## Estados de la UI

### Loading
```jsx
<div className="flex justify-center items-center py-20">
  <div className="animate-spin rounded-full h-12 w-12 border-4 
                  border-blue-600 border-t-transparent"></div>
</div>
```

### Empty State
```jsx
<div className="text-center py-20">
  <div className="text-6xl mb-4">📭</div>
  <p className="text-xl text-slate-600">No hay notas todavía</p>
  <p className="text-slate-500 mt-2">
    Crea tu primera nota para comenzar
  </p>
</div>
```

### Error State
Actualmente en consola, puedes agregar:
```jsx
<div className="bg-red-50 border border-red-200 text-red-700 
                px-4 py-3 rounded-lg">
  Error al cargar notas
</div>
```

## Mejores Prácticas Implementadas

✅ **Accesibilidad**
- Labels en todos los inputs
- Contraste de colores adecuado
- Feedback visual claro

✅ **UX**
- Loading states
- Confirmación antes de eliminar
- Validación de formularios
- Estados vacíos informativos

✅ **Responsive**
- Grid adaptativo
- Espaciado flexible
- Botones y texto legibles en móvil

✅ **Performance**
- Animaciones con GPU (transform, opacity)
- Lazy rendering con conditional rendering
- Build optimizado con Vite

## Personalización Rápida

### Cambiar color primario
En `tailwind.config.js`:
```javascript
theme: {
  extend: {
    colors: {
      primary: {
        50: '#...',
        100: '#...',
        // ... hasta 900
      }
    }
  }
}
```

Luego reemplaza `blue-600` por `primary-600` en los componentes.

### Cambiar fuente
En `index.css`:
```css
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap');

body {
  font-family: 'Inter', sans-serif;
}
```

### Agregar modo oscuro
Tailwind tiene soporte nativo:
```javascript
// tailwind.config.js
darkMode: 'class',

// Luego usa:
className="bg-white dark:bg-slate-800"
```

## Estructura Visual

```
┌─────────────────────────────────────────────┐
│  📝 Mis Notas              [+ Nueva Nota]   │
│  Organiza tus ideas...                      │
│                                             │
│  [📋 Todas] [○ Pendientes] [✓ Completadas] │
├─────────────────────────────────────────────┤
│                                             │
│  ┌──────────┐  ┌──────────┐  ┌──────────┐ │
│  │ Nota 1   │  │ Nota 2   │  │ Nota 3   │ │
│  │          │  │          │  │          │ │
│  │ [Editar] │  │ [Editar] │  │ [Editar] │ │
│  └──────────┘  └──────────┘  └──────────┘ │
│                                             │
└─────────────────────────────────────────────┘
```

---

**Diseño minimalista, moderno y funcional** 🎨
