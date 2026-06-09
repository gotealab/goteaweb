# GOTEA LAB | Laboratorio Textil & Moda de Autor

> **Cuestionando patrones de moda hegemónica y estereotipos de género. Confección a mano y diseño de autor desde Concepción, Chile.**

Este repositorio contiene el código fuente para el sitio web oficial de **GOTEA LAB** ([gotea.cl](http://gotea.cl)), una plataforma digital diseñada con estética brutalista y cyber-industrial que refleja el carácter disruptivo y artesanal de la marca.

---

## 🖤 Sobre la Marca

Creado por **Arrayán Lecaros**, **GOTEA** es un laboratorio textil que busca romper límites. Explora la confección manual respetando el oficio tradicional, la identidad individual y la sostenibilidad a través de la transformación de prendas.

---

## 🛠️ Tecnologías y Recursos Utilizados

*   **Estructura**: HTML5 semántico.
*   **Estilos**: CSS3 con diseño adaptivo (Mobile-First) y variables nativas para la paleta de colores.
*   **Interactividad**: Vanilla JavaScript (optimizado con `IntersectionObserver` para la carga y reproducción inteligente de videos).
*   **Iconografía**: [FontAwesome v6](https://fontawesome.com).
*   **Tipografía**:
    *   *Locales*: `Calvera`, `Darkhorn`, `DeathMohawk`, `VampireWars` (cargadas desde el servidor).
    *   *Google Fonts*: `Outfit` para textos corporales.

---

## 📁 Estructura del Proyecto

```bash
goteaweb/
├── assets/                     # Recursos estáticos del sitio
│   ├── docs/                   # Documentación y catálogos (Criaturas.pdf)
│   ├── fonts/                  # Fuentes tipográficas personalizadas
│   ├── images/                 # Logotipos y texturas de fondo
│   └── videos/                 # Videos promocionales verticales y de portada
├── contenidoweb/               # Respaldo de recursos originales y assets del proyecto
├── .antigravityrules           # Reglas de automatización para asistentes de IA
├── index.html                  # Estructura principal de la landing page
├── script.js                   # Lógica e interacciones del lado del cliente
├── style.css                   # Hoja de estilos principal y responsive design
├── vercel.json                 # Configuración de rendimiento y caché para Vercel
└── README.md                   # Documentación del proyecto
```

---

## 🚀 Flujo de Despliegue (GitHub + Vercel)

El proyecto está configurado con integración continua en **Vercel**:
1. Cualquier cambio realizado en los archivos locales se sube a la rama `main` en GitHub.
2. Vercel detecta automáticamente el commit, optimiza los recursos estáticos (según las reglas en `vercel.json`) y despliega el sitio a producción en **gotea.cl**.

---

## 👥 Créditos del Equipo

*   **Diseño de Vestuario & Confección**: [Arrayán Lecaros / @meduhollow](https://instagram.com/meduhollow)
*   **Modelo**: Velo Negro
*   **Video Aéreo**: Sebastián Ganchala
*   **Dirección de Fotografía**: Loreto S. Villarroel
