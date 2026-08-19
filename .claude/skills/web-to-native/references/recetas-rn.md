# Recetas RN por componente

Verificado contra reactnative.dev vigente (v0.87, new architecture) el
2026-08-18. `archive.reactnative.dev` quedó congelado en ~0.59 (pre-Pressable,
pre-gap, pre-boxShadow) y no gobierna nada de lo de abajo.

## Carrusel horizontal (zonas, avances del territorio)

```tsx
<FlatList
  horizontal
  snapToInterval={ITEM_WIDTH + GAP}   // overridea pagingEnabled
  snapToAlignment="start"             // 'start' | 'center' | 'end'
  decelerationRate="fast"
  disableIntervalMomentum             // para en el ítem siguiente aunque el fling sea fuerte
  showsHorizontalScrollIndicator={false}
  keyExtractor={(z) => z.slug}        // default: item.key → item.id → índice
  getItemLayout={(_, i) => ({ length: ITEM_WIDTH + GAP, offset: (ITEM_WIDTH + GAP) * i, index: i })}
  renderItem={renderZone}             // envuelto en useCallback
  data={zones}
/>
```

- `pagingEnabled` solo sirve para páginas de ancho completo; con
  `snapToInterval` queda anulado. Ítems de ancho variable → `snapToOffsets`.
- `getItemLayout` es la optimización recomendada con ancho fijo y requisito de
  `initialScrollIndex`.
- Perf defaults sanos: `initialNumToRender` 10 · `windowSize` 21;
  `removeClippedSubviews` ya es `true` en Android.
- Todo ScrollView/FlatList necesita alto acotado: baja `flex: 1` por la pila.
- Dots: `onViewableItemsChanged` + `viewabilityConfig` (o
  `onMomentumScrollEnd` + `Math.round(x / intervalo)`) → `useState` del índice.

## Pressable con feedback y target táctil

```tsx
<Pressable
  style={({ pressed }) => [styles.cta, pressed && styles.ctaPressed]}
  hitSlop={8}
  android_ripple={{ color: colors.ripple }}
  accessibilityRole="button"
  accessibilityLabel={label}
  onPress={onPress}
>
```

- Orden de eventos: `onPressIn` (inmediato) → `onPressOut` → `onPress`;
  long press a los 500 ms por default.
- `hitSlop` amplía el área tocable **sin cambiar el layout** — así un icono
  chico alcanza 44 pt (HIG) / 48 dp (Material). Límite: nunca se extiende más
  allá de los bounds del padre. (Los mínimos son de HIG/Material y del
  playbook §2.4; los docs de RN no fijan número.)

## Estado accesible de lo seleccionado (testimonios, toggle, tabs)

- Elemento activo: `accessibilityRole="tab"` (o `"button"`) +
  `accessibilityState={{ selected: true }}`.
- Keys de `accessibilityState`: `disabled` · `selected` · `checked`
  (bool | 'mixed') · `busy` · `expanded`.
- `accessibilityHint` se lee después del label (iOS solo si el usuario tiene
  hints activados; Android siempre). Existen los aliases `role`/`aria-*` y
  `role` tiene precedencia — este repo usa una sola convención:
  `accessibilityRole`/`accessibilityLabel`.
- Opcional al cambiar el toggle:
  `AccessibilityInfo.announceForAccessibility('Precios anuales')`.

## Text

- `numberOfLines` + `ellipsizeMode` (`'tail'` default; en Android multilínea
  solo `'tail'` funciona bien).
- Font scale: `allowFontScaling` default `true` — se respeta. Si un texto
  decorativo rompe el layout escalado, capear con `maxFontSizeMultiplier`
  (≥1 = tope; 0 = sin tope), no apagar el scaling. QA lo prueba subido.
- Solo `Text` anidado hereda estilos de su `Text` padre — única herencia.

## Layout

- `gap` / `rowGap` / `columnGap`: soportados (RN ≥0.71), solo números px —
  preferirlos a margins compensados entre hermanos.
- Defaults que divergen de web: `flexDirection: column` ·
  `alignContent: flex-start` · `flexShrink: 0` · `flex` acepta un solo número.
- `width`/`height`: número dp o `%` string (el padre necesita tamaño
  definido). Sin vh/vw/rem/em. `aspectRatio`: número o string.
- `useWindowDimensions()` es la API preferida (se actualiza sola y trae
  `fontScale`); `Dimensions.get()` es estático por llamada.

## Imágenes estáticas (regla compartida core / expo-image)

- `require('…/assets/images/x.jpg')` con ruta **estáticamente analizable**:
  prohibido concatenar strings dentro del require; si hay que elegir, ternario
  entre dos require completos.
- Lo requerido trae sus dimensiones; solo las remotas necesitan dimensiones
  manuales (aquí no aplican: assets locales de `assets/`).
- Core usa `resizeMode` (`cover` default · `contain` · `stretch` · `repeat` ·
  `center`); en expo-image el prop equivalente es `contentFit`.

## Sombras (decisión del bloque theme, no por componente)

- New architecture (default desde RN 0.76; el SDK de Expo actual la usa):
  **`boxShadow`** es cross-platform y spec-compliant (sintaxis tipo CSS;
  outset Android ≥9, inset ≥10) → vía preferida para el token.
- Vía clásica: `shadowColor/Offset/Opacity/Radius` (iOS; `shadowColor`
  también Android ≥API 28) + `elevation` (Android).
- `filter: dropShadow` no: es Android-only (≥12).

## StatusBar

- `barStyle`: `'light-content'` | `'dark-content'`. Por pantalla se pueden
  montar varios `<StatusBar>`: los props se mergean en orden de montaje.
- Android moderno es edge-to-edge (Android 15): `translucent` y
  `backgroundColor` ya no existen en los docs — no usarlos. En Expo:
  `expo-status-bar` con su prop `style`.

## Forks por plataforma

- Idiomático en estilos: `...Platform.select({ ios: {…}, android: {…} })`
  dentro de `StyleSheet.create`.
- `Platform.OS` (`'ios'`/`'android'`); `Platform.Version` (iOS: string,
  Android: número de API). Archivos `.ios.tsx`/`.android.tsx` solo si un
  componente diverge de verdad — en este proyecto casi seguro basta
  `Platform.select` puntual.

## New architecture, en corto

Default desde RN 0.76 y adoptada por Expo. Para este proyecto habilita
`boxShadow` (y `filter`, que no usamos). Nada más de lo de arriba cambia
entre arquitecturas.
