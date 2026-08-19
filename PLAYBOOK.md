# One Impact Mobile — Playbook del proyecto

> Fuente de verdad del repo. Léelo completo antes de tocar código.
> Audiencia: el dev y cualquier agente de IA que trabaje aquí.
> Al cerrar la Fase 1, este archivo se mueve a `docs/PLAYBOOK.md`.

## 0. Contexto

| | |
|---|---|
| Objetivo | Replicar https://d3foiidvo1xvi7.cloudfront.net/ (One Impact) como app móvil |
| Stack | Expo (SDK estable más reciente) · TypeScript estricto · Expo Router · expo-video |
| Entrega | Jueves 20 de agosto, 6:00 pm — repo público + README con GIF |
| Se evalúa | Resultado **y** proceso: criterio de adaptación web→móvil, uso de agentes de IA, historia de git, README |
| Contenido | Sin backend. Datos tipados en `src/data/`. Assets solo desde la carpeta `public/` entregada |

**Producto:** plataforma de impacto ambiental que conecta aportes económicos, proyectos de conservación y seguimiento verificable. Tono: naturaleza, verde/tierra, fotografía a pantalla completa.

**Pantallas:** Home · Zonas · Detalle de zona (`/zonas/[slug]`) · Suscripción · Nosotros. Navegación: bottom tabs + stack anidado.

## 1. Reglas globales (humanos y agentes)

1. **Cero contenido inventado.** Textos, métricas, testimonios, aliados y precios salen del sitio real (Fase 1). Si falta un texto, se pregunta; no se redacta.
2. **Assets solo de `public/`.** Nada de internet, nada de placeholders generados.
3. **Sin state manager global** (Redux, Zustand, etc.). `useState`/`useContext` bastan.
4. **Archivos ≤ ~200 líneas.** Si uno va a superarlo: avisar antes, justificar o partir.
5. **No refactorizar código que no se pidió tocar.**
6. Código e identificadores en inglés; contenido visible de la app en español (el del sitio).
7. Antes de escribir código: proponer plan y esperar confirmación. Cada bloque cierra proponiendo su mensaje de commit.

---

# FASE 1 — Exploración del sitio (Playwright MCP)

**Objetivo:** inventario completo y verificable del sitio ANTES de escribir UI. Ninguna pantalla se construye de memoria; se construye desde estos artefactos.

## 1.1 Entregables (todos en `docs/exploration/`)

| Artefacto | Contenido |
|---|---|
| `01-sitemap.md` | Rutas reales del sitio, jerarquía, slugs exactos de `/zonas/[slug]` (enumerarlos, no asumirlos) |
| `02-content-{pantalla}.md` | Por pantalla: secciones en orden + textos **verbatim** (headings, párrafos, CTAs, labels de botones, precios, alt text, footer) |
| `03-design-tokens.md` | Colores en hex, tipografías (familia/tamaños/pesos/line-height por rol: h1, h2, body, botón), espaciados, radios, sombras/overlays |
| `04-assets-map.md` | Cada archivo de `public/` → en qué pantalla/sección se usa, dimensiones, notas |
| `05-interactions.md` | Comportamientos: carruseles (¿autoplay? ¿loop? ¿dots?), toggle Mensual/Anual (¿qué cambia?), testimonios (¿cómo se selecciona el activo?), video (¿autoplay/muted/poster?), hovers y su equivalente táctil |
| `06-screenshots/` | `{pantalla}-{seccion}-{viewport}.png` — desktop 1440×900 y móvil 390×844 |

## 1.2 Procedimiento por pantalla

Pantallas: `/`, `/zonas`, `/zonas/[slug]` (cada slug real), `/suscripcion`, `/nosotros`.

