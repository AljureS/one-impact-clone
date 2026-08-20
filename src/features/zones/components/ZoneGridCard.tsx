// Tarjeta de zona de /zonas (raw/zonas-styles.json › zoneCard +
// chipVerMasZonas; a 390: full-width × 208, raw/zonas-mobile-notes §2):
// imagen cover + gradiente to-t black/80 via black/30 + fila items-end p-5
// con [h2 30/700 + p 14 white/90] | chip «Ver más» 14/600 negro. Diverge a
// propósito de la tarjeta de home (03 §6.3–6.5, no unificar).
import { Image } from 'expo-image';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import Svg, { Defs, LinearGradient, Path, Rect, Stop } from 'react-native-svg';

import type { Zone } from '@/data/types';
import { zoneCardChipLabel } from '@/data/zones';
import {
  colors,
  gradients,
  overlays,
  radius,
  spacing,
  svgGradientStops,
  typography,
} from '@/shared/theme';

const GRADIENT_STOPS = svgGradientStops(gradients.zoneCardZones);

const CARD_HEIGHT = 208; // h-52 observado a 390

interface ZoneGridCardProps {
  zone: Zone;
  onPress: () => void;
}

export function ZoneGridCard({ zone, onPress }: ZoneGridCardProps) {
  return (
    <Pressable
      accessibilityRole="link"
      accessibilityLabel={zone.titleZones ?? zone.slug}
      onPress={onPress}
      style={styles.card}
    >
      {({ pressed }) => (
        <>
          {/* Hover observado: solo la imagen escala 1.05 (05-interactions);
              equivalente táctil = mismo zoom mientras está presionada. */}
          <Image
            source={zone.image}
            style={[StyleSheet.absoluteFill, pressed && styles.imagePressed]}
            contentFit="cover"
          />
          <Svg
            width="100%"
            height="100%"
            style={StyleSheet.absoluteFill}
            pointerEvents="none"
          >
            <Defs>
              <LinearGradient id="zoneGridGradient" x1="0" y1="0" x2="0" y2="1">
                {GRADIENT_STOPS.map((stop) => (
                  <Stop
                    key={stop.offset}
                    offset={stop.offset}
                    stopColor={colors.black}
                    stopOpacity={stop.opacity}
                  />
                ))}
              </LinearGradient>
            </Defs>
            <Rect
              x="0"
              y="0"
              width="100%"
              height="100%"
              fill="url(#zoneGridGradient)"
            />
          </Svg>
          <View style={styles.content}>
            <View style={styles.textColumn}>
              <Text style={styles.title}>{zone.titleZones}</Text>
              <Text style={styles.description}>{zone.description}</Text>
            </View>
            {/* Sin cambio en pressed: el chip de /zonas no tiene hover propio
                (05-interactions; desvío real vs home). Flecha inline 16×16 del
                sitio; stroke-width no capturado → 2, medido del screenshot. */}
            <View style={styles.chip}>
              <Text style={styles.chipLabel}>{zoneCardChipLabel}</Text>
              <Svg width={16} height={16} viewBox="0 0 16 16">
                <Path
                  d="M3 8h10M9 4l4 4-4 4"
                  stroke={colors.black}
                  strokeWidth={2}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  fill="none"
                />
              </Svg>
            </View>
          </View>
        </>
      )}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
    height: CARD_HEIGHT,
    borderRadius: radius['3xl'],
    overflow: 'hidden',
    backgroundColor: colors.gray200, // placeholder bg observado (03 §1.3)
  },
  imagePressed: { transform: [{ scale: 1.05 }] },
  content: {
    ...StyleSheet.absoluteFill,
    flexDirection: 'row',
    alignItems: 'flex-end',
    justifyContent: 'space-between',
    gap: spacing[16],
    padding: spacing[20],
  },
  textColumn: { flex: 1 },
  title: {
    ...typography.title.sectionZones,
    color: colors.white,
    marginBottom: spacing[4],
  },
  description: { ...typography.body.zoneCard, color: overlays.white90 },
  chip: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing[8],
    backgroundColor: colors.accent,
    borderRadius: radius.full,
    paddingHorizontal: spacing[16],
    paddingVertical: spacing[8],
  },
  chipLabel: { ...typography.button.chipZones, color: colors.black },
});
