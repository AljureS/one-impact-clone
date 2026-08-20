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
