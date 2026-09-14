# Arquitectura del portafolio

Documento de decisiones. El [README](../README.md) explica *cómo usar* el
proyecto; esto explica *por qué está hecho así*.

---

## 1. El problema que resuelve la arquitectura

Un portafolio tiene una característica que lo distingue de casi cualquier otra
web: **el contenido cambia mucho más a menudo que el diseño**. Vas a añadir
proyectos, cambiar de empleo y sumar certificaciones muchas veces. Vas a
rediseñarlo, con suerte, una.

La plantilla original mezclaba ambas cosas: el nombre, los trabajos y los
proyectos estaban incrustados en un `index.html` de 40 000 caracteres. Añadir
un proyecto significaba copiar un bloque de 30 líneas de HTML con sus clases
de Bootstrap y sus atributos de Isotope, y rezar por no romper la rejilla.

Toda la arquitectura persigue un único objetivo:

> **Añadir un proyecto debe ser editar un objeto JavaScript. Nada más.**

---

## 2. Las tres capas

```
┌─────────────────────────────────────────────────────────┐
│  CONFIGURACIÓN     src/config/  ·  astro.config.mjs     │
│  Dominio, SEO, menú, integraciones                      │
│  Cambia: casi nunca                                     │
└─────────────────────────────────────────────────────────┘
                          ↓
┌─────────────────────────────────────────────────────────┐
│  DATOS             src/data/                            │
│  Tu CV como objetos JS. Cero HTML, cero estilos.        │
│  Cambia: constantemente                                 │
└─────────────────────────────────────────────────────────┘
                          ↓ props
┌─────────────────────────────────────────────────────────┐
│  PRESENTACIÓN      src/components/  ·  src/layouts/     │
│  Reciben datos y los pintan. No saben quién eres.       │
│  Cambia: solo al rediseñar                              │
└─────────────────────────────────────────────────────────┘
```

**La regla que sostiene todo:** las flechas van en un solo sentido. La capa de
presentación importa de la de datos; la de datos **nunca** importa de la de
presentación. Si algún día un archivo de `src/data/` necesita importar un
componente, es señal de que la separación se rompió.

### El barrel: `src/data/index.js`

Los componentes importan siempre desde `data/index.js`, nunca desde los
archivos sueltos:

```js
import { profile, projects } from '../../data/index.js';   // ✅
import { profile } from '../../data/profile.js';           // ❌
```

Es la frontera formal entre capas. Si mañana partes `projects.js` en dos, o
cambias los datos por una consulta a una API, solo se modifica el barrel: los
veintitantos componentes no se enteran.

---

## 3. Flujo de datos: el recorrido de un proyecto

Así viaja un objeto desde que lo escribes hasta que se ve en pantalla:

```
src/data/projects.js
        │  export const projects = [ { slug: 'nutriconsulta', ... } ]
        ▼
src/data/index.js
        │  re-exporta  +  getProjectFilters() calcula los filtros
        ▼
        ├──────────────────────────┬──────────────────────────────┐
        ▼                          ▼                              ▼
sections/Projects.astro    pages/proyectos/[slug].astro    sitemap
        │  props                   │  getStaticPaths()            │
        ▼                          ▼                              ▼
islands/ProjectGallery.jsx  /proyectos/nutriconsulta/    sitemap-0.xml
        │  useState(filtro)        HTML propio con su SEO
        ▼
islands/ProjectCover.jsx
        portada SVG generada
```

Un solo objeto alimenta la tarjeta, la página de detalle, los filtros y el
sitemap. **Esa es la ventaja concreta de separar datos de presentación**, y la
razón por la que añadir un proyecto es una única edición.

---

## 4. Por qué Astro y no React a secas

Un portafolio es, en el fondo, **un documento**: mucho texto, casi nada de
interacción. Una aplicación React completa obliga al visitante a descargar y
ejecutar el framework antes de leer una sola línea.

Astro invierte el planteamiento: genera HTML en el momento del *build* y envía
JavaScript **solo** donde hace falta. Es la **arquitectura de islas**.

### Qué es una isla

Un componente interactivo que vive dentro de un mar de HTML estático. Se marca
con una directiva que decide *cuándo* se hidrata:

| Directiva | Cuándo carga | Usada en |
|---|---|---|
| `client:load` | inmediatamente | **en ningún sitio** |
| `client:idle` | cuando el hilo principal queda libre | `TypeWriter` (hero) |
| `client:visible` | cuando el componente entra en pantalla | `CountUp`, `ProjectGallery` |

