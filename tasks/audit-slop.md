# Auditoría anti AI-slop — §3.2 (Fase 3) — ESTADO FINAL

Fecha: 2026-08-19 (re-verificación tras fixes del orquestador) · Alcance:
working tree. Método: checklist §3.2 completo con evidencia; «Fidelidad
visual» excluida (la cubre qa-auditor). Divergencias autorizadas por el dev
(tabla del README §adaptación y review bloque F de tasks/todo.md) NO se
cuentan como hallazgos: tabs, footer solo en Nosotros, glass, snap+dots en
home, pantallas derivadas, CTA sin navegar, play real en que-es.

## Resultado por ítem

| # | Ítem §3.2 | Veredicto | Evidencia |
|---|---|---|---|
| 1 | **Contenido fiel** (data vs 02-content-*) | ✅ PASA | Diff automatizado: cada string literal de `src/data/*.ts` (comentarios y paths excluidos) buscado verbatim (whitespace normalizado por el word-wrap de los .md) en `docs/exploration/02-content-*.md` + 01/03/04/05 → **0 discrepancias**. Grafías trampa verificadas a mano: «savana», «120,000», «Ana Rodriguez» sin tilde, «Amazonia»(home)/«Amazonía»(zonas), «one impact» en minúsculas, «• 2026», «$5…$12» sin decimales, em dash de «One Impact — video introductorio». «Ir al avance 2–4» cubiertos por la serie documentada (02-content-zonas.md:78). Claim de home.ts verificado: `cmp` → video-thumbnail.jpg y zones/patagonia.jpg **byte-idénticos**. Strings visibles en features: todos de `@/data` (único literal: `BACK_LABEL='Volver'`, solo a11y — N11). |
| 2 | Cero código muerto (knip + assets) | ✅ PASA | Re-corrido: `npx knip` → solo el falso positivo pre-conocido (`expo-updates` desde app.json, sin key `updates`). H2 verificado: `grep menuHeading src/ app/` → 0 matches. H3 verificado: `grep navLink\|mobileMenuLink\|mobileMenuCta` → 0 matches. H6 verificado: `hero-bg.jpg`/`logo_negro.svg` ya no existen en assets/ (git ` D`), copias intactas en `public/images/` (registro de lo entregado); cruce find-vs-requires: 100% de assets/ referenciado por código o app.json (`expo.icon/` vía `ios.icon`; advances/ intacto, 5 archivos). Queda solo N7 (tokens de captura, nota). |
| 3 | Sin console.log / TODO / imports sin uso | ✅ PASA | `grep -rn "console\.\|TODO\|FIXME\|XXX\|HACK" src/ app/` → 1 match: «TODO el contenido» (español, SubscriptionScreen.tsx — no es marcador). `npx eslint .` re-corrido → exit 0. |
| 4 | Sin abstracciones prematuras | ✅ PASA | Barrels `features/*/index.ts` = arquitectura prescrita (PLAYBOOK líneas 157/180). shared/ = 4 componentes con consumo real (Button 8 call sites, Screen 4, SectionTitle 6, BrandHeader vía Screen). Cero carpetas vacías (find → nada). El nuevo `svgGradientStops()` NO es prematuro: 5 consumidores reales verificados (HeroSection:23, ZoneCard:20, TestimonialCard:26, ZoneGridCard:22, ZoneDetailScreen:45), comentario canónico del fix de alfa junto a `gradients` en colors.ts:72–77, exportado por el barrel del theme. |
| 5 | Comentarios: solo porqués | ✅ PASA | Leídos todos los archivos de src/+app/: comentarios citan fuente (03 §…, raw/…) o explican decisiones no evidentes (fix alfa react-native-svg —ahora una sola vez, en el helper—, snapToOffsets ≈ snap-center, VirtualizedList anidada). Sin docstrings genéricos. |
| 6 | Sin estilos duplicados / valores mágicos | ✅ PASA | Cero hex/rgba fuera de `src/shared/theme/` (grep: solo 2 menciones en comentarios citando la captura). H5 verificado: `spacing[2]` y `spacing[24]` añadidos con fuente observada (spacing.ts:6,12 — gap-0.5/mt-0.5/mb-0.5 y mb-6/w-6); `grep MB_6\|HALF_STEP` → 0 matches; los 7 puntos de uso migrados a token (SubscriptionScreen:117, PlanCard:97,108, BenefitsList:39,51, ZonesCarousel:145, ProgressCarousel:39 `DOT_ACTIVE_WIDTH = spacing[24]`). `44` = HIG (pre-autorizado). Queda solo N8 (dims de logo, nota). |
| 7 | Naming consistente | ✅ PASA | H4 verificado: `AdvanceCard` → `ProgressUpdateCard` (archivo renombrado, interface `ProgressUpdateCardProps`, 2 importadores: ProgressCarousel:32, ZoneDetailScreen:43); `grep AdvanceCard` → 0 matches. El código usa un solo término por concepto: `ProgressUpdate/progressUpdates/progressSection/ProgressCarousel/ProgressUpdateCard`. «advance*» restante SOLO en espejos del sitio: tokens `typography.*.advanceCard/advanceDate` (nombres de las recetas de raw/zonas-styles.json › advanceCard) y `assets/images/advances/` (paths del sitio, 04-assets-map) — misma regla que las grafías verbatim, razonada en el comentario del componente (ProgressUpdateCard.tsx:5–6); el style key local `advances` de ZoneDetailScreen espeja la sección «Avances». Criterio: satisface «un término por concepto» en código. Resto verificado sin sinónimos (grep region/area/territory/sector → solo APIs SafeArea*). |
| 8 | Tamaños ≤200 líneas | ✅ PASA | Único >200: `ZoneDetailScreen.tsx` (208) con justificación escrita en su header que **se sostiene**: pantalla derivada auto-contenida; partirla crearía componentes de un solo uso que §3.2 prohíbe. |