1. Navegar y capturar screenshot full-page en 1440 y en 390.
2. Listar secciones en orden con nombre descriptivo (`hero`, `que-es`, `zonas-carrusel`, `testimonios`, `aliados`, `stats-cta`, `footer`…).
3. Extraer textos verbatim por sección (scripts §1.3). Incluir microcopy: badges, disclaimers, labels del toggle, textos del footer.
4. Extraer assets usados (scripts §1.3) y cruzarlos contra el árbol de `public/` → `04-assets-map.md`.
5. Extraer estilos computados de elementos representativos → tokens.
6. Documentar interacciones y estados (activo/inactivo, seleccionado).
7. Mirar la pantalla en viewport 390: anotar cómo colapsa cada sección. **Esa observación es la base del criterio de adaptación de la Fase 2.**

> ⚠️ En sesiones previas, `/nosotros` y `/zonas/[slug]` bloquearon el acceso automatizado por HTTP. Playwright usa un navegador real, así que probablemente pase; si algo bloquea, capturar esa pantalla manualmente y documentarla igual.

## 1.3 Scripts de extracción (correr con el `evaluate` del MCP)

Paleta de colores usados:
```js
[...new Set([...document.querySelectorAll('*')].flatMap(el => {
  const s = getComputedStyle(el);
  return [s.color, s.backgroundColor, s.borderColor];
}))].filter(c => c && !c.includes('0, 0, 0, 0'))
```

Tipografía por rol:
```js
[...new Set([...document.querySelectorAll('h1,h2,h3,h4,p,a,button,span,li')]
  .map(el => { const s = getComputedStyle(el);
    return [el.tagName, s.fontFamily.split(',')[0], s.fontSize, s.fontWeight, s.lineHeight].join(' | ');
  }))]
```

Textos por sección (verbatim):
```js
[...document.querySelectorAll('section, header, footer')]
  .map((el, i) => ({ i, hint: el.id || el.className.slice(0, 60), text: el.innerText.trim() }))
```

Imágenes, video y fondos:
```js
({
  imgs: [...document.images].map(i => ({ src: i.currentSrc, alt: i.alt, w: i.naturalWidth, h: i.naturalHeight })),
  videos: [...document.querySelectorAll('video')].map(v => ({
    src: v.currentSrc || v.querySelector('source')?.src, poster: v.poster,
    autoplay: v.autoplay, muted: v.muted, loop: v.loop })),
  bgs: [...new Set([...document.querySelectorAll('*')]
    .map(el => getComputedStyle(el).backgroundImage).filter(b => b.startsWith('url')))]
})
```

## 1.4 Assets entregados (referencia — usar estas rutas exactas)

```
public/
├── videos/one-impact-intro.mp4
└── images/
    ├── logo_blanco.svg · logo_negro.svg
    ├── hero-bg.jpg · stats-bg.jpg · video-thumbnail.jpg
    ├── testimonials/  ana-rodriguez · carlos-mendez · lucia-torres (.jpg)
    ├── allies/        wwf · ci · tnc (.png)
    ├── zones/         amazonia · borneo · patagonia · mexico · africa (.jpg)
    ├── advances/      guainia · yucatan · corredores · borneo-monitoreo · amazonia-carbono (.jpg)
    └── subscription/  hero-main · hero-secondary · collage-1/2/3 (.jpg)
```

El zip original trae basura de macOS: eliminar `__MACOSX/` y `.DS_Store` antes de commitear.

## 1.5 Criterio de cierre de fase

- [ ] Todo texto que se verá en la app existe verbatim en `02-content-*.md`
- [ ] Cada asset de `public/` está mapeado (o marcado "no usado")
- [ ] Tokens suficientes para no inventar ni un color ni un tamaño
- [ ] Screenshot de referencia por sección (patrón de comparación en Fase 3)
- [ ] Slugs reales de zonas enumerados

---

# CHECKPOINT — antes de iniciar Fase 2

1. **Mover todos los `.md` a `docs/`, excepto `CLAUDE.md`** (queda en la raíz). Este archivo pasa a ser `docs/PLAYBOOK.md`.
2. Checklist §1.5 completo.
3. Commit: `docs: close exploration phase, move docs into /docs`

---

# FASE 2 — Construcción

## 2.1 Arquitectura: screaming architecture

La estructura grita el **dominio** (zones, subscription, testimonials), no el framework. `app/` solo enruta; el negocio vive en `src/features/`.

