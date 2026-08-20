# Auditoría QA — §3.3 + fidelidad visual §3.2 (Fase 3, ronda 1)

Fecha: 2026-08-19 · Auditor: qa-auditor · Entorno: expo web (Metro ya corriendo
en :8081, watcher intacto) + Playwright a 390×844. Working tree con bloque F.
La verdad final de snap/video/safe-areas/fonts es Expo Go: ver «Device-QA».

Divergencias autorizadas (README tabla + review bloque F — NO son hallazgos):
bottom tabs sin hamburguesa · footer solo en Nosotros · pastilla glass del
logo · blur en play y back del detalle · snap+dots en home-zonas · detalle y
Nosotros derivadas (403 en el sitio) · CTA «Comenzar mi travesía» no navega.

## §3.3 QA funcional

| # | Check | Veredicto | Evidencia |
|---|---|---|---|
| 1 | iOS y Android (Expo Go), device chico y grande | DEVICE-QA | No simulable en web. Bloque F ya verificó blur+videos en iOS; queda la pasada completa. |
| 2a | 4 tabs cargan | PASA | Inicio/Zonas/Suscripción/Nosotros navegadas por click de tab; snapshots DOM con `[selected]` correcto en cada una. |
| 2b | Stack de zonas + back | PASA | Tarjeta «Amazonía» → `/zonas/amazonia`; botón flotante `[aria-label="Volver"]` → `/zonas`; back del navegador desde `/zonas/mexico` → `/zonas`. |
| 2c | Deep link `/zonas/[slug]` × 5 slugs | PASA | Carga fría por URL, ninguno en blanco: amazonia (h1+desc+2 avances), mexico (h1+desc+1), africa (h1+desc+1), borneo (h1 SIN desc+1), patagonia (h1 SIN desc, SIN sección avances). Omisiones = data real (borneo/patagonia sin descripción; patagonia 0 avances) — correctas. |
| 3a | Video hero reproduce | PASA | `paused=false, muted=true, loop=true`, currentTime 7.65→9.15 en 1.5s, dur 9.8s. |
| 3b | Video que-es reproduce al tap | PASA | `browser_click` en `[aria-label="One Impact — video introductorio"]` → `<video>` reemplaza el thumbnail, `paused=false`, ct avanzando (9.34), con sonido (`muted=false`); a los 9.8s termina y queda `paused` (comportamiento esperado, dura 9.8s). |
| 3c | No rompe al salir de la pantalla | PASA | Tab Zonas → tab Inicio con el video activo: 0 errores de consola, app íntegra. Pausa nativa → device-QA. |
| 4a | Carrusel avances: dots navegan a offsets | PASA | Click «Ir al avance 3» → `scrollLeft=407` EXACTO (offset medido en el sitio) + dot 3 activo (pastilla 24×8, resto 8×8). Captura `qa-zonas-avances-dot3.png` ≈ pixel-perfect vs referencia. |
| 4b | Carrusel avances: snap al arrastre + sync de dots | DEVICE-QA | Código correcto: `snapToOffsets=[0,171,407,643,814]` + `decelerationRate="fast"` + sync en `onMomentumScrollEnd` (nearest offset). RN-web no implementa snapToOffsets ni emite momentum con wheel/scroll programático (verificado: wheel real → scrollLeft 600 sin asentar, dots sin mover). Solo verificable con gesto táctil en device. |
| 4c | Carrusel home-zonas: dots sincronizan | PASA | 3 ítems de 293px (75vw fiel); scrollLeft=480 → tercer dot activo [8,8,24]. `snapToInterval` declarado; asentamiento táctil → device-QA. |
| 4d | Sin cortes de layout en carruseles | PASA | Screenshots: peeks correctos (Borneo en home; México/Borneo en avances), tarjetas completas, dots alineados. |
| 5a | Toggle Mensual/Anual actualiza los 3 precios | PASA | Click Anual → aria-labels instantáneos «Básico, $4/mes…», «Estándar, $8/mes…», «Premium, $12/mes…»; $5/$10/$15 desaparecen del DOM; «facturado anualmente» ×3 exacto (0 en Mensual — re-render, no CSS); «/mes» se conserva; reversión limpia a $5/$10/$15. Coincide con `02-content-suscripcion.md` §2. |
| 5b | Selector de planes | PASA | Click Premium → bg blanco + check (único distintivo, sin badge); Básico/Estándar transparentes; restaurado a Estándar. |
| 5c | Testimonios: cada avatar swapea | PASA | Carlos → tarjeta+quote de Carlos; Lucía → los suyos; Ana restaurada. Los 3 quotes verbatim vs exploración. |
| 5d | CTA «Comenzar mi travesía» | PASA | Click → sigue en `/suscripcion`, 0 errores (no navega a propósito — autorizado). |
| 6a | Sin overflow horizontal | PASA | `documentElement.scrollWidth === 390` en home, zonas, detalle, suscripción (ambos estados del toggle) y nosotros. |
| 6b | Imágenes sin layout shift / sin romper | PASA (proxy) | 0 `<img>` rotas (naturalWidth>0), 0 requests ≥400 en performance API. Layout shift real y fluidez de scroll → device-QA. |
| 7 | Font scale del sistema aumentado | DEVICE-QA | No simulable en expo web. |
| 8 | Consola limpia | PASA | Todas las pantallas: 0 errores, 1 warning conocido (`props.pointerEvents is deprecated`, RN-web pre-existente — ver nota N1). |

