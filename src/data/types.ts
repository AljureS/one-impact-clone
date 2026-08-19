// Modelos congelados de contenido (bloque data). Los feature-builders los
// consumen sin modificarlos. Contenido: docs/exploration/02-content-*.md
// (verbatim) · slugs: 01-sitemap.md · assets: 04-assets-map.md.
import type { ImageRequireSource } from 'react-native';

export type ZoneSlug =
  'amazonia' | 'mexico' | 'africa' | 'borneo' | 'patagonia';

export interface Zone {
  slug: ZoneSlug;
  /** Grafía verbatim de la tarjeta en home (solo amazonia/borneo/patagonia). */
  titleHome?: string;
  /** Grafía verbatim de la tarjeta en /zonas (solo amazonia/mexico/africa). */
  titleZones?: string;
  /** Solo las tarjetas de /zonas la tienen; borneo/patagonia no tienen descripción en el sitio. */
  description?: string;
  image: ImageRequireSource;
}

export interface Testimonial {
  id: string;
  name: string;
  role: string;
  quote: string;
  image: ImageRequireSource;
}

export type PlanId = 'basico' | 'estandar' | 'premium';

export type BillingCycle = 'monthly' | 'annual';

export interface Plan {
  /** Slug real del query param del CTA (`/registro?plan=…`), sin acento. */
  id: PlanId;
  name: string;
  /** Precios como los muestra el sitio (p. ej. «$5»); el periodo «/mes» va aparte. */
  priceMonthly: string;
  priceAnnual: string;
}

export interface Benefit {
  title: string;
  description: string;
}

export interface Partner {
  id: string;
  name: string;
  logo: ImageRequireSource;
}

export interface Stat {
  intro: string;
  value: string;
  outro: string;
}

export interface ProgressUpdate {
  id: string;
  title: string;
  date: string;
  description: string;
  image: ImageRequireSource;
  /** Zona asociada (interpretación documentada del plan; el sitio no la declara). */
  zoneSlug: ZoneSlug;
}

export interface SiteLink {
  label: string;
  href: string;
}
