// Stub del bloque navigation: el feature-builder de home lo reemplaza.
import { StyleSheet, Text, View } from 'react-native';

export function HomeScreen() {
  return (
    <View style={styles.container}>
      <Text>HomeScreen (stub)</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, alignItems: 'center', justifyContent: 'center' },
});
