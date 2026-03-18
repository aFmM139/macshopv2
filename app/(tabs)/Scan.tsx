import React, { useState } from 'react';
import { StyleSheet, Text, View, Alert } from 'react-native';
import { CameraView } from 'expo-camera';

export default function QRScanner() {
  const [scanned, setScanned] = useState(false);

  const handleBarCodeScanned = ({ type, data }: any) => {
    setScanned(true);

    Alert.alert(
      "Código Scaneado",
      `Tipo: ${type}\nContenido: ${data}`,
      [{ text: "OK", onPress: () => setScanned(false) }]
    );
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