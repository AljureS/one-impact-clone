// Header, menú móvil y footer canónicos (idénticos en todo el sitio).
// Fuente: 02-content-home.md §1–2 y §9 · 01-sitemap.md (hrefs verbatim del
// sitio; el mapeo a rutas de la app lo decide navegación). El logo
// (logo_blanco.svg) es SVG-componente: se importa desde assets, no desde aquí.
import type { SiteLink } from './types';

export const logoAlt = 'One Impact';

export const navCta = {
  label: 'Únete a One Impact',
  href: '/suscripcion',
} as const;

// Labels de bottom tabs: adaptación móvil (el sitio no tiene tabs), derivados
// de los labels reales: «Inicio» (header) · «Zonas One Impact» → «Zonas» ·
// «Suscripción» (footer) · «Sobre Nosotros»/«Quiénes somos» → «Nosotros».
export const tabLabels = {
  home: 'Inicio',
  zones: 'Zonas',
  subscription: 'Suscripción',
  about: 'Nosotros',
} as const;

export const footer = {
  tagline:
    'Infraestructura abierta para monitorear impacto colectivo verificado',
  menuLinks: [
    { label: 'Inicio', href: '/' },
    { label: 'Zonas de Impacto', href: '/zonas' },
    { label: 'Proyectos', href: '/proyectos' },
    { label: 'Sobre Nosotros', href: '/nosotros' },
    { label: 'Suscripción', href: '/suscripcion' },
  ] as SiteLink[],
  contactHeading: 'CONTACTO',
  contactEmail: {
    label: 'hola@oneimpact.org',
    href: 'mailto:hola@oneimpact.org',
  } as SiteLink,
  social: [
    { label: 'Instagram', href: 'https://instagram.com' },
    { label: 'X (Twitter)', href: 'https://x.com' },
  ] as SiteLink[],
  copyright: '© 2026 One Impact. Todos los derechos reservados.',
} as const;
