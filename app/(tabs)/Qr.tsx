import { View, Text, TextInput } from "react-native";
import { useState } from "react";
import QRCode from "react-native-qrcode-svg";

export default function QRScreen() {
  const [text, setText] = useState("");

  return (
    <View className="flex-1 justify-center items-center bg-gray-100 px-6">

      <Text className="text-2xl font-bold mb-6">
        Generador de QR
      </Text>

      <TextInput
        placeholder="Escribe algo..."
        value={text}
        onChangeText={setText}
        className="w-full bg-white border border-gray-300 rounded-xl p-4"
      />

      {text.length > 0 && (
        <View className="mt-8 bg-white p-6 rounded-2xl">
          <QRCode
            value={text}
            size={220}
          />
        </View>
      )}

    </View>
  );
}