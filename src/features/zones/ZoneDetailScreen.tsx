// Stub del bloque navigation: el feature-builder de la ficha de zona lo
// reemplaza (lee su slug con useLocalSearchParams, como aquí).
import { useLocalSearchParams } from 'expo-router';
import { StyleSheet, Text, View } from 'react-native';

export function ZoneDetailScreen() {
  const { slug } = useLocalSearchParams<{ slug: string }>();
  return (
    <View style={styles.container}>
      <Text>ZoneDetailScreen (stub): {slug}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, alignItems: 'center', justifyContent: 'center' },
});
