/**
 * ============================================================================
 *  CONFIGURACION DEL SITIO  —  SEO, dominio y navegacion
 * ============================================================================
 *  Separado de src/data/ a proposito: aqui vive como se PUBLICA el sitio,
 *  no QUIEN eres. Son cosas que cambian por motivos distintos.
 *
 *  IMPORTANTE al desplegar: actualiza `url` con tu dominio real. De ese valor
 *  dependen la URL canonica, el sitemap y las tarjetas de Open Graph que se
 *  ven al compartir el enlace en LinkedIn o WhatsApp.
 * ============================================================================
 */

import { profile } from '../data/profile.js';

export const site = {
  /**
   * ORIGEN del sitio: solo protocolo y dominio, SIN subcarpeta.
   * De aqui salen la URL canonica, el sitemap y las tarjetas de Open Graph.
   */
  url: 'https://guz2001.github.io',

  /**
   * Subcarpeta de despliegue. Las dos combinaciones validas son:
   *
   *   A) Raiz del dominio  — dominio propio, Netlify, Vercel, o el repo
   *      especial guz2001.github.io:
   *          url:  'https://guz2001.github.io'
   *          base: '/'
   *
   *   B) Subcarpeta — repositorio normal en GitHub Pages, por ejemplo
   *      github.com/guz2001/portafolio, que se publica en
   *      guz2001.github.io/portafolio/:
   *          url:  'https://guz2001.github.io'
   *          base: '/portafolio/'
   *
   * Cambiando solo estos dos valores, TODOS los enlaces internos, los assets,
   * el favicon y el sitemap se recalculan solos: los componentes pasan por
   * src/utils/url.js en lugar de escribir rutas absolutas a mano.
   */
  base: '/',

  title: `${profile.name} — ${profile.role}`,

  /** Meta description. Google corta alrededor de los 155 caracteres. */
  description:
    'Ingeniero de Sistemas en Pereira, Colombia. Infraestructura VoIP con ' +
    'Asterisk, administración de Linux y Docker, redes y desarrollo backend ' +
    'con Python y Django. Disponible para trabajo remoto.',

  /** Palabras clave del perfil, usadas en el JSON-LD. */
  keywords: [
    'Ingeniero de Sistemas', 'VoIP', 'Asterisk', 'SIP', 'IVR', 'Linux',
    'Docker', 'Python', 'Django', 'PostgreSQL', 'Redes', 'Pereira', 'Colombia',
  ],

  lang: 'es',
  locale: 'es_CO',

  /** Imagen de las tarjetas al compartir (1200x630). Se genera en build. */
  ogImage: '/og-image.png',

  /** Color del tema en navegadores moviles. Debe coincidir con --color-bg. */
  themeColor: '#05060b',

  /**
   * Endpoint del formulario de contacto.
   *
   * Vacio ('') = la seccion de contacto muestra solo los canales directos
   * (correo, telefono, WhatsApp, LinkedIn). Es el estado por defecto y
   * funciona perfectamente en un hosting estatico.
   *
   * Si quieres un formulario de verdad, crea un formulario gratuito en
   * https://formspree.io (o https://web3forms.com) y pega aqui la URL que
   * te den. El formulario aparece solo.
   *
   * Por que no se reutiliza forms/contact.php de la plantilla original:
   * PHP necesita un servidor que lo ejecute. GitHub Pages, Netlify y Vercel
   * sirven archivos estaticos, asi que ese archivo nunca correria.
   */
  contactFormEndpoint: '',
};

/**
 * Menu de navegacion.
 * `id` DEBE coincidir con el id de la <section> correspondiente: el
 * scroll-spy (src/scripts/scrollSpy.js) empareja ambos para resaltar el
 * enlace activo mientras el visitante baja por la pagina.
 *
 * @type {import('../types/portfolio.js').NavItem[]}
 */
export const navigation = [
  { id: 'inicio',         label: 'Inicio',           icon: 'home' },
  { id: 'sobre-mi',       label: 'Sobre mí',         icon: 'user' },
  { id: 'habilidades',    label: 'Habilidades',      icon: 'chart' },
  { id: 'trayectoria',    label: 'Trayectoria',      icon: 'timeline' },
  { id: 'proyectos',      label: 'Proyectos',        icon: 'grid' },
  { id: 'especializacion',label: 'Especialización',  icon: 'star' },
  { id: 'contacto',       label: 'Contacto',         icon: 'mail' },
];