### Las tres islas y por qué existen

| Isla | Estado que gestiona | Reemplaza a |
|---|---|---|
| `TypeWriter` | texto que se escribe letra a letra | typed.js (~13 KB) |
| `CountUp` | cifra animada al entrar en pantalla | PureCounter (~4 KB) |
| `ProjectGallery` | filtro activo + lista visible | Isotope (~35 KB) |

`ProjectGallery` es la que **justifica traer React**. Hay estado real —el
filtro— que redibuja una lista, y React lo resuelve declarativamente: describes
cómo se ve la galería para un filtro dado. Sin React habría que ocultar y
mostrar nodos a mano, que es exactamente lo que hacía Isotope.

### Lo que deliberadamente NO es React

El **menú de navegación**. Un menú tiene que responder desde el primer
instante, así que necesitaría `client:load`, y eso mete React (~65 KB
comprimidos) en la ruta crítica para abrir y cerrar un panel. Con ~30 líneas de
JavaScript nativo en `Header.astro` se consigue lo mismo con 0 KB.

**Consecuencia medible:** la portada se entrega con **0 KB de JavaScript de
framework**. React se descarga cuando el visitante baja hasta las estadísticas.
Quien lea solo el hero y se marche, nunca lo paga.

---

## 5. Rendimiento: las decisiones concretas

### El LCP es texto, no una imagen

El *Largest Contentful Paint* mide cuándo aparece el elemento más grande de la
primera pantalla. La plantilla original ponía ahí `hero-bg.jpg` (180 KB): el
LCP no podía ocurrir hasta que esa imagen terminara de descargarse.

Aquí el elemento más grande del hero es el `<h1>`, que es texto: se pinta con
el primer fotograma. El fondo estelar se carga después, en `requestIdleCallback`,
y no bloquea nada.

### Solo se animan `transform` y `opacity`

Son las dos únicas propiedades que el navegador resuelve en la GPU sin
recalcular el layout. Animar `width`, `top` o `margin` provoca *reflow* en cada
fotograma y el scroll se entrecorta en móviles.

Por eso las barras de habilidad usan `transform: scaleX()` en lugar de `width`,
aunque el resultado visual sea idéntico.

### `IntersectionObserver` en lugar de escuchar el scroll

Un `addEventListener('scroll')` se dispara decenas de veces por segundo en el
hilo principal y, si dentro se llama a `getBoundingClientRect()`, fuerza un
recálculo de layout. `IntersectionObserver` hace la comprobación fuera del hilo
principal y solo avisa cuando algo cruza el umbral.

Se usa en tres sitios: revelado al hacer scroll, scroll-spy del menú y disparo
de los contadores.

### Fuentes: subconjunto latino declarado a mano

Importar `@fontsource-variable/inter` entero arrastra los subconjuntos
cirílico, griego y vietnamita: 10 archivos, ~265 KB en `dist/`. El navegador
solo descarga lo que necesita gracias a `unicode-range`, pero igualmente se
publican y ocupan sitio en la caché del CDN sin que nadie los use jamás en un
sitio en español.

`src/styles/fonts.css` declara a mano solo el subconjunto latino: **2 archivos,
70 KB**. El rango `U+0000-00FF` ya cubre tildes, ñ, ¿ y ¡.

### Sin reservas de espacio no hay animación que valga

Dos casos donde se reserva altura por adelantado para evitar *layout shift*:

- `.hero__role` tiene `min-height: 2.6em`. El texto rotativo cambia de longitud
  y, sin esa reserva, todo lo de abajo saltaría en cada frase.
- `.stat__value` usa `font-variant-numeric: tabular-nums`. Todas las cifras
  ocupan lo mismo, así que el bloque no cambia de ancho mientras cuenta.

### Portadas de proyecto generadas por código

Un portafolio nuevo rara vez tiene capturas decentes de todo, y las imágenes de
stock restan credibilidad. `ProjectCover.jsx` dibuja un SVG con estrellas, una
nebulosa del color del proyecto y sus iniciales: **0 bytes de imagen** y nítido
en cualquier resolución.

Las posiciones de las estrellas se generan con un hash determinista del `slug`,
no con `Math.random()`. Si fueran aleatorias, el HTML del build y el del
navegador no coincidirían y React lanzaría un error de hidratación.

---

## 6. Accesibilidad: lo que se hizo y por qué

No es una lista de buenas intenciones; cada punto corresponde a un criterio
concreto de las WCAG.

