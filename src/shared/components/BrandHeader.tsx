// Header mínimo de marca (PLAYBOOK §2.4: la nav vive en las tabs; arriba solo
// el logo, como el header flotante del sitio). No navega: las tabs ya lo hacen.
// Pastilla glass (bloque F): el logo flota sobre contenido arbitrario en todas
// las pantallas — blur + scrim oscuro lo mantienen legible también sobre las
// secciones claras donde el logo blanco del sitio se perdía (02-content-zonas).
import { BlurView } from 'expo-blur';
import { View, StyleSheet } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { logoAlt } from '@/data/navigation';
import { gutter, overlays, radius, spacing } from '@/shared/theme';

import Logo from '../../../assets/images/logo_blanco.svg';

export function BrandHeader() {
  const insets = useSafeAreaInsets();
  return (
    <View
      pointerEvents="none"
      style={[styles.root, { top: insets.top + spacing[12] }]}
    >
      <BlurView intensity={18} tint="dark" style={styles.pill}>
        <Logo width={96} height={38} accessibilityLabel={logoAlt} />
      </BlurView>
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    position: 'absolute',
    left: gutter.home,
    zIndex: 10,
  },
  pill: {
    backgroundColor: overlays.black30,
    borderWidth: 1,
    borderColor: overlays.white20,
    borderRadius: radius.full,
    paddingHorizontal: spacing[16],
    paddingVertical: spacing[8],
    overflow: 'hidden', // clipea el blur a la pastilla
  },
});
