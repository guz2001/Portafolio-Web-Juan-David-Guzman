/**
 * ============================================================================
 *  SCROLL SPY  —  Resalta en el menu la seccion que se esta viendo
 * ============================================================================
 *  COMO FUNCIONA
 *  Observa todas las <section id="..."> y, cuando una ocupa la franja central
 *  de la pantalla, marca con `aria-current="true"` el enlace del menu cuyo
 *  href es #<ese id>.
 *
 *  POR QUE aria-current Y NO UNA CLASE
 *  `aria-current` comunica el estado "estas aqui" a los lectores de pantalla,
 *  ademas de servirnos como gancho de CSS. Una clase .active solo seria
 *  visible para quien ve la pantalla.
 *
 *  LA FRANJA CENTRAL
 *  rootMargin '-45% 0px -45% 0px' reduce el area de deteccion a una banda
 *  horizontal en mitad del viewport. Sin ella, con dos secciones visibles a la
 *  vez el resaltado saltaria de una a otra sin criterio.
 * ============================================================================
 */

/**
 * @param {string} navSelector selector del contenedor de enlaces
 * @returns {() => void} funcion de limpieza
 */
export function initScrollSpy(navSelector = '[data-scrollspy]') {
  const navs = [...document.querySelectorAll(navSelector)];
  if (navs.length === 0 || !('IntersectionObserver' in window)) return () => {};

  /** @type {HTMLAnchorElement[]} */
  const links = navs.flatMap((nav) => [...nav.querySelectorAll('a[href^="#"]')]);

  const sections = links
    .map((link) => document.querySelector(link.getAttribute('href') || ''))
    .filter((section) => section !== null);

  if (sections.length === 0) return () => {};

  /** @param {string} id */
  function setActive(id) {
    for (const link of links) {
      const isActive = link.getAttribute('href') === `#${id}`;
      if (isActive) link.setAttribute('aria-current', 'true');
      else link.removeAttribute('aria-current');
    }
  }

  const observer = new IntersectionObserver(
    (entries) => {
      // Puede haber varias secciones en la franja; gana la mas visible.
      const visible = entries
        .filter((entry) => entry.isIntersecting)
        .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];

      if (visible) setActive(visible.target.id);
    },
    { rootMargin: '-45% 0px -45% 0px', threshold: [0, 0.25, 0.5, 1] }
  );

  sections.forEach((section) => observer.observe(section));

  return () => observer.disconnect();
}