```
app/                          # Expo Router — SOLO routing (archivos delgados, ~10 líneas)
  _layout.tsx                 # Stack raíz + providers (SafeArea, fonts, StatusBar)
  (tabs)/
    _layout.tsx               # Bottom tabs: Home · Zonas · Suscripción · Nosotros
    index.tsx                 # → <HomeScreen />
    zonas/
      _layout.tsx             # Stack anidado del tab Zonas
      index.tsx               # → <ZonesScreen />
      [slug].tsx              # → <ZoneDetailScreen />
    suscripcion.tsx           # → <SubscriptionScreen />
    nosotros.tsx              # → <AboutScreen />
src/
  features/
    home/
      components/             # HeroSection · IntroVideoCard · ZonesCarousel ·
                              # TestimonialsSection · PartnersRow · StatsBanner
      HomeScreen.tsx
      index.ts                # barrel: API pública del feature
    zones/
      components/             # ZoneCard · ProgressTimeline
      ZonesScreen.tsx · ZoneDetailScreen.tsx · index.ts
    subscription/
      components/             # HeroCollage · BillingToggle · PlanCard · BenefitsList
      SubscriptionScreen.tsx · index.ts
    about/
      AboutScreen.tsx · index.ts
  shared/
    components/               # UI transversal: Button · SectionTitle · Screen · Footer
    theme/                    # colors.ts · typography.ts · spacing.ts · radius.ts · index.ts
    hooks/
  data/
    types.ts                  # Zone · Testimonial · Plan · Partner · Stat · ProgressUpdate
    zones.ts · testimonials.ts · plans.ts · partners.ts · stats.ts · progress.ts
assets/                       # contenido de public/ (imágenes, SVGs, video)
docs/
CLAUDE.md
```

**Reglas de dependencia (lo que habilita el trabajo en paralelo):**
- `features/*` importa de `shared/` y `data/`. **Nunca de otro feature.** Si dos features necesitan lo mismo → sube a `shared/`.
- `app/*` importa cada pantalla solo desde el barrel del feature (`@/features/home`).
- `shared/` y `data/` jamás importan de `features/`.
- Alias `@/ → src/` en `tsconfig.json`.

**Por qué evita merge conflicts:** cada feature es una frontera de ownership (1 feature = 1 rama = 1 PR); los archivos de `app/` son delegados mínimos que casi nunca cambian; `theme/` y `data/types.ts` se definen primero y se congelan, así el resto solo los consume. Varios devs (o agentes) tocan carpetas disjuntas.

## 2.2 Mapa mental Next.js → React Native (leer antes de codear)

| Web (Next.js) | React Native / Expo | Ojo con |
|---|---|---|
| App Router, `[slug]` | Expo Router — mismo concepto file-based | Params con `useLocalSearchParams()`, no props |
| `<div>` / `<section>` | `<View>` | — |
| `<h1>`, `<p>`, `<span>` | `<Text>` | **Todo texto va dentro de `<Text>`**; texto suelto en `<View>` crashea |
| CSS / Tailwind | `StyleSheet.create` | No hay cascada ni clases; solo `Text` hereda de `Text` padre |
| `px`, `rem`, `vh` | números sin unidad (dp) | Sin unidades de viewport: `useWindowDimensions()` o flex |
| `display: flex` opcional | Flexbox **siempre**, default `flexDirection: 'column'` | Al revés que web (row) |
| `<img>` | `<Image>` de **expo-image** | Dimensiones explícitas o flex; `contentFit` ≈ `object-fit` |
| `<video>` | **expo-video**: `useVideoPlayer` + `<VideoView>` | El SO bloquea autoplay con sonido: arrancar `muted` |
| SVG en `<img>` | **react-native-svg** + `react-native-svg-transformer` | Un `.svg` no se renderiza como imagen normal; los logos lo necesitan |
| `:hover` | No existe | `<Pressable>` con estado `pressed` (opacity/scale) |
| La página scrollea sola | Nada scrollea solo | Envolver en `<ScrollView>`; colecciones → `<FlatList>` |
| Grid CSS / lib de carrusel | `<FlatList horizontal snapToInterval decelerationRate="fast">` | Patrón nativo de carrusel |
| `position: fixed` (nav/footer) | Tabs nativos abajo; footer al final del scroll | Lo fijo del web no se calca: se adapta |
| `next/font` | `expo-font` / `@expo-google-fonts/*` | Carga async en `_layout` raíz (splash hasta que cargue) |
| `box-shadow` | iOS: `shadow*` · Android: `elevation` | Definir ambos en el token |
| — | `react-native-safe-area-context` | Notch/home indicator: insets siempre |
| `<a>` / `next/link` | `<Link>` de expo-router / `router.push()` | — |

