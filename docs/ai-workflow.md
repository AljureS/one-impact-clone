# AI workflow — evidencia de uso de agentes

Registro por bloque (PLAYBOOK §2.7): qué se pidió, qué se aceptó tal cual,
qué se rechazó o ajustó a mano y por qué. Se escribe al cerrar cada bloque,
no reconstruido al final.

---

## Bloque 0 — Equipo de subagentes y skills (2026-08-18)

**Qué se pidió:** diseñar el mejor equipo de subagentes y skills para ejecutar
el playbook completo, usando la metodología del skill-creator oficial de
Anthropic, extrayendo prácticas de Playwright de repos oficiales
(`microsoft/playwright/.claude/skills`) y con el límite de contexto de los
modelos como restricción de diseño.

**Qué hizo el agente:**
- Investigó con 2 subagentes: (a) `microsoft/playwright` y
  `anthropics/skills`, (b) la spec de frontmatter de agentes/skills de Claude
  Code.
- Hallazgo relevante: los skills de `.claude/skills` de microsoft/playwright
  son para desarrollar Playwright (dev/devops/test-results/triage), **no**
  para manejar el navegador. La doctrina oficial de manejo del navegador vive
  en los templates planner/generator/healer
  (`packages/playwright/src/agents/`): snapshot-first, refs, nunca
  `networkidle`, persistir a archivos. Eso se adaptó (con atribución) en el
  skill `site-exploration` en vez de copiar skills que no aplicaban.
- Escribió 7 agentes (`.claude/agents/`) alineados a las fronteras de
  paralelismo de CLAUDE.md §2 — Fase 1: `site-explorer` (por pantalla) +
  `exploration-consolidator`; Fase 2: `foundation-builder` +
  `feature-builder` (por feature); Fase 3: `security-auditor` +
  `slop-auditor` + `qa-auditor` (por checklist) — y 4 skills
  (`.claude/skills/`): `playbook` (orquestación), `site-exploration`,
  `web-to-native`, `verify-block`.
- Diseño por economía de contexto: artefactos en disco como interfaz entre
  agentes, respuestas ≤30 líneas, skills precargados por agente (campo
  `skills:`), continuación de agentes calientes vía SendMessage, exploradores
  secuenciales por el navegador MCP único.

**Aceptado / ajustado por el dev:** (pendiente de revisión del dev)

---

## Bloque 0.1 — Perfeccionar la parte React Native con docs oficiales (2026-08-18)

**Qué se pidió:** escanear los docs de React Native
(`archive.reactnative.dev/docs/next/getting-started`) y perfeccionar la parte
RN del equipo.

**Qué hizo el agente:**
- Subagente de investigación sobre los docs: detectó que la URL dada es el
  sitio de archivo congelado en ~0.59 (pre-Pressable, pre-new-architecture) y
  usó reactnative.dev vigente (v0.87) como autoridad, contrastando ambos.
- Verificó las 13 afirmaciones RN del skill `web-to-native`: 13 confirmadas,
  con 6 correcciones/matices integrados — `boxShadow` cross-platform (new
  arch, default desde 0.76), `SafeAreaView` core deprecado, props
  `translucent`/`backgroundColor` de StatusBar retirados (edge-to-edge),
  porcentajes válidos en width/height, defaults `flexShrink: 0` y
  `alignContent: flex-start`, y atribución correcta de los mínimos táctiles
  (HIG/Material, no docs RN).
- Añadió `web-to-native/references/recetas-rn.md` (progressive disclosure:
  se lee al construir la sección, no se precarga) y actualizó la decisión de
  sombras en `foundation-builder`.

**Aceptado / ajustado por el dev:** (pendiente de revisión del dev)

---

## Fase 1 — Exploración del sitio (2026-08-18/19)

**Qué se pidió:** planear Fase 1 (plan mode, aprobado por el dev) y ejecutarla
con un /loop de calidad que verificara cada artefacto contra los estándares
del playbook antes de lanzar la siguiente unidad, usando los subagentes y
skills del equipo.

**Qué hizo el agente:**
- Orquestación: 4 lanzamientos de `site-explorer` (sitemap, home, zonas,
  suscripcion) SIEMPRE secuenciales (navegador MCP único) + 1
  `exploration-consolidator`. Cada ciclo del loop: verificación de archivos
  en disco + spot-check visual de un screenshot contra el 02-content
  correspondiente (3/3 verbatim ✓).
