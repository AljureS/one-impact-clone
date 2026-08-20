# Fase 3 — Auditoría (en curso, 2026-08-19)

Plan aprobado (plan mode). Se audita el working tree (bloque F sin commitear).
Doctrina skill playbook: auditores reportan con evidencia, no arreglan;
fixes por bloques con commit propuesto; re-audit hasta verde.

- [ ] Ronda 1: security-auditor (§3.1) + slop-auditor (§3.2) + qa-auditor
      (§3.3 + visual de §3.2) en paralelo → tasks/audit-*.md
      - [x] security ✓ re-auditado: ítem 1 (npm audit) PASA con la
        justificación añadida al README; único abierto = git rm --cached
        .DS_Store (acción del dev, propuesta) + cosmético local
      - [x] slop ✓: 0 bloqueantes; CONTENIDO 100% VERBATIM (0 desviaciones);
        6 menores en cola de fixes (esperando a que qa suelte el navegador
        para no romperle los checks con hot-reload)
      - [x] qa ✓ PERFECTO: 15/15 funcional §3.3, 13/13 visual §3.2,
        0 hallazgos accionables, 5 notas sin acción; deep links 5/5,
        toggle/testimonios/carruseles/videos verificados con evidencia
        (.playwright-mcp/qa-*.png); 7 ítems de device-QA para el dev
- [x] Ronda 2 ✓: fixes de los 6 menores de slop aplicados con gates
      tsc/eslint/knip verdes + spot visual (stops del hero idénticos en
      DOM; /zonas intacta): svgGradientStops() en theme (5 copias → 1),
      menuHeading y 3 tokens typography.button podados, AdvanceCard →
      ProgressUpdateCard (código unificado en progress*), spacing 2 y 24
      añadidos (observados) y usos unificados, 2 assets sin uso borrados
      de assets/ (copias en public/), README nota icono/splash template.
      + fixes de security: justificación npm audit en README, .DS_Store
      borrados (des-trackeo = commit del dev).
- [x] Ronda 3 ✓: slop re-auditado → §3.2 8/8 PASA (0 abiertos, 4 notas de
      constancia); security verde salvo acción git del dev; qa sin
      hallazgos desde ronda 1
- [x] Cierre DoD ✓: clon limpio sirviendo y bundle web HTTP 200 (sobre
      HEAD; re-verificar tras commits), ai-workflow con entrada Fase 3,
      commits consolidados en el reporte final, device-QA del dev en
      tasks/audit-qa.md

## Review Fase 3 (2026-08-20)

- Checklists: §3.1 verde con 1 acción del dev (git rm --cached .DS_Store);
  §3.2 8/8; §3.3 15/15 + 13/13 visual. Evidencia en tasks/audit-*.md y
  .playwright-mcp/qa-*.png.
- La fase cazó y cerró: justificación de vulns faltante en README, 5
  copias del fix de gradiente → helper único, 4 tokens/campos muertos del
  menú web, naming avance/progress, escala de spacing incompleta (2 y 24
  observados), 2 assets muertos en el bundle.
- Contenido 100% verbatim confirmado por diff automatizado + grafías
  trampa a mano — el ítem más calificable de §3.2, en verde desde ronda 1.
- Pendiente SOLO del dev: commits (bloque F + Fase 3), git rm --cached
  .DS_Store, GIF del README, device-QA física (7 ítems).

---

# Bloque F — Feedback UI/UX app-first (CERRADO 2026-08-19)

Plan aprobado (plan mode). /loop activo. Feedback del dev: esto es una app,
no una web — footer solo en Nosotros y mejor para teléfono; glassmorphism
solo en overlaps reales (skill ui-ux-pro-max); videos verificados o no se
muestran. Fase 3 después, con su propio plan mode.

- [x] F1 footer ✓ (código; visual pendiente en gate F3): quitado de
      home/zonas/detalle/suscripción; movido a features/about/components
      (único consumidor) y rediseñado phone-first (pila centrada, 44pt,
      sin columna MENÚ ni prop de gutter); AboutScreen sin sección CONTACTO
      propia (el footer la absorbe); data/navigation.ts intacto
      (menuLinks sigue dando aboutTitle). Gate tsc+eslint VERDE pegado.
