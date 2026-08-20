// Fuente: docs/exploration/03-design-tokens.md §3. Familia única del sitio:
// Geist (pesos observados 400/500/600/700/900), servida por
// @expo-google-fonts/geist; la carga vive en app/_layout.tsx.
// Valores a 390 (target móvil); donde 390 no se re-midió se usa el valor 1440
// documentado. Un lineHeight no capturado se omite (no se inventa) — queda el
// default de RN y está reportado como faltante.

const fontFamily = {
  regular: 'Geist_400Regular',
  medium: 'Geist_500Medium',
  semiBold: 'Geist_600SemiBold',
  bold: 'Geist_700Bold',
  black: 'Geist_900Black',
} as const;

export const typography = {
  // h1 por pantalla — ⚠ 03 §6.2/§6.6: pesos 900 (home) vs 700 (zonas/susc.), no unificar.
  display: {
    home: { fontFamily: fontFamily.black, fontSize: 36, lineHeight: 45 },
    zones: { fontFamily: fontFamily.bold, fontSize: 36, lineHeight: 45 },
    subscription: {
      fontFamily: fontFamily.bold,
      fontSize: 30,
      lineHeight: 37.5,
    },
  },
  // h2/h3 — mismo conflicto de peso 900/700 entre pantallas.
  title: {
    sectionHome: { fontFamily: fontFamily.black, fontSize: 30 }, // h2 home (grande y chica convergen a 30 en 390); lh 390 no capturado
    sectionZones: {
      fontFamily: fontFamily.bold,
      fontSize: 30,
      lineHeight: 37.5,
    }, // h2 avances y h2 tarjeta zona /zonas
    benefits: { fontFamily: fontFamily.bold, fontSize: 24 }, // lh 390 no capturado
    zoneCardHome: {
      fontFamily: fontFamily.black,
      fontSize: 24,
      lineHeight: 32,
    }, // h3; valores 1440, 390 no re-medido
    advanceCard: {
      fontFamily: fontFamily.bold,
      fontSize: 14,
      lineHeight: 19.25,
    }, // color accent
  },
  body: {
    default: { fontFamily: fontFamily.regular, fontSize: 16, lineHeight: 24 }, // body, p hero home 390, p hero suscripcion
    relaxed: { fontFamily: fontFamily.regular, fontSize: 16, lineHeight: 26 }, // p hero zonas 390, quote testimonio
    zoneCard: {
      fontFamily: fontFamily.regular,
      fontSize: 14,
      lineHeight: 19.25,
    },
    advanceCard: {
      fontFamily: fontFamily.regular,
      fontSize: 12,
      lineHeight: 19.5,
    },
    benefitTitle: {
      fontFamily: fontFamily.semiBold,
      fontSize: 14,
      lineHeight: 19.25,
    },
    benefitDescription: {
      fontFamily: fontFamily.regular,
      fontSize: 14,
      lineHeight: 19.25,
    },
  },
  // §3.3 — cifras de stats (390); lh 390 no capturado en los tres roles.
  stats: {
    intro: { fontFamily: fontFamily.regular, fontSize: 18 },
    number: { fontFamily: fontFamily.black, fontSize: 72 },
    outro: { fontFamily: fontFamily.medium, fontSize: 20 },
  },
  // §3.4 — ⚠ 03 §6.3: chip «Ver más» difiere entre home y zonas, no unificar.
  button: {
    ctaRound: { fontFamily: fontFamily.bold, fontSize: 14, lineHeight: 20 },
    ctaCommunity: { fontFamily: fontFamily.semiBold, fontSize: 14 },
    chipHome: { fontFamily: fontFamily.bold, fontSize: 14 },
    chipZones: { fontFamily: fontFamily.semiBold, fontSize: 14 },
    toggle: { fontFamily: fontFamily.semiBold, fontSize: 14, lineHeight: 20 },
    ctaSubscribe: {
      fontFamily: fontFamily.semiBold,
      fontSize: 16,
      lineHeight: 24,
    },
  },
  // §3.5
  caption: {
    testimonialName: { fontFamily: fontFamily.semiBold, fontSize: 14 },
    testimonialRole: {
      fontFamily: fontFamily.regular,
      fontSize: 11,
      lineHeight: 16.5,
    },
    avatarName: {
      fontFamily: fontFamily.semiBold,
      fontSize: 11,
      lineHeight: 13.75,
    },
    avatarRole: {
      fontFamily: fontFamily.regular,
      fontSize: 11,
      lineHeight: 13.75,
    },
    footerTagline: {
      fontFamily: fontFamily.regular,
      fontSize: 12,
      lineHeight: 19.5,
    },
    footerHeading: {
      fontFamily: fontFamily.bold,
      fontSize: 12,
      lineHeight: 16,
    },
    footerLink: {
      fontFamily: fontFamily.regular,
      fontSize: 14,
      lineHeight: 20,
    },
    footerCopyright: {
      fontFamily: fontFamily.regular,
      fontSize: 12,
      lineHeight: 16,
    },
    advanceDate: {
      fontFamily: fontFamily.regular,
      fontSize: 12,
      lineHeight: 16,
    },
    planName: { fontFamily: fontFamily.medium, fontSize: 12, lineHeight: 16 },
    planPriceActive: {
      fontFamily: fontFamily.bold,
      fontSize: 24,
      lineHeight: 24,
    },
    planPriceInactive: {
      fontFamily: fontFamily.bold,
      fontSize: 20,
      lineHeight: 20,
    },
    planPeriod: {
      fontFamily: fontFamily.regular,
      fontSize: 10,
      lineHeight: 15,
    },
    planBilledAnnually: { fontFamily: fontFamily.regular, fontSize: 9 }, // solo tamaño observado
    legal: { fontFamily: fontFamily.regular, fontSize: 12, lineHeight: 16.5 },
  },
} as const;
