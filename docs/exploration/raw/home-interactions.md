# Interacciones — home (/)

Probadas en vivo a 1440×900 (2026-08-18/19). Complemento móvil en
`home-mobile-notes.md`.

## 1. Video del hero (fondo)

- Elemento: `<video class="absolute inset-0 h-full w-full object-cover pointer-events-none" src="/videos/one-impact-intro.mp4" autoplay loop muted playsinline>` — **sin** `poster`, **sin** `controls`.
- Verificado en vivo: `paused=false`, `currentTime` avanza (6.26s → 7.46s en 1.2s), `duration=9.8s`, loopea.
- `pointer-events-none`: no es clickeable ni pausable por el usuario. Es un fondo, no un reproductor.
- Equivalente táctil sugerido: `expo-video` como fondo con `isMuted`, `isLooping`, `shouldPlay`, sin controles.

## 2. Bloque "video" de que-es (thumbnail) — ES DECORATIVO

- Estructura: div `relative w-full aspect-video rounded-2xl overflow-hidden bg-gray-900` con img `video-thumbnail.jpg` + overlay `bg-black/30` + botón play circular (`bg-white/20 backdrop-blur-sm border-white/40`, triángulo SVG blanco) marcado `pointer-events-none`.
- El wrapper es un `<div>` sin rol, sin `onclick`, `cursor: auto`.
- **Click real ejecutado sobre el overlay: NO pasa nada.** Tras el click: `videos=1` (solo el del hero), `iframes=0`, ningún modal visible, wrapper sin cambios.
- Conclusión: parece un reproductor pero es una imagen estática con ícono de play. La app puede replicarlo como imagen decorativa o decidir conectarlo al mp4 (decisión de producto, no del sitio).

## 3. Zonas (grid/carrusel)

- A 1440 (md+): **grid estático de 3 columnas** (`md:grid md:grid-cols-3`). No es carrusel: sin autoplay (scrollLeft 0 → 0 tras 5s), sin dots, sin flechas, sin loop, sin drag JS.
- A <md el MISMO nodo se vuelve carrusel nativo por CSS: `flex gap-4 overflow-x-auto scrollbar-hide` con tarjetas `flex-shrink-0 w-[75vw]` y sangrado `-mx-4 px-4`. Scroll horizontal libre (sin snap points detectados — ver mobile-notes).
- Hover tarjeta (desktop): imagen `scale: 1.05` (propiedad CSS `scale`, transición 0.5s) + chip «Ver más» pasa de `#C8D400` a `#A8B200` (verificado computado). Equivalente táctil: ninguno (feedback de press opcional).
- Click en tarjeta → navegación dura a `/zonas/{slug}` (hoy 403).

## 4. Testimonios («Voces del cambio»)

- Estado inicial: Ana activa (`aria-pressed="true"`), tarjeta grande = su foto + nombre/rol sobre gradiente + botón play decorativo centrado (mismo patrón inerte del bloque que-es; no hay `<audio>` en la página pese al copy «escuchar sus testimonios»).
- Click en cada avatar (verificado con clicks reales):
  - Cambia la imagen grande (`src` → foto del perfil), el nombre/rol de la tarjeta y el párrafo de quote bajo la tarjeta. `aria-pressed` se mueve al clickeado.
  - **No hay marcador visual extra en el avatar activo**: mismos borde/opacidad/transform en activo e inactivo (verificado computado). La única señal visible es la tarjeta grande.
  - Sin autoplay/rotación automática; sin audio real.
- Quotes capturadas verbatim (textContent):
  - Ana Rodriguez: «Gracias a One Impact, hemos podido conectar con comunidades y proyectos que comparten nuestra visión de un futuro sostenible para la Amazonia.»
  - Carlos Méndez: «La plataforma nos permitió hacer visible el trabajo de años de nuestra comunidad y recibir el apoyo necesario para continuar protegiendo el bosque.»
  - Lucía Torres: «One Impact crea puentes reales entre quienes quieren contribuir y quienes están en el campo generando impacto positivo día a día.»
- Evidencia: `06-screenshots/home-testimonios-1440.png` (Ana), `home-testimonios-carlos-activo-1440.png`, `home-testimonios-lucia-activa-1440.png`.
- Equivalente táctil: tap en avatar = mismo swap de tarjeta.

## 5. Contador «35K» (stats-cta)

- **Estático.** Muestreado cada ~180ms durante 2.5s al entrar al viewport tras recarga: siempre «35K». No hay animación de conteo. Valor literal del DOM.

## 6. Hovers restantes (desktop)

- Logos aliados: `grayscale` → `grayscale(0)` (color) al hover, `transition-all` (verificado con WWF).
- CTA hero «Explorar Zonas de Impacto»: `hover:bg-gray-100` (clase).
- CTA «Explora todas las zonas»: `hover:bg-white hover:text-gray-900` (clase; invierte a pastilla blanca).
- CTA header y hamburguesa: `hover:bg-white/10` en hamburguesa (clase).
- Equivalente táctil de todos: ninguno necesario; son refuerzos de puntero.

## 7. Header al hacer scroll

- La nav fija **permanece 100% transparente** en cualquier scroll (bg `rgba(0,0,0,0)`, sin backdrop-filter, verificado a scrollY=1200 sobre sección blanca).
- Consecuencia visual: links blancos flotan sobre fondos claros y pierden contraste (visible en screenshots de secciones claras). Dato relevante para la adaptación móvil.

## 8. Menú móvil

- Dialog `fixed inset-0 z-[100] bg-accent` con `transition-opacity`; existe en el DOM también en desktop (oculto por opacity). Botones «Abrir menú» (hamburguesa, `md:hidden`) y «Cerrar menú». Prueba de apertura real y screenshot en la pasada 390 (`home-mobile-notes.md`).

## 9. Consola / red

- 17 errores de consola, **todos** `403` de prefetch de Next.js hacia rutas bloqueadas: `/nosotros`, `/proyectos`, `/zonas/amazonia`, `/zonas/borneo`, `/zonas/patagonia` (repetidos). Ningún error funcional propio de la página.
