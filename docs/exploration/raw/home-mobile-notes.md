# Notas móviles — home a 390×844

Recarga real a 390×844; medidas computadas del DOM (2026-08-19). Alto total de
página: 4618px (vs 5163px a 1440). Padding lateral global de secciones: 16px
(`px-4`). Todo colapsa a una columna salvo lo indicado.

## header (79px de alto)

- Solo **logo (120×47) + hamburguesa** (`md:hidden` invertido: links y CTA
  desktop con `display:none`).
- El CTA «Únete a One Impact» del header **desaparece** a 390; su equivalente
  vive al fondo del menú móvil.
- La nav sigue `fixed` y **100% transparente** también en móvil (mismo riesgo
  de contraste sobre secciones claras).

## menu-movil (overlay fullscreen)

- `fixed inset-0 z-[100]` fondo **accent #C8D400**, aparece con
  `transition-opacity`; X «Cerrar menú» arriba a la derecha.
- Links apilados: 16px/400, color gray-900, `padding: 20px 0`, separador
  `border-bottom 1px black/10` (filas de ~71px).
- CTA «Únete a One Impact» abajo: `w-full bg-gray-900 text-white text-base
  font-bold py-4 rounded-full text-center` (pastilla negra full-width).
- Evidencia: `06-screenshots/home-menu-movil-390.png`.

## hero (844px = exactamente 100vh)

- `min-h-screen` se mantiene: el hero ocupa el viewport completo.
- Cambio clave de layout: a 390 el bloque de texto se ancla **abajo**
  (`items-end` + `pb-16` = 64px); en md+ se centra verticalmente
  (`md:items-center`). El h1 queda en el tercio inferior.
- h1: 36px/45px (desktop 60px/75px). Párrafo: 16px/24px white/80 (desktop
  18px/28px). CTA blanca inline de 238px — NO full-width.
- El video de fondo se comporta igual (autoplay muted loop playsinline).

## que-es (572px)

- Encabezado y párrafo alineados a la izquierda (igual que desktop); h2 30px
  (desktop 48px).
- Thumbnail de video: 358×201 (full-width del contenedor, `aspect-video`);
  botón play de 64px (`w-16`, en md 80px).
- CTA «Quiero hacer parte» inline 184px, no full-width.

## zonas (795px) — LA sección que cambia de patrón

- El grid de 3 columnas se convierte en **carrusel horizontal nativo por CSS**:
  `flex gap-4 overflow-x-auto scrollbar-hide` + tarjetas `flex-shrink-0
  w-[75vw]` (293px medidos) `aspect-[3/4]`.
- `scrollWidth` 942 vs `clientWidth` 390 → ~2.4 tarjetas de contenido; la
  siguiente tarjeta asoma (peek) por el bleed `-mx-4 px-4` (llega al borde de
  la pantalla).
- **Sin** scroll-snap (`scroll-snap-type: none`), **sin** dots, **sin**
  flechas, **sin** autoplay (scrollLeft estable). Drag/swipe nativo verificado
  (scrollBy 300 → scrollLeft 300).
- Scrollbar oculta (`scrollbar-hide`).
- h2 30px. CTA «Explora todas las zonas» (block, 221px) centrada bajo el
  carrusel.
- Adaptación RN sugerida: FlatList horizontal con `snapToInterval` opcional
  (el original no snapea) y `ITEM_WIDTH = 0.75 * width`.

## testimonios (1009px)

- Columna única centrada (max-w-md): tarjeta grande 334×445 (`aspect-[3/4]`
  full-width), quote debajo, fila de avatares, CTA.
- Fila de avatares: flex `justify-center`, gap 20px, 326px de ancho total,
  `overflow-x: auto` (con 3 perfiles no desborda).
- CTA «Conecta con la comunidad» 358px = full-width del contenedor.
- h2 30px; el layout es esencialmente el mismo que desktop (la sección ya era
  una columna estrecha centrada a 1440).

## aliados (435px)

- Los 3 círculos **permanecen en fila** (flex row nowrap, gap 32px), círculos
  de 96px (`w-24`; en md 112px). 3×96 + 2×32 = 352px < 358px disponibles: cabe
  sin scroll ni wrap.
- h2 30px, textos centrados (igual que desktop).

## stats-cta (412px)

- Mismo layout centrado; cifra «35K» baja a **72px** (`text-7xl`; desktop
  128px `text-9xl`). Intro 18px, cierre 20px aprox por clases
  `text-lg`/`text-xl`.
- CTA «Quiero unirme» inline 160px. Fondo stats-bg.jpg + overlay forest/80
  igual.

## footer (551px)

- Las columnas se apilan verticalmente: flex-direction column, gap 40px —
  orden: logo + tagline + social, «MENÚ», «CONTACTO», copyright al final.
- Mismo contenido; nada desaparece.

## Resumen de desapariciones/cambios de patrón

| Sección | Desktop → 390 |
|---|---|
| header | links + CTA → hamburguesa (CTA migra al menú móvil) |
| hero | texto centrado vertical → anclado abajo; h1 60→36px |
| zonas | grid 3 col → carrusel horizontal 75vw con peek, sin snap/dots |
| stats | cifra 128→72px |
| footer | 2 bloques en fila → columna única |
| resto | misma estructura, tipografías reducidas (h2 48/36 → 30px) |
