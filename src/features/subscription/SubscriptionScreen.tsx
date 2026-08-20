// /suscripcion (02-content-suscripcion, raw/suscripcion-mobile-notes): la
// pantalla más "nativa" del sitio — todo vive en una columna max-w-md (448)
// centrada, sin reflow web→móvil. Orden real: collage-hero full-bleed →
// planes (toggle + selector + CTA único) → beneficios; sin footer (bloque
// F: solo /nosotros lo lleva). Fondo crema
// continuo en las dos sections, gutter 20 (03 §6.1). El collage va bajo la
// status bar (hero full-bleed → safeTop=false, StatusBar light sobre fotos,
// como el nav blanco flotante del sitio).
import { useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';

import {
  defaultBilling,
  defaultPlanId,
  plans,
  plansSection,
  subscriptionCta,
  subscriptionLegal,
} from '@/data/plans';
import type { BillingCycle, PlanId } from '@/data/types';
import { Button } from '@/shared/components/Button';
import { Screen } from '@/shared/components/Screen';
import {
  colors,
  gutter,
  overlays,
  radius,
  spacing,
  typography,
} from '@/shared/theme';

import { BenefitsList } from './components/BenefitsList';
import { BillingToggle } from './components/BillingToggle';
import { HeroCollage } from './components/HeroCollage';
import { PlanCard } from './components/PlanCard';

// max-w-md del sitio: ancho máximo de TODO el contenido de /suscripcion.
const CONTENT_MAX_WIDTH = 448;

export function SubscriptionScreen() {
  const [billing, setBilling] = useState<BillingCycle>(defaultBilling);
  const [planId, setPlanId] = useState<PlanId>(defaultPlanId);
  return (
    <Screen
      statusBarStyle="light"
      backgroundColor={colors.sandBg}
      safeTop={false}
    >
      <HeroCollage />
      <View style={styles.plansSection}>
        <View style={styles.column}>
          <Text accessibilityRole="header" style={styles.title}>
            {plansSection.title}
          </Text>
          <Text style={styles.subtitle}>{plansSection.subtitle}</Text>
          <View style={styles.toggleWrap}>
            <BillingToggle billing={billing} onChange={setBilling} />
          </View>
          {/* 3 botones estáticos de un selector segmentado (no colección
              scrolleable): grid grid-cols-3 del sitio → fila flex. */}
          <View style={styles.planRow}>
            {plans.map((plan) => (
              <PlanCard
                key={plan.id}
                plan={plan}
                billing={billing}
                selected={plan.id === planId}
                onPress={() => setPlanId(plan.id)}
              />
            ))}
          </View>
          <Button
            label={subscriptionCta.label}
            variant="dark"
            fullWidth
            style={styles.cta}
            textStyle={styles.ctaLabel}
            // Decisión 8 del plan: /registro queda fuera de alcance — el CTA
            // da feedback de press pero no navega (href documentado en data).
            onPress={() => undefined}
          />
          <Text style={styles.legal}>{subscriptionLegal}</Text>
        </View>
      </View>
      <View style={styles.benefitsSection}>
        <View style={styles.column}>
          <BenefitsList />
        </View>
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  // bg crema de ambas sections: lo pone Screen (backgroundColor=sandBg).
  plansSection: {
    paddingHorizontal: gutter.zonesAndSubscription, // px-5
    paddingTop: spacing[40], // pt-10
    paddingBottom: spacing[32], // pb-8
  },
  benefitsSection: {
    paddingHorizontal: gutter.zonesAndSubscription, // px-5
    paddingTop: spacing[8], // pt-2 (continúa el mismo lienzo crema)
    paddingBottom: spacing[64], // pb-16
  },
  column: { width: '100%', maxWidth: CONTENT_MAX_WIDTH, alignSelf: 'center' },
  title: {
    ...typography.display.subscription,
    color: colors.gray900,
    marginBottom: spacing[8], // mb-2
  },
  subtitle: {
    ...typography.body.default,
    color: colors.gray500,
    marginBottom: spacing[32], // mb-8
  },
  toggleWrap: { marginBottom: spacing[24] }, // mb-6
  planRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing[4], // gap-1
    backgroundColor: overlays.white70, // franja bg-white/70
    borderRadius: radius['3xl'],
    padding: spacing[8], // p-2
    marginBottom: spacing[20], // mb-5
  },
  cta: { paddingVertical: spacing[16] }, // py-4 (56pt total, como el sitio)
  ctaLabel: { ...typography.button.ctaSubscribe },
  legal: {
    ...typography.caption.legal,
    color: colors.gray400,
    textAlign: 'center',
    marginTop: spacing[12], // mt-3
  },
});
