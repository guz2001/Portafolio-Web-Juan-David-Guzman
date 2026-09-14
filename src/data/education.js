/**
 * ============================================================================
 *  FORMACION ACADEMICA Y CERTIFICACIONES
 * ============================================================================
 *  `isDegree: true` marca el titulo universitario, que la UI destaca
 *  visualmente frente a los cursos complementarios.
 * ============================================================================
 */

/** @type {import('../types/portfolio.js').EducationItem[]} */
export const education = [
  {
    id: 'ingenieria',
    title: 'Ingeniería de Sistemas',
    institution: 'Universidad Libre Seccional Pereira',
    period: '2020 — 2026',
    startDate: '2020-01-01',
    note: 'Graduado',
    isDegree: true,
  },
  {
    id: 'sysadmin',
    title: 'Curso SysAdmin',
    institution: 'Universidad del Quindío, Armenia',
    period: 'Febrero 2026 — Marzo 2026',
    startDate: '2026-02-01',
    hours: '60 h',
    isDegree: false,
  },
  {
    id: 'ia-aplicada',
    title: 'Diplomado en IA Aplicada',
    institution: 'Universidad Libre',
    period: 'Agosto 2025 — Diciembre 2025',
    startDate: '2025-08-01',
    isDegree: false,
  },
  {
    id: 'ciberseguridad',
    title: 'Bootcamp Ciberseguridad — Nivel Explorador',
    institution: 'MinTIC / IU Training',
    period: 'Enero 2025 — Marzo 2025',
    startDate: '2025-01-01',
    hours: '159 h',
    isDegree: false,
  },
];
