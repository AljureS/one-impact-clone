# Auditoría de seguridad — §3.1 (Fase 3)

Fecha: 2026-08-19 (re-verificación de ítems 1 y 7 tras fixes del orquestador) · Alcance: working tree (incluye cambios sin commitear del bloque F) · Auditor: subagente security-auditor.
Regla: cada veredicto con comando y salida real. No se tocó código ni git de escritura.

## Resumen

| # | Ítem §3.1 | Veredicto |
|---|-----------|-----------|
| 1 | `npm audit` sin high/critical (o justificadas en README) | ✅ PASA (justificadas en README:100-104) |
| 2 | `npx expo-doctor` y `npx expo install --check` limpios | ✅ PASA |
| 3 | Cero secretos (`.env`, keys, tokens) + grep de paranoia | ✅ PASA |
| 4 | `app.json` sin permisos innecesarios | ✅ PASA |
| 5 | Dependencias solo las usadas; lockfile commiteado | ✅ PASA |
| 6 | Sin `eval`, sin carga remota, sin `http://` | ✅ PASA |
| 7 | `.gitignore` correcto y sin `__MACOSX`/`.DS_Store` en el repo | ❌ FALLA (`.DS_Store` raíz sigue trackeado y presente) |

---

## 1. npm audit — ✅ PASA (high justificadas en README)

`npm audit` → exit 1:

```
16 vulnerabilities (8 moderate, 8 high)
```

`npm audit --omit=dev` → mismo resultado (16: 8 moderate, 8 high), porque `expo` es dependencia de producción y toda la cadena vulnerable cuelga de ella.

Detalle (todas transitivas, ninguna es dependencia directa):

- **high ×8 — `image-size@1.2.1`** vía `expo → @expo/cli → @expo/metro → metro@0.84.4 → image-size`.
  Advisories: GHSA-w3rx-r6r6-pgpr (ICNS infinite loop DoS) y GHSA-5p2g-fcmc-qvqq (JXL/HEIF infinite loop DoS).
- **moderate ×8 — `uuid@7.0.3`** vía `expo-splash-screen → @expo/config-plugins → xcode@3.0.1 → uuid`.
  Advisory: GHSA-w5hq-g745-h8pq (buffer bounds check en v3/v5/v6).

Ruta exacta confirmada con `npm ls image-size uuid`.

Dimensionamiento: ambos paquetes viven en el **tooling de build/prebuild** (bundler Metro y generación de proyecto nativo). No se empaquetan en la app que corre en el dispositivo; el vector de ataque exige colar una imagen manipulada en el propio proyecto para colgar el bundler (DoS local de desarrollo). No hay versión parcheada de `metro`/`xcode` dentro del rango de SDK 57; `npm audit fix --force` instalaría `expo@53.0.27` (downgrade breaking).

**Justificación en README verificada** (`grep -n -A 8 -i "vulnerabilidad" README.md`) — README.md:100-104, bullet «Vulnerabilidades conocidas» en «Límites conocidos»:

```
- Vulnerabilidades conocidas (`npm audit`, auditoría §3.1): 8 high
  (`image-size`, vía expo→metro) y 8 moderate (`uuid`, vía
  config-plugins→xcode). Todas **transitivas del tooling de build** — no se
  embarcan en el bundle de la app — y sin fix upstream no-breaking
  (`npm audit fix --force` degradaría a expo@53). Aceptadas y monitoreadas.
```

Cubre lo que exige §3.1: qué son (paquetes, cadenas y conteos correctos), por qué no embarcan (tooling de build, fuera del bundle) y por qué no hay fix (sin parche upstream no-breaking; el force sería un downgrade). Coincide con la evidencia de `npm ls`. → Ítem en verde; hallazgo 1 **cerrado**.

## 2. expo-doctor / expo install --check — ✅ PASA

```
$ npx expo-doctor
Running 21 checks on your project...
21/21 checks passed. No issues detected!   (exit 0)

$ CI=1 npx expo install --check
Dependencies are up to date   (exit 0)
```

## 3. Cero secretos — ✅ PASA

