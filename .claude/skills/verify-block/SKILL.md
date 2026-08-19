---
name: verify-block
description: Gates de verificación de One Impact - qué evidencia exige cada tipo de bloque antes de marcarlo listo o proponer su commit (tsc/eslint, fidelidad de contenido contra la exploración, fidelidad visual a 390 vía expo web + Playwright, cierres de fase). Usar antes de cerrar cualquier bloque y durante la auditoría de Fase 3.
---

# Verificación: nada está "listo" sin evidencia

Leer el código propio y asentir no es verificar (CLAUDE.md §4). Cada gate
produce un output pegable; si el gate no corrió, el bloque no cierra.

## Gate 1 — Estático (todo bloque de código)

```bash
npx tsc --noEmit && npx eslint .
```

Ambos en verde, output pegado en el cierre del bloque. Un error = el bloque
sigue abierto.

## Gate 2 — Fidelidad de contenido (bloques de data y features)

- Comparar cada string de `src/data/` contra su fuente en
  `docs/exploration/02-content-*.md`: mismo texto, mismos acentos, misma
  puntuación. Cero texto inventado o "mejorado".
- Comparar los strings que renderiza cada sección nueva contra su bloque en
  `02-content-{pantalla}.md`.
- Evidencia: lista de secciones cotejadas + discrepancias (ideal: ninguna).

## Gate 3 — Fidelidad visual a 390 (cada sección/pantalla de Fase 2)

Proxy automatizable con expo web + Playwright MCP (la verdad final es Expo Go,
pero este gate atrapa el 90% antes de tocar un device):

1. `npx expo start --web --port 8081` en background; esperar a que compile
   (curl a `http://localhost:8081` hasta 200).
2. `browser_resize` a 390×844 → `browser_navigate` a
   `http://localhost:8081/{ruta}` (expo-router expone las mismas rutas en web,
   incluidos los `/zonas/[slug]`).
3. `browser_take_screenshot` full-page → guardar en scratchpad o `tasks/qa/`.
4. `Read` de ese PNG **y** del de referencia
   `docs/exploration/06-screenshots/{pantalla}-{seccion}-390.png`, lado a lado.
5. Veredicto por sección: orden de secciones, jerarquía tipográfica, colores,
   espaciados, overlay/contraste, estado de dots/toggle. Anotar toda desviación
   y si es deliberada (adaptación) o un bug.
6. Apagar el server al terminar.

Limitaciones del proxy (van a QA manual del dev en Expo Go): safe areas
reales, snap háptico del carrusel, video nativo, performance, font scale del
sistema, tabs nativos. react-native-web aproxima sombras y fuentes.

## Gate 4 — Cierre de fase

**Fase 1 (§1.5):** todo texto de la app existe verbatim en `02-content-*.md`;
cada asset de `public/` mapeado o marcado "no usado"; tokens suficientes para
no inventar ni un color; screenshot por sección; slugs reales enumerados.

**Fase 2 → 3 y final:**

```bash
npx knip
find src app -name "*.ts*" | xargs wc -l | sort -rn | head
npx expo-doctor && npx expo install --check
npm audit
```

Nada >200 líneas sin justificación; knip sin huérfanos; checklists §3.1–§3.3
completos con evidencia por ítem.

## Formato de evidencia al cerrar un bloque

```
### Verificación — <bloque>
- tsc/eslint: ✅ (output abajo)
- contenido: <n> secciones cotejadas contra 02-content-<x>.md, 0 discrepancias
- visual 390: <pantalla>-<seccion> comparada contra referencia — <veredicto>
- pendiente device (dev): <lista o "nada">
```
