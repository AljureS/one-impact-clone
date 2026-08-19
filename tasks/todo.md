# Fase 1 — Exploración del sitio (en curso)

Plan aprobado (plan mode). Ejecución con /loop de calidad: verificar los
artefactos de cada subagente contra el estándar del playbook antes de lanzar
el siguiente. Exploradores SIEMPRE de a uno (navegador MCP compartido).

- [x] Misión sitemap (site-explorer): 01-sitemap.md — 5 slugs enumerados
      (amazonia, mexico, africa, borneo, patagonia); detalle de zonas y
      /nosotros devuelven 403 real del origin (4 vías agotadas, evidencia PNG)
- [x] Pantalla home (site-explorer): 02-content-home.md + 4 raw + 21 PNGs.
      Spot-check hero-390 vs content ✓. Hallazgos clave: video de hero es
      fondo autoplay-muted-loop; bloque que-es decorativo (play falso);
      zonas a 390 = carrusel nativo SIN snap/dots; hero-bg.jpg y
      logo_negro.svg no se usan en home. 2 reanudaciones por límite de API.
- [x] Pantalla zonas (site-explorer): 02-content-zonas.md + 5 raw (incl.
      hero-pattern.svg inline no entregado en public/) + 14 PNGs. Spot-check
      avances-390 ✓. Hallazgos: duplicado 2× DOM = pila móvil + grid desktop;
      avances a <md = carrusel CSS snap-mandatory con 5 dots sin autoplay;
      zonas-grid a 390 = pila vertical SIN carrusel; nuevos tokens (#F0ECE4,
      #5A7045, w700); header blanco sobre crema = contraste bajo (real del sitio).
- [x] Pantalla suscripcion (site-explorer): 02-content + 4 raw + 14 PNGs.
      Spot-check planes-anual-390 ✓ ($4/$8/$12 + «facturado anualmente»).
      Toggle: matriz de 6 hrefs verificada; un solo CTA «Comenzar mi
      travesía» → /registro?plan=&billing=; sin aria-pressed (nota a11y);
      página mobile-first sin duplicación DOM; primer uso real de dark-green.
- [ ] Pantallas bloqueadas (403 origin): zona-[slug] ×5 y nosotros —
      PENDIENTE DEV: captura manual o material de referencia; sin eso quedan
      como huecos documentados del gate §1.5
- [ ] /registro: fuera del alcance del playbook (5 pantallas); documentado en
      sitemap — el dev decide si se explora aparte
- [x] `public/` en el repo — el dev lo añadió durante la sesión (27 archivos
      + 2 .DS_Store trackeados); consolidator hizo verificación física
      completa con sips/mdls: dimensiones 1:1 con lo observado
- [x] Consolidación (exploration-consolidator): 03-design-tokens (30 sólidos
      con procedencia, 6 conflictos documentados sin resolver) ·
      04-assets-map (25 usados + 2 no usados; patagonia.jpg ≡
      video-thumbnail.jpg byte-idénticos, MD5 verificado por el orquestador) ·
      05-interactions · 00-gaps (reporte §1.5 íntegro) · update a 01-sitemap
- [x] Gate §1.5 con evidencia (00-gaps.md + spot-checks del orquestador):
      ítems 2 (assets) y 5 (slugs) COMPLETOS; ítems 1/3/4 completos para
      las 3 pantallas alcanzables — huecos restantes = solo pantallas 403
- [x] DECISIÓN DEV (2026-08-19): fichas de zona y /nosotros se DISEÑAN
      DERIVADAS de lo real (tarjetas, avances, tokens) — simples, como
      propuesta de lo que debería ir ahí; README las documenta como
      interpretación, no réplica. /registro FUERA de alcance (solo el link
      documentado). → restricción de diseño para Fase 2, bloques zones/about.
- [x] Checkpoint: PLAYBOOK.md → docs/PLAYBOOK.md, ref actualizada en
      CLAUDE.md, .DS_Store eliminados (×3, quedan como D en git) y añadido a
      .gitignore, decisión del dev anexada a 00-gaps.md. Commits propuestos
      al dev (exploration + checkpoint). Fase 1 CERRADA.

## Review Fase 1 (estado al agotar lo alcanzable por navegador)

- 3 site-explorer (misiones sitemap+home, zonas, suscripcion) + 1
  consolidator; explorers SIEMPRE secuenciales (navegador MCP único).
  Loop de calidad: cada artefacto verificado + spot-check visual contra
  content antes de lanzar la siguiente unidad (hero-390, avances-390,
  planes-anual-390 — los 3 ✓ verbatim).
- La misión home sobrevivió 2 cortes de API (límite de sesión) vía
  SendMessage al mismo agente con orden de persistir-primero: cero pérdida.
- Hallazgos que cambian Fase 2: video hero = fondo autoplay/muted/loop (no
  player); bloque que-es decorativo (play falso); 3 patrones de colección
  distintos (zonas home = carrusel libre SIN snap; avances = snap-mandatory
  + dots; zonas-grid a 390 = pila vertical); toggle re-renderiza microcopy
  «facturado anualmente»; sin aria-pressed en toggle (nota a11y para app);
  header transparente sobre crema = contraste bajo real del sitio.
- El sitio es inconsistente en qué zonas linkea (home: amazonia/borneo/
  patagonia · /zonas: amazonia/mexico/africa) — la app deberá decidir.
- Fuera de alcance de los agentes: resolver los 403 (origin sin HTML).

---

# Bloque 0.1: perfeccionar la parte React Native con los docs oficiales

Goal del dev: escanear los docs de React Native (archive.reactnative.dev →
contrastado con reactnative.dev vigente) y perfeccionar la parte RN del equipo.

- [x] Subagente escanea docs RN: verifica las afirmaciones del skill
      `web-to-native` y extrae props/comportamientos exactos por componente
- [x] Integrar correcciones en `web-to-native/SKILL.md`
- [x] Añadir `references/recetas-rn.md` (recetas exactas por sección,
      carga bajo demanda — progressive disclosure del skill-creator)
- [x] Actualizar `docs/ai-workflow.md` y proponer commit

## Review 0.1

- La URL dada (`archive.reactnative.dev`) es el sitio congelado pre-2020
  (llega a ~0.59): se contrastó y la autoridad fue reactnative.dev vigente
  (v0.87). 13/13 afirmaciones del skill verificadas contra docs.
- Correcciones integradas: `boxShadow` cross-platform en new architecture
  (nueva vía preferida de sombras, decidida en bloque theme); `SafeAreaView`
  del core oficialmente deprecado; `translucent`/`backgroundColor` de
  StatusBar retirados (Android edge-to-edge); `width/height` sí aceptan `%`;
  defaults divergentes `flexShrink: 0` / `alignContent: flex-start`; los
  44pt/48dp son de HIG/Material, no de los docs RN.
- Nuevo: `web-to-native/references/recetas-rn.md` — recetas exactas
  (carrusel snap completo, hitSlop, accessibilityState selected, font scale,
  gap, require estático, StatusBar, Platform.select). Los builders lo leen
  al construir la sección que lo necesite, no precargado: contexto barato.
- `foundation-builder` (bloque theme) actualizado a la decisión de sombras.

---

# Bloque: equipo de subagentes + skills para ejecutar el playbook

Objetivo: dejar en `.claude/` un equipo de agentes y skills capaz de ejecutar
las 3 fases del playbook completo, con economía de contexto como principio de
diseño (los artefactos en disco son la interfaz; los agentes devuelven resúmenes).

## Plan

- [x] Revisar estado del repo (`.claude/`, `public/`, `.mcp.json`)
- [x] Investigar fuentes oficiales vía subagentes:
  - [x] `microsoft/playwright/.claude/skills` (prácticas Playwright)
  - [x] `anthropics/skills` → skill-creator (cómo se escribe un skill)
  - [x] Spec de frontmatter de agentes/skills (claude-code-guide)
- [x] Escribir agentes en `.claude/agents/` (7):
  - [x] `site-explorer` (F1, uno por pantalla)
  - [x] `exploration-consolidator` (F1, cierre)
  - [x] `foundation-builder` (F2, bloques 1–4)
  - [x] `feature-builder` (F2, uno por feature)
  - [x] `security-auditor` · `slop-auditor` · `qa-auditor` (F3)
- [x] Escribir skills en `.claude/skills/` (4):
  - [x] `playbook` (orquestación: quién, cuándo, gates)
  - [x] `site-exploration` (procedimiento F1 + scripts §1.3)
  - [x] `web-to-native` (criterio de adaptación F2)
  - [x] `verify-block` (gates antes de cada commit / "listo")
- [x] Sembrar `docs/ai-workflow.md` con la entrada de este bloque
- [x] Verificar coherencia del conjunto y proponer mensaje de commit

## Review

- Quedó: 7 agentes + 4 skills alineados a las fronteras de CLAUDE.md §2
  (F1 por pantalla, F2 por feature, F3 por checklist), con `tools:` mínimos,
  skills precargados (`skills:`) y contratos de salida ≤30 líneas.
- Hallazgo de investigación: los skills del repo de Playwright no son de
  manejo de navegador; la doctrina útil salió de sus agentes oficiales
  planner/generator/healer y se adaptó en `site-exploration` con atribución.
- Fuera de alcance (deliberado): no se ejecutó nada de Fase 1; arrancarla es
  un cambio de fase → plan mode (CLAUDE.md §1).
- Bloqueo detectado para Fase 1: `public/` (assets entregados) no está en el
  repo; sin él no se puede cruzar `04-assets-map.md`.
- Gates tsc/eslint no aplican (solo markdown; aún no hay app).
- Fix post-registro: 5/7 agentes registraron en vivo; `site-explorer` y
  `qa-auditor` (los dos con `mcp__playwright` en `tools:`) no aparecieron.
  Se les quitó el `tools:` explícito para heredar el set default + todos los
  tools MCP (comportamiento documentado). Si no registran en vivo, reiniciar
  la sesión antes de Fase 1.