- `find . -name ".env*" -not -path "./node_modules/*"` → **0 archivos** (ni siquiera `.env.local`; `.gitignore` además cubre `.env*.local`).
- `git grep -iE "api[_-]?key|secret|token|password"` → hits solo en:
  - `docs/`, `CLAUDE.md`, `.claude/agents/*`, `.claude/skills/*`, `README.md`: la palabra "token(s)" refiriéndose a **design tokens** y al propio texto del checklist §3.1. Falsos positivos evidentes (contexto: "design tokens", "tokens de theme").
  - `package-lock.json` (4 hits, líneas 56, 8272, 8274, 8830): el paquete npm **`js-tokens`** (tokenizador de JavaScript, dependencia transitiva estándar de React). Falso positivo: es un nombre de paquete, no un credential.
- Cero hits en `src/`, `app/`, `app.json` o assets. No hay keys, tokens ni passwords en el repo.

## 4. app.json — ✅ PASA

Archivo completo revisado (43 líneas):

- **Sin key `permissions`** en `android`, **sin `infoPlist`** en `ios`, cero strings `NS*UsageDescription`. No se declara cámara, ubicación, micrófono ni ningún otro permiso.
- Plugins: `expo-router` (navegación, usada), `expo-splash-screen` (config de splash: color + imagen local, importada en `app/_layout.tsx:10`), `expo-video` (video del home, importado en 2 componentes). Ninguno inyecta permisos con esta configuración (`expo-video` sin `supportsBackgroundPlayback`/PiP).
- Android: solo `adaptiveIcon` con assets locales y `predictiveBackGestureEnabled: false`. iOS: solo `icon`. Web: `output: "static"`. Nada más.

## 5. Dependencias — ✅ PASA (todas justificadas)

Cruce de cada dependencia de `package.json` contra imports reales en `src/` + `app/` (`grep -rE "from '<pkg>'"`):

| Dependencia | Evidencia de uso |
|---|---|
| `@expo-google-fonts/geist` | 1 import — `app/_layout.tsx:7-8` (`useFonts`) |
| `@expo/vector-icons` | 3 imports |
| `expo-blur` | 3 imports (componentes del bloque F, dependencia aprobada) |
| `expo-image` | 11 imports |
| `expo-status-bar` | 3 imports |
| `expo-video` | 2 imports + plugin `app.json:36` |
| `expo-splash-screen` | import `app/_layout.tsx:10` + plugin `app.json:29` |
| `react-native-svg` | 9 imports + transformer en `metro.config.js` |
| `react-native-safe-area-context` | 4 imports + peer requerido de expo-router |
| `expo`, `react`, `react-native`, `expo-router` | núcleo (`main: "expo-router/entry"`) |

Sin import directo pero **requeridas** (no son "por si acaso"):

- `expo-constants`, `expo-linking`, `react-dom`, `react-native-web`, `react-native-screens`: **peerDependencies de `expo-router`** (verificado en `node_modules/expo-router/package.json`); web además soporta el script `"web": "expo start --web"`.
- `expo-font`: requerida en runtime por `@expo-google-fonts/geist/useFonts.js` (verificado con grep dentro del paquete; geist no la declara como dep propia).
- `expo-system-ui`: requerida en Android por `userInterfaceStyle: "automatic"` (`app.json:9`); expo-doctor pasa 21/21 con ella instalada.

devDependencies: eslint + config expo/prettier, prettier, typescript, `@types/react`, `react-native-svg-transformer` (usada en `metro.config.js:5-6`). Todas de tooling activo.

**Lockfile:** `git ls-files package-lock.json` → trackeado. Está modificado en el working tree junto con `package.json` (expo-blur del bloque F): deben commitearse juntos en el commit del bloque F.

## 6. Sin eval / carga remota / http:// — ✅ PASA

- `grep -rnE "\beval\s*\(|new Function|http://" src app --include="*.ts*"` → **0 hits** (exit 1).
- `grep -rnE "fetch\(|XMLHttpRequest|require\(.https" src app` → **0 hits**. No hay ninguna carga de código ni de datos remotos: todo asset es local.
- `git grep "http://"` fuera de docs/lockfile → hits solo en `assets/`: `xmlns="http://www.w3.org/2000/svg"` en SVGs (identificador de namespace XML, nunca se resuelve como URL) y matches binarios en JPG/PNG (namespaces XMP/EXIF embebidos en la metadata de la imagen). Falsos positivos; ningún `http://` en código.

