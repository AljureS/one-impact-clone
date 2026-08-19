# Lecciones (correcciones del dev → regla)

## 2026-08-19 — Cola de commits

- **Qué pedí/hice:** inventé `tasks/commits-pendientes.md` (cola ordenada de
  commits por bloque) para que el loop no se detuviera entre bloques.
- **Qué salió mal:** el dev no quiere que le administre los commits: «yo sé
  cuándo hacerlos». La cola era ceremonia extra sobre su flujo de git.
- **Regla:** proponer el mensaje de commit de cada bloque SOLO en el reporte
  (CLAUDE.md §8) y nada más. No crear archivos ni estructuras que gestionen,
  ordenen o recuerden commits al dev. El git es 100% suyo: mensajes
  propuestos, cero logística.
