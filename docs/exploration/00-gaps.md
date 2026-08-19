# 00 — Reporte de huecos vs checklist §1.5 (consolidación 2026-08-19)

Estado por ítem del criterio de cierre de fase (PLAYBOOK §1.5). "Cubierto"
significa con evidencia en los artefactos; los huecos se listan exactos, no se
rellenan.

## 1. «Todo texto que se verá en la app existe verbatim en 02-content-*.md»

**Cubierto** para `/` (9 secciones, incl. las 3 quotes de testimonios y menú
móvil), `/zonas` (3 tarjetas + 5 avances) y `/suscripcion` (incl. los dos
estados del toggle: precios Mensual $5/$10/$15, Anual $4/$8/$12 y el microcopy
«facturado anualmente» que solo existe en Anual).

**Falta:**
- Todo el contenido de `/nosotros` — 403 real del origin (evidencia:
  `06-screenshots/nosotros-blocked-403-1440.png`).
- Todo el contenido de las 5 fichas `/zonas/[slug]` (`amazonia`, `mexico`,
  `africa`, `borneo`, `patagonia`) — 403 (evidencia:
  `06-screenshots/zona-amazonia-blocked-403-1440.png`). Vías automatizadas
  agotadas (ver 01-sitemap); **requieren captura manual del dev** o quedan
  fuera del alcance con decisión explícita.
- `/registro` (descubierta, no estaba en el playbook): solo hay title + h1 en
  el sitemap. No explorada — **decisión de alcance pendiente del dev**.

## 2. «Cada asset de public/ está mapeado (o marcado "no usado")»

**Cubierto y con verificación física COMPLETA.** El brief de consolidación
asumía `public/` fuera del repo; en realidad está en el repo (27 archivos
trackeados). Se midió cada archivo (`sips`/`mdls`): dimensiones físicas = las
observadas en el sitio en los 25 assets usados. 25 mapeados a
pantalla/sección, 2 marcados "no usado" (`logo_negro.svg`, `hero-bg.jpg`).
Hallazgo extra: `zones/patagonia.jpg` ≡ `video-thumbnail.jpg` (byte-idénticos,
mismo MD5).

**Hueco residual (no bloqueante):** los 2 assets no usados podrían pertenecer
a las pantallas 403 — inverificable hasta tener esas capturas. `.DS_Store` en
`public/` y `public/images/` pendientes de eliminar en el checkpoint (nota
§1.4 del playbook).

## 3. «Tokens suficientes para no inventar ni un color ni un tamaño»

**Cubierto** para las 3 pantallas exploradas: 30 colores sólidos con
procedencia (17 vars de theme + arbitrarios), 10 alphas blancos + 7 negros, 4
gradientes, tipografía por rol con variantes 1440/390, radios, espaciados y 6
conflictos entre pantallas documentados (gutter 16 vs 20px, pesos 900 vs 700,
dos chips «Ver más», dos tarjetas de zona, dos gradientes, tres h1).

**Huecos menores (listados, no rellenados):**
- Valores computados de `shadow-sm`/`shadow-md` no capturados (solo nombre de
  clase).
- Valor px del breakpoint `md` no medido (solo se sabe 390 < md ≤ 1440).
- `SPAN 24px/700/lh 30px` presente en el muestreo de las 3 pantallas sin
  atribución de rol.
- `white/25`, `#FFF1DA`, `#FFE97A` observados en la paleta de home sin
  ubicación exacta (decorativos dentro de testimonios).
- Peso del h1 de home a 390 no re-medido (solo tamaño/line-height).

**Hueco mayor:** cero tokens de `/nosotros` y de las fichas de zona (403).

## 4. «Screenshot de referencia por sección»

**Cubierto** para las 3 pantallas: 56 archivos en `06-screenshots/` — por
sección en 1440 y 390, full-page ambas, más estados (menú móvil, hover tarjeta
zona, dot 3 activo, toggle Mensual/Anual en ambos viewports, testimonios
Carlos/Lucía activos).

**Falta:** secciones de `/nosotros` y de las 5 fichas de zona (solo existe la
evidencia del 403 de cada bloqueo). Menor: no hay `zonas-footer-390.png`
dedicado (el footer 390 queda cubierto por `zonas-fullpage-390.png` y el
canónico `home-footer-390.png`).

## 5. «Slugs reales de zonas enumerados»

**Cubierto**: 5 slugs desde hrefs reales del DOM (`amazonia`, `mexico`,
`africa`, `borneo`, `patagonia`), con fuente por slug (01-sitemap).

**Duda documentada (no resoluble con lo capturado):** el sitio es
inconsistente — home linkea amazonia/borneo/patagonia y `/zonas` linkea
amazonia/mexico/africa; solo `amazonia` aparece en ambas. Los 5 devuelven 403:
ningún slug pudo confirmarse con contenido. La lista es real pero la app
deberá decidir qué conjunto muestra cada pantalla (el sitio muestra
conjuntos distintos).

## Veredicto

La fase **puede cerrar para `/`, `/zonas` y `/suscripcion`**: contenido,
tokens, assets (verificados físicamente), interacciones y screenshots
completos, con huecos menores listados que no obligan a re-explorar.

**No puede cerrar como "sitio completo"** sin decisión del dev sobre:
1. `/nosotros` y los 5 `/zonas/[slug]` → captura manual o exclusión explícita
   del alcance (ningún explorer puede resolverlo: es un 403 del origin).
2. `/registro` → dentro o fuera del alcance.

---

## Decisión del dev (2026-08-19) — cierra los huecos por alcance

1. **`/nosotros` y las 5 fichas `/zonas/[slug]`:** se diseñan **derivadas** de
   lo capturado (tarjetas de zona, avances por territorio, tokens) — simples,
   como propuesta de lo que debería ir ahí. El README las documentará como
   interpretación, no réplica.
2. **`/registro`:** fuera de alcance; queda solo el link y sus params
   documentados (01-sitemap, 05-interactions).

Con esto el checklist §1.5 cierra: los ítems restantes estaban gateados
únicamente por estas pantallas.
