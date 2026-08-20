// Sección stats-cta (02-content-home §8). La cifra es ESTÁTICA — verificado
// en Fase 1 (05 §5: «35K» literal del DOM, sin animación de conteo). Fondo
// stats-bg.jpg full-bleed + overlay PLANO bg-forest/80 (03 §2: overlay plano,
// no gradiente → View, no SVG). Apilado centrado con py-24 observado.
import { Image } from 'expo-image';
import { router } from 'expo-router';
import { StyleSheet, Text, View } from 'react-native';

import {
  stat,
  statsBackground,
  statsBackgroundAlt,
  statsCta,
} from '@/data/stats';
import { Button } from '@/shared/components/Button';
import { colors, gutter, overlays, spacing, typography } from '@/shared/theme';

export function StatsBanner() {
  return (
    <View style={styles.section}>
      <Image
        source={statsBackground}
        alt={statsBackgroundAlt}
        style={StyleSheet.absoluteFill}
        contentFit="cover"
      />
      <View style={styles.overlay} />
      <Text style={styles.intro}>{stat.intro}</Text>
      <Text style={styles.value}>{stat.value}</Text>
      <Text style={styles.outro}>{stat.outro}</Text>
      <Button
        label={statsCta.label}
        onPress={() => router.push(statsCta.href)}
        style={styles.cta}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  section: {
    paddingVertical: spacing[96], // py-24 observado (03 §4)
    paddingHorizontal: gutter.home,
    alignItems: 'center',
    overflow: 'hidden',
  },
  overlay: { ...StyleSheet.absoluteFill, backgroundColor: overlays.forest80 },
  intro: {
    ...typography.stats.intro,
    color: overlays.white80, // text-white/80 observado
    textAlign: 'center',
    marginBottom: spacing[4], // mb-1
  },
  value: {
    ...typography.stats.number,
    lineHeight: typography.stats.number.fontSize, // leading-none observado
    color: colors.accent,
    marginBottom: spacing[4], // mb-1
  },
  outro: {
    ...typography.stats.outro,
    color: colors.white,
    textAlign: 'center',
    marginBottom: spacing[40], // mb-10 observado
  },
  // px-8 del CTA de stats (03 §4); alignSelf pisa el flex-start base del
  // Button para centrarlo como en el sitio.
  cta: { alignSelf: 'center', paddingHorizontal: spacing[32] },
});
