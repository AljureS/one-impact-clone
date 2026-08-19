# 03 — Design tokens (consolidado de home + zonas + suscripcion)

Fuente: merge de `raw/home-styles.json`, `raw/zonas-styles.json`,
`raw/suscripcion-styles.json` (computados del sitio real, 1440×900) más las
notas 390 de `raw/*-mobile-notes.md`. **Solo valores observados**; conversión
rgb→hex mecánica. Conflictos entre pantallas se documentan, no se resuelven.
Cobertura: `/`, `/zonas`, `/suscripcion`. Las pantallas 403 (`/nosotros`,
`/zonas/[slug]`) no aportan tokens: ver `00-gaps.md`.

## 1. Paleta base (sólidos, hex)

Variables de theme leídas de los styleSheets reales (Tailwind v4) + arbitrarios
observados en clases `bg-[#...]`.

### 1.1 Marca / acento

| Hex | Nombre (var real o semántico) | Dónde se observó |
|---|---|---|
| `#C8D400` | `--color-accent` | home: CTAs (header, que-es, stats), chip «Ver más», fondo menú móvil, cifra «35K» · zonas: chip «Ver más», h3 tarjeta avance, dot activo del carrusel · CTA nav canónico en las 3 pantallas |
| `#A8B200` | `--color-accent-dark` | home: hover del chip «Ver más» (`group-hover:bg-accent-dark`). Único uso observado |
| `#0F1A0A` | `--color-forest` | home: overlay `bg-forest/80` sobre stats-bg.jpg · zonas: **fondo sólido** de la sección avances (`bg-forest`) |
| `#243B1A` | `--color-dark-green` | suscripcion (única pantalla que lo usa): pill activo del toggle, badge check del plan activo, rect de fondo de los 6 iconos de beneficios (`fill="#243b1a"`, rx 8) |
| `#5A7045` | verde patrón topográfico | zonas: `stroke` de los 10 paths del SVG inline del hero (atributo SVG, no aparece en paleta CSS) |

### 1.2 Fondos de sección (arbitrarios del sitio)

| Hex | Dónde se observó |
|---|---|
| `#DBE64C` | home: fondo sección zonas (`bg-[#dbe64c]`) |
| `#F0ECE4` | zonas: hero y zonas-grid · suscripcion: las 2 sections (planes, beneficios). **No existe en home** |
| `#FFF6EA` | home: fondo sección testimonios |
| `#FFF1DA` | home: en paleta computada, elemento decorativo dentro de testimonios (ubicación exacta no atribuida — hueco menor) |
| `#FFE97A` | home: ídem, decorativo en testimonios (no atribuido — hueco menor) |
| `#2D3A42` | footer (`bg-[#2d3a42]`) — las 3 pantallas |
| `#1E1E1E` | home: fondo CTA «Explora todas las zonas» (`bg-[#1E1E1E]`) |
| `#F5F5F5` | `--color-neutral-100` — home: fondo sección aliados |

### 1.3 Neutros / texto

| Hex | Var real | Dónde se observó |
|---|---|---|
| `#FFFFFF` | `--color-white` | texto sobre oscuro/fotos, CTA hero home, círculos aliados, pill toggle, plan activo |
| `#000000` | `--color-black` | zonas: `text-black` del chip «Ver más» (⚠ conflicto §6.3) |
| `#171717` | (neutral-950 Tailwind) | color de texto por defecto del `body` (rgb 23,23,23), las 3 pantallas |
| `#101828` | `--color-gray-900` | texto principal sobre claros; bg de CTAs oscuros («Conecta con la comunidad», «Comenzar mi travesía», CTA menú móvil); h1 de zonas y suscripcion; precio plan activo |
| `#1E2939` | `--color-gray-800` | home: texto oscuro secundario · suscripcion: `hover:bg-gray-800` del CTA |
| `#364153` | `--color-gray-700` | home: párrafo quote testimonios · suscripcion: nombre plan activo, `hover:text-gray-700` toggle |
| `#4A5565` | `--color-gray-600` | home: subtítulos/roles · zonas: p hero · suscripcion: precio inactivo, descripción beneficio |
| `#6A7282` | `--color-gray-500` | suscripcion: subtítulo hero, botón inactivo del toggle |
| `#99A1AF` | `--color-gray-400` | suscripcion: nombre/precio de planes inactivos, «/mes», microcopy legal, «facturado anualmente» |
| `#D1D5DC` | `--color-gray-300` | definido en theme; **sin uso observado** en las 3 pantallas |
| `#E5E7EB` | `--color-gray-200` | home: placeholder bg de tarjetas de imagen (`bg-gray-200`) |
| `#F3F4F6` | `--color-gray-100` | home: `hover:bg-gray-100` del CTA blanco del hero |
| `#FB2C36` | `--color-red-500` | definido en theme; **sin uso observado** en las 3 pantallas |

