// Fuente: docs/exploration/03-design-tokens.md §1, §2 y §5.2 (valores observados).

export const colors = {
  // §1.1 Marca / acento
  accent: '#C8D400',
  accentDark: '#A8B200',
  forest: '#0F1A0A',
  darkGreen: '#243B1A',
  topoGreen: '#5A7045', // stroke del patrón topográfico del hero de zonas

  // §1.2 Fondos de sección
  zonesSectionBg: '#DBE64C', // home: sección zonas
  sandBg: '#F0ECE4', // zonas: hero y grid · suscripcion: ambas sections
  testimonialsBg: '#FFF6EA', // home: testimonios
  testimonialDecorCream: '#FFF1DA', // decorativo en testimonios, ubicación no atribuida (03 §1.2)
  testimonialDecorYellow: '#FFE97A', // decorativo en testimonios, ubicación no atribuida (03 §1.2)
  footerBg: '#2D3A42',
  zonesCtaBg: '#1E1E1E', // home: CTA «Explora todas las zonas»
  neutral100: '#F5F5F5', // home: sección aliados

  // §1.3 Neutros / texto
  white: '#FFFFFF',
  black: '#000000',
  bodyText: '#171717', // color de texto por defecto del body
  gray900: '#101828',
  gray800: '#1E2939',
  gray700: '#364153',
  gray600: '#4A5565',
  gray500: '#6A7282',
  gray400: '#99A1AF',
  gray300: '#D1D5DC', // en theme del sitio, sin uso observado
  gray200: '#E5E7EB',
  gray100: '#F3F4F6',
  red500: '#FB2C36', // en theme del sitio, sin uso observado
} as const;

// §2 Overlays / transparencias
export const overlays = {
  white10: 'rgba(255, 255, 255, 0.1)',
  white20: 'rgba(255, 255, 255, 0.2)',
  white25: 'rgba(255, 255, 255, 0.25)', // ubicación no atribuida (03 §2)
  white30: 'rgba(255, 255, 255, 0.3)',
  white40: 'rgba(255, 255, 255, 0.4)',
  white50: 'rgba(255, 255, 255, 0.5)',
  white60: 'rgba(255, 255, 255, 0.6)',
  white70: 'rgba(255, 255, 255, 0.7)',
  white80: 'rgba(255, 255, 255, 0.8)',
  white90: 'rgba(255, 255, 255, 0.9)',
  black10: 'rgba(0, 0, 0, 0.1)',
  black20: 'rgba(0, 0, 0, 0.2)',
  black30: 'rgba(0, 0, 0, 0.3)',
  black45: 'rgba(0, 0, 0, 0.45)',
  black60: 'rgba(0, 0, 0, 0.6)',
  black70: 'rgba(0, 0, 0, 0.7)',
  black80: 'rgba(0, 0, 0, 0.8)',
  forest80: 'rgba(15, 26, 10, 0.8)', // overlay de stats-cta
  transparent: 'transparent',
} as const;

// §5.2 Gradientes: stops en orden de arriba hacia abajo.
export const gradients = {
  heroHome: [overlays.black60, overlays.black20, overlays.black70],
  zoneCardHome: [overlays.transparent, overlays.transparent, overlays.black80],
  zoneCardZones: [overlays.transparent, overlays.black30, overlays.black80], // ⚠ 03 §6.5
  testimonialCard: [
    overlays.transparent,
    overlays.transparent,
    overlays.black45,
  ],
} as const;
