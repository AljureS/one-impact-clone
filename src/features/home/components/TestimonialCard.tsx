// Tarjeta grande del testimonio activo (raw/home-styles.json ›
// testimonioTarjetaGrande): aspect-[3/4] rounded-3xl, foto cover, gradiente
// to-t black/45, play DECORATIVO centrado (inerte también en el sitio, 05 §4)
// y caja nombre/rol left-4 right-4 bottom-4.
import { Image } from 'expo-image';
import { StyleSheet, Text, View } from 'react-native';
import Svg, {
  Defs,
  LinearGradient,
  Polygon,
  Rect,
  Stop,
} from 'react-native-svg';

import type { Testimonial } from '@/data/types';
import {
  colors,
  gradients,
  overlays,
  radius,
  spacing,
  svgGradientStops,
  typography,
} from '@/shared/theme';

const GRADIENT_STOPS = svgGradientStops(gradients.testimonialCard);

interface TestimonialCardProps {
  testimonial: Testimonial;
}

export function TestimonialCard({ testimonial }: TestimonialCardProps) {
  return (
    <View style={styles.card}>
      <Image
        source={testimonial.image}
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
          <LinearGradient id="testimonialGradient" x1="0" y1="0" x2="0" y2="1">
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
          fill="url(#testimonialGradient)"
        />
      </Svg>
      <View style={styles.playLayer} pointerEvents="none">
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
      </View>
      {/* bg = white25, el overlay sin ubicación atribuida de 03 §2. */}
      <View style={styles.nameBox}>
        <Text style={styles.name}>{testimonial.name}</Text>
        <Text style={styles.role}>{testimonial.role}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    aspectRatio: 3 / 4, // aspect-[3/4] observado (334×445 a 390)
    borderRadius: radius['3xl'],
    overflow: 'hidden',
    backgroundColor: colors.gray200, // placeholder bg observado
  },
  playLayer: {
    ...StyleSheet.absoluteFill,
    alignItems: 'center',
    justifyContent: 'center',
  },
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
  nameBox: {
    position: 'absolute',
    left: spacing[16],
    right: spacing[16],
    bottom: spacing[16],
    backgroundColor: overlays.white25,
    borderRadius: radius['2xl'],
    padding: spacing[16],
  },
  name: { ...typography.caption.testimonialName, color: colors.white },
  role: {
    ...typography.caption.testimonialRole,
    color: overlays.white80,
    marginTop: spacing[4],
  },
});