## 2. Overlays / transparencias (separados de la paleta base)

Blancos con alpha (`white/N`):

| Token | Dónde se observó |
|---|---|
| `white/10` | home: `hover:bg-white/10` hamburguesa |
| `white/20` | home: bg del botón play decorativo (`bg-white/20 backdrop-blur-sm`) |
| `white/25` | home: aparece en paleta computada; ubicación no atribuida (hueco menor) |
| `white/30` | zonas: dots inactivos del carrusel de avances (`bg-white/30`) |
| `white/40` | home: borde del botón play (`border-white/40`) |
| `white/50` | footer: headings MENÚ/CONTACTO y copyright · zonas: fecha «• 2026» de avances · suscripcion: `hover:bg-white/50` plan inactivo |
| `white/60` | home: borde de avatares de testimonios (`border-white/60`) |
| `white/70` | footer: tagline · zonas: subtítulo de avances · suscripcion: **fondo** de la franja selectora de planes (`bg-white/70`) |
| `white/80` | home: texto secundario del hero, intro stats, links footer · zonas: párrafo tarjeta avance |
| `white/90` | zonas: párrafo descripción de tarjeta de zona (home no pasa de /80 en ese rol) |

Negros con alpha: `black/10` (overlay; separador del menú móvil `border-bottom
1px`), `black/20`, `black/30` (overlay thumbnail video; via del gradiente de
tarjeta en zonas), `black/45`, `black/60`, `black/70`, `black/80` (ver
gradientes §5.2). `forest/80` = `#0F1A0A` al 80 % (overlay de stats-cta).

## 3. Tipografía

**Familia única: Geist** (`--font-geist-sans: "Geist","Geist Fallback"`) en las
3 pantallas; no hay segunda familia. Pesos observados: 400, 500, 600, 700, 900
(vars de theme; 900 solo aparece en home).

### 3.1 Encabezados (1440 → 390)

| Rol | 1440 | 390 | Color | Fuente |
|---|---|---|---|---|
| h1 hero home | 60px / 900 / lh 75px | 36px / lh 45px (peso no re-medido) | blanco | home |
| h1 hero zonas | 60px / **700** / lh 75px | 36px / 700 / lh 45px | gray-900, centrado | zonas ⚠ §6.2 |
| h1 hero suscripcion | 48px / 700 / lh 60px | 30px / lh 37.5px | gray-900 | suscripcion ⚠ §6.2 |
| h2 sección grande (que-es, zonas de home) | 48px / 900 / lh 60px | 30px | gray-900 | home |
| h2 sección chica (testimonios, aliados) | 36px / 900 / lh 45px | 30px | gray-900 | home |
| h2 sección zonas (avances) | 36px / 700 / lh 45px | 30px / 700 / lh 37.5px | blanco | zonas ⚠ §6.2 |
| h2 tarjeta de zona (/zonas) | 36px / 700 / lh 45px | 30px / 700 / lh 37.5px | blanco | zonas ⚠ §6.4 |
| h2 beneficios (suscripcion) | 30px / 700 / lh 36px | 24px | gray-900 | suscripcion |
| h3 tarjeta zona (home) | 24px / 900 / lh 32px | (no re-medido) | blanco | home ⚠ §6.4 |
| h3 tarjeta avance | 14px / 700 / lh 19.25px | idéntico | accent `#C8D400` | zonas |

### 3.2 Cuerpo

| Rol | Valor | Fuente |
|---|---|---|
| body default | 16px / 400 / lh 24px | las 3 |
| p hero home | 18px / 400 / lh 28px (390: 16px / lh 24px, white/80) | home |
| p hero zonas | 18px / 400 / lh 29.25px (390: 16px / lh 26px), gray-600 | zonas |
| p hero suscripcion | 16px / 400 / lh 24px, gray-500 | suscripcion |
| p quote testimonio | 16px / 400 / lh 26px, gray-700 | home |
| p tarjeta zona | 14px / 400 / lh 19.25px, white/90 | zonas |
| p tarjeta avance | 12px / 400 / lh 19.5px, white/80 | zonas |
| p título / desc beneficio | 14px / 600 / lh 19.25px gray-900 · 14px / 400 / lh 19.25px gray-600 | suscripcion |

### 3.3 Stats (home)

