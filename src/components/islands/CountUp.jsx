/**
 * ============================================================================
 *  ISLA REACT — COUNTUP
 * ============================================================================
 *  Anima una cifra desde 0 hasta su valor final la primera vez que entra en
 *  pantalla. Sustituye a PureCounter (~4 KB) de la plantilla original.
 *
 *  DETALLES QUE LO HACEN CORRECTO
 *  · Usa requestAnimationFrame, no setInterval: el conteo va sincronizado con
 *    el refresco real de la pantalla, sin saltos.
 *  · La curva es easeOutExpo, asi que arranca rapido y frena al final. Un
 *    conteo lineal se percibe mecanico.
 *  · El valor final se renderiza ya en el HTML del build: si el JavaScript no
 *    llegara a ejecutarse, la cifra correcta esta igualmente ahi.
 *  · aria-hidden sobre el numero que cambia + el valor final en texto oculto,
 *    para que un lector de pantalla no lea 60 numeros distintos.
 * ============================================================================
 */

import { useEffect, useRef, useState } from 'react';

const DURATION_MS = 1600;

/**
 * @param {{ value: number, suffix?: string, label: string }} props
 */
export default function CountUp({ value, suffix = '', label }) {
  const [display, setDisplay] = useState(value);
  const nodeRef = useRef(/** @type {HTMLSpanElement|null} */ (null));

  useEffect(() => {
    const node = nodeRef.current;
    if (!node) return;

    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReduced || !('IntersectionObserver' in window)) return;

    let frameId = 0;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        observer.disconnect(); // se anima una sola vez

        const start = performance.now();

        const step = (now) => {
          const progress = Math.min((now - start) / DURATION_MS, 1);
          // easeOutExpo: rapido al principio, suave al llegar
          const eased = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress);

          setDisplay(Math.round(value * eased));

          if (progress < 1) frameId = requestAnimationFrame(step);
        };

        setDisplay(0);
        frameId = requestAnimationFrame(step);
      },
      { threshold: 0.4 }
    );

    observer.observe(node);

    return () => {
      observer.disconnect();
      cancelAnimationFrame(frameId);
    };
  }, [value]);

  return (
    <div className="stat">
      <span className="stat__value" ref={nodeRef} aria-hidden="true">
        {display}
        {suffix}
      </span>
      <span className="visually-hidden">{`${value}${suffix}`}</span>
      <span className="stat__label">{label}</span>
    </div>
  );
}
