/**
 * ============================================================================
 *  PROYECTOS  ←  ESTE ES EL ARCHIVO QUE MAS VAS A EDITAR
 * ============================================================================
 *  Para publicar un proyecto nuevo:
 *
 *    1. Copia el bloque PLANTILLA del final de este archivo.
 *    2. Pegalo DENTRO del array `projects`, arriba del todo si quieres que
 *       aparezca primero.
 *    3. Rellena los campos. El `slug` debe ser unico y en minusculas con
 *       guiones: define la URL /proyectos/<slug>.
 *    4. Guarda. En desarrollo (`npm run dev`) se recarga solo. Para publicar,
 *       `npm run build`.
 *
 *  NO hay que tocar ningun componente: la seccion de proyectos, los filtros
 *  y las paginas de detalle se generan a partir de este array.
 *
 *  Sobre `categories`: los filtros de la UI se calculan automaticamente a
 *  partir de las categorias que uses aqui (ver getProjectFilters en index.js).
 *  Si inventas una categoria nueva, aparece sola como boton de filtro.
 *
 *  Sobre `cover`: si lo dejas vacio, el sitio dibuja una portada generada por
 *  codigo (nebulosa + iniciales del proyecto) usando el color `accent`.
 *  Cuando tengas una captura real: ponla en public/images/projects/ y escribe
 *  aqui la ruta, p. ej. '/images/projects/nutriconsulta.png'.
 * ============================================================================
 */

/** @type {import('../types/portfolio.js').Project[]} */
export const projects = [
  {
    slug: 'nutriconsulta',
    title: 'NutriConsulta',
    tagline: 'Sistema de intercambios nutricionales — API REST y frontend',
    description:
      'Sistema full stack para consulta de intercambios nutricionales dirigido ' +
      'a profesionales de nutrición. Partí del diseño del modelo de datos en ' +
      'PostgreSQL para 553 alimentos agrupados por categoría y población ' +
      'objetivo, con carga inicial mediante un script propio. Sobre ese esquema ' +
      'construí una API REST con Django y Django REST Framework, y la conecté a ' +
      'un frontend en Astro que consume los datos paginados.',
    categories: ['backend', 'fullstack'],
    stack: ['Python', 'Django', 'Django REST Framework', 'PostgreSQL', 'Astro', 'JavaScript', 'Git'],
    highlights: [
      'Modelo de base de datos en PostgreSQL con 553 alimentos clasificados por categoría y población objetivo.',
      'Modelos Django conectados a un esquema preexistente con managed=False, sin que las migraciones alteren la base.',
      'Serializers diferenciados por nivel de detalle: uno ligero para listados y otro completo para la vista de un alimento.',
      'Filtrado avanzado con lógica de negocio usando django-filter y objetos Q.',
      'Búsqueda por similitud de texto con trigramas de PostgreSQL, tolerante a errores de escritura.',
      'Integración con el frontend mediante configuración de CORS y consumo de API REST paginada.',
      'Carga masiva de datos mediante script propio de importación.',
    ],
    links: [
      { label: 'Backend (Django)', href: 'https://github.com/guz2001/nutricion_backend', icon: 'github' },
      { label: 'Frontend (Astro)', href: 'https://github.com/guz2001/intercambios_nutricionales_frontend', icon: 'github' },
      { label: 'NutriConsulta', href: 'https://nutriconsulta-zeta.vercel.app/', icon: 'github' },
    
    ],
    cover: '/images/nutriweb.png',
    accent: '268 85% 68%', // violeta nebulosa
    featured: true,
    year: '2026',
  },
  {
    slug: 'portafolio-web',
    title: 'Portafolio Web',
    tagline: 'Este mismo sitio — Astro, islas React y arquitectura por capas',
    description:
      'Portafolio personal construido con Astro y React. Todo el contenido vive ' +
      'en una capa de datos aislada (src/data/), de modo que añadir un proyecto ' +
      'o un empleo no obliga a tocar una sola línea de HTML. La página se ' +
      'entrega como HTML estático y solo se hidrata el JavaScript de los ' +
      'componentes que realmente necesitan interacción.',
    categories: ['web'],
    stack: ['Astro', 'React', 'JavaScript', 'CSS'],
    highlights: [
      'Islands Architecture: el visitante recibe HTML estático y solo se hidratan el filtro de proyectos, el menú móvil y el rótulo del hero.',
      'Capa de datos desacoplada de la presentación: los componentes reciben todo por props.',
      'Tipado con JSDoc, que da autocompletado y detección de errores sin el coste de compilar TypeScript.',
      'Accesibilidad WCAG: HTML semántico, foco visible, landmarks, y respeto a prefers-reduced-motion.',
      'Fondo estelar dibujado en canvas con densidad adaptada al tamaño de pantalla.',
    ],
    links: [
      { label: 'Código fuente', href: 'https://github.com/guz2001', icon: 'github' },
    ],
    cover: '',
    accent: '190 90% 60%', // cian estelar
    featured: true,
    year: '2026',
  },
];

/* ============================================================================
 *  PLANTILLA — copia desde la llave de apertura hasta la coma final
 * ============================================================================
  {
    slug: 'mi-proyecto',                    // URL: /proyectos/mi-proyecto
    title: 'Nombre del proyecto',
    tagline: 'Una frase de que hace y para quien',
    description: 'Dos o tres frases: el problema, tu solucion y el resultado.',
    categories: ['backend'],                // backend | fullstack | web | infra | automatizacion | ...
    stack: ['Python', 'Docker'],
    highlights: [
      'Decision tecnica concreta que tomaste y por que.',
      'Otro detalle que demuestre criterio de ingenieria.',
    ],
    links: [
      { label: 'Repositorio', href: 'https://github.com/guz2001/...', icon: 'github' },
      { label: 'Demo en vivo', href: 'https://...', icon: 'external' },
    ],
    cover: '',                              // '' = portada generada por codigo
    accent: '320 80% 65%',                  // color HSL de la nebulosa de portada
    featured: true,                         // true = visible en la home
    year: '2026',
  },
 * ========================================================================= */
