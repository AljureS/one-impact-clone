# 05 — Interacciones (consolidado de home + zonas + suscripcion)

Fuente: merge de `raw/{home,zonas,suscripcion}-interactions.md` (pruebas en
vivo con clicks/scroll reales a 1440×900 y 390×844) + `raw/*-mobile-notes.md`.
Solo comportamientos verificados. Pantallas 403 sin datos: ver `00-gaps.md`.

## 1. Video del hero (home)

- `<video src="/videos/one-impact-intro.mp4" autoplay muted loop playsinline>`
  — **sin poster, sin controls**, `pointer-events-none` (no clickeable ni
  pausable). Es fondo, no reproductor.
- Verificado en vivo: `paused=false`, `currentTime` avanza, `duration=9.8s`,
  loopea. Idéntico comportamiento a 390.
- Equivalente nativo sugerido (del explorer): `expo-video` de fondo con
  `isMuted`, `isLooping`, `shouldPlay`, sin controles.

## 2. Bloque "video" de que-es (home) — DECORATIVO

- Thumbnail `video-thumbnail.jpg` + overlay `bg-black/30` + botón play
  (`bg-white/20 backdrop-blur-sm border-white/40`) con `pointer-events-none`;
  wrapper `<div>` sin rol, sin onclick, `cursor: auto`.
- **Click real ejecutado: no pasa nada** (0 modales, 0 iframes, sigue 1 solo
  video en la página — el del hero). Parece reproductor pero es imagen
  estática. Conectarlo al mp4 sería decisión de producto, no fidelidad.

## 3. Carruseles — tres patrones distintos (no unificar sin decidirlo)

| Dónde | Desktop (md+) | 390 (<md) | Snap | Dots | Autoplay/loop/flechas |
|---|---|---|---|---|---|
| home › zonas | grid estático 3 col | carrusel nativo CSS `overflow-x-auto`, tarjetas `w-[75vw]` (293px) con peek por bleed `-mx-4 px-4` | **NO** (`scroll-snap-type: none`) | NO | NO (verificado: scrollLeft estable 5s) |
| /zonas › zonas-grid | grid estático 3 col | **PILA VERTICAL** (`flex flex-col gap-4`), 3 tarjetas full-width 350×208 | — | — | — (cero interacción de carrusel) |
| /zonas › avances | grid estático 3→5 col | carrusel slides fijos `w-[220px]` `snap-center`, peek inicial ~134px, pista full-bleed `-mx-5 px-5` | **SÍ** `x mandatory` + `snap-center` (verificado: suelto en 900 → corrige a 814) | **SÍ**, 5 botones «Ir al avance N» | NO autoplay (5s quieto), NO loop, NO flechas |

Dots de avances (solo <md): activo `bg-accent w-6 h-2` (pastilla 24×8),
inactivo `bg-white/30 w-2 h-2`, `transition-all duration-300`.
- Click en dot navega: dot 3 → `scrollLeft` 0→407 (slide centrado exacto),
  scroll animado por JS (`scroll-behavior` computado `auto`).
- Scroll manual sincroniza dots (listener de scroll: a fin de pista el dot 5
  se activa en ~600ms).
- Sugerencia nativa del explorer: FlatList horizontal, `snapToInterval=236`
  (220+16), `snapToAlignment="center"`, dots por `onScroll`/
  `onMomentumScrollEnd`, tap en dot → `scrollToIndex` centrado.
- Para home › zonas: FlatList con `ITEM_WIDTH = 0.75 * width`; el original NO
  snapea (snap opcional como mejora declarada).

## 4. Testimonios «Voces del cambio» (home)

- Estado inicial: Ana activa. Los 3 avatares son botones con
  **`aria-pressed`** (`true` solo en el activo).
- Click en avatar (verificado con clicks reales): cambia imagen grande,
  nombre/rol de la tarjeta, y el párrafo de quote. `aria-pressed` se mueve.
- **Sin marcador visual en el avatar activo** (mismos borde/opacidad/transform
  activo e inactivo — verificado computado): la única señal es la tarjeta.
- Sin autoplay/rotación; sin `<audio>` en la página (pese al copy «escuchar
  sus testimonios»); el play de la tarjeta es el mismo patrón inerte de §2.
- Equivalente táctil: tap en avatar = mismo swap.
- Evidencia: `06-screenshots/home-testimonios-{1440,carlos-activo-1440,lucia-activa-1440}.png`.