| Rol | 1440 | 390 |
|---|---|---|
| intro «Únete a más de» | 20px / 400 / lh 28px, white/80 | 18px (por clase `text-lg`) |
| cifra «35K» | 128px / 900 / lh 128px, accent | 72px (`text-7xl`) |
| cierre «agentes de cambio» | 24px / 500 / lh 32px, blanco | 20px (por clase `text-xl`) |

### 3.4 Botones y navegación

| Rol | Valor | Fuente |
|---|---|---|
| CTA redondo estándar | 14px / 700 / lh 20px | home (hero, que-es, zonas, stats, header) |
| CTA «Conecta con la comunidad» | 14px / 600, padding 14px 24px, w-full | home (único 600 de home) |
| chip «Ver más» home | 14px / 700, px-4 py-2 | home ⚠ §6.3 |
| chip «Ver más» zonas | 14px / 600, px-4 py-2, gap-2 | zonas ⚠ §6.3 |
| botón toggle billing | 14px / 600 / lh 20px, px-5 py-2 | suscripcion |
| CTA «Comenzar mi travesía» | 16px / 600 / lh 24px, py-4, w-full | suscripcion (único CTA 16px w-full) |
| nav link desktop | 14px / 500, blanco | las 3 |
| link menú móvil | 16px / 400, gray-900, padding 20px 0 | home 390 |
| CTA menú móvil | 16px / 700, py-4, w-full, bg gray-900 | home 390 |

### 3.5 Captions / micro

| Rol | Valor | Fuente |
|---|---|---|
| nombre tarjeta testimonio | 14px / 600, blanco | home |
| rol tarjeta testimonio | 11px / 400 / lh 16.5px, white/80 | home |
| avatar nombre / rol | 11px / 600 / lh 13.75px · 11px / 400 / lh 13.75px | home |
| footer tagline | 12px / 400 / lh 19.5px, white/70 | las 3 |
| footer heading (MENÚ, CONTACTO) | 12px / 700 / lh 16px, white/50 | las 3 |
| footer link | 14px / 400 / lh 20px, white/80 | las 3 |
| footer copyright | 12px / 400 / lh 16px, white/50 | las 3 |
| fecha avance «• 2026» | 12px / 400 / lh 16px, white/50 | zonas |
| nombre de plan | 12px / 500 / lh 16px | suscripcion |
| precio plan activo / inactivo | 24px / 700 / lh 24px gray-900 · 20px / 700 / lh 20px gray-600 | suscripcion |
| periodo «/mes» | 10px / 400 / lh 15px, gray-400 (`text-[10px]`, único 10px del sitio) | suscripcion |
| «facturado anualmente» | 9px (`text-[9px]`), gray-400 — solo existe en estado Anual | suscripcion |
| legal bajo CTA | 12px / 400 / lh 16.5px, gray-400 | suscripcion |

Observado sin atribuir a rol (aparece en el muestreo de las 3 pantallas):
`SPAN 24px/700/lh 30px` — hueco menor, ver `00-gaps.md`.

## 4. Espaciado

- **Escala de 4 confirmada**: todos los espaciados observados son múltiplos de
  4 (los no-múltiplos son solo tamaños de fuente 9/10/11px y line-heights
  derivados).
- **⚠ CONFLICTO gutter lateral de sección (no resolver en silencio):**
  - home: `px-4 md:px-8 lg:px-16` → **16px** en móvil (fuente: home-styles,
    home-mobile-notes).
  - zonas y suscripcion: `px-5 md:px-10 lg:px-16` → **20px** en móvil (fuente:
    zonas-styles nota 1, suscripcion-styles nota 2).
  - Coinciden solo en `lg:px-16` (64px). Decisión de unificación pendiente
    para Fase 2; el sitio real es inconsistente.
- Verticales de sección: hero zonas `py-14` (56px), stats `py-24` (96px),
  planes `pt-10 pb-8`, beneficios `pt-2 pb-16`, hero home móvil `pb-16` (64px).
- Gaps: tarjetas/carruseles `gap-4` (16px) · grid zonas desktop y lista
  beneficios `gap-5` (20px) · dots `gap-2` (8px) · chip home `gap-1` vs chip
  zonas `gap-2` (⚠ §6.3) · planes `gap-1` · aliados 32px · avatares 20px (390)
  · footer apilado 40px (390).
- Paddings de CTA observados: `px-7 py-3` (28/12), `px-5 py-2` (20/8),
  `px-4 py-2` (16/8), `px-8 py-3` (32/12, stats), `py-4` w-full (16),
  `p-1` (pill toggle), `p-2` (franja planes), `p-3` (botón plan),
  `p-5` (contenido de tarjeta zona).

