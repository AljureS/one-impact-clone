// Fuente: 02-content-home.md §7 (nombres = alt verbatim) · 04-assets-map.md.
import type { Partner } from './types';

export const partners: Partner[] = [
  {
    id: 'wwf',
    name: 'WWF',
    logo: require('../../assets/images/allies/wwf.png'),
  },
  {
    id: 'ci',
    name: 'Conservation International',
    logo: require('../../assets/images/allies/ci.png'),
  },
  {
    id: 'tnc',
    name: 'The Nature Conservancy',
    logo: require('../../assets/images/allies/tnc.png'),
  },
];

// home §7, encabezado de la sección (sin CTA).
export const partnersSection = {
  title: 'Conoce a nuestros aliados',
  paragraph:
    'Instituciones globales que aportan legitimidad técnica y compromiso verificable en cada territorio',
} as const;
