// Aliados (02-content-home §7, vía @/data/partners) reconstruida aquí con la
// receta documentada en home: fila de 3 círculos blancos (96 + gap 32 caben a
// 390 sin scroll), logos `contain` en GRIS vía `filter` — estado default del
// sitio; su hover a color no tiene equivalente táctil (no son links). Alt
// verbatim. Diferencias de esta pantalla: lienzo crema continuo (sin bg de
// sección propio), gutter 20 y h2 peso 700 (patrón de páginas interiores).
// No se importa de features/home: los features nunca se importan entre sí.
import { Image } from 'expo-image';
import { StyleSheet, Text, View } from 'react-native';

import { partners, partnersSection } from '@/data/partners';
import { SectionTitle } from '@/shared/components/SectionTitle';
import { colors, gutter, radius, spacing, typography } from '@/shared/theme';

export function PartnersSection() {
  return (
    <View style={styles.section}>
      <SectionTitle
        title={partnersSection.title}
        variant="zones"
        centered
        style={styles.title}
      />
      <Text style={styles.paragraph}>{partnersSection.paragraph}</Text>
      {/* 3 ítems estáticos que caben en una fila: flex, no FlatList. */}
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
    paddingHorizontal: gutter.zonesAndSubscription,
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
  // w-24 rounded-full bg-white de la receta; su shadow-sm quedó sin valores
  // capturados (03 §5.3) → sin sombra hasta que exista token en el theme.
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
