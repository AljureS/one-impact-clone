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

const LOGO_HEIGHT = 38;
// Alto real de la pastilla (Yoga suma padding y borde al contenido). Lo usa el
// back de zonas/[slug] para ser su gemelo visual.
export const PILL_HEIGHT = LOGO_HEIGHT + 2 * spacing[8] + 2;
// Franja que el chrome flotante ocupa bajo el safe area: Screen la reserva como
// paddingTop inicial para que ningún título arranque debajo de la pastilla
// (pro-rules §scroll/fixed coexistence); al scrollear el contenido sí pasa
// por debajo y ahí trabaja el glass.
export const HEADER_CLEARANCE = spacing[12] + PILL_HEIGHT;

export function BrandHeader() {
  const insets = useSafeAreaInsets();
  return (
    <View
      pointerEvents="none"
      style={[styles.root, { top: insets.top + spacing[12] }]}
    >
      <BlurView intensity={18} tint="dark" style={styles.pill}>
        <Logo width={96} height={LOGO_HEIGHT} accessibilityLabel={logoAlt} />
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
