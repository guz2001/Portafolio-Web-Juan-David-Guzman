/**
 * ============================================================================
 *  CAMPO ESTELAR  —  Fondo animado en <canvas>
 * ============================================================================
 *  QUE HACE
 *  Dibuja estrellas que derivan muy despacio y parpadean, mas un par de
 *  estrellas fugaces ocasionales. Es el fondo "galaxia" del sitio.
 *
 *  POR QUE CANVAS Y NO UNA IMAGEN
 *  Una foto de cielo estrellado de calidad pesa entre 300 KB y 1 MB. Este
 *  script ocupa ~2 KB, se adapta a cualquier resolucion sin pixelarse y
 *  permite que las estrellas se muevan.
 *
 *  DECISIONES DE RENDIMIENTO
 *  - La densidad depende del area de la pantalla, con un tope: un movil no
 *    dibuja las mismas estrellas que un monitor 4K.
 *  - En pantallas Retina se limita el devicePixelRatio a 2: por encima de ahi
 *    no se aprecia diferencia y el coste de pintado se dispara.
 *  - Si la pestana pasa a segundo plano, requestAnimationFrame se detiene
 *    solo (lo hace el navegador) y ademas paramos el bucle explicitamente.
 *  - Con prefers-reduced-motion el campo se dibuja UNA vez, estatico.
 * ============================================================================
 */

/**
 * Inicializa el campo estelar sobre un canvas.
 * @param {HTMLCanvasElement} canvas
 * @returns {() => void} funcion para detener y limpiar la animacion
 */
export function initStarfield(canvas) {
  const ctx = canvas.getContext('2d', { alpha: true });
  if (!ctx) return () => {};

  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /** @type {{x:number,y:number,r:number,alpha:number,speed:number,phase:number,hue:number}[]} */
  let stars = [];
  /** @type {{x:number,y:number,len:number,speed:number,life:number}|null} */
  let shootingStar = null;
  let animationId = 0;
  let width = 0;
  let height = 0;

  /** Tonos de la paleta: blanco, violeta nebulosa y cian plasma. */
  const HUES = [0, 253, 192];

  /** Reconstruye el canvas y la poblacion de estrellas al cambiar el tamano. */
  function resize() {
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    width = canvas.clientWidth;
    height = canvas.clientHeight;

    canvas.width = Math.floor(width * dpr);
    canvas.height = Math.floor(height * dpr);
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

    // 1 estrella por cada 9000 px^2, entre 60 y 320 en total.
    const count = Math.round(
      Math.min(320, Math.max(60, (width * height) / 9000))
    );

    stars = Array.from({ length: count }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      r: Math.random() * 1.25 + 0.25,
      alpha: Math.random() * 0.6 + 0.2,
      speed: Math.random() * 0.05 + 0.012,   // deriva vertical, muy lenta
      phase: Math.random() * Math.PI * 2,    // desfase del parpadeo
      hue: HUES[Math.floor(Math.random() * HUES.length)],
    }));
  }

  /**
   * Pinta un fotograma.
   * @param {number} time milisegundos desde el inicio, los da rAF
   */
  function draw(time) {
    ctx.clearRect(0, 0, width, height);

    for (const star of stars) {
      // Parpadeo: una senoidal desfasada por estrella evita que titilen todas a la vez
      const twinkle = reducedMotion
        ? star.alpha
        : star.alpha * (0.65 + 0.35 * Math.sin(time * 0.001 + star.phase));

      ctx.beginPath();
      ctx.arc(star.x, star.y, star.r, 0, Math.PI * 2);
      ctx.fillStyle =
        star.hue === 0
          ? `rgba(255,255,255,${twinkle})`
          : `hsla(${star.hue}, 90%, 75%, ${twinkle})`;
      ctx.fill();

      if (!reducedMotion) {
        star.y += star.speed;
        // Reciclado: la estrella que sale por abajo reaparece arriba
        if (star.y > height) {
          star.y = -2;
          star.x = Math.random() * width;
        }
      }
    }

    if (!reducedMotion) drawShootingStar();

    animationId = requestAnimationFrame(draw);
  }

  /** Estrella fugaz ocasional: aparece con probabilidad baja por fotograma. */
  function drawShootingStar() {
    if (!shootingStar && Math.random() < 0.0018) {
      shootingStar = {
        x: Math.random() * width * 0.7,
        y: Math.random() * height * 0.4,
        len: Math.random() * 90 + 70,
        speed: Math.random() * 5 + 7,
        life: 1,
      };
    }
    if (!shootingStar) return;

    const s = shootingStar;
    const gradient = ctx.createLinearGradient(s.x, s.y, s.x - s.len, s.y - s.len * 0.45);
    gradient.addColorStop(0, `rgba(255,255,255,${s.life * 0.9})`);
    gradient.addColorStop(1, 'rgba(255,255,255,0)');

    ctx.beginPath();
    ctx.moveTo(s.x, s.y);
    ctx.lineTo(s.x - s.len, s.y - s.len * 0.45);
    ctx.strokeStyle = gradient;
    ctx.lineWidth = 1.6;
    ctx.stroke();

    s.x += s.speed;
    s.y += s.speed * 0.45;
    s.life -= 0.012;

    if (s.life <= 0 || s.x > width + s.len) shootingStar = null;
  }

  // --- Arranque -----------------------------------------------------------
  resize();

  if (reducedMotion) {
    draw(0);                       // un fotograma fijo
    cancelAnimationFrame(animationId);
  } else {
    animationId = requestAnimationFrame(draw);
  }

  // Redimensionado con "debounce": recrear estrellas en cada pixel de arrastre
  // seria costoso, asi que esperamos a que el usuario termine.
  /** @type {number|undefined} */
  let resizeTimer;
  function onResize() {
    window.clearTimeout(resizeTimer);
    resizeTimer = window.setTimeout(resize, 180);
  }
  window.addEventListener('resize', onResize, { passive: true });

  // Pestana oculta: no gastar CPU ni bateria pintando lo que nadie ve.
  function onVisibilityChange() {
    if (document.hidden) {
      cancelAnimationFrame(animationId);
    } else if (!reducedMotion) {
      animationId = requestAnimationFrame(draw);
    }
  }
  document.addEventListener('visibilitychange', onVisibilityChange);

  return () => {
    cancelAnimationFrame(animationId);
    window.removeEventListener('resize', onResize);
    document.removeEventListener('visibilitychange', onVisibilityChange);
  };
}
