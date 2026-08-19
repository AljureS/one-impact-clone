// Fuente: 02-content-suscripcion.md (verbatim) · 04-assets-map.md ·
// 01-sitemap.md (query params reales de /registro). Los iconos de beneficios
// son SVG inline del sitio (crudos en raw/suscripcion-assets.json), no assets.
import type { BillingCycle, Benefit, Plan, PlanId } from './types';

export const plans: Plan[] = [
  { id: 'basico', name: 'Básico', priceMonthly: '$5', priceAnnual: '$4' },
  { id: 'estandar', name: 'Estándar', priceMonthly: '$10', priceAnnual: '$8' },
  { id: 'premium', name: 'Premium', priceMonthly: '$15', priceAnnual: '$12' },
];

// Estado inicial observado: Mensual + Estándar activos.
export const defaultBilling: BillingCycle = 'monthly';
export const defaultPlanId: PlanId = 'estandar';

export const plansSection = {
  title: 'Lo que haces hoy queda en el mundo',
  subtitle: 'Elige cómo quieres sostenerlo.',
} as const;

export const billingCopy = {
  monthlyLabel: 'Mensual',
  annualLabel: 'Anual',
  /** El periodo es «/mes» también en anual. */
  period: '/mes',
  /** Solo se muestra en estado Anual. */
  annualNote: 'facturado anualmente',
} as const;

// href real: `/registro?plan={basico|estandar|premium}&billing={monthly|annual}`
// según selección (ids de Plan + BillingCycle son los valores verbatim).
export const subscriptionCta = {
  label: 'Comenzar mi travesía',
  hrefBase: '/registro',
} as const;

export const subscriptionLegal =
  'Cancela cuando quieras, los registros de tu suscripción son permanentes.';

export const benefitsSection = {
  title: 'Lo que incluye tu suscripción',
} as const;

export const benefits: Benefit[] = [
  {
    title: 'Tu iPass',
    description:
      'Tu identidad digital de impacto, registra cada proyecto, logro y contribución.',
  },
  {
    title: 'Proyectos con coordenadas reales',
    description:
      'Sabes exactamente dónde ocurre tu impacto y recibes evidencia audiovisual.',
  },
  {
    title: 'Tu línea de travesía',
    description:
      'Cada mes activo suma un punto permanente a tu historia. Lo que ya ocurrió no se cancela.',
  },
  {
    title: 'Academy + comunidad',
    description:
      'Formación, foros, eventos y voluntariado, un ecosistema completo de personas que actúan.',
  },
  {
    title: 'Wallet + marketplace',
    description:
      'Tokens, insignias y activos digitales que acumulas y que puedes usar como moneda dentro del ecosistema.',
  },
  {
    title: 'Fondo de emergencias',
    description:
      'Parte de tu suscripción ya está en el fondo de respuesta climática, antes de que ocurra, ya estás ahí.',
  },
];

// collage-hero (§1): 5 imágenes decorativas (alt vacío en el sitio).
export const collageRow1 = [
  require('../../assets/images/subscription/collage-1.jpg'),
  require('../../assets/images/subscription/collage-2.jpg'),
  require('../../assets/images/subscription/collage-3.jpg'),
];

export const collageRow2 = [
  require('../../assets/images/subscription/hero-main.jpg'),
  require('../../assets/images/subscription/hero-secondary.jpg'),
];
