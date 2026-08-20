// Sección que-es (02-content-home §4). En el sitio el bloque de video es
// DECORATIVO (raw/home-interactions §2: click → nada); adaptación deliberada
// en la app: el tap reproduce de verdad one-impact-intro.mp4 en el mismo
// espacio 16:9, con controles nativos. Player propio, separado del hero.
// Estructura observada: wrapper aspect-video rounded-2xl bg-gray-900, overlay
// black/30, círculo 64px white/20 con borde white/40 y triángulo blanco.
import { Image } from 'expo-image';
import { router, useFocusEffect } from 'expo-router';
import { useVideoPlayer, VideoView } from 'expo-video';
import { useCallback, useState } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import Svg, { Polygon } from 'react-native-svg';

import { homeHero, queEsSection } from '@/data/home';
import { Button } from '@/shared/components/Button';
import { SectionTitle } from '@/shared/components/SectionTitle';
import {
  colors,
  gutter,
  overlays,
  radius,
  spacing,
  typography,
} from '@/shared/theme';

export function IntroVideoCard() {
  const [showPlayer, setShowPlayer] = useState(false);
  const player = useVideoPlayer(homeHero.video);

  // A diferencia del hero (ambiente, muted), este player lleva audio y lo
  // inicia el usuario: al perder foco se pausa, pero NO se reanuda solo al
  // volver — retomar queda en los controles nativos.
  useFocusEffect(
    useCallback(() => {
      return () => {
        player.pause();
      };
    }, [player]),
  );

  const handlePlay = () => {
    setShowPlayer(true);
    player.play();
  };

  return (
    <View style={styles.section}>
      <SectionTitle title={queEsSection.title} style={styles.title} />
      <Text style={styles.paragraph}>{queEsSection.paragraph}</Text>
      {showPlayer ? (
        <View style={styles.media}>
          {/* Video vertical 640×1138 (nota en data/home.ts): contain lo
              muestra completo sobre el bg-gray-900 observado; cover lo
              recortaría a una franja. */}
          <VideoView
            player={player}
            style={StyleSheet.absoluteFill}
            contentFit="contain"
            nativeControls
          />
        </View>
      ) : (
        <Pressable
          accessibilityRole="button"
          accessibilityLabel={queEsSection.thumbnailAlt}
          onPress={handlePlay}
          style={styles.media}
        >
          {({ pressed }) => (
            <>
              <Image
                source={queEsSection.thumbnail}
                style={StyleSheet.absoluteFill}
                contentFit="cover"
              />
              <View
                style={[
                  styles.mediaOverlay,
                  pressed && styles.mediaOverlayPressed,
                ]}
              />
              <View style={styles.playCircle}>
                <Svg
                  width={spacing[20]}
                  height={spacing[20]}
                  viewBox="0 0 24 24"
                  style={styles.playIcon}
                >
                  <Polygon points="8,5 19,12 8,19" fill={colors.white} />
                </Svg>
              </View>
            </>
          )}
        </Pressable>
      )}
      <Button
        label={queEsSection.cta.label}
        onPress={() => router.push(queEsSection.cta.href)}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  section: {
    backgroundColor: colors.white,
    paddingHorizontal: gutter.home,
    paddingVertical: spacing[64],
  },
  title: { marginBottom: spacing[16] },
  paragraph: {
    ...typography.body.default,
    color: colors.gray600,
    marginBottom: spacing[32],
  },
  media: {
    width: '100%',
    aspectRatio: 16 / 9,
    borderRadius: radius['2xl'],
    overflow: 'hidden',
    backgroundColor: colors.gray900,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: spacing[32],
  },
  mediaOverlay: {
    ...StyleSheet.absoluteFill,
    backgroundColor: overlays.black30,
  },
  mediaOverlayPressed: { backgroundColor: overlays.black45 },
  playCircle: {
    width: spacing[64],
    height: spacing[64],
    borderRadius: radius.full,
    backgroundColor: overlays.white20,
    borderWidth: 1, // border de Tailwind observado (1px)
    borderColor: overlays.white40,
    alignItems: 'center',
    justifyContent: 'center',
  },
  playIcon: { marginLeft: spacing[4] }, // centrado óptico del triángulo
});
