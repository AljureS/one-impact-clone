---
name: site-exploration
description: Procedimiento de Fase 1 para explorar el sitio One Impact con Playwright MCP - misiones (sitemap, pantalla, slug repetido), scripts de extracción del playbook, formatos y nombres de los artefactos de docs/exploration/, y doctrina oficial de manejo del navegador. Usar en cada misión de site-explorer y al dudar del formato de un artefacto de exploración.
---

# Exploración del sitio (Fase 1)

Sitio: `https://d3foiidvo1xvi7.cloudfront.net/`. Todo artefacto vive en
`docs/exploration/`. La app se construirá desde estos archivos sin volver a
mirar el sitio: lo que no quede capturado aquí, no existirá.

## Doctrina de navegador

Adaptada de los agentes oficiales de Playwright (planner/generator/healer,
`microsoft/playwright` → `packages/playwright/src/agents/`):

- **Snapshot primero.** `browser_snapshot` (árbol de accesibilidad) es tu
  mecanismo de lectura y de localización de elementos; actúa sobre sus `ref`s.
  Los screenshots son **entregables**, no tu forma de leer la página.
- **Nunca esperes `networkidle`.** Espera estados concretos:
  `browser_wait_for` con el texto o elemento que confirma que la sección cargó.
- **Extracción masiva por `browser_evaluate`** con los scripts de abajo, no
  copiando del snapshot a mano (el snapshot trunca; `innerText` no).
- Datos dinámicos (contadores, fechas): anota el valor observado y márcalo
  `(dinámico)`.
- Si algo falla, diagnostica con `browser_console_messages` y
  `browser_network_requests`; corrige una cosa a la vez y reintenta.
- Persiste hallazgos en archivos al momento; tu respuesta final es un índice,
  no un contenedor de datos.
- No uses `browser_run_code_unsafe`; `browser_evaluate` basta.

## Misión `sitemap` (primera, una vez)

1. Navegar `/` a 1440×900. Snapshot: enumerar links de header, footer y CTAs.
2. Navegar `/zonas`: capturar el href real de **cada** tarjeta de zona — esos
   son los slugs, se enumeran, no se asumen.
3. Verificar cada ruta descubierta con una navegación (status + título).
4. Escribir `01-sitemap.md`: árbol de rutas, slugs exactos de `/zonas/[slug]`,
   y de dónde salió cada uno. Anotar rutas que respondan raro (redirect, 403).

## Misión `pantalla` (por cada una: `/`, `/zonas`, primer slug, `/suscripcion`, `/nosotros`)

Con `{pantalla}` = nombre corto (`home`, `zonas`, `zona-{slug}`,
`suscripcion`, `nosotros`):

1. **1440×900** (`browser_resize`) → navegar → esperar contenido real.
2. Screenshot full-page → `06-screenshots/{pantalla}-fullpage-1440.png`
   (`browser_take_screenshot` con `fullPage` y `filename`).
3. Snapshot → lista de secciones en orden con nombre descriptivo en kebab
   (`hero`, `que-es`, `zonas-carrusel`, `testimonios`, `aliados`, `stats-cta`,
   `footer`…). Estos nombres se reutilizan en todos los artefactos.
4. Correr los 4 scripts de extracción (abajo) → escribir crudos:
   - `raw/{pantalla}-styles.json` (paleta + tipografía por rol)
   - `raw/{pantalla}-assets.json` (imgs/videos/bgs con dimensiones)
   - texto por sección → base del `02-content-{pantalla}.md`
5. Escribir `02-content-{pantalla}.md` (formato abajo) con textos **verbatim**,
   incluyendo microcopy: badges, disclaimers, labels del toggle, alt text,
   textos del footer, precios.
6. Screenshot por sección (element screenshot con el `ref` del snapshot) →
   `06-screenshots/{pantalla}-{seccion}-1440.png`.
7. **Interacciones**: probar y anotar en `raw/{pantalla}-interactions.md` —
   carrusel (¿autoplay? esperar 5s y comparar; ¿loop? ¿dots?), toggle
   Mensual/Anual (click y capturar **qué cambia exactamente**, los 3 precios
   antes/después), testimonios (click en cada avatar: cómo se marca el activo),
   video (atributos del script; ¿poster?), hovers (`browser_hover`) y qué
   equivalente táctil sugieren.
8. **390×844** → recargar → full-page `{pantalla}-fullpage-390.png` + por
   sección `{pantalla}-{seccion}-390.png`.
9. Anotar en `raw/{pantalla}-mobile-notes.md`, sección por sección, **cómo
   colapsa a 390**: qué se apila, qué se vuelve scroll horizontal, qué
   desaparece, tamaños relativos del hero. Esta observación es la base del
   criterio de adaptación de Fase 2 — sé específico.
10. Cruzar `raw/{pantalla}-assets.json` contra el árbol real de `public/`
    (Glob): anota en el mismo JSON qué archivo local corresponde a cada asset
    remoto y qué asset no aparece en `public/`.

## Misión `slug-repetido` (slugs 2..N)

Solo pasos 1–2, 5, 8 y 9 + una nota de desviaciones respecto al template
documentado por el primer slug. Estilos y assets compartidos no se re-extraen.

## Scripts de extracción (PLAYBOOK §1.3, correr con `browser_evaluate`)

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

## Formato de `02-content-{pantalla}.md`

```markdown
# Contenido — {pantalla} ({ruta})

## 1. {seccion}            <!-- mismo nombre kebab que el screenshot -->
- **h1/h2:** «texto exacto»
- **párrafo:** «texto exacto»
- **CTA:** «label exacto» → destino
- **microcopy:** badges, disclaimers, alt text
(secciones en el orden real de la página)
```

Precios, cifras y unidades se copian con su formato exacto (`$`, puntos,
comas). Lo incapturable se deja como `FALTA: <descripción>` para preguntar.

## Si una pantalla bloquea

El playbook lo anticipa para `/nosotros` y `/zonas/[slug]`: si con navegador
real igual bloquea (403/challenge/vacío), captura screenshot del estado +
`browser_network_requests` del documento, documenta qué se obtuvo, y reporta
el bloqueo para que el dev capture esa pantalla manualmente. No inventes el
contenido faltante.
