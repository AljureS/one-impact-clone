// Sección zonas de home (02-content-home §5). Divergencia deliberada del
// plan: el sitio a 390 scrollea libre SIN snap ni dots (05-interactions §3);
// la app usa el patrón nativo del playbook §2.4 — FlatList con snap + dots
// (3 ítems > 2). Receta: web-to-native/references/recetas-rn.md § Carrusel.
// Medidas observadas: tarjeta w-75vw, gap-4, bleed -mx-4 px-4, CTA centrada.
import { router } from 'expo-router';
import { useCallback, useState } from 'react';
import {
  FlatList,
  Pressable,
  StyleSheet,
  Text,
  useWindowDimensions,
  View,
  ViewToken,
} from 'react-native';

import type { Zone } from '@/data/types';
import { homeZones, homeZonesSection } from '@/data/zones';
import { SectionTitle } from '@/shared/components/SectionTitle';
import {
  colors,
  gutter,
  overlays,
  radius,
  spacing,
  typography,
} from '@/shared/theme';

import { ZoneCard } from './ZoneCard';

const ITEM_GAP = spacing[16]; // gap-4 observado entre tarjetas

// FlatList exige identidad estable para la config de viewability.
const VIEWABILITY_CONFIG = { itemVisiblePercentThreshold: 60 };

export function ZonesCarousel() {
  const { width: windowWidth } = useWindowDimensions();
  const cardWidth = Math.round(windowWidth * 0.75); // w-[75vw] observado
  const snapInterval = cardWidth + ITEM_GAP;
  const [activeIndex, setActiveIndex] = useState(0);

  // useCallback con deps vacías = identidad estable, requisito de FlatList
  // para onViewableItemsChanged (react-hooks/refs veta useRef().current).
  const onViewableItemsChanged = useCallback(
    ({ viewableItems }: { viewableItems: ViewToken[] }) => {
      const first = viewableItems[0];
      if (first?.index != null) setActiveIndex(first.index);
    },
    [],
  );

  const renderZone = useCallback(
    ({ item }: { item: Zone }) => (
      <ZoneCard
        zone={item}
        width={cardWidth}
        onPress={() =>
          router.push({
            pathname: '/zonas/[slug]',
            params: { slug: item.slug },
          })
        }
      />
    ),
    [cardWidth],
  );

  return (
    <View style={styles.section}>
      <View style={styles.header}>
        <SectionTitle title={homeZonesSection.title} style={styles.title} />
        <Text style={styles.paragraph}>{homeZonesSection.paragraph}</Text>
      </View>
      <FlatList
        horizontal
        data={homeZones}
        renderItem={renderZone}
        keyExtractor={(zone) => zone.slug}
        getItemLayout={(_, index) => ({
          length: snapInterval,
          offset: snapInterval * index,
          index,
        })}
        snapToInterval={snapInterval}
        snapToAlignment="start"
        decelerationRate="fast"
        disableIntervalMomentum
        showsHorizontalScrollIndicator={false}
        onViewableItemsChanged={onViewableItemsChanged}
        viewabilityConfig={VIEWABILITY_CONFIG}
        contentContainerStyle={styles.track}
      />
      <View style={styles.dots}>
        {homeZones.map((zone, index) => (
          <View
            key={zone.slug}
            style={[styles.dot, index === activeIndex && styles.dotActive]}
          />
        ))}
      </View>
      <Pressable
        accessibilityRole="button"
        accessibilityLabel={homeZonesSection.cta.label}
        onPress={() => router.push(homeZonesSection.cta.href)}
        style={({ pressed }) => [styles.cta, pressed && styles.ctaPressed]}
      >
        {({ pressed }) => (
          <Text style={[styles.ctaLabel, pressed && styles.ctaLabelPressed]}>
            {homeZonesSection.cta.label}
          </Text>
        )}
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  section: {
    backgroundColor: colors.zonesSectionBg,
    paddingVertical: spacing[64],
  },
  header: { paddingHorizontal: gutter.home },
  title: { marginBottom: spacing[16] },
  paragraph: {
    ...typography.body.default,
    color: colors.gray600,
    marginBottom: spacing[40],
  },
  track: { paddingHorizontal: gutter.home, gap: ITEM_GAP }, // bleed -mx-4 px-4
  dots: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: spacing[8], // gap-2 del patrón de dots observado (05 §3)
    marginTop: spacing[32],
  },
  dot: {
    width: spacing[8],
    height: spacing[8],
    borderRadius: radius.full,
    backgroundColor: overlays.black20,
  },
  // Pastilla 24×8 del único lenguaje de dots del sitio (05 §3); colores
  // adaptados al fondo lima: accent/white-30 serían ilegibles aquí.
  dotActive: { width: 24, backgroundColor: colors.gray900 },
  // CTA observado (home-styles.json): #1E1E1E, borde 1px blanco, px-7 py-3;
  // press = su hover real: invierte a pastilla blanca con texto gray-900.
  // Pressable propio: el `style` del shared Button pisa su estado pressed.
  cta: {
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: 44, // target táctil mínimo (HIG)
    backgroundColor: colors.zonesCtaBg,
    borderWidth: 1,
    borderColor: colors.white,
    borderRadius: radius.full,
    paddingHorizontal: spacing[28],
    paddingVertical: spacing[12],
    marginTop: spacing[40],
  },
  ctaPressed: { backgroundColor: colors.white },
  ctaLabel: { ...typography.button.ctaRound, color: colors.white },
  ctaLabelPressed: { color: colors.gray900 },
});