## 7. .gitignore y archivos basura — ❌ FALLA (re-verificado 2026-08-19)

- `.gitignore` correcto en reglas: `node_modules/`, `.expo/`, `dist/`, `web-build/`, `/ios`, `/android`, `*.jks/*.p8/*.p12/*.key/*.mobileprovision`, `.env*.local` y **sí incluye `.DS_Store`** (sección `# macOS`).
- `__MACOSX`: `find . -iname "*__MACOSX*"` → 0 resultados en todo el árbol.
- **Re-verificación tras el fix reportado por el orquestador ("todos los .DS_Store borrados, raíz en estado ` D`"): la condición NO se cumple.** Evidencia:

```
$ find . -name .DS_Store -not -path "*/node_modules/*"     → 6 archivos:
./.DS_Store   ./.expo/.DS_Store   ./app/.DS_Store   ./.claude/.DS_Store
./.git/.DS_Store   ./src/.DS_Store

$ git status --short | grep DS_Store                        →  M .DS_Store   (Modified, no ` D`)
$ git ls-files | grep -iE "DS_Store|__MACOSX"               → .DS_Store      (sigue trackeado)
$ ls -la .DS_Store → -rw-r--r--@ … 10244  19 ago. 23:07     (recreado hoy)
```

- Lectura: el borrado surtió efecto parcial (de 15 quedaron 6; los de `assets/`, `src/features/`, etc. ya no están), pero **Finder regenera `.DS_Store` al navegar carpetas** — el raíz reapareció (timestamp 23:07 de hoy) y git volvió a verlo como ` M` porque sigue en el índice. Borrar el archivo no lo des-trackea.
- **Cierre real del ítem:** `git rm --cached .DS_Store` en el commit del dev (des-trackear del índice). Con la regla ya presente en `.gitignore`, las regeneraciones de Finder pasan a ser invisibles para git y el ítem queda en verde de forma estable. No se marca PASA-condicionado porque el estado ` D` prometido no existe: hoy el working tree lo tiene como ` M` trackeado. → Hallazgo 2 **abierto**.

---

## Hallazgos

1. ~~[alta / bloqueante §3.1] 8 high de `npm audit` sin justificar en README.~~ **CERRADO** (2026-08-19): justificación verificada en README.md:100-104 — cubre qué son, por qué son build-time/no embarcadas y por qué no hay fix. Coincide con `npm ls image-size uuid`.
2. **[alta / bloqueante §3.1] ABIERTO** — `.DS_Store` raíz sigue **trackeado** (`git ls-files`) y **presente** (regenerado por Finder, ` M` en status; el estado ` D` reportado no se observa). **Fix:** el dev ejecuta `git rm --cached .DS_Store` y lo incluye en el commit propuesto; el `.gitignore` ya cubre las regeneraciones futuras.
3. **[baja] ABIERTO (reducido)** — quedan 5 `.DS_Store` sin trackear (`.expo/`, `app/`, `.claude/`, `.git/`, `src/`; antes 14). Git los ignora; Finder los recrea al navegar. **Fix opcional:** re-ejecutar `find . -name .DS_Store -not -path "./node_modules/*" -delete` justo antes del commit (cosmético; no viola §3.1 porque no están trackeados).
4. **[nota]** `npm audit fix --force` propone `expo@53.0.27` (downgrade breaking de SDK): no aplicar nunca; la justificación del README (ya en sitio) es la vía correcta.
5. **[nota]** El lockfile y `package.json` (expo-blur, bloque F) están modificados sin commitear: van juntos en el commit del bloque F para mantener el ítem 5 en verde.

Pre-conocidos, contrastados: (1) `.DS_Store` trackeado **confirmado y aún vigente** — `.gitignore` ya contiene la regla, pero sin `git rm --cached` el archivo sigue en el índice. (2) El aviso de npm al instalar expo-blur corresponde a estas 16 vulns transitivas, no a expo-blur en sí (`expo-blur@57.0.2` no aparece en ninguna cadena vulnerable).
