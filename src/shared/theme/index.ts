// Sombras: la vía elegida para el proyecto es `boxShadow` cross-platform (new
// architecture, RN 0.86). No hay token todavía: 03-design-tokens §5.3 solo
// capturó los nombres de clase (shadow-sm, shadow-md), no los valores; cuando
// se observen, el token único se añade aquí. No inventar sombras por componente.

export { colors, gradients, overlays } from './colors';
export { gutter, spacing } from './spacing';
export { radius } from './radius';
export { fontFamily, typography } from './typography';
