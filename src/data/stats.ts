// Fuente: 02-content-home.md §8 («35K» = valor final observado del contador) ·
// 04-assets-map.md.
import type { Stat } from './types';

export const stat: Stat = {
  intro: 'Únete a más de',
  value: '35K',
  outro: 'agentes de cambio',
};

export const statsCta = {
  label: 'Quiero unirme',
  href: '/suscripcion',
} as const;

export const statsBackground = require('../../assets/images/stats-bg.jpg');

export const statsBackgroundAlt = 'Bosque';
