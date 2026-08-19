// Fuente: docs/exploration/03-design-tokens.md §4. Escala de múltiplos de 4:
// solo los pasos observados en el sitio; `spacing[n]` = n dp y rechaza en
// compilación cualquier valor fuera de la escala.

export const spacing = {
  4: 4,
  8: 8,
  12: 12,
  16: 16,
  20: 20,
  28: 28,
  32: 32,
  40: 40,
  56: 56,
  64: 64,
  96: 96,
} as const;

// ⚠ Conflicto real del sitio (03 §6.1), no unificar: cada pantalla usa el suyo.
export const gutter = {
  home: 16, // px-4
  zonesAndSubscription: 20, // px-5
} as const;
