// /nosotros devolvía 403 en el sitio real (nunca se pudo explorar): pantalla
// DERIVADA de lo capturado — propuesta simple documentada como interpretación,
// no réplica. Regla: cada string visible sale verbatim de src/data; nada
// redactado aquí. Patrón de páginas interiores del sitio: lienzo sandBg,
// gutter 20 y títulos peso 700 (03 §6.1/§6.2).
// Orden: hero → stat → aliados → contacto → CTA → footer.
import { useRouter } from 'expo-router';
import { Linking, Pressable, StyleSheet, Text, View } from 'react-native';

import { footer, navCta } from '@/data/navigation';
import { progressSection } from '@/data/progress';
import { Button } from '@/shared/components/Button';
import { Footer } from '@/shared/components/Footer';
import { Screen } from '@/shared/components/Screen';
import { colors, gutter, spacing, typography } from '@/shared/theme';

import { PartnersSection } from './components/PartnersSection';
import { StatStrip } from './components/StatStrip';

// «Sobre Nosotros» — nombre real de esta pantalla en el sitio: label del
// footer canónico para /nosotros (@/data/navigation, footer.menuLinks).
const aboutTitle = footer.menuLinks.find(
  (link) => link.href === '/nosotros',
)?.label;

export function AboutScreen() {
  const router = useRouter();
  return (
    <Screen statusBarStyle="dark" backgroundColor={colors.sandBg}>
      <View style={styles.hero}>
        <Text accessibilityRole="header" style={styles.heroTitle}>
          {aboutTitle}
        </Text>
        {/* Frase de identidad capturada en /zonas §3 (progressSection.intro). */}
        <Text style={styles.heroParagraph}>{progressSection.intro}</Text>
      </View>
      <StatStrip />
      <PartnersSection />
      <View style={styles.contact}>
        <Text accessibilityRole="header" style={styles.contactHeading}>
          {footer.contactHeading}
        </Text>
        <Pressable
          accessibilityRole="link"
          accessibilityLabel={footer.contactEmail.label}
          onPress={() => Linking.openURL(footer.contactEmail.href)}
          style={styles.contactLink}
        >
          {({ pressed }) => (
            <Text
              style={[styles.contactEmail, pressed && styles.contactPressed]}
            >
              {footer.contactEmail.label}
            </Text>
          )}
        </Pressable>
      </View>
      <View style={styles.ctaSection}>
        {/* CTA a /suscripcion con label existente: navCta, el CTA canónico del
            header del sitio en todas las páginas. statsCta («Quiero unirme»)
            se descartó: aquí quedaría separado de su banda de stats. */}
        <Button
          label={navCta.label}
          onPress={() => router.push(navCta.href)}
          style={styles.cta}
        />
      </View>
      <Footer paddingHorizontal={gutter.zonesAndSubscription} />
    </Screen>
  );
}

const styles = StyleSheet.create({
  hero: {
    paddingVertical: spacing[56], // py-14 del hero de /zonas (misma familia)
    paddingHorizontal: gutter.zonesAndSubscription,
  },
  heroTitle: {
    ...typography.display.zones,
    color: colors.gray900,
    textAlign: 'center',
  },
  heroParagraph: {
    ...typography.body.relaxed,
    color: colors.gray600,
    textAlign: 'center',
    marginTop: spacing[16],
  },
  contact: {
    paddingHorizontal: gutter.zonesAndSubscription,
    paddingBottom: spacing[56], // el top lo da el pb-64 de aliados
    alignItems: 'center',
  },
  contactHeading: {
    ...typography.caption.footerHeading, // mini-heading uppercase del sitio
    color: colors.gray500,
    marginBottom: spacing[8],
  },
  contactLink: { minHeight: 44, justifyContent: 'center' }, // target táctil HIG
  contactEmail: { ...typography.body.default, color: colors.gray900 },
  contactPressed: { color: colors.gray600 },
  ctaSection: {
    paddingHorizontal: gutter.zonesAndSubscription,
    paddingBottom: spacing[64],
  },
  cta: { alignSelf: 'center' }, // pisa el flex-start base del Button
});
