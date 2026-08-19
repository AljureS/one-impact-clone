# Colapso a 390 — suscripcion (/suscripcion)

Fuente: 390×844 recargado, medidas con getBoundingClientRect, 2026-08-19.

**Rasgo global de la pantalla:** NO hay reordenamiento web→móvil. Todo el
contenido vive en `max-w-md mx-auto` (448px), así que a 1440 ya se ve "como
móvil" centrado; a 390 el mismo layout solo se comprime al ancho disponible
(350px útiles: px-5 = 20px por lado). Cero duplicación DOM, cero carruseles,
cero elementos que desaparecen (salvo el patrón canónico del nav). Es la
pantalla con la adaptación más directa de todo el sitio: misma columna,
misma jerarquía, mismos componentes.

`document.scrollWidth == 390` → sin overflow horizontal en ningún estado
(también verificado con el toggle en Anual).

## 0. header
Canónico: links desktop `display:none`, hamburguesa visible. Igual que home.

## 1. collage-hero
- Mismo layout que 1440 (no se apila ni se convierte en carrusel): fila 1
  grid de 3 celdas `aspect-square` → 130×130 cada una (390/3, sin gap);
  fila 2 flex 3:2 → hero-main 234×215 + hero-secondary 156×215, sin gap.
- La altura de la fila 2 es un style inline `height:clamp(200px, 55vw, 440px)`
  → a 390 gana 55vw = 214.5px (a 1440 ganaba el cap 440px). Único valor
  responsive "no Tailwind" de la página.
- Alto total del collage a 390: 345px (130 + 215) ≈ 41% del viewport de 844
  (a 1440: 480 + 440 = 920px). Proporción hero contenida, no full-screen.

## 2. planes
- h1 30px/lh 37.5 (text-3xl base; a 1440 era 48px vía lg:text-5xl). El sub
  queda 16px igual.
- Toggle: mismo pill, 183×44 total; botones px-5 py-2 (~40px de alto touch).
- Selector de planes: SIGUE siendo grid de 3 columnas lado a lado (350px
  total, cada botón 109×68 en Mensual). NO se apila ni scrollea: los 3 planes
  caben porque el contenido es corto. En Anual cada botón crece porque
  «facturado anualmente» (9px) hace wrap a 2 líneas a este ancho (a 1440
  cabía en 1); ver suscripcion-planes-anual-390.png.
- CTA 350×56 full-width del contenedor. Legal 12px centrado debajo.
- Área táctil: botones de plan 109×68 y toggle ~84×40 — por encima de 44px
  de alto el plan, el toggle justo bajo 44 (40px), anotar para Fase 2.

## 3. beneficios
- h2 24px (text-2xl base; a 1440 era 30px vía md:text-3xl).
- Lista idéntica: icono 40×40 + textos, cada li ~60px de alto, gap-5 (20px).
  Nada cambia respecto a 1440 salvo el ancho de línea.

## 4. footer
Canónico: columnas apiladas como en home-mobile-notes. Sin desviaciones.

## Implicación Fase 2 (criterio de adaptación)
Esta pantalla es la más "nativa" de origen: una sola columna con ancho
máximo, selector segmentado de 3 opciones en fila, CTA full-width. En RN se
traduce 1:1 (View maxWidth 448 centrado) sin decisiones de reflow; los
únicos puntos responsive reales son las escalas tipográficas del h1/h2 y el
clamp de altura del collage (traducible a `Math.min(Math.max(vw*0.55, 200), 440)`).
