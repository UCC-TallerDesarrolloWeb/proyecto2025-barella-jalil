# PROCRAFT PARTS — Accesorios y Proyectos a tu Medida

**Autores:** Máximo Barella · Carola Jalil
**Materia:** Taller de Desarrollo Web — UCC (2025)

**Sitio Web:**
[https://ucc-tallerdesarrolloweb.github.io/proyecto2025-barella-jalil/](https://ucc-tallerdesarrolloweb.github.io/proyecto2025-barella-jalil/)


---

## Índice

* [Descripción](#descripción)
* [Contenido del Sitio](#contenido-del-sitio)
* [Stack Tecnológico](#stack-tecnológico)
* [Estructura del Repositorio](#estructura-del-repositorio)
* [Cómo Ejecutar](#cómo-ejecutar)
* [Ruteo y Componentes (2ª entrega)](#ruteo-y-componentes-2ª-entrega)
* [Validaciones y Accesibilidad](#validaciones-y-accesibilidad)
* [Buenas Prácticas y Calidad](#buenas-prácticas-y-calidad)
* [Autores](#autores)
* [Información Académica](#información-académica)

---

## Descripción

**PROCRAFT PARTS** es un sitio orientado a servicios de instalación profesional, asesoramiento técnico e importación de accesorios para autos y pickups.

* **1ª entrega:** sitio multi-página desarrollado con **HTML5, CSS3 y JavaScript (ES6)**.
* **2ª entrega:** migración progresiva a **React + Vite**, con ruteo, componentes reutilizables y render dinámico.

**Objetivo general:** aplicar buenas prácticas de frontend para un sitio responsive, accesible y con identidad visual definida (azul + naranja).

---

## Contenido del Sitio

### Páginas principales

* **Inicio (`index.html`)**: hero, llamada a la acción y accesos rápidos.
* **Quiénes Somos (`quienes.html`)**: historia, enfoque técnico y propuesta de valor.
* **Servicios (`servicios.html`)**: tarjetas de Instalación, Asesoramiento e Importación.
* **Proyectos (`proyectos.html`)**: galería responsive con imágenes y video.
* **Asesoramiento (`asesoramiento.html`)**: formulario con validación en cliente.

### Detalle de servicios

* `servicio-instalacion.html`
* `servicio-asesoramiento.html`
* `servicio-importacion.html`

> En la **2ª entrega**, estas vistas se reimplementan como rutas de React manteniendo el contenido funcional.

---

## Stack Tecnológico

| Tecnología         | Uso                                     |
| ------------------ | --------------------------------------- |
| HTML5              | Estructura semántica                    |
| CSS3               | Layout (Flexbox / Grid) y estilos       |
| JavaScript ES6     | Interactividad y validaciones           |
| React + Vite       | SPA, HMR, build y preview               |
| React Router DOM   | Ruteo y layouts anidados                |
| SASS / SCSS        | Organización y reutilización de estilos |
| Git & GitHub Pages | Versionado y despliegue                 |
| Google Fonts       | Montserrat · Bebas Neue                 |

---

## Estructura del Repositorio

```text
proyecto2025-barella-jalil/
├── primera-entrega/          # 1ª entrega – sitio estático
│   ├── css/                  # Estilos CSS
│   ├── js/                   # JavaScript (validaciones e interactividad)
│   ├── mockup/                # Wireframes/mockups
│   ├── sketch/                # Bocetos a mano
│   ├── index.html             # Página principal
│   ├── quienes.html           # Quiénes Somos
│   ├── servicios.html         # Servicios
│   ├── servicio-instalacion.html # Detalle Instalación
│   ├── servicio-asesoramiento.html # Detalle Asesoramiento
│   ├── servicio-importacion.html # Detalle Importación
│   ├── proyectos.html         # Proyectos
│   └── asesoramiento.html     # Formulario de asesoramiento
├── README.md                 # Documentación del proyecto
└── frontend/                 # 2ª entrega – SPA con React + Vite
    ├── index.html            # Entry point de Vite
    ├── package.json
    ├── package-lock.json
    ├── vite.config.js
    ├── eslint.config.js
    ├── public/
    │   ├── imagenes/         # Assets públicos (compartidos con la 1ª entrega)
    │   └── videos/
    └── src/
        ├── main.jsx
        ├── App.jsx
        ├── assets/
        │   └── iconos/       # Íconos PNG / SVG
        ├── components/       # Componentes reutilizables
        ├── pages/            # Vistas (Home, Servicios, Proyectos, etc.)
        └── styles/           # SCSS (_variables, _layout, _components, etc.)
```

## Cómo Ejecutar

### 1. Primera entrega (estático)

* Abrir `primera-entrega/index.html` en el navegador
* O usar Live Server

### 2. Segunda entrega (React + Vite)

```bash
cd frontend
npm install
npm run dev
```

---

## Ruteo y Componentes (2ª entrega)

### Rutas principales

* `/` → Home
* `/quienes` → Quiénes Somos
* `/servicios` → Servicios
* `/servicios/instalacion`
* `/servicios/asesoramiento`
* `/servicios/importacion`
* `/proyectos`
* `/asesoramiento`

### Hooks utilizados

* `useState`
* `useEffect`
* `useNavigate`

---

## Validaciones y Accesibilidad

* Validación en tiempo real en formularios
* Uso de `label` asociado a cada input
* Mensajes de error accesibles
* Imágenes con `alt` descriptivo
* Semántica HTML correcta (`header`, `nav`, `main`, `section`, `footer`)

---

## Buenas Prácticas y Calidad

* Sin estilos en línea
* Sin imports innecesarios
* SCSS modularizado (`_variables`, `_layout`, `_components`)
* Código sin warnings críticos
* Uso de JsDoc en funciones relevantes

---

## Autores

| Nombre         | Rol                                 |
| -------------- | ----------------------------------- |
| Máximo Barella | Desarrollo Frontend                 |
| Carola Jalil   | Diseño visual · Desarrollo Frontend |

---

## Información Académica

* **Universidad:** Universidad Católica de Córdoba
* **Materia:** Taller de Desarrollo Web
* **Año:** 2025
* **Tipo:** Proyecto (1ª y 2ª entrega)
