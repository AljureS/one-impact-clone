// Único footer de la app (decisión del dev, bloque F): en una app la
// navegación vive en las tabs, así que la columna MENÚ del sitio no se
// replica — /nosotros cierra con un bloque de marca y contacto. Contenido
// verbatim de @/data/navigation (footer.*); layout phone-first: pila
// centrada con targets de 44pt, no calco de las columnas del footer web.
import { Ionicons } from '@expo/vector-icons';
import { Linking, Pressable, StyleSheet, Text, View } from 'react-native';

import { footer, logoAlt } from '@/data/navigation';
import { colors, gutter, overlays, spacing, typography } from '@/shared/theme';

import Logo from '../../../../assets/images/logo_blanco.svg';

const iconByLabel: Record<string, 'logo-instagram' | 'logo-x'> = {
  Instagram: 'logo-instagram',
  'X (Twitter)': 'logo-x',
};

export function Footer() {
  return (
    <View style={styles.root}>
      <Logo width={120} height={47} accessibilityLabel={logoAlt} />
      <Text style={styles.tagline}>{footer.tagline}</Text>
      <View style={styles.contact}>
        <Text style={styles.heading}>{footer.contactHeading}</Text>
        <Pressable
          accessibilityRole="link"
          accessibilityLabel={footer.contactEmail.label}
          onPress={() => Linking.openURL(footer.contactEmail.href)}
          style={styles.emailRow}
        >
          {({ pressed }) => (
            <Text style={[styles.email, pressed && styles.emailPressed]}>
              {footer.contactEmail.label}
            </Text>
          )}
        </Pressable>
      </View>
      <View style={styles.socialRow}>
        {footer.social.map((item) => (
          <Pressable
            key={item.label}
            accessibilityRole="link"
            accessibilityLabel={item.label}
            onPress={() => Linking.openURL(item.href)}
            style={styles.socialButton}
          >
            {({ pressed }) => (
              <Ionicons
                name={iconByLabel[item.label]}
                size={20}
                color={pressed ? colors.white : overlays.white80}
              />
            )}
          </Pressable>
        ))}
      </View>
      <Text style={styles.copyright}>{footer.copyright}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    backgroundColor: colors.footerBg,
    paddingVertical: spacing[40],
    paddingHorizontal: gutter.zonesAndSubscription,
    alignItems: 'center',
    gap: spacing[20],
  },
  tagline: {
    ...typography.caption.footerTagline,
    color: overlays.white70,
    textAlign: 'center',
  },
  contact: { alignItems: 'center' },
  heading: {
    ...typography.caption.footerHeading,
    color: overlays.white50,
    marginBottom: spacing[8],
  },
  emailRow: { minHeight: 44, justifyContent: 'center' },
  email: { ...typography.caption.footerLink, color: overlays.white80 },
  emailPressed: { color: colors.white },
  socialRow: { flexDirection: 'row', gap: spacing[16] },
  socialButton: {
    minWidth: 44,
    minHeight: 44,
    alignItems: 'center',
    justifyContent: 'center',
  },
  copyright: {
    ...typography.caption.footerCopyright,
    color: overlays.white50,
    textAlign: 'center',
  },
});
