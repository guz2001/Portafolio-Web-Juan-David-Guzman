# Portafolio — Juan David Guzmán Castro

Portafolio profesional construido con **Astro 7 + React 19**. Sitio estático,
tema galáctico, y todo el contenido centralizado en una capa de datos para que
añadir un proyecto no obligue a tocar HTML.

---

## Arranque rápido

```bash
npm install       # solo la primera vez
npm run dev       # http://localhost:4321 — recarga al guardar
npm run build     # genera dist/ listo para publicar
npm run preview   # sirve dist/ como lo haría el hosting real
```

Requiere **Node 18 o superior** (verificado con Node 22).

---

## Lo que más vas a hacer: añadir un proyecto

Es un solo archivo: **[`src/data/projects.js`](src/data/projects.js)**.

1. Abre el archivo y copia el bloque `PLANTILLA` del final.
2. Pégalo dentro del array `projects`. Si lo pones el primero, sale el primero.
3. Rellena los campos y guarda.

```js
{
  slug: 'monitor-asterisk',            // URL: /proyectos/monitor-asterisk/
  title: 'Monitor de troncales SIP',
  tagline: 'Script de Python que vigila el estado de las troncales',
  description: 'Dos o tres frases: problema, solución y resultado.',
  categories: ['automatizacion', 'infra'],
  stack: ['Python', 'Asterisk', 'Bash'],
  highlights: [
    'Decisión técnica concreta que tomaste y por qué.',
  ],
  links: [
    { label: 'Repositorio', href: 'https://github.com/guz2001/...', icon: 'github' },
  ],
  cover: '',              // '' = portada generada por código
  accent: '320 80% 65%',  // color HSL de la nebulosa
  featured: true,
  year: '2026',
},
```

**Lo que ocurre solo, sin que toques nada más:**

| Efecto | Dónde |
|---|---|
| Aparece la tarjeta en la home | sección Proyectos |
| Se crea la página `/proyectos/<slug>/` | ruta generada en el build |
| Si usas una categoría nueva, nace su botón de filtro | filtros calculados desde los datos |
| Se dibuja una portada de nebulosa con tus iniciales | si `cover` está vacío |
| Entra en el `sitemap.xml` | generado en el build |

### Poner una captura real

Copia la imagen a `public/images/projects/` y escribe la ruta en `cover`:

```js
cover: '/images/projects/monitor-asterisk.png',
```

Formato recomendado: **1280×720 px, WebP o PNG**, menos de 200 KB.

---

## Actualizar el resto del contenido

Todo vive en [`src/data/`](src/data/). Ningún componente contiene texto tuyo.

| Qué quieres cambiar | Archivo |
|---|---|
| Nombre, resumen, teléfono, redes, foto | `src/data/profile.js` |
| Empleos y logros | `src/data/experience.js` |
| Títulos, cursos, certificaciones | `src/data/education.js` |
| Tecnologías y niveles | `src/data/skills.js` |
| Cifras de la franja de estadísticas | `src/data/stats.js` |
| Áreas de especialización | `src/data/expertise.js` |
| Proyectos | `src/data/projects.js` |
| SEO, dominio, menú | `src/config/site.js` |
| Colores, tipografía, espaciado | `src/styles/tokens.css` |

### Poner tu foto

1. Copia la foto a `public/images/perfil.jpg` (cuadrada, mínimo 420×420 px).
2. En `src/data/profile.js`: `photo: '/images/perfil.jpg'`.

Mientras `photo` esté vacío se dibuja un monograma **JG** con anillos orbitales.
Es deliberado: antes eso que la foto de archivo de una persona que no eres.

---

## Publicar

### Opción A — Netlify o Vercel (lo más simple)

Sube el repositorio a GitHub y conéctalo. Detectan Astro solos:

- Comando de build: `npm run build`
- Carpeta de publicación: `dist`

En `src/config/site.js` pon tu dominio final:

```js
url:  'https://tudominio.com',
base: '/',
```

### Opción B — GitHub Pages en un repositorio normal

El sitio queda en `guz2001.github.io/portafolio/`, o sea **en una subcarpeta**.
Hay que decírselo a Astro o todos los enlaces internos apuntarán mal:

