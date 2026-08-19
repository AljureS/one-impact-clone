// Fuente: 02-content-home.md §5 · 02-content-zonas.md §1–2 · 01-sitemap.md ·
// 04-assets-map.md. El sitio no tiene orden global de zonas: cada pantalla
// muestra su propio conjunto/orden (homeZones y zonesGridZones).
import type { Zone } from './types';

export const zones: Zone[] = [
  {
    slug: 'amazonia',
    titleHome: 'Amazonia',
    titleZones: 'Amazonía',
    description:
      'Pulmón verde clave para la estabilización climática del planeta.',
    image: require('../../assets/images/zones/amazonia.jpg'),
  },
  {
    slug: 'mexico',
    titleZones: 'México',
    description:
      'Hogar de los manglares más estratégicos del planeta para la captura de carbono y la preservación costera.',
    image: require('../../assets/images/zones/mexico.jpg'),
  },
  {
    slug: 'africa',
    titleZones: 'África',
    description:
      'Territorio esencial para la resiliencia climática global y la protección de comunidades.',
    image: require('../../assets/images/zones/africa.jpg'),
  },
  {
    slug: 'borneo',
    titleHome: 'Borneo',
    image: require('../../assets/images/zones/borneo.jpg'),
  },
  {
    slug: 'patagonia',
    titleHome: 'Patagonia',
    image: require('../../assets/images/zones/patagonia.jpg'),
  },
];

/** Tarjetas de home › «Nuestras zonas one impact», en su orden observado. */
export const homeZones: Zone[] = [zones[0], zones[3], zones[4]];

/** Tarjetas de /zonas › zonas-grid, en su orden observado. */
export const zonesGridZones: Zone[] = [zones[0], zones[1], zones[2]];

// home §5
export const homeZonesSection = {
  title: 'Nuestras zonas one impact',
  paragraph: 'Conectamos aportes, proyectos y seguimiento en un mismo lugar',
  cta: { label: 'Explora todas las zonas', href: '/zonas' },
} as const;

// /zonas §1 (hero sin CTA)
export const zonesHero = {
  title: 'Zonas One Impact',
  paragraph:
    'Conoce los territorios donde ya hemos ejecutado iniciativas y los que se integrarán en las próximas fases.',
} as const;

/** Chip de tarjeta de zona, mismo label en home y /zonas (estilos divergen: 03 §6.3). */
export const zoneCardChipLabel = 'Ver más';
