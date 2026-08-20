// Header mínimo de marca (PLAYBOOK §2.4: la nav vive en las tabs; arriba solo
// el logo, como el header flotante del sitio). No navega: las tabs ya lo hacen.
// El sitio usa logo blanco sobre cualquier fondo (bajo contraste en fondos
// claros: rasgo real documentado en 02-content-zonas).
import { View, StyleSheet } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { logoAlt } from '@/data/navigation';
import { gutter, spacing } from '@/shared/theme';

import Logo from '../../../assets/images/logo_blanco.svg';

export function BrandHeader() {
  const insets = useSafeAreaInsets();
  return (
    <View
      pointerEvents="none"
      style={[styles.root, { top: insets.top + spacing[12] }]}
    >
      <Logo width={96} height={38} accessibilityLabel={logoAlt} />
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    position: 'absolute',
    left: gutter.home,
    zIndex: 10,
  },
});
