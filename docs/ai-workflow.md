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
