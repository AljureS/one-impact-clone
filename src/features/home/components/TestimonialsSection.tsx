// Sección testimonios (02-content-home §6). Interacción observada (05 §4):
// tap en avatar swapea foto/nombre/rol/quote de la tarjeta grande; activo por
// defecto Ana. El sitio NO marca visualmente el avatar activo (verificado
// computado) — la tarjeta grande es la única señal; aquí igual, más
// accessibilityState selected.
import { Image } from 'expo-image';
import { router } from 'expo-router';
import { useState } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';

import { testimonials, testimonialsSection } from '@/data/testimonials';
import type { Testimonial } from '@/data/types';
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

import { TestimonialCard } from './TestimonialCard';

export function TestimonialsSection() {
  const [active, setActive] = useState<Testimonial>(testimonials[0]);

  return (
    <View style={styles.section}>
      <SectionTitle title={testimonialsSection.title} style={styles.title} />
      <Text style={styles.paragraph}>{testimonialsSection.paragraph}</Text>
      {/* Panel crema alrededor de la tarjeta: 358 vs tarjeta 334 observadas
          (12 de aire); color = testimonialDecorCream, el token decorativo de
          testimonios sin ubicación atribuida en 03 §1.2. */}
      <View style={styles.panel}>
        <TestimonialCard testimonial={active} />
      </View>
      <Text style={styles.quote}>{active.quote}</Text>
      <View style={styles.avatars}>
        {testimonials.map((testimonial) => {
          const selected = testimonial.id === active.id;
          return (
            <Pressable
              key={testimonial.id}
              accessibilityRole="button"
              accessibilityLabel={testimonial.name}
              accessibilityState={{ selected }}
              onPress={() => setActive(testimonial)}
              style={({ pressed }) => [
                styles.avatarButton,
                pressed && styles.avatarPressed,
              ]}
            >
              <View style={styles.avatarCircle}>
                <Image
                  source={testimonial.image}
                  style={StyleSheet.absoluteFill}
                  contentFit="cover"
                />
              </View>
              <Text style={styles.avatarName}>{testimonial.name}</Text>
              <Text style={styles.avatarRole}>{testimonial.role}</Text>
            </Pressable>
          );
        })}
      </View>
      <Button
        label={testimonialsSection.cta.label}
        variant="dark"
        fullWidth
        textStyle={styles.ctaLabel}
        onPress={() => router.push(testimonialsSection.cta.href)}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  section: {
    backgroundColor: colors.testimonialsBg,
    paddingHorizontal: gutter.home,
    paddingVertical: spacing[64],
  },
  title: { marginBottom: spacing[16] },
  paragraph: {
    ...typography.body.default,
    color: colors.gray600,
    marginBottom: spacing[32],
  },
  panel: {
    backgroundColor: colors.testimonialDecorCream,
    borderRadius: radius['3xl'],
    padding: spacing[12],
    marginBottom: spacing[32],
  },
  quote: {
    ...typography.body.relaxed,
    color: colors.gray700,
    marginBottom: spacing[32],
  },
  avatars: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: spacing[20], // gap avatares observado a 390
    marginBottom: spacing[40],
  },
  // Columnas iguales con texto envolvente: a 390 el sitio recorta los labels
  // contra el viewport (bug de la web); en nativo se adapta, no se calca.
  avatarButton: { flex: 1, alignItems: 'center', gap: spacing[4] },
  avatarPressed: { opacity: 0.7 }, // feedback de press (el sitio no define hover aquí)
  avatarCircle: {
    width: spacing[56],
    height: spacing[56], // w-14 h-14 observado
    borderRadius: radius.full,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: overlays.white60,
    backgroundColor: colors.gray200,
  },
  avatarName: {
    ...typography.caption.avatarName,
    color: colors.gray900,
    textAlign: 'center',
  },
  avatarRole: {
    ...typography.caption.avatarRole,
    color: colors.gray600,
    textAlign: 'center',
  },
  ctaLabel: { ...typography.button.ctaCommunity }, // 14/600 observado
});
