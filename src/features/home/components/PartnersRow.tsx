// Sección aliados (02-content-home §7). Los 3 círculos caben en fila a 390
// (96 + gap 32 ×3 = 352 < 358, mobile-notes) — sin scroll. El hover
// grayscale→color del sitio no tiene equivalente táctil (no son links):
// quedan estáticos en GRIS, el estado default que muestra el screenshot 390;
// los PNG son a color, el gris lo pone `filter` (soportado en new arch
// iOS/Android y mapeado a CSS por react-native-web).
import { Image } from 'expo-image';
import { StyleSheet, Text, View } from 'react-native';

import { partners, partnersSection } from '@/data/partners';
import { SectionTitle } from '@/shared/components/SectionTitle';
import { colors, gutter, radius, spacing, typography } from '@/shared/theme';

export function PartnersRow() {
  return (
    <View style={styles.section}>
      <SectionTitle
        title={partnersSection.title}
        centered
        style={styles.title}
      />
      <Text style={styles.paragraph}>{partnersSection.paragraph}</Text>
      <View style={styles.row}>
        {partners.map((partner) => (
          <View key={partner.id} style={styles.circle}>
            <Image
              source={partner.logo}
              alt={partner.name}
              style={styles.logo}
              contentFit="contain"
            />
          </View>
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  section: {
    backgroundColor: colors.neutral100,
    paddingHorizontal: gutter.home,
    paddingVertical: spacing[64],
  },
  title: { marginBottom: spacing[16] },
  paragraph: {
    ...typography.body.default,
    color: colors.gray600,
    textAlign: 'center',
    marginBottom: spacing[40],
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: spacing[32], // gap aliados observado (03 §4)
  },
  // w-24 rounded-full bg-white observado; su shadow-sm quedó sin valores
  // capturados (03 §5.3) → sin sombra hasta que exista el token del theme.
  circle: {
    width: spacing[96],
    height: spacing[96],
    borderRadius: radius.full,
    backgroundColor: colors.white,
    alignItems: 'center',
    justifyContent: 'center',
    filter: 'grayscale(1)', // estado default del sitio (grayscale de Tailwind)
  },
  logo: { width: spacing[64], height: spacing[64] }, // max-h-16 observado
});