| Decisión | Dónde | Criterio |
|---|---|---|
| Enlace «Saltar al contenido» como primer tabulable | `BaseLayout` | 2.4.1 Evitar bloques |
| Un solo `<h1>`, secciones en `<h2>`, sin saltos | toda la página | 1.3.1 Información y relaciones |
| `:focus-visible` con anillo de 2 px | `base.css` | 2.4.7 Foco visible |
| Barras de habilidad con `role="meter"` y `aria-valuenow` | `Skills.astro` | 1.1.1 Contenido no textual |
| Filtros como `tablist` con `aria-selected` | `ProjectGallery.jsx` | 4.1.2 Nombre, función, valor |
| Rejilla de proyectos con `aria-live="polite"` | `ProjectGallery.jsx` | 4.1.3 Mensajes de estado |
| Áreas táctiles de 44 px mínimo | `.btn`, `.filter-pill` | 2.5.5 Tamaño del objetivo |
| Fechas en `<time datetime="...">` | `Timeline.astro` | 1.3.1 |
| `prefers-reduced-motion` desactiva toda animación | `tokens.css`, `animations.css` | 2.3.3 Animación por interacción |
| Escape cierra el menú y devuelve el foco | `Header.astro` | 2.1.2 Sin trampas de teclado |

### El caso del efecto máquina de escribir

Es el detalle más interesante. Un texto que cambia letra a letra es **ruido
puro** para un lector de pantalla: lo leería decenas de veces por segundo.

La solución tiene dos mitades:

1. El texto animado va en `aria-hidden="true"` — invisible para la tecnología
   asistiva.
2. Al lado, en `.visually-hidden`, se expone **una sola vez** la lista completa
   de títulos en texto plano.

Quien ve la pantalla disfruta la animación. Quien usa lector recibe la
información completa, sin repetición. El mismo patrón se aplica en `CountUp`.

### Funciona sin JavaScript

El `<html>` sale del build con la clase `no-js`, que un script inline quita
antes del primer pintado. Si ese script no llegara a ejecutarse, la regla
`.no-js [data-reveal]` deja todo el contenido visible.

Sin JavaScript se pierden: el efecto de tecleo (queda el primer título fijo),
los contadores (queda la cifra final) y el filtro (se ven todos los proyectos).
**No se pierde ni una palabra de contenido.**

---

## 7. SEO

- **HTML estático completo.** Google no depende de ejecutar JavaScript para ver
  los proyectos: están en el HTML del build.
- **Una URL por proyecto** — `/proyectos/<slug>/`, indexable y compartible en
  LinkedIn con su propia tarjeta.
- **Datos estructurados `schema.org/Person`** en `BaseLayout`: puesto, ciudad,
  universidad, tecnologías y perfiles. Es lo que permite a Google entender que
  la página describe a una persona concreta.
- **URL canónica** calculada desde `site.url` + la ruta, respetando la
  subcarpeta de despliegue.
- **Open Graph completo** para las vistas previas al compartir.
- **`sitemap-index.xml`** generado en cada build por `@astrojs/sitemap`.

---

## 8. El sistema de diseño galáctico

### Concepto

El fondo es espacio profundo (negro azulado), el texto es luz estelar (blancos
y grises) y el color aparece **solo como estela**: violeta, cian y magenta en
gradientes y acentos, nunca en bloques planos. Así el color subraya sin
competir con el contenido.

| Token | Valor | Papel |
|---|---|---|
| `--color-bg` | `#05060b` | vacío, el lienzo |
| `--color-surface` | `#0d101b` | tarjetas |
| `--color-text` | `#f2f4fa` | luz estelar |
| `--color-nebula` | `#7c5cff` | acento primario |
| `--color-plasma` | `#45d6f5` | acento secundario |
| `--color-quasar` | `#e26bd0` | acento terciario |

`--gradient-stela` combina los tres y es lo que se ve en el monograma, los
botones primarios, las barras de habilidad y el filtro activo.

### El fondo, en tres capas

1. **Gradiente base** — CSS puro, se pinta con el primer fotograma.
2. **Nebulosas** — dos manchas radiales con `blur(90px)` que derivan muy
   despacio. El desenfoque grande es lo que las convierte en gas en lugar de en
   círculos de color. En móviles se reducen a `blur(60px)`: un desenfoque así
   sobre media pantalla es de lo más caro que puede pintar una GPU móvil.
3. **Canvas de estrellas** — `src/scripts/starfield.js`, ~2 KB. Una foto de
   cielo estrellado equivalente pesaría entre 300 KB y 1 MB.

