// Contenedor de pantalla: SafeArea (solo top; las tabs cubren abajo),
// StatusBar por props y ScrollView explícito. Pantallas con hero full-bleed
// pasan safeTop={false} y manejan sus insets con useSafeAreaInsets.
import { ReactNode } from 'react';
import { StatusBar } from 'expo-status-bar';
import { ScrollView, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { colors } from '@/shared/theme';

import { BrandHeader, HEADER_CLEARANCE } from './BrandHeader';

interface ScreenProps {
  children: ReactNode;
  statusBarStyle?: 'light' | 'dark';
  backgroundColor?: string;
  safeTop?: boolean;
}

export function Screen({
  children,
  statusBarStyle = 'dark',
  backgroundColor = colors.white,
  safeTop = true,
}: ScreenProps) {
  return (
    <SafeAreaView
      edges={safeTop ? ['top'] : []}
      style={[styles.root, { backgroundColor }]}
    >
      <StatusBar style={statusBarStyle} />
      <ScrollView
        style={styles.scroll}
        contentContainerStyle={[
          styles.content,
          // Pantallas sin hero full-bleed reservan la franja del logo flotante
          // para que el primer título no arranque debajo de la pastilla.
          safeTop && styles.contentClearance,
        ]}
      >
        {children}
      </ScrollView>
      <BrandHeader />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1 },
  scroll: { flex: 1 },
  content: { flexGrow: 1 },
  contentClearance: { paddingTop: HEADER_CLEARANCE },
});
