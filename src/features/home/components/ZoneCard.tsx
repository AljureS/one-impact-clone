// Tarjeta de zona de home (raw/home-styles.json › zoneCard + chipVerMas):
// w-75vw aspect-[3/4] rounded-2xl, imagen cover, gradiente to-t black/80,
// contenido p-5 (h3 24/900 blanco + chip accent «Ver más» con flecha).
// Solo la usa home; la tarjeta de /zonas es distinta (03 §6.4/§6.5).
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
  typography,
} from '@/shared/theme';

// react-native-svg NATIVO descarta el alfa del stopColor y solo honra
// stopOpacity (extractGradient.js: `color & 0x00ffffff | alpha << 24`, alfa
// default 1); en web sí respeta rgba. Cross-platform: color base sólido +
// stopOpacity con el alfa del token. Stops del theme (arriba → abajo),
// el más oscuro (black80) queda en offset 1 = fondo, como en el sitio.
const GRADIENT_STOPS = gradients.zoneCardHome.map((rgba, index, all) => ({
  offset: index / (all.length - 1),
  opacity:
    rgba === overlays.transparent
      ? 0
      : Number(rgba.slice(rgba.lastIndexOf(',') + 1, -1)),
}));

interface ZoneCardProps {
  zone: Zone;
  width: number;
  onPress: () => void;
}

export function ZoneCard({ zone, width, onPress }: ZoneCardProps) {
  return (
    <Pressable
      accessibilityRole="link"
      accessibilityLabel={zone.titleHome ?? zone.slug}
      onPress={onPress}
      style={[styles.card, { width }]}
    >
      {({ pressed }) => (
        <>
          <Image
            source={zone.image}
            style={StyleSheet.absoluteFill}
            contentFit="cover"
          />
          <Svg
            width="100%"
            height="100%"
            style={StyleSheet.absoluteFill}
            pointerEvents="none"
          >
            <Defs>
              <LinearGradient id="zoneCardGradient" x1="0" y1="0" x2="0" y2="1">
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
              fill="url(#zoneCardGradient)"
            />
          </Svg>
          <View style={styles.content}>
            <Text style={styles.title}>{zone.titleHome}</Text>
            {/* Press = hover observado del chip: accent → accent-dark. */}
            <View style={[styles.chip, pressed && styles.chipPressed]}>
              <Text style={styles.chipLabel}>{zoneCardChipLabel}</Text>
              {/* Flecha verbatim del sitio: lucide arrow-right 14px stroke 2.5. */}
              <Svg width={14} height={14} viewBox="0 0 24 24">
                <Path
                  d="M5 12h14M12 5l7 7-7 7"
                  stroke={colors.gray900}
                  strokeWidth={2.5}
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
    aspectRatio: 3 / 4, // aspect-[3/4] observado
    borderRadius: radius['2xl'],
    overflow: 'hidden',
    backgroundColor: colors.gray200, // placeholder bg observado (03 §1.3)
  },
  content: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    padding: spacing[20], // p-5 observado
    alignItems: 'flex-start',
  },
  title: {
    ...typography.title.zoneCardHome,
    color: colors.white,
    marginBottom: spacing[12],
  },
  chip: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing[4], // gap-1 del chip home (⚠ 03 §6.3, no unificar con zonas)
    backgroundColor: colors.accent,
    borderRadius: radius.full,
    paddingHorizontal: spacing[16],
    paddingVertical: spacing[8],
  },
  chipPressed: { backgroundColor: colors.accentDark },
  chipLabel: { ...typography.button.chipHome, color: colors.gray900 },
});
