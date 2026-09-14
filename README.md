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
npm run og        # regenera la tarjeta de vista previa al compartir
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

### Regenerar la tarjeta al compartir

`public/og-image.png` (1200×630) es lo que se ve al pegar el enlace en
LinkedIn o WhatsApp. Se genera desde `src/data/profile.js`, así que si cambias
tu título profesional o tu disponibilidad:

```bash
npm run og
```

El diseño vive en `scripts/generar-og-image.mjs`.

### Poner tu foto de perfil

**Dos pasos:**

```bash
# 1. Copia tu foto aquí (la carpeta ya existe)
cp ~/ruta/a/tu-foto.jpg public/images/perfil.jpg
```

```js
// 2. src/data/profile.js — línea 66
photo: '/images/perfil.jpg',
```

Guarda y listo. Con `npm run dev` se ve al instante.

> **La ruta se escribe sin `public`.** Todo lo que hay en `public/` se sirve
> desde la raíz del sitio: `public/images/perfil.jpg` se pide como
> `/images/perfil.jpg`. Es el error más común.

**Requisitos de la imagen**

| | |
|---|---|
| Forma | Cuadrada — se recorta en círculo con `object-fit: cover` |
| Tamaño mínimo | 420×420 px (se muestra a 234 px, el doble para pantallas Retina) |
| Formato | `.jpg` o `.webp` |
| Peso | Menos de 150 KB |
| Encuadre | Cara centrada: el recorte circular come las esquinas |

#### Dónde se usa la foto, archivo por archivo

La foto viaja por **cuatro archivos**, y solo uno la dibuja:

| # | Archivo | Línea | Papel |
|---|---|---|---|
| 1 | `public/images/perfil.jpg` | — | **El archivo.** Lo pones tú |
| 2 | [`src/data/profile.js`](src/data/profile.js) | **66** | **La ruta.** Campo `photo`. Lo editas tú |
| 3 | [`src/types/portfolio.js`](src/types/portfolio.js) | 36 | El contrato JSDoc. No se toca |
| 4 | [`src/components/sections/About.astro`](src/components/sections/About.astro) | **45-56** | **El único componente que la pinta** |

El componente decide entre foto y monograma:

```astro
<!-- src/components/sections/About.astro, líneas 45-56 -->
{profile.photo ? (
  <img
    class="portrait__img"
    src={profile.photo}
    alt={`Retrato de ${profile.name}`}
    width="420" height="420"
    loading="lazy" decoding="async"
  />
) : (
  <span class="portrait__monogram" aria-hidden="true">{profile.initials}</span>
)}
```

Los anillos orbitales se dibujan igual en ambos casos, así que la foto queda
dentro del mismo marco galáctico que el monograma.

#### Dónde NO se usa la foto

Estos tres sitios usan las **iniciales** (`profile.initials`), no la imagen, y
no cambian al subir tu foto:

| Sitio | Archivo | Línea |
|---|---|---|
| Monograma de la barra lateral | [`src/components/layout/Header.astro`](src/components/layout/Header.astro) | 52 |
| Favicon de la pestaña | `public/favicon.svg` | — |
| Tarjeta al compartir en LinkedIn | `scripts/generar-og-image.mjs` | — |

Es intencional: en un espacio de 46 px un monograma se lee mejor que una cara
recortada. Si algún día quieres tu foto en la tarjeta de compartir, hay que
tocar el script de la OG image.

#### Mientras no subas nada

Se dibuja un monograma **JG** con dos anillos orbitales girando. Es deliberado:
antes eso que la foto de archivo que traía la plantilla, que es una persona que
no eres.

---

## Publicar

### Opción A — Netlify (recomendada)

El repositorio ya trae `netlify.toml`, así que Netlify no pregunta nada:
detecta el comando de build, la carpeta de publicación, Node 22, las cabeceras
de seguridad y la caché de los assets.

1. `git push` del proyecto a GitHub.
2. En [app.netlify.com](https://app.netlify.com) → **Add new site → Import an
   existing project** → elige el repositorio. Deja todo como viene.
3. Sale una URL tipo `nombre-aleatorio.netlify.app`. Renómbrala en
   **Site configuration → Change site name** a algo como
   `juandavidguzman.netlify.app`.
4. **Paso que no hay que olvidar** — pon esa URL en `src/config/site.js`:

   ```js
   url:  'https://juandavidguzman.netlify.app',
   base: '/',
   ```

   Y haz push otra vez. De ese valor dependen la URL canónica, el sitemap y la
   tarjeta de vista previa al compartir. Mientras apunte al dominio anterior,
   quien comparta el enlace verá una imagen que no carga.

A partir de ahí, **cada `git push` redespliega solo** en unos 30 segundos.

> Con un dominio propio: **Domain management → Add a domain**. El certificado
> HTTPS lo emite Netlify gratis. Recuerda actualizar `url` también.

### Opción B — GitHub Pages en este repositorio

El repositorio ya configurado es
[`guz2001/Portafolio-Web-Juan-David-Guzman`](https://github.com/guz2001/Portafolio-Web-Juan-David-Guzman),
así que GitHub Pages lo serviría en
`guz2001.github.io/Portafolio-Web-Juan-David-Guzman/` — es decir, **en una
subcarpeta**. Hay que decírselo a Astro o todos los enlaces internos apuntarán
mal:

```js
// src/config/site.js
url:  'https://guz2001.github.io',
base: '/Portafolio-Web-Juan-David-Guzman/',   // ← con las dos barras
```

> Si prefieres una URL más corta, renombra el repositorio a `portafolio` y pon
> `base: '/portafolio/'`. O, mejor todavía, crea el repositorio especial
> `guz2001.github.io`: ese se sirve en la raíz y puedes dejar `base: '/'`.

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
