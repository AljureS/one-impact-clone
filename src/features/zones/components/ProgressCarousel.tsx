// Sección «Avances desde el territorio» de /zonas: bg forest py-14 y el
// carrusel móvil observado (raw/zonas-mobile-notes §3): slides de 220, gap 16,
// pista full-bleed con padding 20, snap CENTRADO (snap-x mandatory +
// snap-center) y 5 dots interactivos sincronizados con el scroll. Sin
// autoplay ni loop (verificado). snapToOffsets replica el snap-center de CSS:
// centro del slide al centro del viewport, clampeado a los extremos de la
// pista — a 390 da [0, 171, 407, 643, 814], los valores medidos en el sitio.
import { useCallback, useRef, useState } from 'react';
import {
  FlatList,
  NativeScrollEvent,
  NativeSyntheticEvent,
  Pressable,
  StyleSheet,
  Text,
  useWindowDimensions,
  View,
} from 'react-native';

import { progressSection, progressUpdates } from '@/data/progress';
import type { ProgressUpdate } from '@/data/types';
import { SectionTitle } from '@/shared/components/SectionTitle';
import {
  colors,
  gutter,
  overlays,
  radius,
  spacing,
  typography,
} from '@/shared/theme';

import { ProgressUpdateCard } from './ProgressUpdateCard';

const SLIDE_WIDTH = 220; // w-[220px] observado
const SLIDE_GAP = spacing[16];
// Dots observados: inactivo 8×8 white/30, activo pastilla 24×8 accent
// (w-2/w-6 h-2). El target táctil llega a 44pt con alto fijo + hitSlop.
const DOT_SIZE = 8;
const DOT_ACTIVE_WIDTH = spacing[24];
const DOT_TARGET_HEIGHT = 44;
const DOT_HIT_SLOP = (DOT_TARGET_HEIGHT - DOT_SIZE) / 2;

export function ProgressCarousel() {
  const { width: windowWidth } = useWindowDimensions();
  const listRef = useRef<FlatList<ProgressUpdate>>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  const contentWidth =
    2 * gutter.zonesAndSubscription +
    progressUpdates.length * SLIDE_WIDTH +
    (progressUpdates.length - 1) * SLIDE_GAP;
  const maxOffset = Math.max(0, contentWidth - windowWidth);
  const snapOffsets = progressUpdates.map((_, index) => {
    const centered =
      gutter.zonesAndSubscription +
      index * (SLIDE_WIDTH + SLIDE_GAP) +
      SLIDE_WIDTH / 2 -
      windowWidth / 2;
    return Math.min(Math.max(centered, 0), maxOffset);
  });

  // El sitio sincroniza los dots con un listener de scroll; aquí basta el fin
  // del momentum (el snap garantiza que se asienta sobre un offset conocido).
  const syncActiveIndex = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
    const x = event.nativeEvent.contentOffset.x;
    let nearest = 0;
    snapOffsets.forEach((offset, index) => {
      if (Math.abs(offset - x) < Math.abs(snapOffsets[nearest] - x)) {
        nearest = index;
      }
    });
    setActiveIndex(nearest);
  };

  const goToIndex = (index: number) => {
    setActiveIndex(index); // el dot activa al toque, como en el sitio
    listRef.current?.scrollToOffset({
      offset: snapOffsets[index],
      animated: true,
    });
  };

  const renderItem = useCallback(
    ({ item }: { item: ProgressUpdate }) => (
      <ProgressUpdateCard update={item} width={SLIDE_WIDTH} />
    ),
    [],
  );

  return (
    <View style={styles.section}>
      <View style={styles.header}>
        <SectionTitle
          title={progressSection.title}
          variant="zones"
          color={colors.white}
        />
        <Text style={styles.intro}>{progressSection.intro}</Text>
      </View>
      <FlatList
        ref={listRef}
        horizontal
        data={progressUpdates}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        snapToOffsets={snapOffsets}
        decelerationRate="fast"
        disableIntervalMomentum
        showsHorizontalScrollIndicator={false}
        onMomentumScrollEnd={syncActiveIndex}
        style={styles.track}
        contentContainerStyle={styles.trackContent}
      />
      <View style={styles.dotsRow}>
        {progressSection.dotLabels.map((label, index) => (
          <Pressable
            key={label}
            accessibilityRole="button"
            accessibilityLabel={label}
            accessibilityState={{ selected: index === activeIndex }}
            hitSlop={{ left: DOT_HIT_SLOP, right: DOT_HIT_SLOP }}
            onPress={() => goToIndex(index)}
            style={styles.dotTarget}
          >
            <View
              style={index === activeIndex ? styles.dotActive : styles.dot}
            />
          </Pressable>
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  section: {
    backgroundColor: colors.forest,
    paddingVertical: spacing[56], // py-14 observado
  },
  header: { paddingHorizontal: gutter.zonesAndSubscription },
  intro: {
    ...typography.body.relaxed,
    color: overlays.white70,
    marginTop: spacing[12], // mb-3 del h2
  },
  track: { marginTop: spacing[40] }, // hueco intro→slides medido a 390
  trackContent: {
    paddingHorizontal: gutter.zonesAndSubscription, // -mx-5 + px-5 del sitio
    gap: SLIDE_GAP,
  },
  // mt-6 observado menos el excedente del target de 44 sobre el dot de 8.
  dotsRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: spacing[8],
    marginTop: spacing[12],
  },
  dotTarget: { height: DOT_TARGET_HEIGHT, justifyContent: 'center' },
  dot: {
    width: DOT_SIZE,
    height: DOT_SIZE,
    borderRadius: radius.full,
    backgroundColor: overlays.white30,
  },
  dotActive: {
    width: DOT_ACTIVE_WIDTH,
    height: DOT_SIZE,
    borderRadius: radius.full,
    backgroundColor: colors.accent,
  },
});
