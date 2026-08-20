// Stat «35K» (02-content-home §8, vía @/data/stats) en versión sobria para la
// pantalla derivada: View PLANO sobre forest — sin foto de fondo, sin overlay
// y sin CTA —, texto centrado y padding más compacto que la banda de home.
import { StyleSheet, Text, View } from 'react-native';

import { stat } from '@/data/stats';
import { colors, gutter, overlays, spacing, typography } from '@/shared/theme';

export function StatStrip() {
  return (
    <View style={styles.strip}>
      <Text style={styles.intro}>{stat.intro}</Text>
      <Text style={styles.value}>{stat.value}</Text>
      <Text style={styles.outro}>{stat.outro}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  strip: {
    backgroundColor: colors.forest,
    paddingVertical: spacing[56], // compacto (home usa 96)
    paddingHorizontal: gutter.zonesAndSubscription,
    alignItems: 'center',
  },
  intro: {
    ...typography.stats.intro,
    color: overlays.white80, // text-white/80 observado en la banda de home
    textAlign: 'center',
    marginBottom: spacing[4],
  },
  value: {
    ...typography.stats.number,
    lineHeight: typography.stats.number.fontSize, // leading-none observado
    color: colors.accent,
    marginBottom: spacing[4],
  },
  outro: {
    ...typography.stats.outro,
    color: colors.white,
    textAlign: 'center',
  },
});
