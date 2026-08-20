// Ficha de zona — pantalla DERIVADA: /zonas/{slug} responde 403 en el sitio
// (01-sitemap), no hay referencia que calcar. Interpretación mínima desde lo
// capturado: hero = el patrón visual de la tarjeta de zona a pantalla completa
// (imagen + gradiente zoneCardZones + título con la grafía donde la zona
// existe), avances filtrados por el mapeo zoneSlug documentado en
// @/data/progress, y el CTA existente «Quiero hacer parte» → /suscripcion.
// Es app, no web: sin Screen/BrandHeader (el logo flotante ocuparía el mismo
// top-left) y con botón back flotante además del swipe/back nativo del stack.
// ~205 líneas a propósito (§3.2): pantalla derivada auto-contenida — partirla
// crearía componentes de un solo uso, que el mismo §3.2 prohíbe.
import { Ionicons } from '@expo/vector-icons';
import { BlurView } from 'expo-blur';
import { Image } from 'expo-image';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import {
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  useWindowDimensions,
  View,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Svg, { Defs, LinearGradient, Rect, Stop } from 'react-native-svg';

import { queEsSection } from '@/data/home';
import { progressSection, progressUpdates } from '@/data/progress';
import { zones } from '@/data/zones';
import { Button } from '@/shared/components/Button';
import { SectionTitle } from '@/shared/components/SectionTitle';
import {
  colors,
  gradients,
  gutter,
  overlays,
  radius,
  spacing,
  svgGradientStops,
  typography,
} from '@/shared/theme';

import { ProgressUpdateCard } from './components/ProgressUpdateCard';

const GRADIENT_STOPS = svgGradientStops(gradients.zoneCardZones);

// Decisiones de la pantalla derivada (no hay medidas de sitio que respetar).
const HERO_HEIGHT_RATIO = 0.6;
// Solo lectura por screen reader; el back no existe en el sitio (affordance
// nativa añadida) y @/data no trae ningún label de retorno.
const BACK_LABEL = 'Volver';

export function ZoneDetailScreen() {
  const { slug } = useLocalSearchParams<{ slug: string }>();
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const { height: windowHeight } = useWindowDimensions();
  const zone = zones.find((z) => z.slug === slug);

  const backButton = (
    <Pressable
      accessibilityRole="button"
      accessibilityLabel={BACK_LABEL}
      onPress={() => router.back()}
      style={({ pressed }) => [
        styles.back,
        { top: insets.top + spacing[12] },
        pressed && styles.backPressed,
      ]}
    >
      {/* Glass (bloque F): misma regla que la pastilla del BrandHeader. */}
      <BlurView
        pointerEvents="none"
        intensity={18}
        tint="dark"
        style={StyleSheet.absoluteFill}
      />
      <Ionicons name="chevron-back" size={24} color={colors.white} />
    </Pressable>
  );

  // Slug inválido: render mínimo sin crashear y con salida (back flotante +
  // back nativo del stack). Sin texto: no hay copy de error en @/data.
  if (zone === undefined) {
    return (
      <View style={styles.root}>
        <StatusBar style="dark" />
        {backButton}
      </View>
    );
  }

  const updates = progressUpdates.filter((u) => u.zoneSlug === zone.slug);

  return (
    <View style={styles.root}>
      <StatusBar style="light" />
      <ScrollView>
        <View
          style={[styles.hero, { height: windowHeight * HERO_HEIGHT_RATIO }]}
        >
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
              <LinearGradient id="zoneHeroGradient" x1="0" y1="0" x2="0" y2="1">
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
              fill="url(#zoneHeroGradient)"
            />
          </Svg>
          <View style={styles.heroContent}>
            <Text accessibilityRole="header" style={styles.heroTitle}>
              {zone.titleZones ?? zone.titleHome}
            </Text>
            {/* borneo/patagonia no tienen descripción en el sitio: se omite. */}
            {zone.description !== undefined && (
              <Text style={styles.heroDescription}>{zone.description}</Text>
            )}
          </View>
        </View>
        {updates.length > 0 && (
          <View style={styles.advances}>
            <SectionTitle
              title={progressSection.title}
              variant="zones"
              color={colors.white}
            />
            {updates.map((update) => (
              <ProgressUpdateCard key={update.id} update={update} />
            ))}
          </View>
        )}
        <View style={styles.cta}>
          <Button
            label={queEsSection.cta.label}
            onPress={() => router.push(queEsSection.cta.href)}
          />
        </View>
      </ScrollView>
      {backButton}
    </View>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: colors.sandBg },
  back: {
    position: 'absolute',
    left: gutter.zonesAndSubscription,
    width: 44,
    height: 44,
    borderRadius: radius.full,
    backgroundColor: overlays.black30, // contraste AA del chevron sobre foto
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 10,
    overflow: 'hidden', // clipea el blur al círculo
  },
  backPressed: { backgroundColor: overlays.black45 },
  hero: { overflow: 'hidden' },
  heroContent: {
    ...StyleSheet.absoluteFill,
    justifyContent: 'flex-end',
    paddingHorizontal: gutter.zonesAndSubscription,
    paddingBottom: spacing[32],
  },
  heroTitle: { ...typography.display.zones, color: colors.white },
  heroDescription: {
    ...typography.body.relaxed,
    color: overlays.white90,
    marginTop: spacing[8],
  },
  advances: {
    backgroundColor: colors.forest,
    paddingVertical: spacing[56],
    paddingHorizontal: gutter.zonesAndSubscription,
    gap: spacing[32],
  },
  cta: { paddingVertical: spacing[56], alignItems: 'center' },
});