## 2.3 Sistema de diseño

- Tokens salen **solo** de `docs/exploration/03-design-tokens.md` → `src/shared/theme/`.
- Prohibido hardcodear colores/tamaños en componentes: todo referencia tokens.
- Espaciado en escala de múltiplos de 4. Tipografía como escala nombrada (`display`, `title`, `body`, `caption`).
- Si el sitio usa fuente custom: cargarla con expo-font; si no está disponible, documentar el fallback elegido en el README.

## 2.4 Criterio de adaptación web → móvil (esto es lo que evalúan)

Validar cada patrón contra lo observado a 390px en Fase 1:

- **Hero:** imagen full-bleed edge-to-edge, alto ~70–90% de pantalla, overlay/gradiente para contraste del texto, CTA en zona del pulgar. Video: thumbnail con botón play, nunca autoplay con sonido.
- **Grids web → carruseles horizontales con snap** (zonas, avances del territorio). Dots de posición si hay más de 2 items.
- **Testimonios:** fila de 3 avatares tocables; el activo se destaca y su testimonio aparece debajo (estado local).
- **Toggle Mensual/Anual:** segmented control; los 3 precios reaccionan al instante.
- **Aliados:** fila horizontal compacta (los 3 logos caben sin scroll).
- **Stats + CTA:** apilado vertical sobre `stats-bg`, números protagonistas.
- **Footer web multi-columna:** columnas apiladas al final del scroll de cada pantalla que lo lleve.
- **Header web con nav:** la navegación vive en bottom tabs; header superior mínimo (logo o título).

Reglas duras de UX móvil:
- Touch targets ≥ 44×44 pt, con separación entre tocables.
- `accessibilityRole` + `accessibilityLabel` en todo interactivo; `alt` en imágenes informativas.
- Contraste AA cuando hay texto sobre fotografía (overlay obligatorio).
- Feedback visible de toque en todo `Pressable`.
- `FlatList` para colecciones (no `.map` dentro de ScrollView); `expo-image` con `cachePolicy`.
- Safe areas respetadas; `StatusBar` clara/oscura según el fondo del hero.
- El layout no debe romperse con font scale del sistema aumentado.

## 2.5 Convenciones de código

- `tsconfig`: `strict: true`. Prohibido `any` y `@ts-ignore` (si es inevitable: comentario con motivo).
- Componentes de función con `interface XxxProps`. Un componente por archivo. Archivos `PascalCase.tsx`; hooks `useXxx.ts`; data/theme `camelCase.ts`.
- Estado local (`useState`). Si algo parece necesitar estado compartido, primero cuestionarlo.
- Los componentes reciben contenido por props o lo importan de `@/data`. **Jamás strings de contenido hardcodeados en el JSX.**
- ESLint (`eslint-config-expo`) + Prettier. Gate antes de cada commit: `npx tsc --noEmit && npx eslint .`

## 2.6 Git

