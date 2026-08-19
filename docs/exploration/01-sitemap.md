# 01 — Sitemap del sitio One Impact

Base: `https://d3foiidvo1xvi7.cloudfront.net`
Fecha de exploración: 2026-08-18 (misión `sitemap`, navegador real 1440×900).
Verificación: cada ruta se navegó directamente; se anota título y estado HTTP observado.

## Árbol de rutas

```
/                          200  "One Impact — Juntos cuidamos lo que nos conecta"
├── /zonas                 200  "Zonas One Impact"
│   ├── /zonas/amazonia    403  AccessDenied (bloqueada)
│   ├── /zonas/mexico      403  AccessDenied (bloqueada)
│   ├── /zonas/africa      403  AccessDenied (bloqueada)
│   ├── /zonas/borneo      403  AccessDenied (bloqueada — solo linkeada desde home)
│   └── /zonas/patagonia   403  AccessDenied (bloqueada — solo linkeada desde home)
├── /suscripcion           200  "Suscripción — One Impact"
├── /registro              200  "Registro — One Impact"   ← no estaba en el playbook
├── /nosotros              403  AccessDenied (bloqueada)
└── /proyectos             403  AccessDenied (solo en footer)
```

## Rutas vivas (responden 200 con contenido)

| Ruta | Título `<title>` | Fuente del link |
|---|---|---|
| `/` | One Impact — Juntos cuidamos lo que nos conecta | logo header/footer, "Inicio" (header, menú móvil, footer) |
| `/zonas` | Zonas One Impact | "Zonas One Impact" (header/menú móvil), "Zonas de Impacto" (footer), CTAs de home: «Explorar Zonas de Impacto», «Explora todas las zonas», «Conecta con la comunidad» |
| `/suscripcion` | Suscripción — One Impact | "Cómo aportar" (header/menú móvil), "Suscripción" (footer), CTAs: «Únete a One Impact» (header), «Quiero hacer parte», «Quiero unirme» (home) |
| `/registro?plan=estandar&billing=monthly` | Registro — One Impact | CTA «Comenzar mi travesía» en `/suscripcion` (único link a `/registro` en todo el sitio). Página de formulario: h1 «Casi listos. Por último confirmemos tus datos». Los query params sugieren variantes `plan`/`billing` (verificar en misión pantalla de suscripción si cambian con el toggle) |

## Slugs de `/zonas/[slug]` — enumerados desde hrefs reales

Fuente canónica: tarjetas de `/zonas` (cada href aparece 2× en el DOM, aparente duplicado grid/carrusel):

| Slug | href | Título de tarjeta | Fuente |
|---|---|---|---|
| `amazonia` | `/zonas/amazonia` | Amazonía | tarjeta en `/zonas` **y** tarjeta "Amazonia" en home |
| `mexico` | `/zonas/mexico` | México | tarjeta en `/zonas` |
| `africa` | `/zonas/africa` | África | tarjeta en `/zonas` |
| `borneo` | `/zonas/borneo` | Borneo | **solo** tarjeta en home (sección "Nuestras zonas one impact") |
| `patagonia` | `/zonas/patagonia` | Patagonia | **solo** tarjeta en home (sección "Nuestras zonas one impact") |

**Inconsistencia del sitio:** home linkea `amazonia`/`borneo`/`patagonia`; `/zonas` linkea `amazonia`/`mexico`/`africa`. Solo `amazonia` aparece en ambas. Los 5 slugs devuelven 403; ninguno pudo verificarse con contenido.

## Rutas bloqueadas — evidencia del bloqueo

Todas responden **HTTP 403** con cuerpo XML de S3/CloudFront:

```
<Error><Code>AccessDenied</Code><Message>Access Denied</Message></Error>
```

Se agotaron las vías automatizadas (todas → 403):

1. Navegación directa a la URL (navegador real).
2. Prefetch de Next.js (errores de consola en cada página viva).
3. Navegación client-side (click real en tarjeta de `/zonas` y en "Quiénes somos" del header → hard navigation al 403).
4. Variantes estáticas `/nosotros.html` y `/nosotros/index.html`.

Evidencia: `docs/exploration/06-screenshots/zona-amazonia-blocked-403-1440.png` y `docs/exploration/06-screenshots/nosotros-blocked-403-1440.png`.

Conclusión: los HTML de esas rutas no existen (o no son legibles) en el origin S3. **`/nosotros` y los 5 `/zonas/[slug]` requieren captura manual por el dev** (PLAYBOOK §1.2 lo anticipaba). `/proyectos` parece link muerto del footer, no una pantalla del alcance.

## Rutas auxiliares verificadas (no existen)

| Ruta | Estado |
|---|---|
| `/robots.txt` | 403 AccessDenied |
| `/sitemap.xml` | 403 AccessDenied |

## Links externos y de contacto (footer)

| Label | href | Nota |
|---|---|---|
| Instagram (ícono) | `https://instagram.com` | URL genérica, no perfil real |
| X (Twitter) (ícono) | `https://x.com` | URL genérica, no perfil real |
| hola@oneimpact.org | `mailto:hola@oneimpact.org` | bajo encabezado "CONTACTO" |

## Inventario de navegación (labels verbatim)

- **Header (desktop):** logo → `/` · «Inicio» → `/` · «Zonas One Impact» → `/zonas` · «Cómo aportar» → `/suscripcion` · «Quiénes somos» → `/nosotros` · CTA «Únete a One Impact» → `/suscripcion`
- **Menú móvil (dialog "Abrir menú"):** mismos 4 links + CTA «Únete a One Impact»; botón «Cerrar menú»
- **Footer, columna MENÚ:** «Inicio» → `/` · «Zonas de Impacto» → `/zonas` · «Proyectos» → `/proyectos` (403) · «Sobre Nosotros» → `/nosotros` (403) · «Suscripción» → `/suscripcion`
- **Footer, columna CONTACTO:** «hola@oneimpact.org» → mailto
- Header y footer son idénticos en las 4 páginas vivas (`/`, `/zonas`, `/suscripcion`, `/registro`).

## Implicaciones para las siguientes misiones

- Misiones `pantalla` posibles por navegador: `home`, `zonas`, `suscripcion` (+ `registro` si el dev lo incluye en alcance).
- Misiones `zona-{slug}` y `nosotros`: **bloqueadas**; necesitan captura manual del dev o los artefactos quedan como huecos documentados.
- La misión `pantalla` de `/suscripcion` debe verificar si el href del CTA «Comenzar mi travesía» cambia con el toggle Mensual/Anual y por plan (`?plan=…&billing=…`).

## Actualización (consolidación, 2026-08-19)

Dos datos de los crudos de pantalla precisan lo anotado arriba:

- El href duplicado 2× por tarjeta en `/zonas` **no** es "grid/carrusel": son
  dos listas DOM separadas — pila móvil (`flex flex-col md:hidden`) y grid
  desktop (`hidden md:grid`) — verificado en `raw/zonas-styles.json`.
- La verificación pendiente del CTA «Comenzar mi travesía» quedó resuelta:
  el href cambia con plan y billing — matriz completa de 6 combinaciones
  (`plan=basico|estandar|premium` × `billing=monthly|annual`) en
  `05-interactions.md` §6.