- [x] F2 glass ✓ (código; visual pendiente en gate F3): expo-blur ~57.0.2
      instalado (npx expo install); pill BrandHeader (BlurView 18 dark +
      black30 + borde white20 + radius.full — arregla además el logo blanco
      ilegible sobre secciones claras), playCircle de IntroVideoCard a
      BlurView 10 light (backdrop-blur-sm real del sitio restaurado), back
      de ZoneDetail con BlurView absoluteFill (misma regla de UI flotante).
      Todos con overflow hidden. Gate tsc+eslint VERDE pegado. npm audit
      avisó de issues al instalar → revisar en §3.1 de Fase 3.
- [x] F3 videos ✓: inventario = 2 usos de one-impact-intro.mp4 (único video;
      el sitio MISMO lo usa de fondo del hero → hero fiel). BUG REAL cazado:
      en web el tap de que-es no reproducía (play() antes del montaje del
      VideoView → _mountedVideos vacío en expo-video web) → fix: play como
      efecto de showPlayer. Evidencia timeline: tap→playing→9.8s completos
      con audio→ended. Hero avanzando en web (2.27→3.47) y renderizando en
      iOS. Sin rama de contingencia: todo existe y reproduce.
- [x] F4 docs ✓: README (proceso paso 3, 3 filas en la tabla, política de
      video, árbol, límite Android del blur), ai-workflow bloque F, lessons
      ×2 (app≠web · CI=1 apaga watcher), review abajo.
- [x] Gate visual 390 (Metro sin CI=1 + Playwright): home hero/que-es/final,
      zonas final, detalle amazonia (back glass), suscripción final,
      nosotros footer nuevo — todos ✓ vs referencias con divergencias
      autorizadas; footer con 3 links role/aria/44px y CONTACTO sin
      duplicar. iOS: blur nativo real verificado (nosotros + home hero).

## Review Bloque F (2026-08-19)

- Feedback del dev ejecutado completo con plan aprobado + /loop: footer
  app-first solo en Nosotros, glass en los 3 overlaps flotantes reales
  (nada de glass donde no hay overlap: tab bar y scrims descartados con
  criterio), videos verificados reproduciendo en ambas plataformas.
- El gate F3 cazó un bug real de producción (que-es no reproducía en web) y
  el diagnóstico dejó una regla operativa nueva (CI=1 sin watcher).
- Pendiente dev: commitear los 4 mensajes propuestos del bloque F (en el
  reporte), grabar GIF. Fase 3 = siguiente, con su propio plan mode.

---

# Fase 2 — Construcción (en curso)

Plan aprobado (plan mode, 2026-08-19). /loop de precisión activo: cada bloque
se verifica con verify-block (tsc/eslint · diff contenido · visual 390) antes
de continuar. Commits: el mensaje se propone en el reporte de cada bloque y
nada más — el dev decide cuándo y cómo (ver tasks/lessons.md 2026-08-19).
Decisiones de adaptación 1–11 en el plan (van al README).

- [x] B1 scaffold (foundation-builder): SDK 57 / RN 0.86.2 / TS 6.0.3, rutas
      en app/ raíz, 8 deps de ejemplo podadas, web OK, assets 27+iconos.
      Gates verificados también por el orquestador: tsc/eslint/doctor verdes.
      1 reanudación por corte de red.
- [x] B2 theme: 5 archivos (266 líneas tot), Geist 5 pesos reales
      (@expo-google-fonts/geist, sin fallback), 6 conflictos respetados por
      pantalla, sombras SIN token (03 no capturó valores — no inventó).
      Gates re-verificados ✓ · commit propuesto: feat(theme): design tokens
      from site exploration
