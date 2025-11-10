⚙️ PROCRAFT PARTS — Accesorios y Proyectos a tu Medida

Autores: Máximo Barella · Carola Jalil
Materia: Taller de Desarrollo Web — UCC (2025)
Sitio Web (1ª entrega): https://ucc-tallerdesarrolloweb.github.io/proyecto2025-barella-jalil/

SPA (2ª entrega con React + Vite): TODO: (si publican el frontend como SPA, colocar aquí el enlace)

📋 Índice

Descripción

Contenido del Sitio

Stack Tecnológico

Estructura del Repositorio

Cómo Ejecutar

Ruteo y Componentes (2ª entrega)

Validaciones y Accesibilidad

Buenas Prácticas y Calidad

Autores

Información Académica

🧾 Descripción

PROCRAFT PARTS es un sitio moderno para servicios de instalación profesional, asesoramiento e importación de accesorios para autos y pickups.

1ª entrega: Sitio multi-página con HTML5, CSS3 y JS (ES6).

2ª entrega: Migración progresiva a React + Vite, React Router, Hooks, estado persistente en localStorage y render dinámico desde JSON local.

Objetivo general: aplicar buenas prácticas de frontend para un sitio responsive, accesible, con identidad visual (azul + naranja) y código limpio.

🧱 Contenido del Sitio

Inicio (index.html): hero, llamada a la acción, acceso rápido a secciones.

Quiénes Somos (quienes.html): historia, propuesta de valor y enfoque técnico.

Servicios (servicios.html): tarjetas de Instalación, Asesoramiento e Importación.

Detalle: servicio-instalacion.html, servicio-asesoramiento.html, servicio-importacion.html.

Proyectos (proyectos.html): galería responsive (masonry) con imágenes y video.

Asesoramiento (asesoramiento.html): formulario con validación en cliente.

En la 2ª entrega estas vistas se reimplementan como rutas de React manteniendo el contenido funcional.

💻 Stack Tecnológico
Tecnología	Uso
HTML5 / CSS3	Semántica, layout (Flex/Grid), UI responsive
JavaScript ES6	Interactividad, validación de formularios
React 18 + Vite	SPA con HMR, build y preview (2ª entrega)
React Router DOM v6	Ruteo, Outlet para layouts anidados
Hooks	useState, useEffect, useContext, useNavigate
SASS/SCSS	Organización de estilos; @use y @forward
localStorage	Persistencia (ej. carrito / preferencias)
Git & GitHub Pages	Versionado y despliegue
Google Fonts	Montserrat · Bebas Neue
Assets	Íconos SVG, imágenes responsive, video (mp4/webm)
📂 Estructura del Repositorio

Mantiene la 1ª entrega y suma el frontend React para la 2ª.

proyecto2025-barella-jalil/
├── css/                 # estilos.css (1ª entrega)
├── imagenes/            # imágenes optimizadas (logos, iconos, proyectos, etc.)
├── js/
│   └── scripts.js       # interacciones/validaciones (1ª entrega)
├── videos/
│   ├── luz.mp4
│   └── luz.webm
├── index.html
├── quienes.html
├── servicios.html
├── servicio-instalacion.html
├── servicio-asesoramiento.html
├── servicio-importacion.html
├── proyectos.html
├── asesoramiento.html
├── README.md
├── .gitignore
└── frontend/            # 2ª entrega: React + Vite
    ├── index.html
    ├── vite.config.js   
    ├── package.json
    ├── package-lock.json
    ├── App.jsx
    ├── main.jsx
    ├── .gitignore
    ├── eslint.config.js
    ├── index.html
    ├── README.md
    ├── public/ imagenes,videos
    └── src/
        ├── main.jsx
        ├── app.jsx
        ├── assets/ #iconos
        ├── components/  # Boton, Footer, Navbar, RootLayout.
        ├── pages/       # Home, Servicios, Proyectos, Quienes, Asesoramiento, ServiciosImportacion, ServiciosInstalacion
        ├── styles/      # _variables.scss, _main.scss, _layout.scss, _components.scss, _base.scss, _pages.scss, 

🛠️ Cómo Ejecutar
1) 1ª entrega (estático)

Abrir index.html en el navegador o usar Live Server.

2) 2ª entrega (React + Vite)
cd frontend
npm install
npm i -D sass

# desarrollo
npm run dev   # abre la URL que muestra Vite

# build de producción
npm run build

# previsualizar build
npm run preview


vite.config.js (alias recomendado):

import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

export default defineConfig({
  plugins: [react()],
  resolve: { alias: { '@': path.resolve(__dirname, './src') } }
})


Deploy SPA: si publican la carpeta frontend en GitHub Pages, recuerden configurar base en Vite si el repo no es user/ org page.
Opcional: usar gh-pages o GitHub Actions para deploy automático.

🧭 Ruteo y Componentes (2ª entrega)

Rutas principales (React Router v6):

/ → Home (hero + CTA)

/quienes → Quiénes Somos

/servicios → Servicios (lista)

/servicios/instalacion

/servicios/asesoramiento

/servicios/importacion

/proyectos → Proyectos (galería)

/asesoramiento → Formulario (validación en tiempo real)

Hooks y estado:

useState + useEffect para formularios y carga de datos.

useContext para carrito o preferencias de tema (persistido en localStorage).

Datos de catálogo desde src/data/catalogo.json con fetch o import estático.

Componentes genéricos reutilizables:

Button, Card, Input (con props para variante/estado/error).

Header + Footer comunes con <Outlet /> en layout.

✅ Validaciones y Accesibilidad

Formulario de Asesoramiento (HTML/React):

Validación en tiempo real con onChange.

Mensajes de error accesibles (usar aria-live="polite" y aria-invalid).

label asociado a cada input (for/id).

maxlength, placeholder, required y sanitización básica en JS.

General:

Imágenes con alt descriptivo.

Contraste suficiente, foco visible, orden de tabulación correcto.

Semántica: header/nav/main/section/article/footer.

🧪 Buenas Prácticas y Calidad

CSS/SCSS

Migrar @import → @use / @forward.

Variables centralizadas: styles/_variables.scss.

Convención BEM y layout con Flex/Grid.

JavaScript/React

Funciones flecha y const/let según corresponda.

Sin funciones muertas ni warnings de consola.

JsDoc en funciones clave:

/**
 * Valida un campo de texto (no vacío y longitud mínima).
 * @param {string} value - texto a validar
 * @param {number} min - longitud mínima
 * @returns {{ok: boolean, error?: string}}
 */
export const validateText = (value, min = 3) => { /* ... */ }


👥 Autores
Nombre	Rol
Máximo Barella	Desarrollo Frontend
Carola Jalil	Diseño visual · Desarrollo Frontend
🏫 Información Académica

Universidad: Universidad Católica de Córdoba (UCC)

Materia: Taller de Desarrollo Web

Año: 2025

Tipo: Proyecto (Parcial 1 y 2)