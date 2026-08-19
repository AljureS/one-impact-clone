// Fuente: 02-content-home.md §3 (hero) y §4 (que-es), verbatim ·
// 04-assets-map.md (video vertical 640×1138 con audio; thumbnail byte-idéntico
// a zones/patagonia.jpg, sin dedup: cada uno donde se observó).

export const homeHero = {
  title: 'Juntos cuidamos lo que nos conecta',
  paragraph: 'Conectamos aportes, proyectos y seguimiento en un mismo lugar',
  cta: { label: 'Explorar Zonas de Impacto', href: '/zonas' },
  video: require('../../assets/videos/one-impact-intro.mp4'),
} as const;

export const queEsSection = {
  title: 'Conoce qué es One Impact',
  paragraph: 'Conectamos aportes, proyectos y seguimiento en un mismo lugar',
  thumbnail: require('../../assets/images/video-thumbnail.jpg'),
  thumbnailAlt: 'One Impact — video introductorio',
  cta: { label: 'Quiero hacer parte', href: '/suscripcion' },
} as const;
