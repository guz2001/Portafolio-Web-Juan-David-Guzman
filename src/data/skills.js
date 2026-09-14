/**
 * ============================================================================
 *  HABILIDADES  —  Agrupadas por dominio tecnico
 * ============================================================================
 *  El campo `level` (0-100) alimenta las barras de progreso.
 *  Criterio usado para puntuar, para que sea consistente y honesto:
 *     90-100  Lo uso a diario y puedo resolver incidencias complejas solo.
 *     75-89   Lo uso con soltura en produccion, pido apoyo en casos raros.
 *     60-74   Lo he usado en proyectos reales, todavia consulto documentacion.
 *     40-59   Base solida de formacion, poca exposicion en produccion.
 *
 *  El orden de las categorias define el orden en pantalla: lo primero es
 *  lo que mas te diferencia (VoIP).
 * ============================================================================
 */

/** @type {import('../types/portfolio.js').SkillCategory[]} */
export const skillCategories = [
  {
    id: 'voip',
    title: 'VoIP y Telefonía IP',
    icon: 'phone',
    skills: [
      { name: 'Asterisk / PBX', level: 85 },
      { name: 'Diseño y configuración de IVR', level: 85 },
      { name: 'Troncales SIP', level: 80 },
      { name: 'Protocolos SIP y RTP', level: 78 },
      { name: 'Códecs de audio', level: 70 },
    ],
  },
  {
    id: 'sistemas',
    title: 'Sistemas e Infraestructura',
    icon: 'server',
    skills: [
      { name: 'Linux (Ubuntu / AlmaLinux / RHEL)', level: 88 },
      { name: 'Docker — contenedores, logs, servicios', level: 78 },
      { name: 'Windows 10 / 11', level: 80 },
      { name: 'Soporte técnico N1 / N2', level: 90 },
    ],
  },
  {
    id: 'redes',
    title: 'Redes y Diagnóstico',
    icon: 'network',
    skills: [
      { name: 'TCP/IP, DNS, DHCP', level: 82 },
      { name: 'Direccionamiento IP privado y público', level: 80 },
      { name: 'Análisis de tráfico con sngrep', level: 78 },
      { name: 'Análisis de tráfico con Wireshark', level: 72 },
    ],
  },
  {
    id: 'backend',
    title: 'Desarrollo Backend',
    icon: 'code',
    skills: [
      { name: 'Python', level: 80 },
      { name: 'Django / Django REST Framework', level: 78 },
      { name: 'PostgreSQL', level: 75 },
      { name: 'MySQL', level: 70 },
      { name: 'Diseño de API REST', level: 76 },
    ],
  },
  {
    id: 'automatizacion',
    title: 'Automatización y Herramientas',
    icon: 'terminal',
    skills: [
      { name: 'Scripting en Bash', level: 80 },
      { name: 'Scripting en Python', level: 80 },
      { name: 'Git / GitHub', level: 82 },
      { name: 'IA Generativa aplicada al trabajo técnico', level: 85 },
    ],
  },
  {
    id: 'seguridad',
    title: 'Seguridad',
    icon: 'shield',
    skills: [
      { name: 'Fundamentos de ciberseguridad (MinTIC, 159 h)', level: 65 },
      { name: 'Buenas prácticas de hardening', level: 60 },
    ],
  },
];
