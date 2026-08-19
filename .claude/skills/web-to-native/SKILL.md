---
name: web-to-native
description: Criterio de adaptación web a React Native para One Impact - mapa Next.js/Expo, patrones por sección (hero, carruseles, testimonios, toggle, stats, footer), reglas duras de UX móvil y convenciones de código, con recetas por componente verificadas contra los docs vigentes de React Native (references/recetas-rn.md). Cargar antes de escribir cualquier componente o pantalla en Fase 2.
---

# Web → React Native: el criterio que se evalúa

Cada pantalla se construye desde `docs/exploration/` (contenido verbatim,
tokens, screenshots 390) — nunca de memoria. Este skill traduce lo observado
en web al patrón nativo correcto.

## Mapa mental (PLAYBOOK §2.2, resumen operativo)

| Web | Native | Trampa a evitar |
|---|---|---|
| `<div>`/`<section>` | `<View>` | — |
| `<h1>`, `<p>`, `<span>` | `<Text>` | Texto suelto en `<View>` **lanza excepción** |
| CSS/Tailwind | `StyleSheet.create` | No hay cascada; solo `Text` anidado hereda de `Text` |
| `px`/`rem`/`vh` | números dp; `width`/`height` aceptan `%` string | Sin vh/vw/rem: `useWindowDimensions()` o flex |
| flex opcional | flex siempre, default **column** | También divergen: `flexShrink: 0` y `alignContent: flex-start` |
| `<img>` | `<Image>` de expo-image | Dimensiones explícitas o flex; `contentFit` |
| `<video>` | expo-video (`useVideoPlayer` + `<VideoView>`) | Autoplay con sonido bloqueado por el SO: arrancar `muted` |
| SVG | react-native-svg + transformer | Un `.svg` no es `<Image>`; los logos lo necesitan |
| `:hover` | `<Pressable>` estado `pressed` | Feedback visible (opacity/scale) obligatorio |
| scroll de página | `<ScrollView>` explícito | Nada scrollea solo; necesita alto acotado (`flex: 1`) |
| grid / lib carrusel | `<FlatList horizontal snapToInterval decelerationRate="fast">` | No `.map` dentro de ScrollView para colecciones |
| `position: fixed` | tabs nativos abajo; footer al final del scroll | Lo fijo no se calca, se adapta |
| `next/font` | expo-font en `_layout` raíz | Splash hasta que cargue |
| `box-shadow` | token único: `boxShadow` cross-platform (new arch) o `shadow*` iOS + `elevation` Android | La vía se elige en el bloque theme; no por componente |
| `<a>` | `<Link>` de expo-router / `router.push()` | Params con `useLocalSearchParams()` |

Siempre: `react-native-safe-area-context` (el `SafeAreaView` del core está
**deprecado** en los docs oficiales).

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

- Touch targets ≥ 44×44 pt (HIG; Material pide 48dp) con separación entre
  tocables — `hitSlop` cuenta para alcanzarlo sin agrandar el layout.
- `accessibilityRole` + `accessibilityLabel` en todo interactivo; el elemento
  activo (avatar, opción del toggle) además `accessibilityState={{selected}}`.
- Contraste AA sobre fotografía → overlay obligatorio.
- `FlatList` para colecciones; `expo-image` con `cachePolicy`.
- Safe areas respetadas; `StatusBar` clara/oscura según el fondo del hero.
  Android moderno es edge-to-edge: `translucent`/`backgroundColor` ya no
  existen — usar `expo-status-bar` y su prop `style`.
- El layout aguanta font scale del sistema aumentado (`allowFontScaling` queda
  en su default `true`; nada de alturas fijas que corten texto).

## Recetas exactas por componente

`references/recetas-rn.md` (mismo directorio de este skill) trae la receta
verificada contra los docs de RN vigentes para: carrusel FlatList con snap,
Pressable con feedback y `hitSlop`, estados accesibles de lo seleccionado,
Text y font scale, `gap` y defaults de layout, imágenes con `require()`
estático, sombras (boxShadow vs par clásico), StatusBar y forks por
plataforma. **Léela al construir la sección que la necesite** — es la
diferencia entre el prop correcto y uno inventado de memoria.

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