```js
// src/config/site.js
url:  'https://guz2001.github.io',
base: '/portafolio/',           // ← con las dos barras
```

Luego crea `.github/workflows/deploy.yml`:

```yaml
name: Desplegar portafolio
on:
  push:
    branches: [main]
permissions:
  contents: read
  pages: write
  id-token: write
jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: 22
          cache: npm
      - run: npm ci
      - run: npm run build
      - uses: actions/upload-pages-artifact@v3
        with:
          path: dist
  deploy:
    needs: build
    runs-on: ubuntu-latest
    environment:
      name: github-pages
    steps:
      - uses: actions/deploy-pages@v4
```

En el repositorio: **Settings → Pages → Source: GitHub Actions**.

> Las rutas internas pasan por `src/utils/url.js`, así que cambiar `base` basta
> para que enlaces, favicon, assets y sitemap se recalculen. Ambos escenarios
> están verificados.

### Activar el formulario de contacto (opcional)

Por defecto la sección de contacto muestra solo canales directos (correo,
WhatsApp, LinkedIn, GitHub), que funcionan siempre. El formulario de la
plantilla original usaba `contact.php` y **no funcionaría**: un hosting
estático no ejecuta PHP.

Si quieres formulario real, crea uno gratis en [Formspree](https://formspree.io)
y pega la URL:

```js
// src/config/site.js
contactFormEndpoint: 'https://formspree.io/f/tu-id',
```

El formulario aparece solo y envía por `fetch` sin recargar la página.

---

## Estructura del proyecto

```
src/
├── data/            CAPA DE DATOS — tu CV como objetos JS
│   ├── profile.js       perfil y contacto
│   ├── experience.js    empleos
│   ├── education.js     formación
│   ├── skills.js        tecnologías y niveles
│   ├── projects.js      ← el que más vas a editar
│   ├── expertise.js     áreas de especialización
│   ├── stats.js         cifras verificables
│   └── index.js         barrel: punto único de entrada
│
├── types/           Contratos JSDoc (autocompletado sin TypeScript)
├── config/          site.js — SEO, dominio, menú
├── utils/           url.js — enlaces que respetan la subcarpeta
│
├── layouts/         BaseLayout.astro — head, SEO, JSON-LD
├── components/
│   ├── layout/      Header (barra lateral), Footer
│   ├── ui/          Icon, SectionHeader, Starfield
│   ├── sections/    una sección = un archivo
│   └── islands/     React: TypeWriter, CountUp, ProjectGallery
│
├── styles/          tokens → reset → base → animations → islands
├── scripts/         starfield, reveal, scrollSpy
└── pages/
    ├── index.astro          home
    ├── 404.astro            error
    └── proyectos/[slug].astro   una página por proyecto

public/              archivos servidos tal cual (favicon, imágenes)
reference/           plantilla iPortfolio original, intacta, como referencia
```

---

## Peso real del sitio

Medido sobre `dist/` tras `npm run build`:

| Recurso | Sin comprimir | Servido (gzip) |
|---|---|---|
| `index.html` (home completa) | 92 KB | **17 KB** |
| CSS total | 32 KB | 8 KB |
| Fuentes (2 variables, subconjunto latino) | 70 KB | 70 KB |
| JavaScript en la carga inicial | — | **0 KB** |
| React (solo al llegar a Proyectos) | 208 KB | 65 KB |

La portada no descarga **ni un byte** de JavaScript de framework. React entra
en escena cuando el visitante baja hasta las estadísticas y los proyectos.

---

## Documentación adicional

- **[docs/ARQUITECTURA.md](docs/ARQUITECTURA.md)** — por qué el sistema está
  hecho así: capas, flujo de datos, islas, rendimiento y accesibilidad.

Además, **cada archivo del proyecto lleva una cabecera** que explica qué hace,
por qué existe y qué decisión técnica hay detrás.

---

## Créditos

Estructura de secciones inspirada en la plantilla
[iPortfolio de BootstrapMade](https://bootstrapmade.com/iportfolio-bootstrap-portfolio-websites-template/),
conservada en `reference/` como referencia. La implementación, el diseño
galáctico y la arquitectura son propios: no queda código de la plantilla.