- **Conventional Commits** con scope de feature: `feat(zones): add progress timeline carousel`. Un solo idioma en toda la historia (recomendado: inglés).
- Rama por feature (`feat/home-hero`), commits atómicos, merge frecuente a `main`. La historia es parte de la entrega: debe contarse sola, sin un commit gigante al final.
- Orden de construcción sugerido (cada punto ≥ 1 commit):
  1. `chore: scaffold expo app (typescript strict + expo router)`
  2. `feat(theme): design tokens from site exploration`
  3. `feat(data): typed content models and site content`
  4. `feat(navigation): bottom tabs + nested zones stack`
  5. `feat(home): …` — una sección por commit
  6. `feat(zones): …` → `feat(zones): zone detail screen`
  7. `feat(subscription): …` · 8. `feat(about): …` · 9. `docs: README + GIF` · 10. Fase 3

## 2.7 Entregables de proceso (parte de la nota)

- **README:** qué es + GIF de la app en uso (<10 MB para que GitHub lo renderice), setup (`npm i && npx expo start`), decisiones de adaptación web→móvil con su porqué, resumen de arquitectura, qué se haría con más tiempo. Honesto, sin humo.
- **`docs/ai-workflow.md`:** evidencia real del uso de agentes — qué se pidió, qué se aceptó tal cual, qué se rechazó/ajustó a mano y por qué. Es literalmente lo que pidieron ver.

---

# FASE 3 — Auditoría (seguridad + anti AI-slop)

## 3.1 Seguridad

- [ ] `npm audit` sin high/critical (o justificadas en README)
- [ ] `npx expo-doctor` y `npx expo install --check` limpios
- [ ] Cero secretos: no hay `.env`, keys ni tokens (este proyecto no debería tener ninguno). Grep de paranoia: `git grep -iE "api[_-]?key|secret|token|password"`
- [ ] `app.json`: sin permisos innecesarios (cámara, ubicación, micrófono…)
- [ ] Dependencias: solo las usadas, nada "por si acaso"; lockfile commiteado
- [ ] Sin `eval`, sin carga de código remoto, sin URLs `http://`
- [ ] `.gitignore` correcto (`node_modules`, `.expo`, builds) y sin `__MACOSX`/`.DS_Store` en el repo

## 3.2 Anti AI-slop

Objetivo: que el repo se lea como escrito por un ingeniero con criterio, no generado en piloto automático.

- [ ] **Contenido fiel:** diff manual entre los textos de `src/data/` y `docs/exploration/02-content-*.md`. Cero texto inventado o "mejorado".
- [ ] **Cero código muerto:** `npx knip` (o `ts-prune`) — exports, componentes, deps y assets sin uso.
- [ ] Sin `console.log`, `TODO` huérfanos ni imports sin usar (ESLint en verde).
- [ ] **Sin abstracciones prematuras:** nada de helpers de un solo uso, wrappers que solo re-exportan, ni carpetas vacías "para el futuro".
- [ ] Sin comentarios obvios ni docstrings genéricos; comentar solo el porqué no evidente.
- [ ] Sin estilos duplicados que ya existen como token; sin valores mágicos.
- [ ] Naming consistente: un solo término por concepto (`zone`, no `zone`/`region`/`area` mezclados).
- [ ] Tamaños: `find src app -name "*.ts*" | xargs wc -l | sort -rn | head` → nada >200 líneas sin justificación.
- [ ] **Fidelidad visual:** cada pantalla comparada lado a lado contra `docs/exploration/06-screenshots/` (versión 390).

## 3.3 QA funcional

- [ ] iOS y Android (Expo Go); un dispositivo chico y uno grande
- [ ] Navegación completa: tabs, stack de zonas, back, deep link `/zonas/[slug]` con **cada** slug real
- [ ] Video: reproduce, pausa y no rompe al salir de la pantalla
- [ ] Carruseles con snap correcto, sin cortes de layout
- [ ] Toggle mensual/anual actualiza los 3 precios
- [ ] Scroll fluido, imágenes sin layout shift
- [ ] Texto legible con font scale del sistema aumentado

## Definition of Done

1. Las 5 pantallas + navegación, con contenido real de la Fase 1.
2. Checklists de Fase 3 completos.
3. README con GIF y `docs/ai-workflow.md` terminados. Historia de git legible.
4. `npx tsc --noEmit`, ESLint y `expo-doctor` en verde.
5. La app corre con `npx expo start` en un clon limpio del repo.
