/**
 * ============================================================================
 *  GENERADOR DE LA IMAGEN OPEN GRAPH
 * ============================================================================
 *  QUE ES
 *  La tarjeta de 1200x630 px que se ve cuando alguien comparte el enlace del
 *  portafolio en LinkedIn, WhatsApp, Slack o X.
 *
 *  POR QUE UN SCRIPT Y NO UNA IMAGEN A MANO
 *  Los datos salen de src/data/profile.js. Si manana cambias tu titulo
 *  profesional, vuelves a ejecutar el script y la tarjeta se actualiza sola,
 *  sin abrir un editor de imagenes ni olvidarte de que existia.
 *
 *  POR QUE PNG Y NO SVG
 *  Varios rastreadores (LinkedIn y WhatsApp entre ellos) no renderizan SVG en
 *  las vistas previas: mostrarian un hueco. PNG es el unico formato con
 *  soporte universal para og:image.
 *
 *  COMO EJECUTARLO
 *      npm run og
 *
 *  Usa `sharp`, que ya viene instalado como dependencia de Astro, asi que no
 *  anade nada al proyecto.
 * ============================================================================
 */

import sharp from 'sharp';
import { writeFile } from 'node:fs/promises';
import { profile } from '../src/data/profile.js';

const WIDTH = 1200;
const HEIGHT = 630;

/** Tipografia del sistema: el renderizador de SVG no conoce las fuentes web. */
const FONT = 'DejaVu Sans, Liberation Sans, sans-serif';

/**
 * Estrellas deterministas a partir de una semilla fija: la tarjeta sale
 * identica en cada ejecucion, asi que el archivo no cambia sin motivo y no
 * ensucia el historial de Git.
 */
function estrellas(cantidad) {
  let hash = 20260913;
  let salida = '';

  for (let i = 0; i < cantidad; i += 1) {
    hash = (hash * 1103515245 + 12345) % 2147483648;
    const x = hash % WIDTH;
    hash = (hash * 1103515245 + 12345) % 2147483648;
    const y = hash % HEIGHT;
    hash = (hash * 1103515245 + 12345) % 2147483648;
    const r = ((hash % 100) / 100) * 1.4 + 0.3;
    hash = (hash * 1103515245 + 12345) % 2147483648;
    const o = ((hash % 100) / 100) * 0.55 + 0.15;

    salida += `<circle cx="${x}" cy="${y}" r="${r.toFixed(2)}" fill="#fff" opacity="${o.toFixed(2)}"/>`;
  }

  return salida;
}

/** Escapa los caracteres que romperian el XML del SVG. */
const esc = (texto) =>
  texto
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;');

/** Tecnologias destacadas. Se muestran como chips en la parte inferior. */
const CHIPS = ['Asterisk / VoIP', 'Linux', 'Docker', 'Python', 'Django', 'PostgreSQL'];

/** Dibuja la fila de chips midiendo cada uno por su numero de caracteres. */
function chips(x0, y) {
  let x = x0;
  let salida = '';

  for (const texto of CHIPS) {
    const ancho = texto.length * 11.5 + 36;

    salida += `
      <rect x="${x}" y="${y}" width="${ancho}" height="42" rx="21"
            fill="#ffffff" fill-opacity="0.06" stroke="#ffffff" stroke-opacity="0.16"/>
      <text x="${x + ancho / 2}" y="${y + 27}" font-family="${FONT}" font-size="18"
            fill="#a8aec4" text-anchor="middle">${esc(texto)}</text>`;

    x += ancho + 12;
  }

  return salida;
}

const svg = `
<svg xmlns="http://www.w3.org/2000/svg" width="${WIDTH}" height="${HEIGHT}" viewBox="0 0 ${WIDTH} ${HEIGHT}">
  <defs>
    <linearGradient id="stela" x1="0" y1="0" x2="1" y2="0.6">
      <stop offset="0%"   stop-color="#7c5cff"/>
      <stop offset="50%"  stop-color="#45d6f5"/>
      <stop offset="100%" stop-color="#e26bd0"/>
    </linearGradient>

    <radialGradient id="nebulosaVioleta" cx="18%" cy="8%" r="62%">
      <stop offset="0%"   stop-color="#7c5cff" stop-opacity="0.55"/>
      <stop offset="100%" stop-color="#7c5cff" stop-opacity="0"/>
    </radialGradient>

    <radialGradient id="nebulosaCian" cx="88%" cy="82%" r="55%">
      <stop offset="0%"   stop-color="#45d6f5" stop-opacity="0.32"/>
      <stop offset="100%" stop-color="#45d6f5" stop-opacity="0"/>
    </radialGradient>
  </defs>

  <!-- Fondo: espacio profundo + dos nebulosas + campo estelar -->
  <rect width="${WIDTH}" height="${HEIGHT}" fill="#05060b"/>
  <rect width="${WIDTH}" height="${HEIGHT}" fill="url(#nebulosaVioleta)"/>
  <rect width="${WIDTH}" height="${HEIGHT}" fill="url(#nebulosaCian)"/>
  ${estrellas(190)}

  <!-- Monograma -->
  <circle cx="96" cy="96" r="34" fill="url(#stela)"/>
  <text x="96" y="97" font-family="${FONT}" font-size="30" font-weight="bold"
        fill="#08090f" text-anchor="middle" dominant-baseline="central">${esc(profile.initials)}</text>

  <!-- Disponibilidad -->
  <circle cx="160" cy="96" r="5" fill="#3ddc97"/>
  <text x="176" y="103" font-family="${FONT}" font-size="19" fill="#a8aec4">${esc(profile.availability)}</text>

  <!-- Nombre, a dos lineas para que respire -->
  <text x="80" y="290" font-family="${FONT}" font-size="72" font-weight="bold" fill="#f2f4fa">Juan David</text>
  <text x="80" y="372" font-family="${FONT}" font-size="72" font-weight="bold" fill="url(#stela)">Guzmán Castro</text>

  <!-- Titulo profesional -->
  <text x="80" y="430" font-family="${FONT}" font-size="30" fill="#a8aec4">${esc(profile.role)}</text>

  <!-- Ubicacion -->
  <text x="80" y="474" font-family="${FONT}" font-size="21" fill="#6e7690">${esc(profile.location)}</text>

  <!-- Stack -->
  ${chips(80, 528)}

  <!-- Filo inferior con la estela -->
  <rect x="0" y="${HEIGHT - 6}" width="${WIDTH}" height="6" fill="url(#stela)"/>
</svg>`;

const png = await sharp(Buffer.from(svg)).png({ compressionLevel: 9 }).toBuffer();
await writeFile(new URL('../public/og-image.png', import.meta.url), png);

console.log(`✓ public/og-image.png generado — ${WIDTH}x${HEIGHT}, ${(png.length / 1024).toFixed(1)} KB`);
