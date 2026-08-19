# CLAUDE.md — cómo se trabaja en este repo

**Qué construir** lo dice el playbook (`PLAYBOOK.md`, pasa a `docs/PLAYBOOK.md` al cerrar Fase 1). **Cómo trabajar** lo dice este archivo. Léelos en ese orden y no empieces sin haber leído el playbook completo.

Entrega: **jueves 20 de agosto, 6:00 pm**. Se evalúa el resultado *y* el proceso (criterio de adaptación web→móvil, uso de agentes, historia de git, README). El tiempo es corto: las reglas de abajo están calibradas para no gastarlo en ceremonia.

---

## 1. Plan primero

- **Plan mode obligatorio** para: cambio de fase, decisiones de arquitectura, y cualquier tarea nueva de 3+ pasos que no esté ya desglosada en el playbook. También **para verificar**, no solo para construir: una auditoría de cierre (§1.5, §3.1–3.3) se planea antes de ejecutarse.
- **Unidad de trabajo = un bloque = una sección = un commit** (§2.6). Cada bloque cierra proponiendo su mensaje de commit (regla 7); eso siempre, es barato.
- Lo que **no** se repite por sección es pedir aprobación de un plan ya aprobado: dentro de un plan confirmado, ejecuta y reporta.
- El playbook ya es el plan de las Fases 1–3. No lo re-planees: ejecútalo y desglosa solo el bloque en curso.
- **Si algo se tuerce, para y re-planea.** No insistas contra un error tres veces; vuelve a plan mode con lo que aprendiste.
- Especifica antes de codear: qué archivos tocas, qué props recibe cada componente, de dónde sale cada texto. La ambigüedad se paga en rework.

## 2. Subagentes

El playbook ya define las fronteras de paralelismo; úsalas como unidad de subagente, no "liberalmente" al azar:

- **Fase 1:** un subagente por pantalla (`/`, `/zonas`, cada slug real, `/suscripcion`, `/nosotros`). Cada uno devuelve sus artefactos de `docs/exploration/`, no un volcado de HTML al contexto principal.
- **Fase 2:** un subagente por carpeta de `src/features/*`. Es la misma frontera de ownership de §2.1, así que salen gratis: no comparten archivos. `theme/` y `data/types.ts` se congelan **antes** de lanzarlos.
- **Fase 3:** un subagente por checklist (seguridad, anti AI-slop, QA).
- Un objetivo por subagente. Investigación y exploración van fuera del contexto principal siempre.
- Verifica el output de un subagente antes de commitear: los artefactos son datos, no verdad.

## 3. Loop de auto-mejora

- Tras **cualquier corrección del usuario**: anota el patrón en `tasks/lessons.md` — qué pediste, qué salió mal, la regla que lo evita. En el momento, no al final del día.
- Esto no es higiene: `docs/ai-workflow.md` (§2.7, se califica) pide exactamente eso — qué se pidió, qué se aceptó tal cual, qué se rechazó o se ajustó a mano y por qué. Reconstruirlo el jueves de memoria es inventarlo.
- Lee `tasks/lessons.md` al arrancar cada sesión.

## 4. Verificación antes de decir "listo"

Nada se marca completo sin evidencia. Los gates reales del playbook, no una autoevaluación:

- Antes de cada commit: `npx tsc --noEmit && npx eslint .`
- Fidelidad visual: comparación lado a lado contra `docs/exploration/06-screenshots/` (versión 390). Una pantalla sin comparar no está lista.
- Fidelidad de contenido: diff de `src/data/` contra `docs/exploration/02-content-*.md`. Cero texto inventado o "mejorado".
- Cierre de fase: los checklists §1.5 / §3.1 / §3.2 / §3.3 completos, más `npx knip` y `find src app -name "*.ts*" | xargs wc -l | sort -rn | head`.
- Correr la app y navegarla cuenta como verificación; leer el código propio y asentir, no.

## 5. Elegancia, definida para este repo

Antes de dar por bueno un cambio no trivial, pregunta si hay una forma más simple. **Más simple aquí significa:**

- menos líneas y menos archivos, no más capas;
- referenciar tokens de `src/shared/theme/` en vez de valores hardcodeados;
- un componente por archivo, archivos ≤ ~200 líneas;
- resolverlo con `useState`/props antes que con cualquier estructura compartida.

**Nunca significa** meter un helper de un solo uso, un wrapper que solo re-exporta, una carpeta "para el futuro" ni una abstracción genérica: §3.2 las prohíbe explícitamente y la regla 5 prohíbe refactorizar lo que nadie pidió tocar. Si un fix se siente hacky, reescríbelo simple; si se siente hacky y la alternativa es una capa nueva, déjalo simple y explica el trade-off.

## 6. Bugs: autonomía y su límite

**Arregla sin preguntar** todo lo verificable dentro del repo: errores de `tsc`/ESLint, navegación rota, layout que se parte, carrusel sin snap, video que no pausa, ítems de QA en rojo. Apunta al error, arréglalo, demuestra que quedó arreglado. Cero hand-holding.

**Pregunta siempre** cuando el bug es de contenido o amplía alcance:

- falta un texto y no está en `02-content-*.md` → se pregunta, no se redacta (regla 1);
- falta un color/tamaño y no está en `03-design-tokens.md` → se pregunta, no se inventa;
- el arreglo obliga a tocar código que no estaba en el bloque, o a añadir una dependencia.

## 7. Gestión de tareas

- El plan del bloque en curso vive en `tasks/todo.md` con ítems marcables. Se marcan al completarse, no al empezarse.
- Resumen de alto nivel en cada paso: qué cambió y por qué, no un diff narrado.
- Al cerrar un bloque: sección de review en `tasks/todo.md` (qué quedó, qué se dejó fuera) y lecciones nuevas en `tasks/lessons.md`.
- `tasks/` **se queda en la raíz** en el checkpoint de Fase 1: es estado de trabajo, no documentación de entrega. Solo los `.md` de documentación se mueven a `docs/`.
- No crees estos archivos vacíos "por adelantado": aparecen cuando hay algo real que escribir.

## 8. Git

- Conventional Commits con scope de feature (`feat(zones): add progress timeline carousel`), en inglés, toda la historia en un solo idioma.
- Rama por feature (`feat/home-hero`), commits atómicos, merge frecuente a `main`. La historia se califica: nada de un commit gigante al final.
- **Propón el mensaje de commit al cerrar cada bloque; no commitees por tu cuenta.**

## 9. Principios

1. **Simplicidad primero.** El cambio más pequeño que resuelve el problema.
2. **Impacto mínimo.** Toca solo lo necesario. Cada archivo extra en el diff es una oportunidad de romper algo.
3. **Sin atajos.** Causa raíz, no parche temporal. Nivel senior o se dice que no se resolvió.
4. **Cero contenido inventado.** Textos, colores y assets salen de `docs/exploration/` y de `public/`. Si falta algo, se pregunta.
