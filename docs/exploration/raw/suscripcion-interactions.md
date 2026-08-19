# Interacciones — suscripcion (/suscripcion)

Fuente: clicks reales con Playwright a 1440×900, 2026-08-19. Verificado
también a 390×844 (misma instancia DOM, sin variante móvil).

## 1. Toggle Mensual/Anual (FOCO §1.1/§2.4)

Dos `<button>` dentro de un pill blanco (`bg-white rounded-full p-1 shadow-sm`).
Estado inicial: **Mensual** activo.

**Qué cambia EXACTAMENTE al click en «Anual»** (verificado antes/después):

1. **Precios de los 3 planes:** `$5 → $4`, `$10 → $8`, `$15 → $12`.
2. **Periodo mostrado:** NO cambia — sigue «/mes» en ambos estados.
3. **Microcopy nuevo por plan:** aparece «facturado anualmente» debajo del
   precio en LOS 3 planes (`<p class="text-[9px] text-gray-400 mt-0.5">`).
   En Mensual ese párrafo NO existe en el DOM (no es un show/hide CSS:
   re-render de React).
4. **Descuento/ahorro:** NO aparece ningún badge ni texto de ahorro.
5. **CTA href:** `billing=monthly → billing=annual` (query param; el plan
   seleccionado se conserva).
6. **Toggle visual:** las clases se intercambian —
   activo `bg-dark-green text-white`, inactivo `text-gray-500
   hover:text-gray-700` (base común `px-5 py-2 rounded-full text-sm
   font-semibold transition-colors`).
7. **Plan activo:** se CONSERVA al cambiar billing (Estándar seguía activo).
8. **Reversible sin residuos:** click de vuelta en «Mensual» restaura
   $5/$10/$15, elimina los «facturado anualmente» y el href vuelve a
   `billing=monthly`.

**Accesibilidad:** NINGÚN botón (toggle ni planes) lleva `aria-pressed`/
`aria-selected`; el estado es solo visual. El CTA es `<a>`, accesible como
link. (Para Fase 2: usar `accessibilityState={{ selected }}`.)

## 2. Selector de planes (3 botones, un solo CTA)

Los "planes" NO son tarjetas con CTA propio: son 3 `<button>` en un grid
(`bg-white/70 rounded-3xl p-2 grid grid-cols-3 gap-1`) que setean el plan; el
único CTA «Comenzar mi travesía» (un `<a>`) actualiza su href.

- Activo: `bg-white shadow-md` + check (span `absolute top-2 right-2 w-5 h-5
  bg-dark-green rounded-full` con svg check `M2 6 L5 9 L10 3`), nombre
  `text-gray-700`, precio `text-2xl text-gray-900`.
- Inactivo: `bg-transparent hover:bg-white/50`, nombre `text-gray-400`,
  precio `text-xl text-gray-600` (el precio activo sube un paso: 20px→24px).
- Default: **Estándar**. Sin badge «más popular» — el check es la única marca.

## 3. Matriz completa de hrefs del CTA (verificada click a click)

| Plan seleccionado | Mensual | Anual |
|---|---|---|
| Básico | `/registro?plan=basico&billing=monthly` | `/registro?plan=basico&billing=annual` |
| Estándar (default) | `/registro?plan=estandar&billing=monthly` | `/registro?plan=estandar&billing=annual` |
| Premium | `/registro?plan=premium&billing=monthly` | `/registro?plan=premium&billing=annual` |

Slugs sin acentos (`basico`, `estandar`); billing en inglés
(`monthly`/`annual`). `/registro` fuera de alcance (no explorado).

## 4. Hovers (desktop) y equivalente táctil

- Plan inactivo: `hover:bg-white/50` + `transition-all` → en móvil no hay
  hover; el press activa directamente (el estado activo ya da feedback).
- Toggle inactivo: `hover:text-gray-700`.
- CTA: `hover:bg-gray-800` + `transition-colors` → equivalente táctil:
  opacidad/`activeOpacity` en press.
- No hay más interacciones: sin carrusel, sin autoplay, sin dots, sin video,
  sin acordeón/FAQ en esta pantalla.

## 5. Estado tras la exploración

La página quedó restaurada a su default (Mensual + Estándar) — verificado.

## 6. Consola / red

- 3 errores de consola, todos `403` del prefetch de Next.js hacia
  `/nosotros` (bloqueo ya conocido de esa ruta; se dispara porque el nav
  linkea `/nosotros`). Nada propio de `/suscripcion` falla.

## Screenshots de estados

- `06-screenshots/suscripcion-planes-mensual-1440.png` / `-390.png` (estado inicial)
- `06-screenshots/suscripcion-planes-anual-1440.png` / `-390.png`
