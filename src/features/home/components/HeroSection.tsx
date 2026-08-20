// Hero de home. El video ES el fondo (05-interactions §1: autoplay muted loop,
// sin controles, pointer-events-none), con el gradiente negro vertical de
// 03 §5.2 encima para contraste AA. A 390 (raw/home-mobile-notes): 100vh,
// texto anclado abajo (items-end + pb-16) y CTA blanca inline.
import { useVideoPlayer, VideoView } from 'expo-video';
import { router, useFocusEffect } from 'expo-router';
import { useCallback } from 'react';
import { StyleSheet, Text, useWindowDimensions, View } from 'react-native';
import Svg, { Defs, LinearGradient, Rect, Stop } from 'react-native-svg';

import { homeHero } from '@/data/home';
import { Button } from '@/shared/components/Button';
import {
  colors,
  gradients,
  gutter,
  overlays,
  spacing,
  typography,
} from '@/shared/theme';

// Mismo fix cross-platform que ZoneCard: react-native-svg NATIVO ignora el
// alfa del stopColor (extractGradient.js) → color sólido + stopOpacity.
// Los tres stops del hero son rgba negros; el alfa sale del propio token.
const GRADIENT_STOPS = gradients.heroHome.map((rgba, index, all) => ({
  offset: index / (all.length - 1),
  opacity: Number(rgba.slice(rgba.lastIndexOf(',') + 1, -1)),
}));

export function HeroSection() {
  const { height } = useWindowDimensions();
  const player = useVideoPlayer(homeHero.video, (p) => {
    p.loop = true;
    p.muted = true;
    p.play();
  });

  // El sitio nunca pausa el video; en nativo la pantalla sí debe soltarlo:
  // pausa al perder el foco (cambio de tab/ruta) y reanuda al volver.
  useFocusEffect(
    useCallback(() => {
      player.play();
      return () => {
        player.pause();
      };
    }, [player]),
  );

  return (
    <View style={{ height }}>
      <VideoView
        player={player}
        style={styles.video}
        contentFit="cover"
        nativeControls={false}
      />
      {/* Gradiente observado (03 §5.2) sin dependencia nueva: SVG rinde en
          native y web; stops exactos del token heroHome (from/via/to → 0/.5/1). */}
      <Svg
        width="100%"
        height="100%"
        style={styles.overlay}
        pointerEvents="none"
      >
        <Defs>
          <LinearGradient id="heroOverlay" x1="0" y1="0" x2="0" y2="1">
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
        <Rect x="0" y="0" width="100%" height="100%" fill="url(#heroOverlay)" />
      </Svg>
      <View style={styles.content}>
        <Text accessibilityRole="header" style={styles.title}>
          {homeHero.title}
        </Text>
        <Text style={styles.paragraph}>{homeHero.paragraph}</Text>
        <Button
          label={homeHero.cta.label}
          variant="white"
          onPress={() => router.push(homeHero.cta.href)}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  video: { ...StyleSheet.absoluteFill, pointerEvents: 'none' },
  overlay: StyleSheet.absoluteFill,
  content: {
    flex: 1,
    justifyContent: 'flex-end',
    paddingHorizontal: gutter.home,
    paddingBottom: spacing[64], // pb-16 observado a 390
  },
  title: { ...typography.display.home, color: colors.white },
  paragraph: {
    ...typography.body.default,
    color: overlays.white80,
    marginTop: spacing[16],
    marginBottom: spacing[32],
  },
});
