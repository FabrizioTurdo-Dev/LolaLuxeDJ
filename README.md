# LOLA LUXE — Electronic Press Kit

**DJ & Productora de Música Electrónica**  
Monte Grande, Buenos Aires, Argentina

---

## Stack Técnico

- **HTML5** semántico (sin frameworks, sin build step)
- **CSS3** con Custom Properties (variables) — Mobile First
- **JavaScript ES6+** vanilla (carga diferida con `defer`)
- **Google Fonts**: Bebas Neue + DM Sans + Share Tech Mono
- Sin dependencias npm en producción

---

## Estructura de Archivos

```
/lolaluxe_epk/
│
├── /assets/
│   ├── /fonts/              # Fuentes personalizadas (si se descargan localmente)
│   ├── /img/
│   │   ├── lolaluxe-hero.jpg        # Imagen hero (reemplazar con foto real)
│   │   ├── lolaluxe-bio.jpg         # Foto de bio (reemplazar con foto real)
│   │   ├── social-icons.svg         # Iconos de redes
│   │   └── /downloads/
│   │       ├── lolaluxe-epk.pdf          # EPK completo para descarga
│   │       ├── lolaluxe-photos-hires.zip # Pack de fotos Hi-Res
│   │       ├── lolaluxe-logos.zip        # Pack de logos y SVGs
│   │       └── lolaluxe-rider-tecnico.pdf # Rider técnico
│   └── /video/
│       └── hero-loop.mp4    # Video loop para el Hero (opcional)
│
├── /css/
│   ├── core-reset.css       # Normalize + reset base
│   └── style.css            # Todos los estilos del proyecto
│
├── /js/
│   └── main.js              # Toda la lógica JS
│
├── index.html               # SPA principal
├── README.md                # Este archivo
└── .gitignore
```

---

## Cómo Usar

### Opción 1 — Sin servidor (abrir directo)

1. Clonar o descomprimir la carpeta del proyecto
2. Abrir `index.html` en cualquier navegador moderno
3. No requiere servidor local para funcionar

### Opción 2 — Con servidor local (recomendado para desarrollo)

```bash
# Python 3
python -m http.server 3000

# Node.js con npx
npx serve .

# Vite (para migración futura)
npm create vite@latest
```

---

## Personalización

### Colores (en `css/style.css`)

Editar las variables CSS al inicio del archivo:

```css
:root {
  --accent-pink: #FF1493;   /* Color neón principal */
  --bg-dark: #000000;       /* Fondo negro */
  --text-light: #F5F5F5;    /* Texto claro */
}
```

### Contenido a Reemplazar

| Elemento | Ubicación | Acción |
|---|---|---|
| Foto Hero | `assets/img/lolaluxe-hero.jpg` | Reemplazar con foto real |
| Foto Bio | `assets/img/lolaluxe-bio.jpg` | Reemplazar con foto real |
| Video loop | `assets/video/hero-loop.mp4` | Agregar video real o eliminar `<video>` |
| SoundCloud URL | `index.html` línea del iframe | Actualizar con URL real del perfil |
| YouTube embeds | `index.html` sección video-grid | Reemplazar IDs de video |
| WhatsApp | `index.html` botón WhatsApp | Reemplazar `549XXXXXXXXXX` |
| Email | `index.html` sección contacto | Actualizar emails reales |
| Archivos descarga | `assets/img/downloads/` | Agregar archivos reales |

### Tipografías

Cambiar fuentes en las variables CSS:

```css
--font-display: 'Bebas Neue', sans-serif;  /* Títulos */
--font-mono: 'Share Tech Mono', monospace; /* Monoespaciada */
--font-body: 'DM Sans', sans-serif;        /* Cuerpo */
```

---

## Links de la Artista

| Plataforma | URL |
|---|---|
| SoundCloud | https://on.soundcloud.com/Z0oMfLm0AHVn3lcYQD |
| YouTube | https://www.youtube.com/@Lolaluxe-7 |
| Instagram | https://www.instagram.com/Lola_luxedj |

---

## Migración a React/Vite

El código está estructurado para facilitar la migración:

- Cada módulo en `main.js` es una función pura → custom hook de React
- Las variables CSS se mantienen igual en cualquier framework
- Los componentes HTML pueden separarse 1:1 en `.jsx`

```bash
# Crear proyecto Vite
npm create vite@latest lolaluxe-react -- --template react
```

---

## SEO Checklist

- [x] `<title>` descriptivo
- [x] `<meta description>` con keywords
- [x] Open Graph tags (og:title, og:image, etc.)
- [x] Twitter Card
- [x] `<link rel="canonical">`
- [x] Imágenes con atributos `alt` descriptivos
- [x] Landmarks ARIA (`role="main"`, `role="navigation"`, etc.)
- [x] Carga diferida de imágenes (`loading="lazy"`)

---

## Performance

- Scripts cargados con `defer` (no bloquean el HTML)
- Imágenes con `loading="lazy"`
- Fuentes de Google con `preconnect`
- Video con `poster` como fallback
- Sin dependencias npm en producción

---

## Accesibilidad

- Estructura semántica completa (header, nav, main, section, footer)
- Atributos `aria-label` en elementos interactivos
- Focus visible para navegación por teclado
- Respeta `prefers-reduced-motion`
- Cursor personalizado solo activo en dispositivos con hover

---

*EPK generado para Lola Luxe — Techno & Melodic Journey*  
*Monte Grande, Buenos Aires, Argentina*
