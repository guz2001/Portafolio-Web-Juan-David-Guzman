/**
 * ============================================================================
 *  ESTADISTICAS  —  Cifras verificables
 * ============================================================================
 *  REGLA: solo numeros que puedas defender en una entrevista.
 *  Nada de "+150 clientes satisfechos": un perfil junior gana credibilidad
 *  con datos comprobables, no con metricas infladas.
 *  Cada cifra de aqui esta respaldada por el CV.
 * ============================================================================
 */

/** @type {import('../types/portfolio.js').Stat[]} */
export const stats = [
  {
    id: 'experiencia',
    value: 2,
    suffix: '+',
    label: 'Años de experiencia en soporte, QA e infraestructura',
  },
  {
    id: 'ciberseguridad',
    value: 159,
    suffix: ' h',
    label: 'Bootcamp de Ciberseguridad MinTIC',
  },
  {
    id: 'sysadmin',
    value: 60,
    suffix: ' h',
    label: 'Curso SysAdmin — Universidad del Quindío',
  },
  {
    id: 'alimentos',
    value: 553,
    suffix: '',
    label: 'Alimentos modelados en la base de datos de NutriConsulta',
  },
];
