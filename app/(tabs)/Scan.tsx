import React, { useState } from 'react';
import { Text, View, Alert } from 'react-native';
import { CameraView } from 'expo-camera';

export default function QRScanner() {
  const [scanned, setScanned] = useState(false);

  const handleBarCodeScanned = ({ data }: any) => {
    setScanned(true);

    try {
      const parsed = JSON.parse(data);

      if (parsed.id && parsed.title && parsed.price) {
        Alert.alert(
          "✔ Pago válido",
          `Producto: ${parsed.title}\nPrecio: $${parsed.price}\nMarca: ${parsed.brand || "N/A"}`,
          [{ text: "OK", onPress: () => setScanned(false) }]
        );
      } else {
        Alert.alert(
          "✖ QR no válido",
          "Este código QR no corresponde a un pago.",
          [{ text: "Intentar de nuevo", onPress: () => setScanned(false) }]
        );
      }
    } catch {
      Alert.alert(
        "✖ QR no válido",
        "Este código QR no corresponde a un pago.",
        [{ text: "Intentar de nuevo", onPress: () => setScanned(false) }]
      );
    }
  };

  return (
    <View className="flex-1">
      <CameraView
        className="absolute inset-0"
        onBarcodeScanned={scanned ? undefined : handleBarCodeScanned}
        barcodeScannerSettings={{ barcodeTypes: ["qr"] }}
      />

      {scanned && (
        <View className="absolute bottom-12 self-center bg-black/70 px-6 py-4 rounded-xl">
          <Text className="text-white font-bold">Procesando...</Text>
        </View>
      )}
    </View>
  );
}