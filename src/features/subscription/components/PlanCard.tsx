// Botón de plan (raw/suscripcion-styles › planSelector): NO es tarjeta con
// CTA propio — setea el plan del CTA único. Activo: bg blanco + check
// dark-green (svg verbatim de raw/suscripcion-assets › checkPlanActivo) +
// precio un paso mayor (24 vs 20). Inactivo: transparente, hover:bg-white/50
// → feedback de press. shadow-md del activo: sin token de sombra (pendiente
// en theme), no se inventa. En Anual aparece «facturado anualmente» (9px);
// en Mensual ese nodo no existe (raw/suscripcion-interactions §1.3).
import { Pressable, StyleSheet, Text, View } from 'react-native';
import Svg, { Path } from 'react-native-svg';

import { billingCopy } from '@/data/plans';
import type { BillingCycle, Plan } from '@/data/types';
import { colors, overlays, radius, spacing, typography } from '@/shared/theme';

// Intrínsecos del dibujo del check (viewBox 0 0 12 12, stroke 2), no tokens.
const CHECK_VIEWBOX = '0 0 12 12';
const CHECK_STROKE = 2;
// gap-0.5 y mt-0.5 del sitio = 2; la escala congelada no trae paso 2 (reportado).
const HALF_STEP = spacing[4] / 2;

interface PlanCardProps {
  plan: Plan;
  billing: BillingCycle;
  selected: boolean;
  onPress: () => void;
}

export function PlanCard({ plan, billing, selected, onPress }: PlanCardProps) {
  const price = billing === 'monthly' ? plan.priceMonthly : plan.priceAnnual;
  const annual = billing === 'annual';
  const a11yLabel = [
    plan.name,
    `${price}${billingCopy.period}`,
    annual ? billingCopy.annualNote : undefined,
  ]
    .filter(Boolean)
    .join(', ');
  return (
    <Pressable
      accessibilityRole="button"
      accessibilityLabel={a11yLabel}
      accessibilityState={{ selected }}
      onPress={onPress}
      style={({ pressed }) => [
        styles.card,
        selected && styles.cardSelected,
        !selected && pressed && styles.cardPressed,
      ]}
    >
      <Text style={[styles.name, selected && styles.nameSelected]}>
        {plan.name}
      </Text>
      <View style={styles.priceRow}>
        <Text style={selected ? styles.priceSelected : styles.price}>
          {price}
        </Text>
        <Text style={styles.period}>{billingCopy.period}</Text>
      </View>
      {annual && (
        <Text style={styles.annualNote}>{billingCopy.annualNote}</Text>
      )}
      {selected && (
        <View style={styles.check}>
          <Svg width={spacing[12]} height={spacing[12]} viewBox={CHECK_VIEWBOX}>
            <Path
              d="M2 6 L5 9 L10 3"
              stroke={colors.white}
              strokeWidth={CHECK_STROKE}
              strokeLinecap="round"
              strokeLinejoin="round"
              fill="none"
            />
          </Svg>
        </View>
      )}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
    flex: 1,
    alignItems: 'center',
    padding: spacing[12], // p-3
    borderRadius: radius['2xl'],
  },
  cardSelected: { backgroundColor: colors.white },
  cardPressed: { backgroundColor: overlays.white50 }, // hover:bg-white/50 → press
  name: {
    ...typography.caption.planName,
    color: colors.gray400,
    marginBottom: spacing[4], // mb-1
  },
  nameSelected: { color: colors.gray700 },
  priceRow: {
    flexDirection: 'row',
    alignItems: 'baseline',
    justifyContent: 'center',
    columnGap: HALF_STEP, // gap-0.5
  },
  price: { ...typography.caption.planPriceInactive, color: colors.gray600 },
  priceSelected: {
    ...typography.caption.planPriceActive,
    color: colors.gray900,
  },
  period: { ...typography.caption.planPeriod, color: colors.gray400 },
  annualNote: {
    ...typography.caption.planBilledAnnually,
    color: colors.gray400,
    marginTop: HALF_STEP, // mt-0.5
    textAlign: 'center',
  },
  check: {
    position: 'absolute',
    top: spacing[8], // top-2
    right: spacing[8], // right-2
    width: spacing[20], // w-5
    height: spacing[20], // h-5
    borderRadius: radius.full,
    backgroundColor: colors.darkGreen,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
