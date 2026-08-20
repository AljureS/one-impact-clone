// Beneficios (02-content-suscripcion §3, raw/suscripcion-styles ›
// beneficioItem): h2 24px bold (390) + 6 filas icono 40 + título + descripción,
// gap-5 entre filas y gap-4 icono-texto. No usa SectionTitle: el h2 de esta
// sección es 24px, más chico que la variante zones (30) del shared.
import { StyleSheet, Text, View } from 'react-native';

import { benefits, benefitsSection } from '@/data/plans';
import { colors, spacing, typography } from '@/shared/theme';

import { BenefitIcon } from './BenefitIcon';

// mb-6 y mb-0.5 del sitio = 24 y 2; la escala congelada no trae esos pasos (reportado).
const MB_6 = spacing[4] + spacing[20];
const HALF_STEP = spacing[4] / 2;

export function BenefitsList() {
  return (
    <View>
      <Text accessibilityRole="header" style={styles.title}>
        {benefitsSection.title}
      </Text>
      {/* 6 ítems estáticos: FlatList vertical dentro del ScrollView de Screen
          está prohibido por RN (VirtualizedList anidada en el mismo eje). */}
      <View style={styles.list}>
        {benefits.map((benefit, index) => (
          <View key={benefit.title} style={styles.item}>
            <BenefitIcon index={index} />
            <View style={styles.texts}>
              <Text style={styles.itemTitle}>{benefit.title}</Text>
              <Text style={styles.itemDescription}>{benefit.description}</Text>
            </View>
          </View>
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  title: {
    ...typography.title.benefits, // lh 390 no capturado: default de RN (reportado en theme)
    color: colors.gray900,
    marginBottom: MB_6,
  },
  list: { gap: spacing[20] }, // gap-5
  item: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: spacing[16], // gap-4
  },
  texts: { flex: 1 },
  itemTitle: {
    ...typography.body.benefitTitle,
    color: colors.gray900,
    marginBottom: HALF_STEP, // mb-0.5
  },
  itemDescription: {
    ...typography.body.benefitDescription,
    color: colors.gray600,
  },
});
