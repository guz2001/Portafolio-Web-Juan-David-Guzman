/**
 * ============================================================================
 *  AREAS DE ESPECIALIZACION
 * ============================================================================
 *  Ocupa el lugar de la seccion "Servicios" de la plantilla original.
 *  Motivo del cambio: "Servicios" comunica freelance ("te vendo horas").
 *  Buscando empleo, lo util es decirle al reclutador en que frentes puede
 *  ponerte a trabajar desde la primera semana.
 * ============================================================================
 */

/** @type {import('../types/portfolio.js').ExpertiseArea[]} */
export const expertiseAreas = [
  {
    id: 'voip',
    title: 'Infraestructura VoIP',
    description:
      'Implementación y operación de plataformas de telefonía IP sobre ' +
      'Asterisk/PBX: troncales SIP, enrutamiento de llamadas, códecs y ' +
      'diagnóstico de incidencias en producción.',
    icon: 'phone',
    keywords: ['Asterisk', 'PBX', 'Troncales SIP', 'SIP / RTP', 'Códecs'],
  },
  {
    id: 'ivr',
    title: 'Diseño de flujos IVR',
    description:
      'Menús de atención automatizada por voz y flujos conversacionales sobre ' +
      'WhatsApp con la API de WhatsApp Cloud, incluyendo difusiones masivas.',
    icon: 'flow',
    keywords: ['IVR', 'WhatsApp Cloud API', 'Enrutamiento', 'Difusiones'],
  },
  {
    id: 'linux',
    title: 'Administración Linux y Docker',
    description:
      'Operación diaria de servidores Ubuntu, AlmaLinux y RHEL: gestión de ' +
      'servicios, contenedores, lectura de logs y mantenimiento preventivo.',
    icon: 'server',
    keywords: ['Ubuntu', 'AlmaLinux', 'RHEL', 'Docker', 'systemd'],
  },
  {
    id: 'redes',
    title: 'Redes y análisis de tráfico',
    description:
      'Diagnóstico de conectividad y de sesiones SIP con Wireshark y sngrep, ' +
      'direccionamiento IP privado y público, DNS y DHCP.',
    icon: 'network',
    keywords: ['TCP/IP', 'DNS', 'DHCP', 'Wireshark', 'sngrep'],
  },
  {
    id: 'automatizacion',
    title: 'Automatización y monitoreo',
    description:
      'Scripts en Python y Bash que eliminan tareas repetitivas de soporte: ' +
      'recolección de logs, comprobaciones de estado y mantenimiento programado.',
    icon: 'terminal',
    keywords: ['Python', 'Bash', 'cron', 'Monitoreo'],
  },
  {
    id: 'backend',
    title: 'Desarrollo backend',
    description:
      'APIs REST con Django y Django REST Framework sobre PostgreSQL, con ' +
      'modelado de datos, filtrado avanzado y búsqueda por similitud de texto.',
    icon: 'code',
    keywords: ['Django', 'DRF', 'PostgreSQL', 'API REST'],
  },
];
