/**
 * ============================================================================
 *  PERFIL  —  Datos personales, contacto y redes
 * ============================================================================
 *  Fuente: Hoja_de_vida_JuanDavidGuzmanCastro (CV maestro).
 *  Todo lo que aparezca aqui debe existir en el CV: el portafolio y el CV
 *  tienen que contar exactamente la misma historia ante un reclutador.
 * ============================================================================
 */

/** @type {import('../types/portfolio.js').Profile} */
export const profile = {
  name: 'Juan David Guzmán Castro',
  role: 'Ingeniero de Sistemas e Infraestructura',

  // Se muestran uno a uno con efecto maquina de escribir en el hero.
  // Ordenados de mayor a menor peso en el CV.
  roleRotation: [
    'Ingeniero de Sistemas e Infraestructura',
    'Especialista en VoIP y Asterisk',
    'Administrador de entornos Linux y Docker',
    'Desarrollador Backend con Python y Django',
    'Automatización con Python y Bash',
  ],

  summary:
    'Ingeniero de Sistemas con experiencia en implementación y operación de ' +
    'infraestructura de telefonía IP y VoIP (Asterisk/PBX, troncales SIP, ' +
    'protocolos SIP/RTP), administración diaria de entornos Linux ' +
    '(Ubuntu/AlmaLinux/RHEL) y Docker, y automatización de tareas con scripts ' +
    'en Python y Bash. Experiencia práctica en redes (TCP/IP, DNS, DHCP) y ' +
    'análisis de tráfico con sngrep. Complemento la operación con desarrollo ' +
    'backend (Python, Django, PostgreSQL), lo que me permite construir ' +
    'herramientas propias de monitoreo y soporte. Integro IA Generativa como ' +
    'apoyo para acelerar debugging, documentación y aprendizaje técnico.',

  location: 'Colombia',
  availability: 'Disponible para trabajo remoto o presencial',

  email: 'guz20dgc@gmail.com',
  phone: '@jdguzman2001',
  phoneRaw: '+573226096124', // formato E.164 para los enlaces tel: y wa.me

  // ---------------------------------------------------------------------
  //  FOTO DE PERFIL
  // ---------------------------------------------------------------------
  //  Vacio ('')  -> se dibuja un monograma con las iniciales y dos anillos
  //                 orbitales. Es el estado por defecto.
  //  Con ruta    -> se muestra tu foto.
  //
  //  PARA PONER TU FOTO, DOS PASOS:
  //    1. Copia el archivo a  public/images/perfil.jpg
  //    2. Escribe aqui:       photo: '/images/perfil.jpg'
  //
  //  OJO CON LA RUTA: se escribe '/images/perfil.jpg', SIN 'public'.
  //  Todo lo que hay en public/ se sirve desde la raiz del sitio.
  //
  //  Recomendado: imagen cuadrada, minimo 420x420 px, formato .jpg o .webp,
  //  por debajo de 150 KB. Se recorta en circulo con object-fit: cover, asi
  //  que encuadra tu cara centrada.
  //
  //  El unico componente que lee este campo es
  //  src/components/sections/About.astro (seccion "Sobre mi").
  //  La barra lateral y la tarjeta de compartir usan `initials`, no la foto.
  // ---------------------------------------------------------------------
  photo: '',
  initials: 'JG',

  /** @type {import('../types/portfolio.js').SocialLink[]} */
  socials: [
    {
      id: 'github',
      label: 'GitHub',
      href: 'https://github.com/guz2001',
      icon: 'github',
    },
    {
      id: 'linkedin',
      label: 'LinkedIn',
      href: 'https://linkedin.com/in/juandavidguzmancastro',
      icon: 'linkedin',
    },
    {
      id: 'email',
      label: 'Correo electrónico',
      href: 'mailto:guz20dgc@gmail.com',
      icon: 'mail',
    },
    {
      id: 'whatsapp',
      label: 'WhatsApp',
      href: 'https://wa.me/@jdguzman2001',
      icon: 'whatsapp',
    },
  ],
};
