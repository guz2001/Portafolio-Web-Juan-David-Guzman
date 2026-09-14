/**
 * ============================================================================
 *  ISLA REACT — GALERIA DE PROYECTOS CON FILTRO
 * ============================================================================
 *  ESTA ES LA ISLA QUE JUSTIFICA TRAER REACT AL PROYECTO.
 *  Hay estado real (el filtro activo) que redibuja una lista, y React lo
 *  resuelve de forma declarativa: se describe COMO se ve la galeria para un
 *  filtro dado y la libreria se ocupa del resto. Hacerlo a mano significaria
 *  ocultar y mostrar nodos con clases, que es justo lo que la plantilla
 *  original hacia con Isotope (~35 KB).
 *
 *  COMO SE CARGA
 *  index.astro la monta con `client:visible`: Astro genera el HTML de las
 *  tarjetas durante el build —visibles para Google y para quien tenga el
 *  JavaScript desactivado— y solo descarga React cuando el visitante llega
 *  a la altura de la seccion de proyectos. La portada nunca paga ese coste.
 *
 *  ACCESIBILIDAD DE UN FILTRO
 *  Los botones forman un `role="tablist"`: cada uno declara aria-selected y
 *  aria-controls, y la rejilla es el `tabpanel` asociado. Ademas la rejilla
 *  es aria-live="polite", de modo que al cambiar de filtro el lector de
 *  pantalla anuncia cuantos proyectos quedan, sin interrumpir al usuario.
 * ============================================================================
 */

import { useMemo, useState } from 'react';
import ProjectCover from './ProjectCover.jsx';
import { withBase } from '../../utils/url.js';

/**
 * @param {{
 *   projects: import('../../types/portfolio.js').Project[],
 *   filters:  { id: string, label: string, count: number }[]
 * }} props
 */
export default function ProjectGallery({ projects, filters }) {
  const [activeFilter, setActiveFilter] = useState('all');

  // useMemo evita recalcular el filtrado en cada render. Con dos proyectos es
  // irrelevante; con treinta, y siendo este el archivo que mas va a crecer,
  // es la decision correcta desde el principio.
  const visibleProjects = useMemo(
    () =>
      activeFilter === 'all'
        ? projects
        : projects.filter((project) => project.categories.includes(activeFilter)),
    [projects, activeFilter]
  );

  return (
    <div className="gallery">
      {/* ------------------------------------------------------- Filtros */}
      <div className="gallery__filters" role="tablist" aria-label="Filtrar proyectos por categoría">
        {filters.map((filter) => {
          const isActive = filter.id === activeFilter;
          return (
            <button
              key={filter.id}
              type="button"
              role="tab"
              id={`filtro-${filter.id}`}
              aria-selected={isActive}
              aria-controls="rejilla-proyectos"
              tabIndex={isActive ? 0 : -1}
              className={`filter-pill${isActive ? ' filter-pill--active' : ''}`}
              onClick={() => setActiveFilter(filter.id)}
            >
              {filter.label}
              <span className="filter-pill__count">{filter.count}</span>
            </button>
          );
        })}
      </div>

      {/* ------------------------------------------------------- Rejilla */}
      <div
        className="gallery__grid"
        id="rejilla-proyectos"
        role="tabpanel"
        aria-labelledby={`filtro-${activeFilter}`}
        aria-live="polite"
      >
        {visibleProjects.map((project) => (
          <article className="project-card" key={project.slug}>
            <a
              className="project-card__link"
              href={withBase(`/proyectos/${project.slug}/`)}
              aria-label={`Ver detalle del proyecto ${project.title}`}
            >
              <div className="project-cover">
                <ProjectCover
                  title={project.title}
                  slug={project.slug}
                  accent={project.accent}
                  cover={project.cover}
                />
              </div>

              <div className="project-card__body">
                <p className="project-card__year">{project.year}</p>
                <h3 className="project-card__title">{project.title}</h3>
                <p className="project-card__tagline">{project.tagline}</p>

                <ul className="chip-list project-card__stack">
                  {project.stack.slice(0, 4).map((tech) => (
                    <li className="chip" key={tech}>{tech}</li>
                  ))}
                  {project.stack.length > 4 && (
                    <li className="chip">+{project.stack.length - 4}</li>
                  )}
                </ul>
              </div>
            </a>
          </article>
        ))}

        {visibleProjects.length === 0 && (
          <p className="gallery__empty">
            Todavía no hay proyectos publicados en esta categoría.
          </p>
        )}
      </div>
    </div>
  );
}