## 5. Toggle Mensual/Anual (/suscripcion) — qué cambia EXACTAMENTE

Dos `<button>` en pill blanco (`bg-white rounded-full p-1 shadow-sm`). Estado
inicial: **Mensual**. Al click en «Anual» (verificado antes/después):

1. Precios: `$5 → $4`, `$10 → $8`, `$15 → $12`.
2. Periodo: **no cambia** — sigue «/mes» en ambos estados.
3. Aparece «facturado anualmente» (`text-[9px] text-gray-400`) bajo el precio
   en los 3 planes — **no existe en el DOM en Mensual** (re-render, no CSS).
4. **Ningún** badge/texto de descuento o ahorro.
5. Href del CTA: `billing=monthly → billing=annual` (conserva el plan).
6. Clases intercambiadas: activo `bg-dark-green text-white`, inactivo
   `text-gray-500 hover:text-gray-700`.
7. El plan seleccionado se conserva al cambiar billing.
8. Reversible sin residuos (vuelve a $5/$10/$15 y `billing=monthly`).

**Accesibilidad: SIN `aria-pressed`/`aria-selected`** en toggle ni planes (el
estado es solo visual) — contraste con los avatares de testimonios (§4), que
sí llevan `aria-pressed`. Nota del explorer para Fase 2: usar
`accessibilityState={{ selected }}`.

## 6. Selector de planes (/suscripcion)

- 3 `<button>` en grid (`bg-white/70 rounded-3xl p-2 grid-cols-3 gap-1`); NO
  son tarjetas con CTA propio — el único CTA «Comenzar mi travesía» (un `<a>`)
  actualiza su href.
- Activo: `bg-white shadow-md` + check dark-green (única marca; **no hay badge
  «más popular»**), nombre gray-700, precio 24px gray-900.
- Inactivo: `bg-transparent hover:bg-white/50`, nombre gray-400, precio 20px
  gray-600 (el activo sube un paso tipográfico).
- Default: **Estándar**.

### Matriz completa de hrefs del CTA (verificada click a click)

| Plan | Mensual | Anual |
|---|---|---|
| Básico | `/registro?plan=basico&billing=monthly` | `/registro?plan=basico&billing=annual` |
| Estándar (default) | `/registro?plan=estandar&billing=monthly` | `/registro?plan=estandar&billing=annual` |
| Premium | `/registro?plan=premium&billing=monthly` | `/registro?plan=premium&billing=annual` |

Slugs sin acento (`basico`, `estandar`); billing en inglés.

## 7. Contador «35K» (home › stats-cta)

**Estático.** Muestreado cada ~180ms durante 2.5s al entrar al viewport tras
recarga: siempre «35K». No hay animación de conteo.

## 8. Hovers (desktop) y equivalente táctil

| Elemento | Hover observado | Equivalente táctil sugerido |
|---|---|---|
| Tarjeta zona (home y /zonas) | imagen `scale: 1.05`, transición 0.5s (Tailwind v4 usa la propiedad CSS `scale`, no `transform`) | feedback de press (activeOpacity / scale-down leve); sin análogo directo |
| Chip «Ver más» home | `#C8D400 → #A8B200` (`group-hover:bg-accent-dark`) | ninguno necesario |
| Chip «Ver más» /zonas | **sin cambio** (sin clase hover — desvío vs home) | — |
| Tarjetas de avances | ninguno (sin `group` ni `hover:`) | — |
| Logos aliados | `grayscale → grayscale(0)` (a color), `transition-all` | ninguno (o mostrar a color fijo) |
| CTA hero blanco | `hover:bg-gray-100` | press feedback |
| CTA «Explora todas las zonas» | `hover:bg-white hover:text-gray-900` (invierte a pastilla blanca) | press feedback |
| Hamburguesa | `hover:bg-white/10` | ripple/opacity nativo |
| Plan inactivo | `hover:bg-white/50` | el press activa directo (el estado ya da feedback) |
| Toggle inactivo | `hover:text-gray-700` | ídem |
| CTA «Comenzar mi travesía» | `hover:bg-gray-800` | activeOpacity |

## 9. Header, menú móvil, footer (canónicos en las 3 pantallas)

