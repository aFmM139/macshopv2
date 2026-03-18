import React, { useState } from 'react';
import { StyleSheet, Text, View, Alert } from 'react-native';
import { CameraView } from 'expo-camera';

export default function QRScanner() {
  const [scanned, setScanned] = useState(false);

  const handleBarCodeScanned = ({ type, data }: any) => {
    setScanned(true);

    try {
      const parsed = JSON.parse(data);

      // Verifica que tenga los campos de nuestro QR de pago
      if (parsed.id && parsed.title && parsed.price) {
        Alert.alert(
          "✅ Pago válido",
          `Producto: ${parsed.title}\nPrecio: $${parsed.price}\nMarca: ${parsed.brand || "N/A"}`,
          [{ text: "OK", onPress: () => setScanned(false) }]
        );
      } else {
        Alert.alert(
          "❌ QR no válido",
          "Este código QR no corresponde a un pago.",
          [{ text: "Intentar de nuevo", onPress: () => setScanned(false) }]
        );
      }
    } catch {
      // Si no es JSON, definitivamente no es nuestro QR
      Alert.alert(
        "❌ QR no válido",
        "Este código QR no corresponde a un pago.",
        [{ text: "Intentar de nuevo", onPress: () => setScanned(false) }]
      );
    }
  };

  return (
    <View style={styles.container}>
      <CameraView
        style={StyleSheet.absoluteFillObject}
        onBarcodeScanned={scanned ? undefined : handleBarCodeScanned}
        barcodeScannerSettings={{
          barcodeTypes: ["qr"],
        }}
      />

      {scanned && (
        <View style={styles.overlay}>
          <Text style={styles.text}>Procesando...</Text>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  overlay: {
    position: 'absolute',
    bottom: 50,
    alignSelf: 'center',
    backgroundColor: '#000000aa',
    padding: 20,
    borderRadius: 10
  },
  text: { color: 'white', fontWeight: 'bold' }
});