## Fidelidad visual §3.2 (390, vs docs/exploration/06-screenshots/)

| Pantalla / sección | Referencia | Veredicto |
|---|---|---|
| home hero | home-hero-390 | PASA — h1/sub/CTA idénticos, video de fondo (frame difiere por ser video). Glass pill + tabs = autorizados. `qa-home-hero.png` |
| home que-es | home-que-es-390 | PASA — título, sub, thumbnail, play glass, CTA «Quiero hacer parte» fieles. `qa-home-que-es.png` |
| home zonas | home-zonas-390 | PASA — fondo accent, tarjeta Amazonia + peek Borneo, chip «Ver más →», CTA oscuro; dots añadidos = autorizado. `qa-home-zonas.png` |
| home testimonios | home-testimonios-390 | PASA — tarjeta crema, foto Ana, play inerte, banda nombre/rol, quote verbatim, 3 avatares. `qa-home-testimonios.png` |
| home aliados + stats | home-aliados/stats-cta-390 | PASA — 3 círculos grayscale en fila; 35K accent sobre bosque oscuro + «Quiero unirme». Sin footer = autorizado. `qa-home-final.png` |
| zonas hero | zonas-hero-390 | PASA — crema + patrón ondas, h1 y sub centrados idénticos. `qa-zonas-top.png` |
| zonas grid | zonas-zonas-grid-390 | PASA — pila vertical Amazonía/México/África con descripciones y chips, idéntica. `qa-zonas-top.png` |
| zonas avances (dot 3) | zonas-avances-dot3-activo-390 | PASA — ≈ pixel-perfect: mismos peeks, título accent, «• 2026», dots. `qa-zonas-avances-dot3.png` |
| detalle amazonia (derivada) | composición/tokens | PASA — hero imagen+scrim con h1 blanco, avances en verde oscuro (mismos tokens de /zonas), back glass 44×44. `qa-detalle-amazonia.png` |
| suscripción collage + planes Mensual | collage-hero + planes-mensual-390 | PASA — collage 3+2 idéntico; toggle blanco/verde (texto activo `rgb(255,255,255)` verificado computado); Estándar activo con check; CTA y legal fieles. `qa-suscripcion-mensual.png` |
| suscripción planes Anual | planes-anual-390 | PASA — $4/$8/$12 + «facturado anualmente» ×3 con wrap a 2 líneas igual que la referencia. `qa-suscripcion-anual.png` |
| suscripción beneficios | beneficios-390 | PASA — 6 ítems con iconos verdes, textos y wraps idénticos. `qa-suscripcion-beneficios.png` |
| nosotros (derivada) + footer | composición/tokens + home-footer-390 | PASA — «Sobre Nosotros», 35K, aliados, CTA accent; footer pila centrada con tagline/CONTACTO/redes/© verbatim del footer web, sin columna MENÚ = autorizado. `qa-nosotros-top.png`, `qa-nosotros-footer.png` |
| header / menú móvil | home-header/menu-movil-390 | N/A — sustituidos por pastilla glass + bottom tabs (autorizados); pastilla visible en todas las capturas. |

Screenshots de esta auditoría en `.playwright-mcp/qa-*.png` (13 archivos).

## Hallazgos

Ningún hallazgo bloqueante ni menor. Notas (sin acción requerida):

- **N1 (nota, conocida):** warning de consola `props.pointerEvents is
  deprecated. Use style.pointerEvents` (RN-web, pre-existente). Única entrada
  de consola en todas las pantallas.
- **N2 (nota):** la sincronización de dots al arrastrar depende de
  `onMomentumScrollEnd`, que en web solo emite con gesto táctil real; el
  mecanismo quedó verificado por código (nearest-offset) y por dot-click en
  vivo (407 exacto). Confirmar el arrastre en device (ya listado en Device-QA).
- **N3 (nota):** `accessibilityState={{selected}}` (testimonios, dots, planes)
  no se serializa a `aria-selected` en RN-web para role=button; en nativo sí
  se anuncia. Limitación de RN-web, no del código.
- **N4 (nota):** la consola histórica del navegador MCP arrastraba errores de
  sesiones previas (WebSocket HMR caído, `useRef is not defined` de un
  hot-reload viejo de ZonesCarousel). El código actual no usa `useRef` y
  ninguna carga de esta sesión los reprodujo. Ruido de entorno, no de la app.
- **N5 (nota, verificado OK):** targets táctiles <44px visuales compensados
  con `hitSlop` en código (toggle 36px alto + hitSlop vertical; dots 8px +
  alto fijo y hitSlop lateral). Back flotante 44×44 y planes 109×65-68 ya
  cumplen sin compensar. Patrón RN correcto.

## Device-QA del dev (no simulable en web)

1. Pasada completa iOS + Android en Expo Go, un device chico y uno grande.
2. Snap real de los carruseles (home-zonas `snapToInterval`; avances
   `snapToOffsets` [0,171,407,643,814]) y sincronización de dots al soltar el
   arrastre (`onMomentumScrollEnd`).
3. Fluidez de scroll y ausencia de layout shift con imágenes en red real.
4. Comportamiento nativo del video (expo-video): pausa al salir de pantalla,
   audio del bloque que-es en el hardware.
5. Safe areas/notch (tabs y pastilla glass sobre notch y home indicator).
6. Font scale del sistema aumentado: textos legibles, sin cortes.
7. Blur de expo-blur en Android (cae a translúcido simple — límite documentado
   en README; confirmar que sigue legible).
