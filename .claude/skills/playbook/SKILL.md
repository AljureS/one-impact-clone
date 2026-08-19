---
name: playbook
description: Orquesta la ejecución del playbook de One Impact con el equipo de subagentes - qué agente lanzar en cada fase y bloque, en qué orden, con qué gates y cómo cierra cada bloque en un commit. Usar al arrancar una sesión de trabajo, al cambiar de bloque o ante la duda "¿qué sigue?".
---

# Orquestación del playbook

El agente principal (tú) es el **orquestador**: no hace el trabajo pesado; lanza
subagentes, verifica sus artefactos y cierra bloques proponiendo commits.

- **Qué construir** → `PLAYBOOK.md` (tras Fase 1: `docs/PLAYBOOK.md`)
- **Cómo trabajar** → `CLAUDE.md`
- **Quién y cuándo** → este skill

## Economía de contexto (por qué el equipo tiene esta forma)

1. **Los artefactos en disco son la interfaz entre agentes.** Un subagente
   escribe archivos y devuelve rutas + resumen ≤30 líneas. Nunca pega
   contenido extenso en su respuesta; el orquestador nunca pega el contenido
   de `docs/exploration/` en el prompt de otro agente — le pasa rutas.
2. **Un agente lee solo lo suyo.** El builder de `home` lee
   `02-content-home.md` y sus screenshots; no lee los de otras pantallas.
3. **Continuar > relanzar.** Para bloques por sección (home, zones…), continúa
   el mismo agente vía `SendMessage` ("siguiente sección") en vez de relanzar:
   conserva theme/data/contenido ya cargados en su contexto.
4. **Un solo navegador.** El MCP de Playwright es una instancia compartida:
   los agentes que lo usan (`site-explorer`, `qa-auditor`) corren **de a uno**,
   nunca en paralelo entre sí.
5. Investigación y exploración van siempre en subagentes, jamás en el
   contexto principal (CLAUDE.md §2).

## Detección de estado (al arrancar sesión)

Mira qué existe y entra donde toca. Lee `tasks/todo.md` y `tasks/lessons.md`.

| Si falta… | Estás en… |
|---|---|
| `docs/exploration/01-sitemap.md` | Fase 1, sitemap |
| algún `02-content-*.md` de las pantallas del sitemap | Fase 1, esa pantalla |
| `03/04/05` consolidados | Fase 1, consolidación |
| `docs/PLAYBOOK.md` (aún en raíz) | Checkpoint pendiente |
| `package.json` / app Expo | Fase 2, bloque 1 |
| `src/shared/theme/` · `src/data/` · `app/(tabs)/` | Fase 2, bloques 2–4 |
| pantallas en `src/features/*` | Fase 2, bloques 5–8 |
| reportes de auditoría en `tasks/` | Fase 3 |

**Prerrequisito de Fase 1:** la carpeta `public/` entregada debe estar en el
repo (hoy no está). Sin ella no se puede cruzar assets (§1.4); pedirla al dev
antes de consolidar. Limpiar `__MACOSX/` y `.DS_Store` al recibirla.

## Fase 1 — Exploración

| Paso | Agente | Modo |
|---|---|---|
| 1. Sitemap (`01-sitemap.md`, slugs reales enumerados) | `site-explorer` con misión sitemap | primero, solo |
| 2. Por pantalla: `/`, `/zonas`, cada slug del sitemap, `/suscripcion`, `/nosotros` | `site-explorer` ×N | **secuencial** (navegador único) |
| 3. Consolidar `01/03/04/05` desde `raw/` | `exploration-consolidator` | tras todos los explorers |
| 4. Gate §1.5 + checkpoint | orquestador + skill `verify-block` | fin de fase |

- Para slugs 2..N: el template ya está documentado por el primero; la misión
  es "contenido verbatim + screenshots + desviaciones del template" (más barato).
- Checkpoint: mover los `.md` a `docs/` (menos `CLAUDE.md` y `tasks/`),
  actualizar la referencia en `CLAUDE.md` a `docs/PLAYBOOK.md`, proponer
  `docs: close exploration phase, move docs into /docs`.

## Fase 2 — Construcción

Orden fijo (PLAYBOOK §2.6); **un bloque = un commit propuesto = fin de turno**.

| Bloque | Agente | Nota |
|---|---|---|
| 1 scaffold · 2 theme · 3 data · 4 navigation | `foundation-builder` (mismo agente, continuado por SendMessage) | congela `theme/` y `data/types.ts` antes de features |
| 5 home (sección a sección) | `feature-builder` (home) | una sección = un commit |
| 6 zones · 7 subscription · 8 about | `feature-builder` ×1 por feature | secuencial por defecto; paralelizable (carpetas disjuntas) si aprieta el tiempo |

- Los builders **no** verifican fidelidad visual: eso es del orquestador con
  `verify-block` (expo web a 390 + comparación contra `06-screenshots/`).
- Si un builder reporta contenido/token faltante → se pregunta al dev
  (CLAUDE.md §6); no se inventa ni se deja pasar.
- Si dos features necesitan lo mismo → lo sube el orquestador a `shared/`
  como bloque propio; un feature-builder jamás escribe fuera de su carpeta.

## Fase 3 — Auditoría

1. Lanzar `security-auditor`, `slop-auditor` en paralelo; `qa-auditor` aparte
   (usa el navegador). Cada uno devuelve hallazgos con evidencia, no fixes.
2. Los hallazgos se arreglan por bloques (orquestador o `feature-builder` del
   área afectada), con commit por grupo coherente de fixes.
3. Re-lanzar el auditor correspondiente hasta checklist en verde.
4. README + GIF + `docs/ai-workflow.md` final: los redacta el orquestador con
   `git log`, `tasks/lessons.md` y `docs/ai-workflow.md`; el GIF lo graba el dev.

## Protocolo de cierre de bloque (siempre)

1. Correr los gates del skill `verify-block` que apliquen al bloque.
2. Marcar ítems en `tasks/todo.md`; anotar review del bloque.
3. Añadir la entrada del bloque a `docs/ai-workflow.md` (qué se pidió, qué se
   aceptó tal cual, qué se ajustó a mano y por qué) — en el momento.
4. Proponer el mensaje de commit (Conventional Commits, inglés, scope de
   feature) y **terminar el turno**: commitea el dev, nunca el agente.
