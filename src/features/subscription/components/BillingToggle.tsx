// Toggle Mensual/Anual (raw/suscripcion-styles › toggleBilling): pill blanco
// p-1, botón activo bg-dark-green texto blanco, inactivo gray-500 con
// hover:text-gray-700 → aquí feedback de press. El sitio NO lleva aria en el
// estado (raw/suscripcion-interactions §1) — accessibilityState={{ selected }}
// y el announce son la mejora documentada del plan. shadow-sm del pill: sin
// token de sombra en el theme (pendiente), no se inventa por componente.
import {
  AccessibilityInfo,
  Pressable,
  StyleSheet,
  Text,
  View,
} from 'react-native';

import { billingCopy } from '@/data/plans';
import type { BillingCycle } from '@/data/types';
import { colors, radius, spacing, typography } from '@/shared/theme';

const OPTIONS: { value: BillingCycle; label: string }[] = [
  { value: 'monthly', label: billingCopy.monthlyLabel },
  { value: 'annual', label: billingCopy.annualLabel },
];

interface BillingToggleProps {
  billing: BillingCycle;
  onChange: (billing: BillingCycle) => void;
}

export function BillingToggle({ billing, onChange }: BillingToggleProps) {
  const handleSelect = (option: (typeof OPTIONS)[number]) => {
    if (option.value === billing) {
      return;
    }
    onChange(option.value);
    // Receta a11y del skill: anunciar el cambio con el label real de @/data.
    AccessibilityInfo.announceForAccessibility(option.label);
  };
  return (
    <View style={styles.root}>
      {/* 2 opciones estáticas de un segmented control, no una colección scrolleable. */}
      {OPTIONS.map((option) => {
        const active = option.value === billing;
        return (
          <Pressable
            key={option.value}
            accessibilityRole="button"
            accessibilityLabel={option.label}
            accessibilityState={{ selected: active }}
            // Botón de 36pt de alto (py-2 del sitio, <44 anotado en
            // raw/suscripcion-mobile-notes §2): hitSlop completa el target.
            hitSlop={{ top: spacing[4], bottom: spacing[4] }}
            onPress={() => handleSelect(option)}
            style={[styles.option, active && styles.optionActive]}
          >
            {({ pressed }) => (
              <Text
                style={[
                  styles.label,
                  active ? styles.labelActive : pressed && styles.labelPressed,
                ]}
              >
                {option.label}
              </Text>
            )}
          </Pressable>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'flex-start', // w-fit
    backgroundColor: colors.white,
    borderRadius: radius.full,
    padding: spacing[4], // p-1
  },
  option: {
    paddingHorizontal: spacing[20], // px-5
    paddingVertical: spacing[8], // py-2
    borderRadius: radius.full,
  },
  optionActive: { backgroundColor: colors.darkGreen },
  label: { ...typography.button.toggle, color: colors.gray500 },
  labelActive: { color: colors.white },
  labelPressed: { color: colors.gray700 }, // hover:text-gray-700 → press
});