- [x] B3 data: 8 archivos (418 líneas), 5 zonas (titleHome/titleZones para
      ambas grafías, description solo en las 3 reales) · 5 avances con
      zoneSlug del mapeo aprobado · 3 planes + 6 beneficios + toggle
      verbatim · 3 testimonios · navigation.ts canónico. Cruce de fidelidad
      del builder + spot-check del orquestador ✓. Gates ✓. Pendiente
      autorizado: home.ts (hero/que-es) se añade al abrir B4 · commit
      propuesto: feat(data): typed content models and site content
- [x] B4 navigation+shared: árbol §2.1 exacto (rutas de 3 líneas), tabs
      Ionicons outline→filled (home/map/heart/people), Geist 5 pesos con
      splash, shared Button/SectionTitle/Screen/Footer con tokens+a11y,
      «Proyectos» disabled (403 en el sitio). Verificado en navegador real a
      390 por el builder + gates re-verificados ✓. theme/ y data/ CONGELADOS
      · commits propuestos: feat(data)… y feat(navigation): bottom tabs +
      nested zones stack
- [ ] B5 home (feature-builder): hero → que-es → zonas → testimonios →
      aliados → stats-cta (sección=commit)
      - [x] hero ✓: layout/copy verbatim a 390; overlay corregido a
        react-native-svg (experimental_backgroundImage no rendía en web —
        verificado en DOM: 3 stops exactos del theme); expo-env.d.ts
        añadido a ignores de eslint (generado, lo tocaba mi server QA) ·
        commit propuesto: feat(home): hero section with background video
      - [x] que-es ✓: gate visual lado a lado casi idéntico; playback real
        (mejora deliberada documentada), contain por mp4 vertical, sin
        auto-resume (audio) · commit propuesto: feat(home): intro video
        section with real playback
      - [x] zonas ✓: carrusel snap+dots (divergencia deliberada §2.4
        documentada), gate visual ✓; fix real de paso: react-native-svg
        NATIVO descarta el alfa de stopColor → stopOpacity explícito en
        ZoneCard y HeroSection (bug latente en native, verificado en
        fuente de la lib) · commit propuesto: feat(home): zones carousel
        with snap and dots
      - [x] testimonios ✓: swap verificado en vivo (Carlos→quote correcta),
        accessibilityState selected en código (RN-web no lo mapea en
        role=button; en nativo sí aplica), gate visual ✓; Metro con watcher
        muerto detectado y reiniciado durante el gate · commit propuesto:
        feat(home): testimonials with selectable profiles
      - [x] aliados ✓ (idéntico: círculos grises estáticos, hover sin
        equivalente táctil documentado) · commit: feat(home): partners row
      - [x] stats-cta ✓ (overlay plano forest80, 35K estático; fix CTA
        centrado verificado offset 0px) · commit: feat(home): stats banner
        with cta
      - [x] footer montado; fix del orquestador en shared/Footer: MENÚ y
        CONTACTO lado a lado a 390 como el sitio (verificado same-row) —
        entra al commit de stats-cta o como fix(shared) aparte, a criterio
        del dev
      HOME COMPLETO: 7 secciones con gate visual aprobado.
- [x] Bloque shared (orquestador): BrandHeader (logo blanco flotante, no
      navega — tabs ya navegan) montado en Screen para todas las pantallas;
      verificado a 390 idéntico al sitio. De paso cazado y corregido (por el
      builder) el sizing default 300×150 de los 3 Svg-overlay en web ·
      commit propuesto: feat(shared): floating brand header on all screens
- [x] B6 zones ✓: índice fiel (pila vertical, patrón topográfico transcrito
      a componente, avances snap con offsets medidos del sitio) + detalle
      derivado verificado en deep links (amazonia: desc + 2 avances + CTA;
      patagonia: omisiones correctas, sin texto filtrado). Único string
      no-de-data: a11y «Volver» (invisible, reportado) · commits:
      feat(zones): zones index with vertical grid and progress carousel ·
      feat(zones): derived zone detail screen
- [x] B7 subscription ✓: collage clamp fiel, toggle verificado en vivo
      (5/10/15↔4/8/12 instantáneo + annualNote ×3 + selected a11y añadido),
      6 SVG de beneficios transcritos verbatim (sin sustituir), CTA no-op
      documentado (/registro fuera de alcance). Faltantes honestos: sombras
      sin token, pasos 2/24 de spacing sugeridos · commits:
      feat(subscription): hero collage · feat(subscription): plans with
      billing toggle · feat(subscription): benefits list
