// @ts-check
import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import sitemap from '@astrojs/sitemap';
import { site } from './src/config/site.js';

/**
 * ============================================================================
 *  CONFIGURACION DE ASTRO
 * ============================================================================
 *  - `site` y `base` se leen de src/config/site.js para no repetir el dominio
 *    en dos sitios (una sola fuente de verdad tambien para la configuracion).
 *  - `output: 'static'` genera HTML plano en dist/: se puede publicar en
 *    GitHub Pages, Netlify, Vercel o cualquier hosting estatico, sin servidor.
 *  - La integracion de React solo actua sobre los componentes .jsx marcados
 *    con una directiva client:*. El resto del sitio no envia JavaScript.
 * ============================================================================
 */
export default defineConfig({
  site: site.url,
  base: site.base,
  output: 'static',
  // sitemap genera sitemap-index.xml en el build: es lo que se le entrega a
  // Google Search Console para que indexe la home y cada pagina de proyecto.
  integrations: [react(), sitemap()],
  build: {
    // Un unico archivo CSS en lugar de uno por componente: menos peticiones.
    inlineStylesheets: 'auto',
  },
  vite: {
    build: {
      // Avisa si algun bundle supera los 150 KB, para detectar a tiempo que
      // una dependencia nueva esta engordando la pagina.
      chunkSizeWarningLimit: 150,
    },
  },
});
