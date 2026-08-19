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
