# Contenido — suscripcion (/suscripcion)

Fuente: sitio real a 1440×900 y 390×844, 2026-08-19. Título del documento:
«Suscripción — One Impact».

## 0. header

Canónico — idéntico a `02-content-home.md` §header (mismos links, mismo CTA
«Únete a One Impact» → `/suscripcion`, mismo menú móvil). Sin desviaciones.
Nota visual: el nav fijo transparente queda montado sobre las fotos del
collage (links blancos legibles sobre imagen, como en home).

## 1. collage-hero

Bloque de 5 imágenes sin texto, sin overlays y sin CTA (div antes de la
primera section; el nav flota encima).

- **fila 1 (grid 3 columnas, celdas cuadradas):**
  - `subscription/collage-1.jpg` — alt «» (pareja caminando en pradera de montaña)
  - `subscription/collage-2.jpg` — alt «» (voluntarios plantando)
  - `subscription/collage-3.jpg` — alt «» (mujer con traje típico entrevistada)
- **fila 2 (flex 3:2):**
  - `subscription/hero-main.jpg` — alt «» (dos niños mirando hacia arriba)
  - `subscription/hero-secondary.jpg` — alt «» (mujer con perro frente a fiordo)
- **microcopy:** ninguno. Los 5 alt son vacíos (imágenes decorativas).

## 2. planes

- **h1:** «Lo que haces hoy queda en el mundo»
- **párrafo (sub):** «Elige cómo quieres sostenerlo.»
- **toggle billing (2 botones):** «Mensual» | «Anual» — estado inicial:
  **Mensual** activo.
- **selector de planes (3 botones, NO tarjetas con CTA propio):** estado
  inicial: **Estándar** activo (check verde; único distintivo — NO existe
  badge «más popular» ni texto equivalente).

  Estado **Mensual** (inicial):
  | Plan | Precio | Periodo |
  |---|---|---|
  | «Básico» | «$5» | «/mes» |
  | «Estándar» | «$10» | «/mes» |
  | «Premium» | «$15» | «/mes» |

  Estado **Anual** (tras click en «Anual»):
  | Plan | Precio | Periodo | Microcopy extra |
  |---|---|---|---|
  | «Básico» | «$4» | «/mes» | «facturado anualmente» |
  | «Estándar» | «$8» | «/mes» | «facturado anualmente» |
  | «Premium» | «$12» | «/mes» | «facturado anualmente» |

  Formato exacto de precio: signo `$` + entero, sin decimales, sin separador
  de miles, sin código de moneda. El periodo siempre es «/mes», también en
  anual. No aparece ningún texto de ahorro/descuento («ahorra X%» no existe).

- **CTA (uno solo, debajo del selector):** «Comenzar mi travesía» →
  `/registro?plan={basico|estandar|premium}&billing={monthly|annual}` según
  selección (matriz completa en `raw/suscripcion-interactions.md`; default
  `/registro?plan=estandar&billing=monthly`). Slugs de plan sin acento:
  `basico`, `estandar`.
- **microcopy legal (bajo el CTA):** «Cancela cuando quieras, los registros
  de tu suscripción son permanentes.»

## 3. beneficios

- **h2:** «Lo que incluye tu suscripción»
- **lista (6 ítems, icono cuadrado verde + título + descripción):**

1. **«Tu iPass»** — «Tu identidad digital de impacto, registra cada
   proyecto, logro y contribución.»
2. **«Proyectos con coordenadas reales»** — «Sabes exactamente dónde ocurre
   tu impacto y recibes evidencia audiovisual.»
3. **«Tu línea de travesía»** — «Cada mes activo suma un punto permanente a
   tu historia. Lo que ya ocurrió no se cancela.»
4. **«Academy + comunidad»** — «Formación, foros, eventos y voluntariado, un
   ecosistema completo de personas que actúan.»
5. **«Wallet + marketplace»** — «Tokens, insignias y activos digitales que
   acumulas y que puedes usar como moneda dentro del ecosistema.»
6. **«Fondo de emergencias»** — «Parte de tu suscripción ya está en el fondo
   de respuesta climática, antes de que ocurra, ya estás ahí.»

- **microcopy:** los iconos son SVG decorativos sin texto ni aria-label
  (crudos en `raw/suscripcion-assets.json`).

## 4. footer

Canónico — idéntico a `02-content-home.md` §footer (tagline, MENÚ, CONTACTO
`hola@oneimpact.org`, «© 2026 One Impact. Todos los derechos reservados.»).
Sin desviaciones.

---

Notas:
- No hay FAQ, no hay disclaimers adicionales, no hay más CTAs: la página son
  exactamente estas 4 secciones + header.
- `/registro` (destino del CTA) queda fuera del alcance de Fase 1: solo se
  documentan los href.
- Sin textos FALTA: todo el copy visible quedó capturado.
