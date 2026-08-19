# Contenido — home (/)

Capturado verbatim del sitio real (innerText/textContent, 2026-08-18).
`<title>`: «One Impact — Juntos cuidamos lo que nos conecta»

> Header, menú móvil y footer son idénticos en todo el sitio: esta es su
> captura canónica; las demás pantallas solo referencian desviaciones.

## 1. header

- **logo:** img alt «One Impact» (`/images/logo_blanco.svg`) → `/`
- **link:** «Inicio» → `/`
- **link:** «Zonas One Impact» → `/zonas`
- **link:** «Cómo aportar» → `/suscripcion`
- **link:** «Quiénes somos» → `/nosotros`
- **CTA:** «Únete a One Impact» → `/suscripcion` (pastilla accent; **solo desktop** — a 390 se oculta y el CTA vive dentro del menú móvil)
- **microcopy (solo <md):** botón hamburguesa aria-label «Abrir menú»
- Nav fija (fixed top-0 z-50), transparente sobre el contenido; sin cambio de fondo al hacer scroll.

## 2. menu-movil (dialog fullscreen, fondo accent)

- **botón:** aria-label «Cerrar menú» (icono X, esquina superior derecha)
- **link:** «Inicio» → `/`
- **link:** «Zonas One Impact» → `/zonas`
- **link:** «Cómo aportar» → `/suscripcion`
- **link:** «Quiénes somos» → `/nosotros`
- **CTA (abajo, full-width):** «Únete a One Impact» → `/suscripcion`
- Existe en el DOM también en desktop (oculto por opacity); role dialog «Abrir menú».

## 3. hero

- **h1:** «Juntos cuidamos lo que nos conecta»
- **párrafo:** «Conectamos aportes, proyectos y seguimiento en un mismo lugar»
- **CTA:** «Explorar Zonas de Impacto» → `/zonas` (pastilla blanca)
- **fondo:** video `/videos/one-impact-intro.mp4` (autoplay, muted, loop, playsinline, sin poster, sin controles, pointer-events-none) + gradiente negro vertical
- Sin badges ni microcopy adicional.

## 4. que-es

- **h2:** «Conoce qué es One Impact»
- **párrafo:** «Conectamos aportes, proyectos y seguimiento en un mismo lugar»
- **media:** thumbnail 16:9 con overlay oscuro y botón play circular decorativo — img alt «One Impact — video introductorio» (`/images/video-thumbnail.jpg`)
- **CTA:** «Quiero hacer parte» → `/suscripcion` (pastilla accent)

## 5. zonas

- **h2:** «Nuestras zonas one impact» (así, «one impact» en minúsculas)
- **párrafo:** «Conectamos aportes, proyectos y seguimiento en un mismo lugar»
- **tarjeta 1:** h3 «Amazonia» (sin tilde) + chip «Ver más» (con flecha →) → `/zonas/amazonia` — img alt «Amazonia»
- **tarjeta 2:** h3 «Borneo» + chip «Ver más» → `/zonas/borneo` — img alt «Borneo»
- **tarjeta 3:** h3 «Patagonia» + chip «Ver más» → `/zonas/patagonia` — img alt «Patagonia»
- **CTA:** «Explora todas las zonas» → `/zonas` (pastilla negra #1E1E1E con borde blanco)
- Nota: las 3 tarjetas linkean rutas que hoy responden 403 (ver 01-sitemap.md).

## 6. testimonios

- **h2:** «Voces del cambio»
- **párrafo:** «Haz clic en cada perfil para escuchar sus testimonios»
- **tarjeta grande (testimonio activo, por defecto Ana):**
  - nombre: «Ana Rodriguez» (sin tilde en Rodriguez)
  - rol: «Agente de cambio, Colombia»
  - img alt «Ana Rodriguez»; botón play circular decorativo centrado
- **quote (bajo la tarjeta):** «Gracias a One Impact, hemos podido conectar con comunidades y proyectos que comparten nuestra visión de un futuro sostenible para la Amazonia.» (sin comillas en el DOM)
- **selector de perfiles (3 botones con avatar, activo = aria-pressed):**
  - «Ana Rodriguez» / «Agente de cambio, Colombia» — img alt «Ana Rodriguez»
  - «Carlos Méndez» / «Líder comunitario, Brasil» — img alt «Carlos Méndez»
  - «Lucía Torres» / «Investigadora ambiental, México» — img alt «Lucía Torres»
- **CTA:** «Conecta con la comunidad» → `/zonas` (pastilla oscura, full-width de la columna)
- **quotes de los otros perfiles (capturadas activando cada avatar; solo se ve una a la vez):**
  - Carlos Méndez: «La plataforma nos permitió hacer visible el trabajo de años de nuestra comunidad y recibir el apoyo necesario para continuar protegiendo el bosque.»
  - Lucía Torres: «One Impact crea puentes reales entre quienes quieren contribuir y quienes están en el campo generando impacto positivo día a día.»

## 7. aliados

- **h2:** «Conoce a nuestros aliados»
- **párrafo:** «Instituciones globales que aportan legitimidad técnica y compromiso verificable en cada territorio»
- **logos (círculos blancos, grayscale → color al hover):**
  - img alt «WWF» (`/images/allies/wwf.png`)
  - img alt «Conservation International» (`/images/allies/ci.png`)
  - img alt «The Nature Conservancy» (`/images/allies/tnc.png`)
- Sin CTA.

## 8. stats-cta

- **párrafo intro:** «Únete a más de»
- **cifra:** «35K» (dinámico — valor final observado; verificación de animación en raw/home-interactions.md)
- **párrafo cierre:** «agentes de cambio»
- **CTA:** «Quiero unirme» → `/suscripcion` (pastilla accent)
- **fondo:** img alt «Bosque» (`/images/stats-bg.jpg`) + overlay forest/80

## 9. footer

- **logo:** img alt «One Impact» (`/images/logo_blanco.svg`) → `/`
- **tagline:** «Infraestructura abierta para monitorear impacto colectivo verificado»
- **social:** icono aria-label «Instagram» → `https://instagram.com` · icono aria-label «X (Twitter)» → `https://x.com`
- **columna «MENÚ»:**
  - «Inicio» → `/`
  - «Zonas de Impacto» → `/zonas`
  - «Proyectos» → `/proyectos` (ruta 403)
  - «Sobre Nosotros» → `/nosotros` (ruta 403)
  - «Suscripción» → `/suscripcion`
- **columna «CONTACTO»:** «hola@oneimpact.org» → `mailto:hola@oneimpact.org`
- **copyright:** «© 2026 One Impact. Todos los derechos reservados.»
