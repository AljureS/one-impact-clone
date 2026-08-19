# Colapso a 390 — zonas (/zonas)

Medido en el sitio real a 390×844 (2026-08-19). Alturas: página completa 2247px
(1440: 1592px). Secciones: hero 0–251, zonas-pila 251–971, avances 971–1696,
footer 1696–2247. Gutter global móvil: **20px** (`px-5`; home usaba 16px).

## header

- Canónico: hamburguesa visible, links y CTA ocultos (ver home-mobile-notes).
- Misma peculiaridad que a 1440: hamburguesa e logo blancos sobre crema
  `#F0ECE4` → contraste bajo real del sitio.

## 1. hero

- Mismo layout que desktop, solo escala: h1 36px/700/45 (desktop 60px), p
  16px/400/26 (desktop 18px), centrados; `py-14` se mantiene (56px).
- Patrón topográfico SVG cubre toda la sección (390×251, `preserveAspectRatio
  xMidYMid slice` recorta lateralmente al angostar). Nada desaparece.

## 2. zonas-grid → PILA VERTICAL (no carrusel)

- Cambia de DOM: se oculta el grid desktop (`hidden md:grid`) y se muestra la
  lista móvil `flex flex-col gap-4 md:hidden`.
- **Se apila:** 3 tarjetas full-width de **350×208** (`h-52`, ancho =
  390 − 2×20 gutter), gap 16px, radius 24px (`rounded-3xl`).
- **Sin scroll horizontal, sin peek, sin snap, sin dots** — contraste doble:
  con el carrusel de zonas de home (overflow-x sin snap) y con el de avances
  de esta misma página (snap + dots).
- Tipos dentro de tarjeta: h2 30px/700/37.5 (`text-3xl`; desktop 36), p 14px
  igual que desktop, chip «Ver más» idéntico (14/600, px-4 py-2).
- Layout interno igual: texto abajo-izquierda, chip abajo-derecha (`flex
  items-end justify-between p-5`).

## 3. avances → CARRUSEL HORIZONTAL con snap y dots

- Cambia de DOM: grid desktop oculto; aparece la pista móvil
  `md:hidden flex gap-4 overflow-x-auto scrollbar-hide pb-2 -mx-5 px-5
  snap-x snap-mandatory` + fila de dots `flex justify-center gap-2 mt-6`.
- **Slides de ancho fijo `w-[220px]`** (`snap-center shrink-0`), gap 16px,
  imagen 220×192 (`h-48`) radius 16px (`rounded-2xl`).
- Pista full-bleed (`-mx-5` + `px-5`): scrollWidth 1204 vs viewport 390;
  posición inicial muestra slide 1 completo (x=20) + **134px de peek** del
  slide 2 (empieza en x=256).
- **CON snap:** `scroll-snap-type: x mandatory` + `scroll-snap-align: center`
  (el carrusel de zonas de home NO tenía snap — verificado allá y acá).
- **Dots interactivos** (5 botones «Ir al avance N»): click en dot 3 →
  scrollLeft 0→407 (slide 3 queda centrado exacto: 492+110−195); activo
  `bg-accent w-6 h-2`, inactivos `bg-white/30 w-2 h-2`, transición 300ms.
- **Scroll manual sincroniza dots:** setear scrollLeft=900 → snap corrige a
  814 (fin de pista) y dot 5 pasa a activo → hay listener de scroll.
- **Sin autoplay:** 5s quieto en scrollLeft 814 → no se mueve. Sin loop.
- Títulos de sección: h2 30px/700/37.5, sub 16px/400/26. Tipos de tarjeta
  idénticos a desktop (h3 14/700 accent, fecha 12, p 12).
- Nada desaparece: las 5 tarjetas siguen accesibles por scroll.

## 4. footer

- Canónico (columnas apiladas, ver home-mobile-notes). Sin desviaciones.

## Criterio Fase 2 (nativo)

- zonas-grid: `View` apilada simple — NO FlatList horizontal.
- avances: FlatList horizontal con `snapToInterval` (220+16) /
  `pagingEnabled`-like + dots controlados por `onScroll` (activo = pastilla
  24×8 accent) y tap en dot → `scrollToOffset` centrado. Peek inicial ~134px.
- Alturas fijas útiles: tarjeta zona 208, imagen avance 192, slide 220.
