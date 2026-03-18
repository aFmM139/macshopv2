import React, { useState } from 'react';
import { Text, View, Alert, Pressable, StyleSheet } from 'react-native';
import { CameraView, useCameraPermissions } from 'expo-camera';

export default function QRScanner() {
  const [scanned, setScanned] = useState(false);
  const [permission, requestPermission] = useCameraPermissions();

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

  if (!permission) {
    return <View className="flex-1" />;
  }

  if (!permission.granted) {
    return (
      <View className="flex-1 justify-center items-center px-6 bg-gray-100">
        <Text className="text-base text-gray-700 text-center mb-4">
          Se necesita acceso a la cámara para escanear QR
        </Text>
        <Pressable
          onPress={requestPermission}
          className="bg-indigo-600 px-6 py-3 rounded-xl"
        >
          <Text className="text-white font-bold">Permitir cámara</Text>
        </Pressable>
      </View>
    );
  }

  return (
    <View className="flex-1">
      <CameraView
        style={StyleSheet.absoluteFillObject}
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