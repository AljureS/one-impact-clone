// /zonas (02-content-zonas.md, raw/zonas-mobile-notes): hero crema con patrón
// topográfico → PILA VERTICAL de 3 tarjetas (a 390 el sitio apila, sin
// carrusel; contraste deliberado con home) → carrusel de avances con snap y
// dots → footer. Gutter 20 y títulos peso 700, propios de esta pantalla
// (03 §6.1/§6.2 — no unificar con home).
import { useRouter } from 'expo-router';
import { StyleSheet, Text, View } from 'react-native';

import { zonesGridZones, zonesHero } from '@/data/zones';
import { Footer } from '@/shared/components/Footer';
import { Screen } from '@/shared/components/Screen';
import { colors, gutter, spacing, typography } from '@/shared/theme';

import { ProgressCarousel } from './components/ProgressCarousel';
import { TopoPattern } from './components/TopoPattern';
import { ZoneGridCard } from './components/ZoneGridCard';

export function ZonesScreen() {
  const router = useRouter();
  return (
    <Screen statusBarStyle="dark" backgroundColor={colors.sandBg}>
      <View style={styles.hero}>
        <TopoPattern />
        <Text accessibilityRole="header" style={styles.heroTitle}>
          {zonesHero.title}
        </Text>
        <Text style={styles.heroParagraph}>{zonesHero.paragraph}</Text>
      </View>
      {/* Pila vertical fiel al colapso observado. Son 3 ítems estáticos: un
          FlatList vertical anidado en el ScrollView de Screen está prohibido
          por RN (VirtualizedList en ScrollView del mismo eje). */}
      <View style={styles.grid}>
        {zonesGridZones.map((zone) => (
          <ZoneGridCard
            key={zone.slug}
            zone={zone}
            onPress={() => router.push(`/zonas/${zone.slug}`)}
          />
        ))}
      </View>
      <ProgressCarousel />
      <Footer paddingHorizontal={gutter.zonesAndSubscription} />
    </Screen>
  );
}

const styles = StyleSheet.create({
  hero: {
    paddingVertical: spacing[56], // py-14 observado
    paddingHorizontal: gutter.zonesAndSubscription,
    overflow: 'hidden', // el patrón se recorta como el slice del sitio
  },
  heroTitle: {
    ...typography.display.zones,
    color: colors.gray900,
    textAlign: 'center',
  },
  heroParagraph: {
    ...typography.body.relaxed,
    color: colors.gray600,
    textAlign: 'center',
    marginTop: spacing[16], // mb-4 del h1
  },
  grid: {
    paddingHorizontal: gutter.zonesAndSubscription,
    paddingBottom: spacing[64], // pb-16 observado (sin padding top: lo da el hero)
    gap: spacing[16], // gap-4
  },
});
