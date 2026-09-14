/**
 * ============================================================================
 *  UTILIDADES DE URL
 * ============================================================================
 *  PROBLEMA QUE RESUELVEN
 *  Un enlace escrito como `/proyectos/nutriconsulta/` funciona si el sitio
 *  vive en la raiz del dominio (midominio.com/proyectos/...), pero se rompe
 *  si vive en una subcarpeta, que es justo lo que pasa en GitHub Pages con un
 *  repositorio normal: guz2001.github.io/portafolio/. Ahi la URL correcta es
 *  /portafolio/proyectos/nutriconsulta/.
 *
 *  Astro expone la subcarpeta configurada en `base` a traves de
 *  import.meta.env.BASE_URL. Pasando por estas funciones, los mismos enlaces
 *  sirven para los dos despliegues sin tocar ni un componente.
 * ============================================================================
 */

/**
 * Antepone la subcarpeta de despliegue a una ruta interna.
 *
 * @param {string} path Ruta interna, con o sin barra inicial.
 * @returns {string} Ruta lista para un href.
 *
 * @example
 *   withBase('/proyectos/x/')  // base '/'           -> '/proyectos/x/'
 *   withBase('/proyectos/x/')  // base '/portafolio' -> '/portafolio/proyectos/x/'
 */
export function withBase(path) {
  const base = import.meta.env.BASE_URL || '/';
  const cleanBase = base.endsWith('/') ? base.slice(0, -1) : base;
  const cleanPath = path.startsWith('/') ? path : `/${path}`;
  return `${cleanBase}${cleanPath}`;
}

/**
 * Igual que withBase, pero para anclas dentro de la pagina de inicio.
 * Se usa desde las paginas de detalle, donde `#proyectos` por si solo
 * buscaria una seccion que no existe en esa pagina.
 *
 * @param {string} hash Identificador de la seccion, sin almohadilla.
 * @returns {string}
 */
export function homeAnchor(hash) {
  return `${withBase('/')}#${hash}`;
}