- [x] B8 about ✓: derivada austera con tabla fuente-por-elemento (todo de
      data existente: título de menuLinks, párrafo de progressSection, stat,
      aliados, contacto, CTA navCta), smoke-render verificado a 390 · commit:
      feat(about): derived about screen from captured content
- [x] B9 README ✓: reescrito con setup, tabla de decisiones de adaptación
      con porqué, arquitectura, límites honestos y "con más tiempo";
      placeholder de GIF (<10MB, lo graba el dev) · commit: docs: README
      with adaptation decisions
- [x] Cierre: tsc/eslint/expo-doctor 21/21 ✓ · knip limpio tras podar 4
      exports muertos (expo-updates = falso positivo del plugin, sin key
      updates en app.json) · tamaños: máx 199 líneas, nada >200 ·
      ai-workflow.md con entrada consolidada de Fase 2

## Review Fase 2 (2026-08-19)

- 9/9 bloques ejecutados con el /loop de precisión: 17 commits propuestos
  (4 fundaciones + 6 home + 1 shared + 2 zones + 3 subscription + 1 about)
  + README + chore de knip. Todo gate pegado, no afirmado.
- El loop CAZÓ 6 defectos reales antes de que llegaran al dev (ver
  ai-workflow.md): 3 de SVG (web default 300×150, alfa en native,
  experimental_backgroundImage), CTA descentrado, footer mal colapsado,
  código muerto. La comparación visual lado a lado y las interacciones en
  vivo (toggle, testimonios, deep links ×5) fueron los detectores.
- Infra del entorno: el watcher de Metro muere tras sleep del equipo →
  regla operativa "reiniciar Metro antes de cada gate visual".
- Pendiente para el dev: commitear en orden, grabar el GIF del README,
  y Fase 3 (auditorías §3.1–3.3) como siguiente sesión — el QA de device
  físico (§3.3) es del dev.

---

# Fase 1 — Exploración del sitio (CERRADA 2026-08-19)

Plan aprobado (plan mode). Ejecución con /loop de calidad: verificar los
artefactos de cada subagente contra el estándar del playbook antes de lanzar
el siguiente. Exploradores SIEMPRE de a uno (navegador MCP compartido).

- [x] Misión sitemap (site-explorer): 01-sitemap.md — 5 slugs enumerados
      (amazonia, mexico, africa, borneo, patagonia); detalle de zonas y
      /nosotros devuelven 403 real del origin (4 vías agotadas, evidencia PNG)
- [x] Pantalla home (site-explorer): 02-content-home.md + 4 raw + 21 PNGs.
      Spot-check hero-390 vs content ✓. Hallazgos clave: video de hero es
      fondo autoplay-muted-loop; bloque que-es decorativo (play falso);
      zonas a 390 = carrusel nativo SIN snap/dots; hero-bg.jpg y
      logo_negro.svg no se usan en home. 2 reanudaciones por límite de API.
