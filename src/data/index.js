/**
 * ============================================================================
 *  BARREL DE DATOS  —  Punto unico de entrada a la capa de datos
 * ============================================================================
 *  Los componentes importan SIEMPRE desde aqui:
 *
 *      import { profile, projects } from '../../data/index.js';
 *
 *  Ventaja: si un dia renombras o partes un archivo de datos, solo cambias
 *  este barrel y ningun componente se entera. Es la frontera entre la capa
 *  de datos y la capa de presentacion.
 * ============================================================================
 */

export { profile } from './profile.js';
export { stats } from './stats.js';
export { skillCategories } from './skills.js';
export { experience } from './experience.js';
export { education } from './education.js';
export { projects } from './projects.js';
export { expertiseAreas } from './expertise.js';

import { projects } from './projects.js';

/**
 * Etiquetas legibles de cada categoria de proyecto.
 * Si usas una categoria que no este aqui, se muestra capitalizada tal cual.
 * @type {Record<string, string>}
 */
const CATEGORY_LABELS = {
  backend: 'Backend',
  fullstack: 'Full Stack',
  web: 'Web',
  infra: 'Infraestructura',
  automatizacion: 'Automatización',
  voip: 'VoIP',
  datos: 'Datos',
};

/**
 * Convierte un id de categoria en su etiqueta visible.
 * @param {string} id
 * @returns {string}
 */
export function getCategoryLabel(id) {
  return CATEGORY_LABELS[id] ?? id.charAt(0).toUpperCase() + id.slice(1);
}

/**
 * Construye los botones de filtro a partir de las categorias realmente
 * usadas en projects.js. Asi nunca aparece un filtro vacio ni falta uno
 * cuando añades un proyecto con una categoria nueva.
 *
 * @returns {{ id: string, label: string, count: number }[]}
 */
export function getProjectFilters() {
  /** @type {Map<string, number>} */
  const counts = new Map();

  for (const project of projects) {
    for (const category of project.categories) {
      counts.set(category, (counts.get(category) ?? 0) + 1);
    }
  }

  const filters = [...counts.entries()]
    .map(([id, count]) => ({ id, label: getCategoryLabel(id), count }))
    .sort((a, b) => b.count - a.count || a.label.localeCompare(b.label, 'es'));

  return [{ id: 'all', label: 'Todos', count: projects.length }, ...filters];
}

/**
 * Proyectos marcados como destacados, para la portada.
 * @returns {import('../types/portfolio.js').Project[]}
 */
export function getFeaturedProjects() {
  return projects.filter((project) => project.featured);
}

/**
 * Busca un proyecto por su slug.
 * @param {string} slug
 * @returns {import('../types/portfolio.js').Project | undefined}
 */
export function getProjectBySlug(slug) {
  return projects.find((project) => project.slug === slug);
}
