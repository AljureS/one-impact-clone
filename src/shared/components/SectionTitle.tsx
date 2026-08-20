// h2 de sección. `variant` respeta el conflicto real de pesos 900/700 entre
// pantallas (03 §6.2): home → black, zonas/suscripcion → bold.
import { StyleProp, StyleSheet, Text, TextStyle } from 'react-native';

import { colors, typography } from '@/shared/theme';

interface SectionTitleProps {
  title: string;
  variant?: 'home' | 'zones';
  color?: string;
  centered?: boolean;
  style?: StyleProp<TextStyle>;
}

export function SectionTitle({
  title,
  variant = 'home',
  color = colors.gray900,
  centered = false,
  style,
}: SectionTitleProps) {
  return (
    <Text
      accessibilityRole="header"
      style={[
        variant === 'home' ? styles.home : styles.zones,
        { color },
        centered && styles.centered,
        style,
      ]}
    >
      {title}
    </Text>
  );
}

const styles = StyleSheet.create({
  home: { ...typography.title.sectionHome },
  zones: { ...typography.title.sectionZones },
  centered: { textAlign: 'center' },
});
