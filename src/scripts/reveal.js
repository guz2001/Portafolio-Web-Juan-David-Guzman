/**
 * ============================================================================
 *  REVELADO AL HACER SCROLL
 * ============================================================================
 *  QUE HACE
 *  Cada elemento con `data-reveal` aparece con un fundido hacia arriba la
 *  primera vez que entra en pantalla.
 *
 *  POR QUE IntersectionObserver Y NO UN LISTENER DE SCROLL
 *  Un `addEventListener('scroll')` se dispara decenas de veces por segundo en
 *  el hilo principal y, si dentro se llama a getBoundingClientRect(), fuerza
 *  al navegador a recalcular el layout: es la receta clasica del scroll con
 *  tirones. IntersectionObserver hace la comprobacion fuera del hilo principal
 *  y solo nos avisa cuando algo cruza el umbral.
 *
 *  ESCALONADO
 *  Los elementos que comparten `data-reveal-group` se revelan uno detras de
 *  otro con 70 ms de diferencia. Es lo que hace que una rejilla de tarjetas
 *  entre "en cascada" en vez de de golpe.
 *
 *  ACCESIBILIDAD
 *  Con prefers-reduced-motion todo se muestra de inmediato, sin animar.
 * ============================================================================
 */

const STAGGER_MS = 70;
const MAX_STAGGER_MS = 420; // tope: nadie debe esperar mas de medio segundo

/**
 * Activa el revelado en todo el documento.
 * @returns {() => void} funcion de limpieza
 */
export function initReveal() {
  const elements = /** @type {HTMLElement[]} */ ([
    ...document.querySelectorAll('[data-reveal]'),
  ]);
  if (elements.length === 0) return () => {};

  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  // Sin animacion: se marcan todos como revelados y no se observa nada.
  if (reducedMotion || !('IntersectionObserver' in window)) {
    elements.forEach((el) => el.setAttribute('data-revealed', ''));
    return () => {};
  }

  /** Contador de posicion dentro de cada grupo, para el escalonado. */
  const groupCounters = new Map();

  const observer = new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        if (!entry.isIntersecting) continue;

        const el = /** @type {HTMLElement} */ (entry.target);
        const group = el.dataset.revealGroup;

        if (group) {
          const index = groupCounters.get(group) ?? 0;
          groupCounters.set(group, index + 1);
          el.style.setProperty(
            '--reveal-delay',
            `${Math.min(index * STAGGER_MS, MAX_STAGGER_MS)}ms`
          );
        }

        el.setAttribute('data-revealed', '');
        // Una vez revelado ya no interesa: dejamos de observarlo para que el
        // observer no acumule trabajo a medida que crece la pagina.
        observer.unobserve(el);
      }
    },
    {
      // -12% abajo: el elemento se revela justo antes de estar del todo a la
      // vista, de modo que el usuario nunca "ve aparecer" el fundido.
      rootMargin: '0px 0px -12% 0px',
      threshold: 0.08,
    }
  );

  elements.forEach((el) => observer.observe(el));

  return () => observer.disconnect();
}
