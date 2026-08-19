---
name: web-to-native
description: Criterio de adaptación web a React Native para One Impact - mapa Next.js/Expo, patrones por sección (hero, carruseles, testimonios, toggle, stats, footer), reglas duras de UX móvil y convenciones de código. Cargar antes de escribir cualquier componente o pantalla en Fase 2.
---

# Web → React Native: el criterio que se evalúa

Cada pantalla se construye desde `docs/exploration/` (contenido verbatim,
tokens, screenshots 390) — nunca de memoria. Este skill traduce lo observado
en web al patrón nativo correcto.

## Mapa mental (PLAYBOOK §2.2, resumen operativo)

| Web | Native | Trampa a evitar |
|---|---|---|
| `<div>`/`<section>` | `<View>` | — |
| `<h1>`, `<p>`, `<span>` | `<Text>` | Texto suelto en `<View>` **crashea** |
| CSS/Tailwind | `StyleSheet.create` | No hay cascada; solo `Text` hereda de `Text` |
| `px`/`rem`/`vh` | números dp | Nada de viewport units: `useWindowDimensions()` o flex |
| flex opcional | flex siempre, default **column** | En web el default es row |
| `<img>` | `<Image>` de expo-image | Dimensiones explícitas o flex; `contentFit` |
| `<video>` | expo-video (`useVideoPlayer` + `<VideoView>`) | Autoplay con sonido bloqueado por el SO: arrancar `muted` |
| SVG | react-native-svg + transformer | Un `.svg` no es `<Image>`; los logos lo necesitan |
| `:hover` | `<Pressable>` estado `pressed` | Feedback visible (opacity/scale) obligatorio |
| scroll de página | `<ScrollView>` explícito | Nada scrollea solo |
| grid / lib carrusel | `<FlatList horizontal snapToInterval decelerationRate="fast">` | No `.map` dentro de ScrollView para colecciones |
| `position: fixed` | tabs nativos abajo; footer al final del scroll | Lo fijo no se calca, se adapta |
| `next/font` | expo-font en `_layout` raíz | Splash hasta que cargue |
| `box-shadow` | iOS `shadow*` + Android `elevation` | Definir ambos en el token |
| `<a>` | `<Link>` de expo-router / `router.push()` | Params con `useLocalSearchParams()` |

Siempre: `react-native-safe-area-context` (notch/home indicator).

## Patrones por sección (validar contra el screenshot 390 de Fase 1)

- **Hero:** imagen full-bleed edge-to-edge, alto ~70–90% de pantalla, overlay/
  gradiente para contraste AA, CTA en zona del pulgar.
- **Video:** thumbnail (`video-thumbnail.jpg`) + botón play; nunca autoplay
  con sonido; debe pausar/liberarse al salir de la pantalla.
- **Grid web → carrusel horizontal con snap** (zonas, avances). Dots de
  posición si hay >2 ítems.
- **Testimonios:** fila de 3 avatares tocables; el activo destacado y su
  testimonio debajo (`useState` local).
- **Toggle Mensual/Anual:** segmented control; los 3 precios reaccionan al
  instante.
- **Aliados:** fila horizontal compacta (3 logos sin scroll).
- **Stats + CTA:** apilado vertical sobre `stats-bg`, números protagonistas.
- **Footer multi-columna → columnas apiladas** al final del scroll.
- **Nav del header web → bottom tabs**; header superior mínimo (logo o título).

## Reglas duras (no negociables)

- Touch targets ≥ 44×44 pt, con separación entre tocables.
- `accessibilityRole` + `accessibilityLabel` en todo interactivo; `alt`
  (prop `alt`/label) en imágenes informativas.
- Contraste AA sobre fotografía → overlay obligatorio.
- `FlatList` para colecciones; `expo-image` con `cachePolicy`.
- Safe areas respetadas; `StatusBar` clara/oscura según el fondo del hero.
- El layout aguanta font scale del sistema aumentado (no alturas fijas que
  corten texto).

## Convenciones de código (§2.5 + §2.1)

- `strict: true`; prohibido `any` y `@ts-ignore` (si es inevitable, comentario
  con motivo). Un componente por archivo, `PascalCase.tsx`, `interface XxxProps`.
- Archivos ≤ ~200 líneas; si uno va a superarlo: avisar antes, justificar o partir.
- **Cero strings de contenido en JSX**: todo por props o desde `@/data`.
  Si falta un texto en `src/data/` → parar y reportar; no redactar.
- **Cero valores mágicos**: colores/tamaños/espaciados solo desde
  `@/shared/theme`. Si falta un token → parar y reportar; no inventar.
- Imports: `features/*` → solo de `shared/` y `data/`; **nunca de otro
  feature**. `app/*` importa del barrel (`@/features/home`). `shared/` y
  `data/` jamás importan de `features/`.
- Estado: `useState`/props. Nada de state manager global ni Context nuevo sin
  cuestionarlo primero.
- Prohibido (§3.2): helpers de un solo uso, wrappers que solo re-exportan,
  carpetas "para el futuro", abstracciones genéricas, comentarios obvios.
- No refactorizar código que no se pidió tocar.