El canvas adapta su densidad al área de pantalla (entre 60 y 320 estrellas),
limita el `devicePixelRatio` a 2 y **detiene el bucle cuando la pestaña pasa a
segundo plano**: no gasta batería pintando lo que nadie ve.

### Un único archivo manda

Ninguna hoja de estilos escribe un color, un tamaño o un tiempo a mano: todo
sale de `src/styles/tokens.css`. Para cambiar el aspecto del sitio entero, es
el único archivo que se toca.

---

## 9. Tipado con JSDoc en lugar de TypeScript

`src/types/portfolio.js` define los contratos de datos como `@typedef` de
JSDoc, y `jsconfig.json` activa `checkJs` con `strict`.

Resultado: VS Code autocompleta los campos y subraya en rojo si escribes
`titulo` donde el tipo dice `title` — el mismo beneficio práctico que
TypeScript para este tamaño de proyecto, sin añadir un paso de compilación ni
convertir todos los archivos a `.ts`.

Si el proyecto creciera hasta necesitar genéricos o tipos derivados, migrar a
TypeScript sería directo: los `@typedef` se convierten en `interface` casi uno
a uno.

---

## 10. Decisiones sobre el contenido

Tres cambios respecto a la plantilla original que no son técnicos sino de
criterio, y conviene dejarlos por escrito:

**Se eliminó la sección de Testimonios.** La plantilla traía cinco testimonios
ficticios con foto. Fabricar citas de personas que no han dicho eso es un
problema, no un detalle de diseño. Si consigues dos o tres reales de Ilumina,
Fundacreceres o iKono, la sección se puede reconstruir sobre el mismo patrón de
datos que el resto.

**«Servicios» pasó a «Áreas de especialización».** *Servicios* habla el idioma
del freelance: «contrata mis horas». Buscando empleo, lo útil es responder a la
pregunta que se hace el reclutador: «¿en qué frentes puedo ponerlo a trabajar
desde la primera semana?».

**Las estadísticas son verificables.** Nada de «+150 clientes satisfechos». Las
cuatro cifras —2 años de experiencia, 159 h de ciberseguridad, 60 h de
SysAdmin, 553 alimentos modelados— salen del CV y se pueden defender en una
entrevista. Un perfil junior gana credibilidad con datos comprobables, no con
métricas infladas.

**Las referencias del CV no se publicaron.** El CV incluye nombres y teléfonos
de cinco personas. Publicar números de móvil ajenos en una web indexable es
exponer datos personales de terceros sin su consentimiento. Si quieres
mencionarlas, lo correcto es «referencias disponibles a solicitud».

---

## 11. Qué NO hay, y por qué

| Ausencia | Motivo |
|---|---|
| Bootstrap (10 MB de vendors) | se usaba un 3 % de la librería; CSS Grid y Flexbox nativos bastan |
| jQuery | ninguna de sus funciones hace falta en 2026 |
| Isotope, Swiper, GLightbox, AOS, typed.js, PureCounter | reemplazados por ~200 líneas propias y mejor integradas |
| Bootstrap Icons | una fuente de ~120 KB para 20 iconos; ahora son SVG en línea |
| `forms/contact.php` | un hosting estático no ejecuta PHP: el formulario se vería bien y no enviaría nada |
| Modo claro | el tema galáctico es la identidad del sitio; un modo claro sería otro diseño, no una variante |
| TypeScript | JSDoc + `checkJs` da el mismo beneficio sin paso de compilación |

---

## 12. Cómo crecer sin romper nada

**Añadir una sección nueva** (por ejemplo, un blog o certificaciones):

1. Crea `src/data/<tema>.js` y expórtalo desde `src/data/index.js`.
2. Crea `src/components/sections/<Tema>.astro`, que importa del barrel.
3. Añádela a `src/pages/index.astro` en el orden que quieras.
4. Registra la entrada en `navigation` (`src/config/site.js`) con un `id` que
   coincida con el de la `<section>` — el scroll-spy los empareja por ese `id`.

**Añadir un icono:** una entrada en `PATHS` de `Icon.astro` con el contenido de
un SVG de 24×24. Fuente recomendada: [lucide.dev](https://lucide.dev).

**Cambiar la paleta entera:** los seis colores de `tokens.css`. Nada más.

**Añadir una isla React:** créala en `src/components/islands/`, ponle estilos en
`src/styles/islands.css` (los `<style>` de Astro no alcanzan a los componentes
React) y móntala con `client:visible` salvo que esté en la primera pantalla.
