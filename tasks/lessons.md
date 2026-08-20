# Lecciones (correcciones del dev → regla)

## 2026-08-19 — App ≠ web (feedback de diseño del dev)

- **Qué pedí/hice:** repliqué cromo web en la app — footer con columnas de
  navegación en las 5 pantallas — porque el playbook mapeaba "footer → final
  del scroll" y lo apliqué por defecto en todas.
- **Qué salió mal:** el dev tuvo que recordar que esto es una app: la
  navegación vive en las tabs, el footer web es ruido salvo como cierre de
  la pantalla institucional; y la UI flotante sobre contenido pide un
  tratamiento propio (glass), no un calco.
- **Regla:** al adaptar web→móvil, preguntar primero qué elementos son
  *cromo del web* (footer, breadcrumbs, mega-menús) y proponerlos como
  patrón nativo o eliminarlos — replicarlos "por fidelidad" es un default,
  no una decisión. El criterio §2.4 se aplica elemento a elemento.

## 2026-08-19 — CI=1 apaga el watcher de Metro

- **Qué hice:** levanté el server de gates con `CI=1 npx expo start` y edité
  código después; el bundle servido nunca incorporó los cambios (rebundles
  de "1 module") y culpé al fix.
- **Regla:** `CI=1` solo para servers efímeros de comparación estática;
  para loops de fix-verificar, Metro SIN `CI=1` (watcher vivo) y confirmar
  frescura del bundle (grep de un string nuevo servido por curl) antes de
  declarar que un fix no funciona.

## 2026-08-19 — Cola de commits

- **Qué pedí/hice:** inventé `tasks/commits-pendientes.md` (cola ordenada de
  commits por bloque) para que el loop no se detuviera entre bloques.
- **Qué salió mal:** el dev no quiere que le administre los commits: «yo sé
  cuándo hacerlos». La cola era ceremonia extra sobre su flujo de git.
- **Regla:** proponer el mensaje de commit de cada bloque SOLO en el reporte
  (CLAUDE.md §8) y nada más. No crear archivos ni estructuras que gestionen,
  ordenen o recuerden commits al dev. El git es 100% suyo: mensajes
  propuestos, cero logística.

## 2026-08-20 — El chrome flotante reserva su espacio inicial

- **Qué hice:** en Bloque F floté el logo glass sobre todas las pantallas
  pero `Screen` nunca reservó su franja: en Zonas y Nosotros (sin hero
  full-bleed) el primer título arrancaba debajo de la pastilla. El dev lo
  cazó con capturas.
- **Qué salió mal:** verifiqué el glass sobre contenido *scrolleado* pero
  no el estado de reposo de cada pantalla que monta el chrome; el sitio
  real sí reserva la franja de su header (h-16 + py-14 ≈ 120px).
- **Regla:** todo elemento fijo/flotante (header, back, barras) reserva su
  franja como inset inicial del contenido (pro-rules §"scroll and fixed
  element coexistence"): el glass es para el scroll-under, no para tapar el
  reposo. Al introducir chrome flotante, verificar el reposo de CADA
  pantalla que lo monta, no solo una.

## 2026-08-20 — «Este botón» no se adivina; el nativo no se juzga sin recargar

- **Qué hice:** el feedback decía «este botón no está bien integrado» en las
  fichas de zona; asumí que era el back (único botón del top) y era el CTA
  «Quiero hacer parte» del final. Además mostré un screenshot del simulador
  con bundle viejo: Expo Go no recarga solo tras cambios de JS si la app
  quedó abierta/deep-linkeada, y el dev vio «el problema sigue en mobile».
- **Regla:** ante un referente ambiguo con captura, enumerar TODOS los
  botones de la pantalla nombrada y ubicar el señalado en la captura antes
  de elegir (o preguntar si sigue ambiguo). Y antes de mostrar o juzgar
  estado nativo: `simctl terminate` + reabrir el deep link y confirmar en la
  captura un marcador del cambio nuevo — mismo principio que la frescura de
  bundle web del 2026-08-19.