- Resiliencia: la misión home cayó 2 veces por límite de API; se reanudó el
  MISMO agente por SendMessage con orden de persistir-a-disco-primero — sin
  pérdida de datos ni re-trabajo de navegador.
- Producido: `01-sitemap` (5 slugs desde hrefs reales) · `02-content-*` ×3
  verbatim · `03-design-tokens` (30 colores con procedencia, 6 conflictos
  documentados) · `04-assets-map` (27/27 con verificación física; duplicado
  patagonia≡video-thumbnail por MD5) · `05-interactions` (3 patrones de
  carrusel, matriz de 6 hrefs del toggle) · `00-gaps` (§1.5 por ítem) ·
  56 screenshots 1440/390 por sección y estado.
- Límite honesto: `/nosotros` y las 5 fichas `/zonas/[slug]` devuelven 403
  del origin (4 vías agotadas, evidencia PNG); `/registro` descubierta fuera
  del playbook. Ambas cosas quedaron como decisión del dev, no se inventó
  contenido (regla 1).

**Aceptado / ajustado por el dev (2026-08-19):** decidió que las fichas de
zona y `/nosotros` se diseñen **derivadas** de lo capturado — simples, como
propuesta de lo que debería ir ahí, documentadas en README como
interpretación y no réplica — y que `/registro` quede fuera de alcance (solo
el link documentado). Con eso autorizó cerrar la fase y ejecutar el
checkpoint.

---

## Fase 2 — Construcción (2026-08-19)

**Qué se pidió:** plan de Fase 2 (plan mode, aprobado por el dev con 11
decisiones de adaptación explícitas) y ejecución con /loop de precisión:
cada bloque verificado con verify-block antes de continuar.

**Qué hizo el agente:**
- `foundation-builder` (1 agente continuado): B1 scaffold SDK 57 →
  B2 theme (6 conflictos del sitio respetados por pantalla; sombras SIN
  token porque la exploración no capturó valores) → B3 data (verbatim con
  script de cruce; paró y preguntó antes de crear `home.ts` fuera de la
  estructura §2.1 — autorizado) → B4 navegación+shared.
- `feature-builder` ×4 (uno por carpeta): home por secciones (6 commits),
  zones (índice fiel + detalle derivado), subscription (toggle verificado
  en vivo con los 8 cambios exactos), about (derivada con tabla
  fuente-por-elemento).
- Orquestador: gate visual por sección (expo web 390 + Playwright,
  comparación lado a lado contra 06-screenshots), interacciones probadas en
  vivo (swap de testimonios, toggle 5/10/15↔4/8/12), BrandHeader compartido,
  fix del Footer a 2 columnas (fidelidad al colapso real), limpieza knip.

**Qué se rechazó/corrigió en el loop (el agente lo detectó, no pasó):**
1. `experimental_backgroundImage` para el gradiente del hero → no rinde en
   react-native-web; se exigió reescritura a react-native-svg.
2. Bug latente de react-native-svg NATIVO: descarta el alfa de `stopColor`
   → `stopOpacity` explícito en los 3 overlays (hallado por el builder al
   investigar la causa raíz).
3. Svg overlays sin width/height → caían al default 300×150 en web;
   corregido en hero, ZoneCard y TestimonialCard.
4. CTA de stats alineado a la izquierda (el sitio lo centra) → centrado.
5. Footer apilado → el sitio a 390 mantiene MENÚ|CONTACTO lado a lado;
   corregido en shared por el orquestador.
6. Exports muertos (navLinks, menuLabels, fontFamily, ZoneSlug) → podados
   tras knip en el cierre de fase.

**Aceptado / ajustado por el dev:** (pendiente de revisión; commits
propuestos por bloque en tasks/todo.md y el reporte final)

---

## Bloque F — Feedback UI/UX del dev: "es una app, no una web" (2026-08-19)

**Qué se pidió (feedback directo del dev tras revisar la app):** (1) el
footer sobra en una app — quizá solo en Nosotros, y ahí mejor para teléfono;
(2) glassmorphism donde haya elementos superpuestos, solo en/durante el
overlap (el dev añadió el skill `ui-ux-pro-max` para esto); (3) verificar que
los videos/cinemática existen y no mostrar lo que no exista. Plan aprobado en
plan mode + /loop contra el playbook.

