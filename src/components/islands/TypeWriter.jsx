/**
 * ============================================================================
 *  ISLA REACT — TYPEWRITER
 * ============================================================================
 *  Escribe y borra los distintos titulos profesionales en el hero.
 *
 *  POR QUE ES UNA ISLA Y NO LA LIBRERIA typed.js DE LA PLANTILLA
 *  typed.js son ~13 KB minificados para un efecto que aqui ocupa 40 lineas.
 *  Ademas la libreria manipula el DOM por su cuenta, mientras que este
 *  componente mantiene el texto en estado de React y lo deja declarativo.
 *
 *  ACCESIBILIDAD — el punto importante de este componente
 *  Un texto que cambia letra a letra es ruido puro para un lector de
 *  pantalla: lo leeria decenas de veces por segundo. La solucion aplicada:
 *    · El texto animado va en aria-hidden, invisible para la tecnologia
 *      asistiva.
 *    · Al lado, en .visually-hidden, se expone UNA vez la lista completa de
 *      titulos en texto plano.
 *  Quien ve la pantalla disfruta la animacion; quien usa lector recibe la
 *  informacion completa, sin repeticion.
 *
 *  MOVIMIENTO REDUCIDO
 *  Con prefers-reduced-motion el componente se salta la animacion y muestra
 *  directamente el primer titulo.
 * ============================================================================
 */

import { useEffect, useRef, useState } from 'react';

const TYPE_SPEED_MS = 62;    // velocidad al escribir
const DELETE_SPEED_MS = 32;  // borrar siempre se siente mejor mas rapido
const HOLD_MS = 1900;        // pausa con la frase completa en pantalla

/**
 * @param {{ phrases: string[] }} props
 */
export default function TypeWriter({ phrases }) {
  const safePhrases = phrases?.length ? phrases : [''];

  // Arranca con la primera frase completa: asi el HTML generado en el build
  // ya contiene texto real y no hay un hueco vacio antes de hidratar.
  const [text, setText] = useState(safePhrases[0]);
  const [animated, setAnimated] = useState(false);

  const indexRef = useRef(0);
  const deletingRef = useRef(false);

  useEffect(() => {
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReduced || safePhrases.length < 2) return;

    setAnimated(true);

    /** @type {number|undefined} */
    let timer;

    const tick = () => {
      const current = safePhrases[indexRef.current];

      setText((previous) => {
        // Escribiendo
        if (!deletingRef.current) {
          const next = current.slice(0, previous.length + 1);

          if (next === current) {
            deletingRef.current = true;
            timer = window.setTimeout(tick, HOLD_MS);
          } else {
            timer = window.setTimeout(tick, TYPE_SPEED_MS);
          }
          return next;
        }

        // Borrando
        const next = current.slice(0, Math.max(0, previous.length - 1));

        if (next === '') {
          deletingRef.current = false;
          indexRef.current = (indexRef.current + 1) % safePhrases.length;
          timer = window.setTimeout(tick, 260);
        } else {
          timer = window.setTimeout(tick, DELETE_SPEED_MS);
        }
        return next;
      });
    };

    // Antes de empezar a borrar la frase inicial, se deja leerla.
    deletingRef.current = true;
    timer = window.setTimeout(tick, HOLD_MS);

    // Limpieza obligatoria: sin esto el temporizador seguiria vivo tras
    // desmontar el componente y provocaria una fuga de memoria.
    return () => window.clearTimeout(timer);
  }, [safePhrases]);

  return (
    <span className="typewriter">
      {/* Version visible: decorativa, oculta a lectores de pantalla */}
      <span aria-hidden="true">
        <span className="typewriter__text">{text}</span>
        {animated && <span className="type-cursor" />}
      </span>

      {/* Version accesible: se anuncia una sola vez, completa y sin animar */}
      <span className="visually-hidden">
        {safePhrases.join('. ')}
      </span>
    </span>
  );
}