## Hallazgos

**Bloqueantes: 0. Menores abiertos: 0.**

Menores — todos RESUELTOS y re-verificados:

1. ~~[menor] `GRADIENT_STOPS` copiado 5×~~ → **RESUELTO**: helper `svgGradientStops()` en shared/theme/colors.ts:77 con el comentario canónico; 5 consumidores migrados (evidencia en ítem 4).
2. ~~[menor] `footer.menuHeading` sin consumidor~~ → **RESUELTO**: campo eliminado de src/data/navigation.ts (grep → 0).
3. ~~[menor] Tokens `navLink/mobileMenuLink/mobileMenuCta` inalcanzables~~ → **RESUELTO**: podados de typography.ts (grep → 0).
4. ~~[menor] Dos términos para «avance»~~ → **RESUELTO**: `ProgressUpdateCard`; «advance*» solo en nombres-espejo del sitio, documentado (evidencia en ítem 7).
5. ~~[menor] Valor 24/2 fuera de escala resuelto de 3 formas~~ → **RESUELTO**: `spacing[2]`/`spacing[24]` en la escala (ambos observados); composiciones y literal eliminados (evidencia en ítem 6).
6. ~~[menor] `hero-bg.jpg`/`logo_negro.svg` sin require en assets/~~ → **RESUELTO**: borrados de assets/ (git ` D`); las copias de captura siguen en `public/images/`.

Notas abiertas (sin acción requerida para cerrar §3.2):

7. **[nota] Tokens capturados sin uso y sin anotación:** `white10`, `black10`, `bodyText`, `testimonialDecorYellow` (colors.ts) no tienen consumidor ni la marca «sin uso observado» que sí llevan `gray300`, `red500` y `radius.xl`. Fix: anotarlos igual.
8. **[nota] Dimensiones de logo hardcodeadas sin fuente:** `width={96} height={38}` (BrandHeader.tsx:23) y `width={120} height={47}` (about/components/Footer.tsx:22) sin comentario de origen. Fix: una línea de comentario con su derivación.
9. ~~[nota] Icono/splash defaults del template Expo~~ → **RESUELTO**: README (línea ~100) lo documenta como decisión pendiente de marca (el sitio no entrega branding de app).
10. **[nota] Duplicación consciente PartnersRow (home) / PartnersSection (about):** justificada en código y por la regla del playbook línea 179 («los features nunca se importan entre sí»). Constancia: con un tercer consumidor, sube a shared/.
11. **[nota] `BACK_LABEL = 'Volver'`** (ZoneDetailScreen.tsx): único string no proveniente de docs; solo accessibilityLabel (no visible) y justificado en código. Constancia, no acción.

Cross-ref (no cuenta aquí): `.DS_Store` raíz trackeado — reportado en tasks/audit-security.md §3.1 ítem 7.

## Discrepancias de contenido (ítem 1)

**Ninguna.** 0 strings inventados, alterados, re-puntuados o desacentuados en `src/data/*.ts` frente a `docs/exploration/02-content-*.md`.
