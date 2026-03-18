import { View, Text } from "react-native";
import { useLocalSearchParams } from "expo-router";
import QRCode from "react-native-qrcode-svg";
import { ScanBarcode } from "lucide-react-native";

export default function QRScreen() {
  const { id, title, price, brand } = useLocalSearchParams();

  const qrValue = id
    ? JSON.stringify({ id, title, price, brand })
    : "";

  return (
    <View className="flex-1 justify-center items-center bg-gray-100 px-6">

      <View className="flex-row items-center gap-2 mb-2">
        <ScanBarcode size={28} color="black" />
        <Text className="text-2xl font-bold">Código QR</Text>
      </View>

      {qrValue ? (
        <>
          <Text className="text-lg font-semibold mb-1">{title}</Text>
          <Text className="text-gray-500 mb-6">${price}</Text>

          <View className="bg-white p-6 rounded-2xl">
            <QRCode value={qrValue} size={220} />
          </View>

          <Text className="text-xs text-gray-400 mt-4 text-center">
            {qrValue}
          </Text>
        </>
      ) : (
        <Text className="text-gray-400">
          Selecciona un producto desde la tienda
        </Text>
      )}

    </View>
  );
}