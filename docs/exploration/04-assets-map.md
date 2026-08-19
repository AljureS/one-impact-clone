# 04 — Mapa de assets (`public/` → pantalla/sección)

Fuente: merge de `raw/{home,zonas,suscripcion}-assets.json` (naturalW/H del
sitio real) cruzado contra el árbol físico de `public/`.

**Estado de verificación física: COMPLETA (2026-08-19).** Los assets.json se
capturaron cuando `public/` aún no estaba en el repo (sus notas dicen
"pendiente verificación física"), pero al consolidar `public/` **sí existe en
el repo** (27 archivos, trackeados en git). Se midió cada archivo con `sips`/
`mdls`: **las dimensiones físicas coinciden 1:1 con las naturalW/H observadas
en el sitio** en los 25 assets usados. El estado "pendiente" queda superado.

Cobertura de uso: solo `/`, `/zonas`, `/suscripcion`. "No usado" significa *no
observado en las pantallas exploradas*; las pantallas 403 (`/nosotros`, 5
fichas de zona) podrían usarlos (ver `00-gaps.md`).

## Raíz e imágenes sueltas

| Asset | Dimensiones físicas | Uso observado | Notas |
|---|---|---|---|
| `videos/one-impact-intro.mp4` | 640×1138, 9.8 s, con pista de audio AAC | **home › hero**: fondo `absolute inset-0 object-cover pointer-events-none`, `autoplay muted loop playsinline`, sin poster, sin controls | Único video del sitio. Vertical (formato reel) |
| `images/logo_blanco.svg` | viewBox 768×299 (natural render 300×117) | **home, zonas, suscripcion › header y footer** (2× por página), render 120×47 | Logo canónico de todo el sitio |
| `images/logo_negro.svg` | viewBox 2227×664 | **No usado** en pantallas exploradas | Candidato lógico para pantallas 403 o para la app; sin evidencia de uso |
| `images/hero-bg.jpg` | 270×480 | **No usado** en pantallas exploradas | El hero de home usa el video, no esta imagen. Vertical pequeña |
| `images/stats-bg.jpg` | 554×1108 (= natural observado) | **home › stats-cta**: fondo fill `object-cover object-center`, alt «Bosque», `loading=lazy`, bajo overlay `bg-forest/80` | |
| `images/video-thumbnail.jpg` | 828×1618 (= natural observado) | **home › que-es**: thumbnail `aspect-video` con overlay `bg-black/30` y play decorativo, alt «One Impact — video introductorio» | **Byte-idéntica a `zones/patagonia.jpg`** (mismo MD5 `8cc4d413…`) — duplicado real del zip entregado |

## `images/testimonials/` — todo en home › testimonios

| Asset | Dimensiones | Uso observado |
|---|---|---|
| `ana-rodriguez.jpg` | 816×1456 | Tarjeta grande activa por defecto **y** avatar 1 (mismo archivo 2×), alt «Ana Rodriguez» |
| `carlos-mendez.jpg` | 204×364 | Avatar 2 (y tarjeta grande al activarlo), alt «Carlos Méndez». La más pequeña del sitio |
| `lucia-torres.jpg` | 512×512 | Avatar 3 (y tarjeta grande al activarla), alt «Lucía Torres» |

## `images/allies/` — todo en home › aliados (círculo blanco, grayscale)

| Asset | Dimensiones | Alt observado |
|---|---|---|
| `wwf.png` | 1080×1136 | «WWF» |
| `ci.png` | 390×390 | «Conservation International» |
| `tnc.png` | 600×450 | «The Nature Conservancy» |

## `images/zones/` — repartidas entre home y /zonas (⚠ inconsistencia del sitio)

| Asset | Dimensiones | Uso observado | Notas |
|---|---|---|---|
| `amazonia.jpg` | 384×257 | **home › zonas** (tarjeta 1) **y /zonas › zonas-grid** (tarjeta Amazonía, 2× en DOM por listas móvil/desktop) | Única zona presente en ambas pantallas |
| `borneo.jpg` | 330×220 | Solo **home › zonas** (tarjeta 2) | |
| `patagonia.jpg` | 828×1618 | Solo **home › zonas** (tarjeta 3) | Byte-idéntica a `video-thumbnail.jpg` (MD5 igual). Vertical, distinta proporción que sus vecinas |
| `mexico.jpg` | 800×410 | Solo **/zonas › zonas-grid** (2× en DOM) | |
| `africa.jpg` | 1220×814 | Solo **/zonas › zonas-grid** (2× en DOM) | |

