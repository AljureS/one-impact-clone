// Collage-hero de /suscripcion (02-content-suscripcion §1, raw/suscripcion-
// styles › collageHero): 5 imágenes full-bleed sin texto ni overlays. Fila 1:
// grid de 3 celdas cuadradas sin gap; fila 2: flex 3:2 con altura
// clamp(200px, 55vw, 440px) — único valor responsive real de la página.
// Los 5 alt del sitio son vacíos → bloque decorativo oculto al lector.
import { Image } from 'expo-image';
import { StyleSheet, useWindowDimensions, View } from 'react-native';

import { collageRow1, collageRow2 } from '@/data/plans';

// Intrínsecos del clamp inline del sitio (raw/suscripcion-mobile-notes §1), no tokens.
const ROW2_MIN = 200;
const ROW2_MAX = 440;
const ROW2_VW = 0.55;

const [heroMain, heroSecondary] = collageRow2;

export function HeroCollage() {
  const { width } = useWindowDimensions();
  const row2Height = Math.min(Math.max(ROW2_MIN, width * ROW2_VW), ROW2_MAX);
  return (
    <View
      accessibilityElementsHidden
      importantForAccessibility="no-hide-descendants"
      style={styles.root}
    >
      <View style={styles.row}>
        {/* 3 imágenes estáticas decorativas, sin scroll propio: un FlatList
            aquí sería una lista virtualizada para nada (colección no scrolleable). */}
        {collageRow1.map((source) => (
          <Image
            key={String(source)}
            source={source}
            style={styles.square}
            contentFit="cover"
          />
        ))}
      </View>
      <View style={[styles.row, { height: row2Height }]}>
        <Image
          source={heroMain}
          style={styles.main}
          contentFit="cover"
          contentPosition="top center"
        />
        <Image
          source={heroSecondary}
          style={styles.secondary}
          contentFit="cover"
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  root: { width: '100%', overflow: 'hidden' },
  row: { flexDirection: 'row' },
  square: { flex: 1, aspectRatio: 1 },
  main: { flex: 3 }, // flex-[3] + object-top observados
  secondary: { flex: 2 }, // flex-[2]
});