**Qué hizo el agente:**
- Footer: eliminado de home/zonas/detalle/suscripción (cada pantalla cierra
  en su última sección full-bleed, sin corte); movido a
  `features/about/components/` (único consumidor) y rediseñado phone-first
  con la data existente — pila centrada, contacto integrado (se eliminó la
  sección CONTACTO duplicada de AboutScreen), targets 44pt verificados en
  DOM. `src/data/` intacto.
- Glass (spec del skill mapeado a tokens existentes black30/white20):
  pastilla tras el logo flotante — de paso resuelve el bug latente del logo
  blanco ilegible sobre secciones claras —, BlurView en el play de que-es
  (el sitio real lleva `backdrop-blur-sm` ahí: fidelidad recuperada) y en el
  back flotante del detalle. Descartado con criterio: glass en la tab bar
  (no hay overlap: el contenido no pasa por debajo) y en los scrims
  fotográficos del sitio (fidelidad manda). Dependencia nueva aprobada en
  plan: expo-blur.
- Videos: inventario (ambos usos = `one-impact-intro.mp4`, único video del
  sitio, que el propio sitio usa de fondo del hero — el hero de la app ES
  fiel). **Bug real cazado por el gate:** en web el tap de que-es no
  reproducía — `player.play()` corría en el mismo tick del montaje del
  VideoView y expo-video web itera `_mountedVideos` (aún vacío) → cero
  llamadas al elemento. Fix de causa raíz: play como efecto del estado
  `showPlayer`. Evidencia de línea de tiempo: tap → playing → 9.8s completos
  con audio → ended. Hero verificado avanzando en web y renderizando en iOS.
- Falso culpable durante el diagnóstico: el server de gates corría con
  `CI=1`, que desactiva el watcher de Metro → bundle viejo enmascaraba el
  fix (regla nueva en lessons).

**Qué se rechazó/ajustó:** nada del feedback se recortó; dos ampliaciones
mínimas justificadas (back del detalle con el mismo glass — misma regla de
UI flotante; fix del play — el gate lo exigía).

**Aceptado / ajustado por el dev:** (pendiente de revisión)

---

## Fase 3 — Auditoría (2026-08-19/20)

**Qué se pidió:** plan de Fase 3 (plan mode, aprobado) y ejecución según la
doctrina del skill playbook: auditores que reportan con evidencia sin
arreglar, fixes por bloques del orquestador, re-audit hasta verde.

**Qué hizo el agente:**
- Ronda 1: `security-auditor` + `slop-auditor` + `qa-auditor` en paralelo
  (solo qa usa el navegador), cada uno con las divergencias autorizadas del
  bloque F en su brief y reporte a `tasks/audit-*.md`.
- Resultados: security 5/7 → fixes → verde salvo la acción git del dev;
  slop 0 bloqueantes + 6 menores → fixes → **8/8**; qa **15/15 funcional y
  13/13 visual con 0 hallazgos** (deep links 5/5, toggle, carruseles con
  offsets exactos del sitio, ambos videos reproduciendo).
- Fixes del orquestador (gates tsc/eslint/knip + spot visual en DOM):
  justificación de `npm audit` en README (16 vulns transitivas de tooling
  build-time, sin fix upstream no-breaking); `svgGradientStops()` en theme
  (5 copias → 1 helper, stops verificados idénticos); poda de
  `menuHeading` + 3 tokens de tipografía del menú web; rename
  `AdvanceCard → ProgressUpdateCard` (código unificado en `progress*`,
  «advance*» solo en nombres-espejo del sitio); `spacing[2]`/`spacing[24]`
  añadidos (valores observados) y 7 usos unificados; 2 assets sin uso
  fuera de `assets/` (copias en `public/`); nota de icono/splash template
  en README.
- Cierre DoD: clon limpio (`git clone` + `npm install` + `npx expo start`)
  sirviendo y compilando el bundle web (HTTP 200) — validado sobre HEAD;
  re-verificar tras los commits.

**Qué queda del dev:** `git rm --cached .DS_Store` en su próximo commit;
device-QA de §3.3 (7 ítems listados en tasks/audit-qa.md); grabar el GIF.

**Aceptado / ajustado por el dev:** (pendiente de revisión)