## 5. Radios, sombras, gradientes

### 5.1 Radios

Vars de theme: `--radius-lg` 8px · `--radius-xl` 12px · `--radius-2xl` 16px ·
`--radius-3xl` 24px. Usos observados:

- `rounded-full` (computado `3.35544e+07px`): todos los CTAs/pills/chips,
  dots, avatares, círculos de aliados, toggle, badge check.
- `rounded-2xl` 16px: tarjeta zona **home**, thumbnail video, imagen de
  tarjeta avance, botón de plan.
- `rounded-3xl` 24px: tarjeta grande testimonios, tarjeta zona **/zonas**
  (⚠ §6.4), franja selectora de planes.
- `rx="8"`: rect de fondo de los iconos de beneficios (SVG 40×40).

### 5.2 Gradientes (todos con clases Tailwind, sin assets)

| Uso | Valor |
|---|---|
| Overlay hero home (sobre video) | `bg-gradient-to-b from-black/60 via-black/20 to-black/70` |
| Tarjeta zona home | `bg-gradient-to-t from-black/80 via-transparent to-transparent` |
| Tarjeta zona /zonas | `bg-gradient-to-t from-black/80 via-black/30 to-transparent` ⚠ conflicto con la de home (§6.5) |
| Tarjeta grande testimonios | `bg-gradient-to-t from-black/45 via-transparent to-transparent` |

Overlays planos: `bg-black/30` (thumbnail video), `bg-forest/80` (stats-cta).

### 5.3 Sombras

Solo nombres de clase observados (valores computados **no capturados** — hueco
menor): `shadow-sm` (círculos aliados, pill del toggle), `shadow-md` (botón de
plan activo). `backdrop-blur-sm` en el botón play decorativo.

### 5.4 Transiciones observadas

`transition-colors` (CTAs, chips, toggle) · `transition-transform duration-500`
(zoom imagen tarjeta zona, scale 1.05) · `transition-all duration-300` (dots) ·
`transition-opacity` (menú móvil) · `transition-all` (logos aliados
grayscale→color, planes).

## 6. Conflictos entre pantallas (documentados, sin resolver)

1. **Gutter móvil**: home 16px (`px-4`) vs zonas/suscripcion 20px (`px-5`) —
   §4.
2. **Peso de títulos**: home usa `font-black` 900 en h1/h2/h3; zonas y
   suscripcion usan `font-bold` 700 en los mismos roles. El 900 solo existe en
   home (más la cifra 35K).
3. **Chip «Ver más»**: home = 700 / `text-gray-900` / `gap-1` / flecha 24×24
   (`M5 12h14M12 5l7 7-7 7`) / `group-hover:bg-accent-dark` · zonas = 600 /
   `text-black` / `gap-2` / flecha 16×16 (`M3 8h10M9 4l4 4-4 4`) / sin hover.
4. **Tarjeta de zona**: home = `rounded-2xl` 16px, `aspect-[3/4]` vertical,
   título h3 24/900, sin descripción · /zonas = `rounded-3xl` 24px, altura
   fija 208/256px apaisada, título h2 36/700, con descripción.
5. **Gradiente de tarjeta de zona**: home `via-transparent` vs zonas
   `via-black/30`.
6. **h1 por pantalla**: 60/900 (home) vs 60/700 (zonas) vs 48/700
   (suscripcion) — no hay un h1 único de sitio.

## 7. Breakpoints y misceláneos

- Único breakpoint estructural observado: `md:` (a 390 rige la variante móvil,
  a 1440 la desktop; el valor px exacto de `md` no se midió — hueco menor).
  `lg:` solo ajusta gutters y tamaños de h1.
- Header/nav: `fixed top-0 z-50`, **siempre transparente** (sin bg ni
  backdrop-filter a cualquier scroll) — riesgo real de contraste sobre fondos
  claros (`#F0ECE4` en zonas/suscripcion), rasgo del sitio.
- Menú móvil: `fixed inset-0 z-[100] bg-accent`, `transition-opacity`.
- Tamaños fijos útiles: logo 120×47 · avatar 56px (`w-14`) · play 64/80px ·
  círculo aliado 96/112px · icono beneficio 40×40 · check plan 20px · dot 8×8
  (activo 24×8) · slide avance 220px, imagen avance alto 192px · tarjeta zona
  390: 350×208 · collage suscripcion fila 2: `height: clamp(200px, 55vw,
  440px)` (único responsive no-Tailwind del sitio).
