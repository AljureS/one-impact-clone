// Footer canónico: columnas del sitio apiladas al final del scroll (patrón
// web→native). Contenido 100% de @/data/navigation. routeByHref mapea los
// hrefs verbatim del sitio a rutas de la app; /proyectos (403 en el sitio,
// sin pantalla aquí) queda deshabilitado. Gutter: el sitio difiere 16/20 por
// pantalla (03 §6.1) y el del footer no se midió aparte → prop con default 16.
import { Ionicons } from '@expo/vector-icons';
import { Href, useRouter } from 'expo-router';
import { Linking, Pressable, StyleSheet, Text, View } from 'react-native';

import { footer, logoAlt } from '@/data/navigation';
import { colors, gutter, overlays, spacing, typography } from '@/shared/theme';

import Logo from '../../../assets/images/logo_blanco.svg';

const routeByHref: Partial<Record<string, Href>> = {
  '/': '/',
  '/zonas': '/zonas',
  '/suscripcion': '/suscripcion',
  '/nosotros': '/nosotros',
};

const iconByLabel: Record<string, 'logo-instagram' | 'logo-x'> = {
  Instagram: 'logo-instagram',
  'X (Twitter)': 'logo-x',
};

interface FooterProps {
  paddingHorizontal?: number;
}

export function Footer({ paddingHorizontal = gutter.home }: FooterProps) {
  const router = useRouter();
  return (
    <View style={[styles.root, { paddingHorizontal }]}>
      <Logo width={120} height={47} accessibilityLabel={logoAlt} />
      <Text style={styles.tagline}>{footer.tagline}</Text>
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
      <View style={styles.columnsRow}>
        <View style={styles.column}>
          <Text style={styles.heading}>{footer.menuHeading}</Text>
          {footer.menuLinks.map((link) => {
            const route = routeByHref[link.href];
            return (
              <Pressable
                key={link.label}
                accessibilityRole="link"
                accessibilityLabel={link.label}
                accessibilityState={{ disabled: route === undefined }}
                disabled={route === undefined}
                onPress={
                  route === undefined ? undefined : () => router.push(route)
                }
                style={styles.linkRow}
              >
                {({ pressed }) => (
                  <Text
                    style={[
                      styles.link,
                      pressed && styles.linkPressed,
                      route === undefined && styles.linkDisabled,
                    ]}
                  >
                    {link.label}
                  </Text>
                )}
              </Pressable>
            );
          })}
        </View>
        <View style={styles.column}>
          <Text style={styles.heading}>{footer.contactHeading}</Text>
          <Pressable
            accessibilityRole="link"
            accessibilityLabel={footer.contactEmail.label}
            onPress={() => Linking.openURL(footer.contactEmail.href)}
            style={styles.linkRow}
          >
            {({ pressed }) => (
              <Text style={[styles.link, pressed && styles.linkPressed]}>
                {footer.contactEmail.label}
              </Text>
            )}
          </Pressable>
        </View>
      </View>
      <Text style={styles.copyright}>{footer.copyright}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    backgroundColor: colors.footerBg,
    paddingVertical: spacing[40],
    gap: spacing[40], // apilado del footer a 390 (03 §4)
  },
  tagline: { ...typography.caption.footerTagline, color: overlays.white70 },
  socialRow: { flexDirection: 'row', gap: spacing[16] },
  // El sitio a 390 mantiene MENÚ y CONTACTO lado a lado (home-footer-390).
  columnsRow: { flexDirection: 'row', gap: spacing[16] },
  column: { flex: 1 },
  socialButton: {
    minWidth: 44,
    minHeight: 44,
    alignItems: 'center',
    justifyContent: 'center',
  },
  heading: {
    ...typography.caption.footerHeading,
    color: overlays.white50,
    marginBottom: spacing[8],
  },
  linkRow: { minHeight: 44, justifyContent: 'center' },
  link: { ...typography.caption.footerLink, color: overlays.white80 },
  linkPressed: { color: colors.white },
  linkDisabled: { color: overlays.white50 },
  copyright: { ...typography.caption.footerCopyright, color: overlays.white50 },
});
