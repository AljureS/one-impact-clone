// Fuente: 02-content-home.md §6 (verbatim; «Ana Rodriguez» sin tilde es la
// grafía real) · 04-assets-map.md. Orden = selector de perfiles; activo por
// defecto: Ana (primera).
import type { Testimonial } from './types';

export const testimonials: Testimonial[] = [
  {
    id: 'ana-rodriguez',
    name: 'Ana Rodriguez',
    role: 'Agente de cambio, Colombia',
    quote:
      'Gracias a One Impact, hemos podido conectar con comunidades y proyectos que comparten nuestra visión de un futuro sostenible para la Amazonia.',
    image: require('../../assets/images/testimonials/ana-rodriguez.jpg'),
  },
  {
    id: 'carlos-mendez',
    name: 'Carlos Méndez',
    role: 'Líder comunitario, Brasil',
    quote:
      'La plataforma nos permitió hacer visible el trabajo de años de nuestra comunidad y recibir el apoyo necesario para continuar protegiendo el bosque.',
    image: require('../../assets/images/testimonials/carlos-mendez.jpg'),
  },
  {
    id: 'lucia-torres',
    name: 'Lucía Torres',
    role: 'Investigadora ambiental, México',
    quote:
      'One Impact crea puentes reales entre quienes quieren contribuir y quienes están en el campo generando impacto positivo día a día.',
    image: require('../../assets/images/testimonials/lucia-torres.jpg'),
  },
];

// home §6, encabezado y CTA de la sección.
export const testimonialsSection = {
  title: 'Voces del cambio',
  paragraph: 'Haz clic en cada perfil para escuchar sus testimonios',
  cta: { label: 'Conecta con la comunidad', href: '/zonas' },
} as const;
