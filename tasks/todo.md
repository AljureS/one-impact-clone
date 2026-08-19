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
