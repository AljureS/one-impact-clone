// Tarjeta de avance («Avances desde el territorio»; raw/zonas-styles.json ›
// advanceCard): imagen 192 de alto rounded-2xl, h3 14/700 accent, fecha 12
// white/50, párrafo 12 white/80. Sin interacción en el sitio (no es link).
// `width` la fija el carrusel de /zonas (slide 220); sin width se estira
// (lista vertical de la ficha de zona). Nombre alineado al modelo
// ProgressUpdate; «advance*» queda solo en tokens/assets que espejan al sitio.
import { Image } from 'expo-image';
import { StyleSheet, Text, View } from 'react-native';

import type { ProgressUpdate } from '@/data/types';
import { colors, overlays, radius, spacing, typography } from '@/shared/theme';

const IMAGE_HEIGHT = 192; // h-48 observado

interface ProgressUpdateCardProps {
  update: ProgressUpdate;
  width?: number;
}

export function ProgressUpdateCard({ update, width }: ProgressUpdateCardProps) {
  return (
    <View style={width === undefined ? undefined : { width }}>
      <View style={styles.imageWrap}>
        <Image
          source={update.image}
          style={StyleSheet.absoluteFill}
          contentFit="cover"
        />
      </View>
      <Text style={styles.title}>{update.title}</Text>
      <Text style={styles.date}>{update.date}</Text>
      <Text style={styles.description}>{update.description}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  imageWrap: {
    height: IMAGE_HEIGHT,
    borderRadius: radius['2xl'],
    overflow: 'hidden',
    marginBottom: spacing[12], // mb-3 observado
  },
  title: {
    ...typography.title.advanceCard,
    color: colors.accent,
    marginBottom: spacing[4], // mb-1
  },
  date: {
    ...typography.caption.advanceDate,
    color: overlays.white50,
    marginBottom: spacing[8], // mb-2
  },
  description: { ...typography.body.advanceCard, color: overlays.white80 },
});
