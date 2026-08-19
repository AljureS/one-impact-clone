# Interacciones — zonas (/zonas)

Verificado sobre el sitio real, 2026-08-19. Navegador desktop real (hover:hover, pointer:fine, 0 touch points).

## A 1440 — qué NO hay

- **Sin carrusel a 1440:** zonas-grid es `md:grid-cols-3` estático y avances es `md:grid-cols-3 lg:grid-cols-5` estático. Sin autoplay, sin loop, sin dots, sin flechas. Los dots de avances existen en el DOM pero son `md:hidden` (solo móvil).
- Sin filtros, tabs, toggles ni acordeones en toda la página.
- Sin video.

## Hover tarjeta de zona (verificado computado)

- Clase: `group` en el `<a>`; imagen `object-cover transition-transform duration-500 group-hover:scale-105`.
- Medido bajo `:hover`: `scale: 1.05` con `transition: 0.5s` sobre `transition-property: transform, translate, scale, rotate`.
- **Nota técnica:** Tailwind v4 implementa `scale-105` con la propiedad CSS `scale` (no `transform: scale()`); al medir, `transform` reporta `none` y `scale` reporta `1.05`.
- El chip «Ver más» NO cambia en hover (sin clase hover propia; bg constante `#c8d400`). Desvío vs home, cuyo chip tenía `group-hover:bg-accent-dark`.
- El overlay de gradiente no cambia en hover.
- Evidencia: `06-screenshots/zonas-card-amazonia-hover-1440.png` (tomada en hover; el zoom 5% es sutil).
- **Equivalente táctil sugerido:** feedback de pressed en la tarjeta completa (p. ej. `activeOpacity`/scale down leve al presionar); el zoom on-hover no tiene análogo móvil directo.

## Hover tarjetas de avances

- Ninguno: la tarjeta es `flex flex-col` sin `group` ni clases `hover:`.

## Dots del carrusel de avances (solo <md)

- 5 `<button>` con `aria-label` «Ir al avance 1»…«Ir al avance 5».
- Estado activo: `bg-accent w-6 h-2` (pastilla 24×8); inactivo: `bg-white/30 w-2 h-2`; `transition-all duration-300`.
- Comportamiento verificado a 390: ver sección siguiente.

## A 390 — carrusel de avances (verificado con pruebas)

- **Snap:** `scroll-snap-type: x mandatory` en la pista, `scroll-snap-align: center` en cada slide (`snap-center shrink-0 w-[220px]`). Verificado: al soltar en scrollLeft=900 el snap corrige a 814.
- **Click en dot navega:** click en «Ir al avance 3» → scrollLeft 0→407, que centra el slide 3 exacto (offset 492 + 110 − 195); el dot 3 pasa a `bg-accent w-6 h-2`. Scroll suave (animado; `scroll-behavior` computado `auto`, así que el smooth lo hace JS — probablemente `scrollTo({behavior:'smooth'})`).
- **Scroll manual actualiza dots:** con scroll programático a fin de pista (814), el dot 5 quedó activo a los ~600ms → listener de scroll sincroniza el estado.
- **Sin autoplay, sin loop:** tras 5s sin tocar, scrollLeft se mantuvo en 814. No hay flechas prev/next.
- Estados de dot: activo `bg-accent w-6 h-2` (pastilla 24×8), inactivo `bg-white/30 w-2 h-2` (punto 8×8), `transition-all duration-300`.
- Evidencia: `06-screenshots/zonas-avances-390.png` (estado inicial, dot 1) y `06-screenshots/zonas-avances-dot3-activo-390.png` (slide 3 centrado, dot 3).
- **Equivalente nativo sugerido:** FlatList horizontal con `snapToInterval=236` (220+16) y `snapToAlignment="center"`, dots controlados por `onMomentumScrollEnd`/`onScroll`, tap en dot → `scrollToIndex` centrado.

## A 390 — zonas-grid

- Pila vertical estática: **ninguna interacción de carrusel** (ni scroll horizontal, ni snap, ni dots). Solo los 3 links a `/zonas/{slug}` (403 hoy).

## Consola / red

- 11 errores de consola, todos `Failed to load resource: 403` de los **prefetch de Next.js** hacia rutas bloqueadas linkeadas desde esta página: `/zonas/amazonia`, `/zonas/mexico`, `/zonas/africa` (tarjetas), `/nosotros` (header/footer), `/proyectos` (footer). Igual patrón que en home; no afecta el render de `/zonas`.

## Header / menú móvil / footer

- Canónicos (ver `raw/home-interactions.md`): hamburguesa `hover:bg-white/10`, menú móvil dialog con transición de opacidad, links footer `hover:text-...`. Sin desviaciones detectadas en esta página.
