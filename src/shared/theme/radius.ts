// Fuente: docs/exploration/03-design-tokens.md §5.1 (vars reales del sitio).

export const radius = {
  lg: 8, // --radius-lg · también rx=8 de los iconos de beneficios
  xl: 12, // --radius-xl, definido en theme del sitio; sin uso observado
  '2xl': 16, // tarjeta zona home, thumbnail video, imagen avance, botón de plan
  '3xl': 24, // tarjeta testimonios, tarjeta zona /zonas (⚠ 03 §6.4), franja planes
  full: 9999, // rounded-full (computado ~3.4e7px; 9999 es la convención RN)
} as const;
