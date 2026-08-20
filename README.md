# One Impact Mobile

Réplica móvil del sitio [One Impact](https://d3foiidvo1xvi7.cloudfront.net/)
como app nativa: **Expo (SDK 57) · TypeScript estricto · Expo Router ·
expo-video**. Sin backend: todo el contenido vive tipado en `src/data/`,
extraído verbatim del sitio real durante una fase de exploración documentada.

<!-- GIF: grabar la app en uso (Expo Go o simulador), <10 MB.
     Sugerencia: home → carrusel → detalle de zona → toggle de suscripción.
     ![Demo](docs/demo.gif) -->

## Setup

```bash
npm install
npx expo start
```

Escanear el QR con Expo Go (iOS/Android) o `npx expo start --web` para una
vista rápida en navegador.

## Cómo se construyó (proceso)

1. **Fase 1 — Exploración** (`docs/exploration/`): el sitio se inventarió con
   Playwright antes de escribir UI — contenido verbatim por pantalla, design
   tokens computados, mapa de assets, interacciones y 56 screenshots de
   referencia en 1440/390. Ninguna pantalla se construyó de memoria.
2. **Fase 2 — Construcción**: fundaciones (scaffold → theme → data →
   navegación) y luego un feature por carpeta, cada sección verificada contra
   su screenshot 390 antes de darse por lista.
3. **Iteración de diseño** (post-review del dev, "esto es una app, no una
   web"): footer solo en Nosotros, glassmorphism en la UI flotante y política
   de video verificado — cada cambio re-verificado en web e iOS.
4. El uso de agentes de IA (qué se pidió, qué se aceptó, qué se corrigió) está
   documentado en [`docs/ai-workflow.md`](docs/ai-workflow.md); el plan
   maestro en [`docs/PLAYBOOK.md`](docs/PLAYBOOK.md).

## Decisiones de adaptación web → móvil

Las que definen la app; cada una validada contra lo observado a 390px:

| Web (observado) | App nativa | Porqué |
|---|---|---|
| Header fijo con nav + hamburguesa | **Bottom tabs** (Ionicons) + logo flotante mínimo | La nav principal en móvil vive abajo, en zona del pulgar; el logo mantiene la marca sin duplicar navegación |
| Video de fondo en hero (autoplay/muted/loop) | expo-video como fondo muted+loop que **pausa al perder foco** | Mismo lenguaje visual; en nativo un player de fondo debe soltar recursos al salir |
| Botón play **decorativo** en "Conoce qué es" (no hace nada) | El play **reproduce de verdad** el mp4, con controles nativos | Mejora deliberada: en una app, un play que no reproduce es un bug percibido |
| Grid de zonas → scroll libre sin snap a 390 | **FlatList con snap + dots** | Patrón nativo de carrusel; el scroll libre del sitio es un default web, no una decisión |
| Carrusel de avances con snap CSS + dots | FlatList con `snapToOffsets` replicando los offsets medidos del sitio | Fidelidad al comportamiento real, con el primitivo nativo correcto |
| Toggle Mensual/Anual sin ARIA | Segmented control con `accessibilityState={{selected}}` y anuncio para lector de pantalla | Los 3 precios reaccionan al instante como en el sitio; la a11y es regla dura en móvil |
| Testimonios con `aria-pressed` | Avatares con estado local y `accessibilityState selected`; el "play" sigue decorativo (el sitio no tiene audio real) | Replicar, no inventar features |
| Footer multi-columna en todas las páginas | **Solo Nosotros** cierra con un bloque de marca/contacto phone-first (pila centrada, targets 44pt, sin columna MENÚ) | En una app el footer web es ruido: la navegación ya vive en las tabs (y el link muerto `/proyectos` desaparece); decisión de diseño del review |
| Logo blanco flotante que se pierde sobre fondos claros (rasgo real del sitio) | Pastilla **glassmorphism** tras el logo (expo-blur: blur + scrim `black30` + borde `white20`); mismo tratamiento en el back flotante del detalle de zona | La UI flotante se superpone a contenido arbitrario al scrollear; el glass la mantiene legible sobre cualquier fondo sin taparlo |
| Play de que-es con `backdrop-blur-sm` (glass real del sitio) | `BlurView` en el círculo de play | Fidelidad recuperada: la primera versión lo aproximaba con opacidad plana |
| `/nosotros` y `/zonas/[slug]` (**403 en el origin**, nunca públicas) | Pantallas **derivadas** de lo capturado: detalle = imagen + descripción + avances del territorio + CTA; nosotros = misión + stat + aliados + contacto | Interpretación documentada, no réplica: cero texto redactado — cada string proviene de `src/data/` |
| CTA «Comenzar mi travesía» → `/registro?plan=&billing=` | El CTA no navega (feedback táctil solamente) | `/registro` quedó fuera del alcance definido; el deep link está documentado en la exploración |

Reglas transversales: touch targets ≥44pt (con `hitSlop` donde el visual es
menor), contraste AA sobre fotografía vía overlays, `FlatList` para
colecciones, safe areas respetadas, font scale del sistema sin apagar.
Política de video verificado: todo lo cinematográfico se probó
**reproduciendo** en web e iOS (hero autoplay muted avanzando; que-es
completa sus 9.8s con audio al tap) — nada se muestra sobre un asset que no
exista o no reproduzca.

## Arquitectura

Screaming architecture: `app/` solo enruta (archivos de ~10 líneas); el
dominio vive en `src/features/*`, cada feature con frontera de ownership
estricta (jamás importa de otro feature).

```
app/                  # Expo Router: tabs (Home·Zonas·Suscripción·Nosotros) + stack zonas/[slug]
src/
  features/           # home · zones · subscription · about (pantallas + componentes propios)
  shared/
    components/       # Button · SectionTitle · Screen · BrandHeader (el footer vive en about)
    theme/            # tokens desde la exploración (colors · typography · spacing · radius)
  data/               # modelos tipados + contenido verbatim del sitio (única fuente de textos)
assets/               # imágenes/video/SVGs entregados (de public/)
docs/                 # PLAYBOOK · exploración completa · ai-workflow
```

Detalles con criterio: los conflictos de diseño del propio sitio (gutter 16
en home vs 20 en interiores, pesos 900 vs 700) se conservan por pantalla en
vez de "normalizarse"; grafías reales del sitio intactas («Amazonia» en home,
«Amazonía» en zonas, «savana»).

## Límites conocidos (honestidad > humo)

- Las fichas de zona y Nosotros **no existen públicamente** en el sitio
  (403 verificado y evidenciado en `docs/exploration/`): las pantallas de la
  app son propuestas derivadas y así se declaran.
- Las sombras del sitio (`shadow-sm/md`) no pudieron extraerse con valores
  computados → la app no las inventa; se anotó como deuda de exploración.
- El copy «escuchar sus testimonios» del sitio no tiene audio real detrás
  (verificado): la app tampoco lo finge.
- Icono y splash siguen siendo los del template de Expo: el sitio no entrega
  branding de app y no se inventó (regla de contenido); queda como decisión
  de marca pendiente.
- Vulnerabilidades conocidas (`npm audit`, auditoría §3.1): 8 high
  (`image-size`, vía expo→metro) y 8 moderate (`uuid`, vía
  config-plugins→xcode). Todas **transitivas del tooling de build** — no se
  embarcan en el bundle de la app — y sin fix upstream no-breaking
  (`npm audit fix --force` degradaría a expo@53). Aceptadas y monitoreadas.

## Con más tiempo

- QA en dispositivos físicos chico/grande (Ej: Ipad) y ajuste fino de font scale.
- Animar la transición de los dots y el swap de testimonios (Reanimated).
- Deep links con scheme propio (`one-impact://zonas/amazonia`).
- Tests de los reducers visuales (toggle de precios, selección de zona).