## `images/advances/` — los 5, solo en /zonas › avances (2× en DOM cada una)

| Asset | Dimensiones | Alt observado (título del avance) |
|---|---|---|
| `guainia.jpg` | 1920×1080 | «Restauración de ecosistemas en Guainía» (tarjeta 1) |
| `yucatan.jpg` | 512×357 | «Inicio de diagnóstico ecológico costero en Yucatán» (tarjeta 2) |
| `corredores.jpg` | 2464×1856 | «Diseño de corredores verdes en savana oriental» (tarjeta 3) |
| `borneo-monitoreo.jpg` | 800×600 | «Sistema de monitoreo satelital en Borneo» (tarjeta 4) |
| `amazonia-carbono.jpg` | 1280×720 | «Certificación de créditos de carbono en Amazonía» (tarjeta 5) |

## `images/subscription/` — los 5, solo en /suscripcion › collage-hero (alt="" decorativas)

| Asset | Dimensiones | Posición en el collage |
|---|---|---|
| `collage-1.jpg` | 1376×864 | Fila 1, celda 1 (grid-cols-3, `aspect-square`) |
| `collage-2.jpg` | 2048×2048 | Fila 1, celda 2 |
| `collage-3.jpg` | 1024×1024 | Fila 1, celda 3 |
| `hero-main.jpg` | 1456×816 | Fila 2, `flex-[3]`, `object-cover object-top` (dos niños mirando arriba) |
| `hero-secondary.jpg` | 1344×896 | Fila 2, `flex-[2]`, `object-cover` (mujer con perro frente a fiordo) |

Altura de la fila 2: style inline `height: clamp(200px, 55vw, 440px)`.

## Gráficos que NO son archivos de `public/` (SVG inline del JSX)

| Gráfico | Dónde | Crudo para reproducirlo |
|---|---|---|
| Patrón topográfico del hero (10 paths stroke `#5A7045`, viewBox 900×400, opacity 0.12) | /zonas › hero | `raw/zonas-hero-pattern.svg` (outerHTML completo) |
| 6 iconos de beneficios (40×40, rect `#243b1a` rx 8 + trazos blancos 1.5) | /suscripcion › beneficios | `raw/suscripcion-assets.json › svgsInline` |
| Check del plan activo (viewBox 12×12, `M2 6 L5 9 L10 3`) | /suscripcion › planes | ídem |
| Flecha chip «Ver más» home (24×24, `M5 12h14M12 5l7 7-7 7`) | home › zonas | `raw/home-styles.json › chipVerMas` |
| Flecha chip «Ver más» zonas (16×16, `M3 8h10M9 4l4 4-4 4`) | /zonas › zonas-grid | `raw/zonas-styles.json › chipVerMasZonas` |
| Triángulo play decorativo (`M8 5v14l11-7z`) | home › que-es y testimonios | `raw/home-styles.json › videoThumbnailQueEs` |

## Resumen

- **27 archivos físicos** en `public/` (24 raster + 2 SVG + 1 mp4), todos
  presentes y coincidentes con el árbol §1.4 del playbook.
- **25 usados y mapeados** en las 3 pantallas exploradas; **2 no usados**:
  `logo_negro.svg`, `hero-bg.jpg`.
- Ninguna pantalla explorada referencia un asset que falte en `public/`
  (cruce remoto→local 1:1, sin transformación de URL: export estático sin
  optimizador de next/image).
- Overlays y gradientes no son assets: son divs con clases Tailwind (ver
  `03-design-tokens.md` §5.2).
- Pendiente del checkpoint (nota §1.4 del playbook): `public/` contiene
  `.DS_Store` (raíz e `images/`) que deben eliminarse antes de commitear.
