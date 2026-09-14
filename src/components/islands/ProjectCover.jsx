/**
 * ============================================================================
 *  PROJECT COVER  —  Portada de proyecto generada por codigo
 * ============================================================================
 *  PROBLEMA QUE RESUELVE
 *  Un portafolio recien nacido casi nunca tiene capturas decentes de todos
 *  sus proyectos, y poner imagenes de stock genericas resta credibilidad.
 *
 *  SOLUCION
 *  Si el proyecto no trae `cover`, se dibuja una portada SVG: un campo de
 *  estrellas, una nebulosa del color `accent` del proyecto y sus iniciales.
 *  Coherente con el tema galactico, 0 bytes de imagen y nitida en cualquier
 *  resolucion porque es vectorial.
 *
 *  En cuanto tengas una captura real, rellena `cover` en projects.js y este
 *  componente se aparta solo.
 * ============================================================================
 */

/**
 * Genera posiciones deterministas a partir del slug del proyecto.
 * Deterministas = el servidor y el navegador dibujan EXACTAMENTE las mismas
 * estrellas. Con Math.random() el HTML del build y el de la hidratacion no
 * coincidirian y React lanzaria un error de hidratacion.
 *
 * @param {string} seed
 * @param {number} count
 */
function seededStars(seed, count) {
  let hash = 0;
  for (let i = 0; i < seed.length; i += 1) {
    hash = (hash * 31 + seed.charCodeAt(i)) % 100000;
  }

  return Array.from({ length: count }, (_, i) => {
    hash = (hash * 1103515245 + 12345) % 2147483648;
    const x = (hash % 1000) / 10;
    hash = (hash * 1103515245 + 12345) % 2147483648;
    const y = (hash % 1000) / 10;
    hash = (hash * 1103515245 + 12345) % 2147483648;
    const r = ((hash % 100) / 100) * 1.1 + 0.3;
    return { x, y, r, key: `${seed}-${i}` };
  });
}

/**
 * @param {{ title: string, slug: string, accent: string, cover?: string }} props
 */
export default function ProjectCover({ title, slug, accent, cover }) {
  // Con captura real, se usa la imagen y nada mas.
  if (cover) {
    return (
      <img
        className="project-cover__img"
        src={cover}
        alt={`Captura del proyecto ${title}`}
        loading="lazy"
        decoding="async"
        width="640"
        height="360"
      />
    );
  }

  const initials = title
    .split(/\s+/)
    .slice(0, 2)
    .map((word) => word[0])
    .join('')
    .toUpperCase();

  const stars = seededStars(slug, 26);
  const gradientId = `neb-${slug}`;

  return (
    <svg
      className="project-cover__svg"
      viewBox="0 0 100 56"
      preserveAspectRatio="xMidYMid slice"
      role="img"
      aria-label={`Portada generada para ${title}`}
    >
      <defs>
        <radialGradient id={gradientId} cx="30%" cy="25%" r="75%">
          <stop offset="0%"   stopColor={`hsl(${accent} / 0.75)`} />
          <stop offset="45%"  stopColor={`hsl(${accent} / 0.22)`} />
          <stop offset="100%" stopColor="transparent" />
        </radialGradient>
      </defs>

      <rect width="100" height="56" fill="#080a14" />
      <rect width="100" height="56" fill={`url(#${gradientId})`} />

      {stars.map((star) => (
        <circle
          key={star.key}
          cx={star.x}
          cy={(star.y * 56) / 100}
          r={star.r * 0.35}
          fill="#ffffff"
          opacity={0.25 + star.r * 0.35}
        />
      ))}

      <text
        x="50"
        y="50%"
        textAnchor="middle"
        dominantBaseline="central"
        fontSize="17"
        fontWeight="700"
        fontFamily="'Space Grotesk Variable', system-ui, sans-serif"
        fill="#ffffff"
        opacity="0.92"
        letterSpacing="1"
      >
        {initials}
      </text>
    </svg>
  );
}
