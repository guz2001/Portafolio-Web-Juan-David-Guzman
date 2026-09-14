/**
 * ============================================================================
 *  TIPOS DEL PORTAFOLIO  (JSDoc typedefs)
 * ============================================================================
 *  Este archivo no genera codigo: solo define "contratos" de datos.
 *  VS Code los lee y te da autocompletado + errores en rojo si escribes mal
 *  un campo en src/data/, sin el coste de compilar TypeScript.
 *
 *  Como usarlo en cualquier archivo de datos:
 *      /** @type {import('../types/portfolio.js').Project[]} *\/
 *      export const projects = [ ... ];
 * ============================================================================
 */

/**
 * Enlace a una red social o perfil externo.
 * @typedef  {Object} SocialLink
 * @property {string} id      Identificador unico (ej. 'github').
 * @property {string} label   Nombre visible y texto para lectores de pantalla.
 * @property {string} href    URL absoluta.
 * @property {string} icon    Clave del icono en components/ui/Icon.astro.
 */

/**
 * Datos personales y de contacto.
 * @typedef  {Object} Profile
 * @property {string}       name          Nombre completo.
 * @property {string}       role          Titulo profesional principal.
 * @property {string[]}     roleRotation  Titulos que rotan en el hero.
 * @property {string}       summary       Perfil profesional (1 parrafo).
 * @property {string}       location      Ciudad, pais.
 * @property {string}       availability  Disponibilidad declarada.
 * @property {string}       email         Correo de contacto.
 * @property {string}       phone         Telefono en formato legible.
 * @property {string}       phoneRaw      Telefono en formato E.164 para tel:.
 * @property {string}       photo         Ruta a la foto (vacio = monograma).
 * @property {string}       initials      Iniciales para el monograma fallback.
 * @property {SocialLink[]} socials       Perfiles externos.
 */

/**
 * Una competencia concreta dentro de una categoria.
 * @typedef  {Object} Skill
 * @property {string} name   Nombre de la tecnologia o competencia.
 * @property {number} level  Dominio 0-100. Se usa para la barra de progreso.
 */

/**
 * Grupo de competencias afines.
 * @typedef  {Object} SkillCategory
 * @property {string}  id      Identificador unico.
 * @property {string}  title   Titulo del grupo.
 * @property {string}  icon    Clave del icono.
 * @property {Skill[]} skills  Competencias del grupo.
 */

/**
 * Un puesto de trabajo.
 * @typedef  {Object} ExperienceItem
 * @property {string}   id            Identificador unico.
 * @property {string}   role          Cargo.
 * @property {string}   company       Empresa.
 * @property {string}   period        Periodo legible (ej. 'Jun 2026 - Sep 2026').
 * @property {string}   startDate     Fecha ISO de inicio, para ordenar y <time>.
 * @property {string}   location      Ciudad y modalidad.
 * @property {string[]} achievements  Logros y responsabilidades.
 * @property {string[]} stack         Tecnologias usadas en el puesto.
 */

/**
 * Un titulo, curso o certificacion.
 * @typedef  {Object} EducationItem
 * @property {string}  id           Identificador unico.
 * @property {string}  title        Nombre del programa.
 * @property {string}  institution  Institucion que lo imparte.
 * @property {string}  period       Periodo legible.
 * @property {string}  startDate    Fecha ISO de inicio, para ordenar.
 * @property {string=} hours        Carga horaria, si aplica.
 * @property {string=} note         Estado o detalle (ej. 'Graduado').
 * @property {boolean} isDegree     true = titulo universitario (se destaca).
 */

/**
 * Un proyecto del portafolio.
 * @typedef  {Object} Project
 * @property {string}   slug         Identificador para la URL /proyectos/<slug>.
 * @property {string}   title        Nombre del proyecto.
 * @property {string}   tagline      Frase corta para la tarjeta.
 * @property {string}   description  Descripcion completa para el detalle.
 * @property {string[]} categories   Categorias para el filtro (ver PROJECT_FILTERS).
 * @property {string[]} stack        Tecnologias usadas.
 * @property {string[]} highlights   Decisiones tecnicas destacables.
 * @property {ProjectLink[]} links   Repositorios y demos.
 * @property {string=}  cover        Ruta a imagen de portada (vacio = portada generada).
 * @property {string}   accent       Color de acento en HSL, para la portada generada.
 * @property {boolean}  featured     true = aparece en la home.
 * @property {string}   year         Año o rango.
 */

/**
 * Enlace de un proyecto.
 * @typedef  {Object} ProjectLink
 * @property {string} label  Texto visible.
 * @property {string} href   URL.
 * @property {string} icon   Clave del icono.
 */

/**
 * Area de especializacion (sustituye a "Servicios" de la plantilla).
 * @typedef  {Object} ExpertiseArea
 * @property {string}   id           Identificador unico.
 * @property {string}   title        Titulo del area.
 * @property {string}   description  Que sabes hacer en esa area.
 * @property {string}   icon         Clave del icono.
 * @property {string[]} keywords     Tecnologias concretas del area.
 */

/**
 * Cifra verificable para la seccion de estadisticas.
 * @typedef  {Object} Stat
 * @property {string}  id     Identificador unico.
 * @property {number}  value  Valor numerico (lo anima el contador).
 * @property {string=} suffix Sufijo (ej. '+', ' h').
 * @property {string}  label  Que representa la cifra.
 */

/**
 * Entrada del menu de navegacion.
 * @typedef  {Object} NavItem
 * @property {string} id     Debe coincidir con el id de la <section>.
 * @property {string} label  Texto del enlace.
 * @property {string} icon   Clave del icono.
 */

export {};