- [x] Pantalla zonas (site-explorer): 02-content-zonas.md + 5 raw (incl.
      hero-pattern.svg inline no entregado en public/) + 14 PNGs. Spot-check
      avances-390 ✓. Hallazgos: duplicado 2× DOM = pila móvil + grid desktop;
      avances a <md = carrusel CSS snap-mandatory con 5 dots sin autoplay;
      zonas-grid a 390 = pila vertical SIN carrusel; nuevos tokens (#F0ECE4,
      #5A7045, w700); header blanco sobre crema = contraste bajo (real del sitio).
- [x] Pantalla suscripcion (site-explorer): 02-content + 4 raw + 14 PNGs.
      Spot-check planes-anual-390 ✓ ($4/$8/$12 + «facturado anualmente»).
      Toggle: matriz de 6 hrefs verificada; un solo CTA «Comenzar mi
      travesía» → /registro?plan=&billing=; sin aria-pressed (nota a11y);
      página mobile-first sin duplicación DOM; primer uso real de dark-green.
- [x] Pantallas bloqueadas (403 origin): zona-[slug] ×5 y nosotros —
      RESUELTO por decisión del dev (ver ítem DECISIÓN DEV abajo): no habrá
      captura manual; se diseñan derivadas en Fase 2 (B6/B8)
- [x] /registro: RESUELTO por decisión del dev — fuera de alcance; queda solo
      el link documentado (01-sitemap, 05-interactions, 00-gaps)
- [x] `public/` en el repo — el dev lo añadió durante la sesión (27 archivos
      + 2 .DS_Store trackeados); consolidator hizo verificación física
      completa con sips/mdls: dimensiones 1:1 con lo observado
- [x] Consolidación (exploration-consolidator): 03-design-tokens (30 sólidos
      con procedencia, 6 conflictos documentados sin resolver) ·
      04-assets-map (25 usados + 2 no usados; patagonia.jpg ≡
      video-thumbnail.jpg byte-idénticos, MD5 verificado por el orquestador) ·
      05-interactions · 00-gaps (reporte §1.5 íntegro) · update a 01-sitemap
- [x] Gate §1.5 con evidencia (00-gaps.md + spot-checks del orquestador):
      ítems 2 (assets) y 5 (slugs) COMPLETOS; ítems 1/3/4 completos para
      las 3 pantallas alcanzables — huecos restantes = solo pantallas 403
- [x] DECISIÓN DEV (2026-08-19): fichas de zona y /nosotros se DISEÑAN
      DERIVADAS de lo real (tarjetas, avances, tokens) — simples, como
      propuesta de lo que debería ir ahí; README las documenta como
      interpretación, no réplica. /registro FUERA de alcance (solo el link
      documentado). → restricción de diseño para Fase 2, bloques zones/about.
- [x] Checkpoint: PLAYBOOK.md → docs/PLAYBOOK.md, ref actualizada en
      CLAUDE.md, .DS_Store eliminados (×3, quedan como D en git) y añadido a
      .gitignore, decisión del dev anexada a 00-gaps.md. Commits propuestos
      al dev (exploration + checkpoint). Fase 1 CERRADA.

## Review Fase 1 (estado al agotar lo alcanzable por navegador)

- 3 site-explorer (misiones sitemap+home, zonas, suscripcion) + 1
  consolidator; explorers SIEMPRE secuenciales (navegador MCP único).
  Loop de calidad: cada artefacto verificado + spot-check visual contra
  content antes de lanzar la siguiente unidad (hero-390, avances-390,
  planes-anual-390 — los 3 ✓ verbatim).
- La misión home sobrevivió 2 cortes de API (límite de sesión) vía
  SendMessage al mismo agente con orden de persistir-primero: cero pérdida.
- Hallazgos que cambian Fase 2: video hero = fondo autoplay/muted/loop (no
  player); bloque que-es decorativo (play falso); 3 patrones de colección
  distintos (zonas home = carrusel libre SIN snap; avances = snap-mandatory
  + dots; zonas-grid a 390 = pila vertical); toggle re-renderiza microcopy
  «facturado anualmente»; sin aria-pressed en toggle (nota a11y para app);
  header transparente sobre crema = contraste bajo real del sitio.
- El sitio es inconsistente en qué zonas linkea (home: amazonia/borneo/
  patagonia · /zonas: amazonia/mexico/africa) — la app deberá decidir.
- Fuera de alcance de los agentes: resolver los 403 (origin sin HTML).

---

# Bloque 0.1: perfeccionar la parte React Native con los docs oficiales

Goal del dev: escanear los docs de React Native (archive.reactnative.dev →
contrastado con reactnative.dev vigente) y perfeccionar la parte RN del equipo.

- [x] Subagente escanea docs RN: verifica las afirmaciones del skill
      `web-to-native` y extrae props/comportamientos exactos por componente
- [x] Integrar correcciones en `web-to-native/SKILL.md`
- [x] Añadir `references/recetas-rn.md` (recetas exactas por sección,
      carga bajo demanda — progressive disclosure del skill-creator)
- [x] Actualizar `docs/ai-workflow.md` y proponer commit

## Review 0.1

- La URL dada (`archive.reactnative.dev`) es el sitio congelado pre-2020
  (llega a ~0.59): se contrastó y la autoridad fue reactnative.dev vigente
  (v0.87). 13/13 afirmaciones del skill verificadas contra docs.
- Correcciones integradas: `boxShadow` cross-platform en new architecture
  (nueva vía preferida de sombras, decidida en bloque theme); `SafeAreaView`
  del core oficialmente deprecado; `translucent`/`backgroundColor` de
  StatusBar retirados (Android edge-to-edge); `width/height` sí aceptan `%`;
  defaults divergentes `flexShrink: 0` / `alignContent: flex-start`; los
  44pt/48dp son de HIG/Material, no de los docs RN.
- Nuevo: `web-to-native/references/recetas-rn.md` — recetas exactas
  (carrusel snap completo, hitSlop, accessibilityState selected, font scale,
  gap, require estático, StatusBar, Platform.select). Los builders lo leen
  al construir la sección que lo necesite, no precargado: contexto barato.
- `foundation-builder` (bloque theme) actualizado a la decisión de sombras.

---

# Bloque: equipo de subagentes + skills para ejecutar el playbook

Objetivo: dejar en `.claude/` un equipo de agentes y skills capaz de ejecutar
las 3 fases del playbook completo, con economía de contexto como principio de
diseño (los artefactos en disco son la interfaz; los agentes devuelven resúmenes).

## Plan

- [x] Revisar estado del repo (`.claude/`, `public/`, `.mcp.json`)
- [x] Investigar fuentes oficiales vía subagentes:
  - [x] `microsoft/playwright/.claude/skills` (prácticas Playwright)
  - [x] `anthropics/skills` → skill-creator (cómo se escribe un skill)
  - [x] Spec de frontmatter de agentes/skills (claude-code-guide)
- [x] Escribir agentes en `.claude/agents/` (7):
  - [x] `site-explorer` (F1, uno por pantalla)
  - [x] `exploration-consolidator` (F1, cierre)
  - [x] `foundation-builder` (F2, bloques 1–4)
  - [x] `feature-builder` (F2, uno por feature)
  - [x] `security-auditor` · `slop-auditor` · `qa-auditor` (F3)
- [x] Escribir skills en `.claude/skills/` (4):
  - [x] `playbook` (orquestación: quién, cuándo, gates)
  - [x] `site-exploration` (procedimiento F1 + scripts §1.3)
  - [x] `web-to-native` (criterio de adaptación F2)
  - [x] `verify-block` (gates antes de cada commit / "listo")
- [x] Sembrar `docs/ai-workflow.md` con la entrada de este bloque
- [x] Verificar coherencia del conjunto y proponer mensaje de commit

## Review

- Quedó: 7 agentes + 4 skills alineados a las fronteras de CLAUDE.md §2
  (F1 por pantalla, F2 por feature, F3 por checklist), con `tools:` mínimos,
  skills precargados (`skills:`) y contratos de salida ≤30 líneas.
- Hallazgo de investigación: los skills del repo de Playwright no son de
  manejo de navegador; la doctrina útil salió de sus agentes oficiales
  planner/generator/healer y se adaptó en `site-exploration` con atribución.
- Fuera de alcance (deliberado): no se ejecutó nada de Fase 1; arrancarla es
  un cambio de fase → plan mode (CLAUDE.md §1).
- Bloqueo detectado para Fase 1: `public/` (assets entregados) no está en el
  repo; sin él no se puede cruzar `04-assets-map.md`.
- Gates tsc/eslint no aplican (solo markdown; aún no hay app).
- Fix post-registro: 5/7 agentes registraron en vivo; `site-explorer` y
  `qa-auditor` (los dos con `mcp__playwright` en `tools:`) no aparecieron.
  Se les quitó el `tools:` explícito para heredar el set default + todos los
  tools MCP (comportamiento documentado). Si no registran en vivo, reiniciar
  la sesión antes de Fase 1.
