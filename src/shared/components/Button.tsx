// CTA pastilla del sitio. Variantes = fondos observados (03 §1, §3.4);
// el estado pressed usa el hover observado de cada variante (accent-dark,
// gray-100, gray-800). Texto sobre accent/blanco: gray-900 (03 §1.3, §6.3).
import {
  Pressable,
  StyleProp,
  StyleSheet,
  Text,
  TextStyle,
  ViewStyle,
} from 'react-native';

import { colors, radius, spacing, typography } from '@/shared/theme';

interface ButtonProps {
  label: string;
  onPress: () => void;
  variant?: 'accent' | 'white' | 'dark';
  fullWidth?: boolean;
  style?: StyleProp<ViewStyle>;
  textStyle?: StyleProp<TextStyle>;
}

export function Button({
  label,
  onPress,
  variant = 'accent',
  fullWidth = false,
  style,
  textStyle,
}: ButtonProps) {
  return (
    <Pressable
      accessibilityRole="button"
      accessibilityLabel={label}
      onPress={onPress}
      style={({ pressed }) => [
        styles.base,
        styles[variant],
        pressed && pressedStyles[variant],
        fullWidth && styles.fullWidth,
        style,
      ]}
    >
      <Text
        style={[
          styles.label,
          variant === 'dark' && styles.labelOnDark,
          textStyle,
        ]}
      >
        {label}
      </Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  base: {
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'flex-start',
    borderRadius: radius.full,
    paddingHorizontal: spacing[28],
    paddingVertical: spacing[12],
    minHeight: 44, // target táctil mínimo (HIG); coincide con py-3 + lh 20 del sitio
  },
  accent: { backgroundColor: colors.accent },
  white: { backgroundColor: colors.white },
  dark: { backgroundColor: colors.gray900 },
  fullWidth: { alignSelf: 'stretch' },
  label: { ...typography.button.ctaRound, color: colors.gray900 },
  labelOnDark: { color: colors.white },
});

const pressedStyles = StyleSheet.create({
  accent: { backgroundColor: colors.accentDark },
  white: { backgroundColor: colors.gray100 },
  dark: { backgroundColor: colors.gray800 },
});
