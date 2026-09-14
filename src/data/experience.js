/**
 * ============================================================================
 *  EXPERIENCIA LABORAL
 * ============================================================================
 *  Orden: del mas reciente al mas antiguo (se renderiza tal cual).
 *  `startDate` en ISO permite ordenar por codigo y rellenar <time datetime>,
 *  que es lo que leen Google y los lectores de pantalla.
 * ============================================================================
 */

/** @type {import('../types/portfolio.js').ExperienceItem[]} */
export const experience = [
  {
    id: 'ikono',
    role: 'Ingeniero de Implementación y Operaciones',
    company: 'iKono Telecomunicaciones',
    period: 'Junio 2026 — Septiembre 2026',
    startDate: '2026-06-01',
    location: 'Pereira, Colombia',
    achievements: [
      'Brindé soporte técnico N1/N2 sobre plataforma de VoIP Asterisk/PBX, incluyendo diagnóstico y resolución de incidencias de telefonía IP.',
      'Diseñé y configuré menús IVR (Interactive Voice Response) y flujos de atención automatizada sobre Asterisk, optimizando tiempos de enrutamiento de llamadas.',
      'Apliqué conocimientos de redes a VoIP: direccionamiento IP privado/público, troncales SIP, protocolos SIP y RTP, y códecs de audio, con análisis de tráfico mediante Wireshark y sngrep.',
      'Administré diariamente entornos Linux y Docker (captura de logs, reinicio de servicios, mantenimiento de contenedores) y bases de datos PostgreSQL.',
      'Desarrollé scripts en Python y Bash para automatizar tareas de soporte, monitoreo y mantenimiento de sistemas.',
      'Implementé y administré menús IVR conversacionales sobre WhatsApp mediante la API de WhatsApp Cloud (Meta), integrando difusiones masivas y flujos de atención por canal de chat.',
    ],
    stack: ['Asterisk', 'SIP', 'RTP', 'Linux', 'Docker', 'PostgreSQL', 'Python', 'Bash', 'Wireshark', 'sngrep', 'WhatsApp Cloud API'],
  },
  {
    id: 'ilumina',
    role: 'Auxiliar de Calidad de Software (QA)',
    company: 'Ilumina',
    period: 'Agosto 2025 — Octubre 2025',
    startDate: '2025-08-01',
    location: 'Pereira, Colombia · Presencial',
    achievements: [
      'Ejecuté pruebas funcionales para garantizar la estabilidad de aplicaciones; identificación y reporte técnico de errores de software.',
      'Documenté casos de prueba y seguimiento de defectos en ciclos de entrega.',
    ],
    stack: ['Pruebas funcionales', 'Reporte de defectos', 'Documentación técnica'],
  },
  {
    id: 'fundacreceres',
    role: 'Soporte Técnico de Sistemas',
    company: 'Fundacreceres',
    period: 'Octubre 2024 — Junio 2025',
    startDate: '2024-10-01',
    location: 'Pereira, Colombia · Remoto',
    achievements: [
      'Instalación, configuración y mantenimiento de sistemas operativos y software corporativo.',
      'Resolución de incidencias técnicas y documentación de procedimientos.',
    ],
    stack: ['Windows', 'Linux', 'Soporte remoto', 'Documentación'],
  },
];