- Nav `fixed` **siempre 100% transparente** a cualquier scroll (verificado a
  scrollY=1200: sin bg, sin backdrop-filter). Consecuencia: links blancos
  pierden contraste sobre secciones claras (crítico sobre `#F0ECE4` de
  zonas/suscripcion — rasgo real del sitio, dato para la adaptación).
- Menú móvil: dialog `fixed inset-0 z-[100] bg-accent` con
  `transition-opacity`; botones «Abrir menú» (hamburguesa `md:hidden`) y
  «Cerrar menú»; existe en el DOM también en desktop (oculto). CTA «Únete a
  One Impact» migra del header al fondo del menú.
- Sin desviaciones de estos canónicos en /zonas ni /suscripcion.

## 10. Navegación y red

- Click en tarjeta de zona → navegación dura a `/zonas/{slug}` (hoy 403).
- Errores de consola en las 3 pantallas: **todos** son 403 del prefetch de
  Next.js hacia rutas bloqueadas (`/nosotros`, `/proyectos`, `/zonas/*`).
  Ninguno funcional. (home 17, zonas 11, suscripcion 3.)
- /suscripcion quedó restaurada a su default (Mensual + Estándar) tras las
  pruebas.

---

## Adaptación a 390 por pantalla (notas de colapso de cada explorer)

### home (alto total 4618px vs 5163 a 1440; gutter 16px)

| Sección | Desktop → 390 |
|---|---|
| header (79px) | links + CTA desaparecen → hamburguesa; CTA migra al menú móvil; nav sigue fixed transparente |
| hero (844px = 100vh) | texto pasa de centrado vertical a **anclado abajo** (`items-end pb-16`); h1 60→36px; p 18→16px; CTA inline 238px (no full-width) |
| que-es (572px) | misma estructura; h2 48→30px; thumbnail 358×201; play 64px; CTA inline 184px |
| zonas (795px) | **grid 3 col → carrusel horizontal** `w-[75vw]` (293px) con peek, SIN snap/dots/autoplay; CTA centrada 221px |
| testimonios (1009px) | columna única (ya era angosta a 1440); tarjeta 334×445; avatares centrados gap 20px; CTA full-width 358px |
| aliados (435px) | los 3 círculos **permanecen en fila** (96px, gap 32 — caben justos en 358px) |
| stats-cta (412px) | cifra 128→72px; CTA inline 160px |
| footer (551px) | columnas → pila vertical, gap 40px; nada desaparece |

### zonas (alto total 2247px vs 1592 a 1440; gutter **20px** ⚠ conflicto con home)

| Sección | Desktop → 390 |
|---|---|
| hero (251px) | solo escala: h1 60→36px, p 18→16px; patrón SVG cubre todo (`slice` recorta lateral) |
| zonas-grid | cambia de DOM (`hidden md:grid` ↔ `md:hidden`): **pila vertical** de 3 tarjetas 350×208, gap 16 — sin scroll horizontal, sin peek, sin dots |
| avances | cambia de DOM: **carrusel con snap mandatory + 5 dots interactivos**, slides 220px, imagen 220×192, peek 134px, full-bleed |
| footer | canónico apilado |

Criterio del explorer para Fase 2: zonas-grid = View apilada simple (NO
FlatList); avances = FlatList horizontal con snap y dots controlados.

### suscripcion (sin reordenamiento web→móvil)

- **Rasgo global**: todo vive en `max-w-md mx-auto` (448px) — a 1440 ya se ve
  "como móvil"; a 390 solo se comprime (350px útiles). Cero duplicación DOM,
  cero carruseles, cero desapariciones (salvo el patrón canónico del nav).
  `document.scrollWidth == 390` en ambos estados del toggle.
- collage-hero: mismo layout; fila 1 = 3 celdas 130×130; fila 2 = 234×215 +
  156×215; altura por `clamp(200px, 55vw, 440px)` → 214.5px a 390.
- planes: h1 48→30px; selector **sigue en 3 columnas** (botones 109×68); en
  Anual «facturado anualmente» hace wrap a 2 líneas; CTA full-width 350×56.
- Áreas táctiles medidas: plan 109×68 (ok), toggle ~84×40 (**bajo 44px** —
  anotar para Fase 2).
- beneficios: h2 30→24px; lista idéntica (icono 40×40, li ~60px, gap 20).
- Es la pantalla de adaptación más directa: columna única, segmented control,
  CTA full-width — traducción 1:1 a nativo.
